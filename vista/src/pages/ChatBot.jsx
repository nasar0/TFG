import React, { useState, useEffect, useRef } from 'react';
import * as SentenceTransformers from 'sentence-transformers';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "¡Hola! 👋 Soy el asistente de KarmaX. ¿En qué puedo ayudarte hoy?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [model, setModel] = useState(null);
  const messagesEndRef = useRef(null);

  // Respuestas del chatbot
  const respuestas = {
    "pago": "💳 Aceptamos: Tarjeta, PayPal, transferencia y efectivo en tienda.",
    "horario": "⏰ Lunes a Viernes: 9:00-18:00 | Sábados: 10:00-14:00",
    "devoluciones": "🔄 30 días para devolver (con etiqueta y sin usar).",
    "contacto": "📞 Tel: +390289730679 | Email: info@karmax.com | IG: @KarmaX_Moda",
    "hola": "¡Hola de nuevo! ¿Qué más necesitas saber?",
    "envios": "🚚 Envío gratis >50€. Europa: 2-3 días (IT/ES) | 5-7 días (UE).",
    "tallas": "👖 Tallas XS-XL. ¿Qué modelo te interesa?",
    "coleccion": "🌸 Nueva colección en www.karmax.com (Vestidos, jeans sostenibles).",
    "ofertas": "🔥 30% OFF con código QWERTY (válido hasta 31/12).",
    "seguimiento": "📦 Revisa tu email o envíanos tu nº de pedido.",
    "gracias": "💙 ¡Gracias por elegir KarmaX!",
    "adios": "👋 ¡Hasta pronto!"
  };

  // Cargar el modelo al montar el componente
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = new SentenceTransformers.SentenceTransformer('all-MiniLM-L6-v2');
        setModel(loadedModel);
      } catch (error) {
        console.error("Error cargando el modelo:", error);
        addMessage("Disculpa, estoy teniendo problemas técnicos. Intenta más tarde.", "bot");
      }
    };

    loadModel();
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const normalizeText = (text) => {
    return text.toLowerCase()
      .replace(/[áäà]/g, 'a').replace(/[éëè]/g, 'e')
      .replace(/[íïì]/g, 'i').replace(/[óöò]/g, 'o')
      .replace(/[úüù]/g, 'u')
      .trim();
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !model) return;

    const userMessage = inputValue;
    addMessage(userMessage, "user");
    setInputValue("");

    try {
      const normalizedInput = normalizeText(userMessage);
      const inputEmbedding = await model.encode(normalizedInput);
      
      // Calcular similitudes con las preguntas conocidas
      const claves = Object.keys(respuestas);
      const embeddings = await Promise.all(claves.map(key => model.encode(key)));
      
      let bestMatch = "";
      let highestSimilarity = 0;

      embeddings.forEach((embedding, index) => {
        const similarity = SentenceTransformers.util.cos_sim(inputEmbedding, embedding)[0][0];
        if (similarity > highestSimilarity && similarity > 0.5) {
          highestSimilarity = similarity;
          bestMatch = claves[index];
        }
      });

      const botResponse = bestMatch ? respuestas[bestMatch] : "¿Necesitas información sobre pagos, horarios o envíos?";
      addMessage(botResponse, "bot");
    } catch (error) {
      console.error("Error procesando mensaje:", error);
      addMessage("Disculpa, ocurrió un error. ¿Puedes reformular tu pregunta?", "bot");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>
        <h3 style={styles.title}>KarmaX Assistant</h3>
      </div>
      
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Enviar
        </button>
      </div>
    </div>
  );
};

// Estilos (puedes moverlos a un archivo CSS aparte)
const styles = {
  chatContainer: {
    width: "350px",
    height: "500px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  chatHeader: {
    backgroundColor: "#000",
    color: "white",
    padding: "15px",
    textAlign: "center"
  },
  title: {
    margin: 0,
    fontSize: "18px"
  },
  messagesContainer: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9"
  },
  userMessage: {
    backgroundColor: "#e3f2fd",
    padding: "10px",
    borderRadius: "10px 10px 0 10px",
    margin: "5px 0",
    maxWidth: "80%",
    alignSelf: "flex-end"
  },
  botMessage: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px 10px 10px 0",
    margin: "5px 0",
    maxWidth: "80%",
    border: "1px solid #eee"
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "white"
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none"
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 15px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ChatBot;