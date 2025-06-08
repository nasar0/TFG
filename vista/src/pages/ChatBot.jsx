import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { useNavigate } from 'react-router-dom';

// Diccionario de respuestas
const respuestas = {
  "pago": "Puedes pagar con: \n- Tarjeta (Visa/Mastercard) \n- PayPal \n- Transferencia bancaria \n- Efectivo en tienda física.",
  "horario": "Horario: \nLunes a Viernes: 9:00 - 18:00 \nSábados: 10:00 - 14:00 \n¡Te esperamos!",
  "devolucion": "Aceptamos devoluciones hasta 30 días después de la compra. Requisitos: \n- Etiqueta intacta \n- Producto sin usar.",
  "contacto": "Contáctanos: \nTel: +390289730679 \nEmail: info@karmax.com \nInstagram: @KarmaX_Moda \n📍 Calle Moda 123, Milán.",
  "saludo": "¡Hola! Bienvenido/a a **KarmaX**. ¿En qué puedo ayudarte hoy? \n(Puedes preguntar por envíos, tallas, ofertas, etc.)",
  "envio": "Envíos a toda Europa: \n- 2-3 días (Italia/España) \n- 5-7 días (UE) \n¡ENVÍO GRATIS en compras >50€!",
  "talla": "Tallas disponibles: XS a XL.",
  "coleccion": "Nueva colección Primavera/Verano 2024: \n- Vestidos ligeros \n- Jeans sostenibles \n¡Mira el catálogo [aquí](www.karmax.com)!",
  "oferta": "¡OFERTA ESPECIAL! \n30% de descuento con código **QWERTY**. Válido hasta 31/12.",
  "seguimiento": "Consulta el estado de tu pedido en el email de confirmación o llama a atencion al cliente.",
  "agradecimiento": "¡Gracias por elegir KarmaX! ¿Necesitas algo más?",
  "despedida": "¡Hasta pronto! Si tienes más dudas, aquí estaré.",
};

// Mapeo de palabras clave a categorías
const palabrasClave = {
  "pago": ["pago", "formas de pago", "metodos de pago", "tarjetas", "paypal"],
  "horario": ["horario", "horarios", "cuándo abren", "apertura"],
  "devolucion": ["devolución", "devoluciones", "política de devoluciones", "reembolso"],
  "contacto": ["contacto", "teléfono", "email", "redes sociales", "instagram"],
  "saludo": ["hola", "buenos días", "saludos", "qué tal", "hey"],
  "envio": ["envío", "envíos", "gastos de envío", "tiempo de entrega", "cuándo llega"],
  "talla": ["talla", "tallas", "tallas disponibles", "talla s", "talla xl"],
  "coleccion": ["nueva colección", "colección", "última colección", "primavera verano"],
  "oferta": ["oferta", "ofertas", "descuento", "promoción", "código descuento"],
  "seguimiento": ["seguimiento", "pedido", "dónde está mi pedido", "tracking"],
  "agradecimiento": ["agradecimiento", "gracias", "thanks", "ok"],
  "despedida": ["adiós", "chao", "hasta luego", "despedida", "salir"],
};

// Sugerencias para cuando no se entiende la pregunta
const sugerencias = {
  "pago": "💳 ¿Quieres saber sobre métodos de pago?",
  "envio": "🚚 Pregúntame por tiempos de entrega o gastos de envío.",
  "talla": "👖 Consulta tallas disponibles o cambios.",
};

const ChatBot = () => {
  const [mensajes, setMensajes] = useState([]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [modelo, setModelo] = useState(null);
  const [useModel, setUseModel] = useState(null);
  const [cargando, setCargando] = useState(true);
  const mensajesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarModelo = async () => {
      try {
        // Carga dinámica
        const tf = await import('@tensorflow/tfjs');
        const use = await import('@tensorflow-models/universal-sentence-encoder');

        const modeloCargado = await use.load();
        setUseModel(use); // Guardamos el módulo para luego
        setModelo(modeloCargado);

        setMensajes([{
          texto: "¡Hola! Soy el asistente de KarmaX. ¿En qué puedo ayudarte hoy?",
          esUsuario: false
        }]);
      } catch (error) {
        console.error("Error al cargar el modelo:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarModelo();
  }, []);

  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const normalizarTexto = (texto) => {
    if (!texto) return '';
    let normalizado = texto.toLowerCase().trim();
    normalizado = normalizado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizado;
  };

  const obtenerSugerencias = (pregunta) => {
    const palabras = pregunta.split(' ');
    for (const palabra of palabras) {
      for (const [tema, mensaje] of Object.entries(sugerencias)) {
        if (palabra.startsWith(tema)) {
          return mensaje;
        }
      }
    }
    return "Prueba con: 'pagos', 'envíos', 'tallas', 'ofertas' o 'contacto'.";
  };

  const encontrarRespuesta = async (pregunta) => {
    if (!modelo || !pregunta) return null;

    try {
      const preguntaNorm = normalizarTexto(pregunta);
      if (preguntaNorm === "salir") {
        setTimeout(() => {
          return window.location.href = "/";
        }, 2000);
      }

      for (const [categoria, palabras] of Object.entries(palabrasClave)) {
        for (const palabra of palabras) {
          if (preguntaNorm.includes(palabra)) {

            return respuestas[categoria];
          }
        }
      }

      const embeddings = await modelo.embed([preguntaNorm]);
      const umbral = 0.6;

      let mejorSimilitud = 0;
      let mejorCategoria = null;

      for (const [categoria, palabras] of Object.entries(palabrasClave)) {
        const palabrasEmbeddings = await modelo.embed(palabras);
        const similitudes = await (await import('@tensorflow/tfjs')).matMul(
          embeddings, palabrasEmbeddings, false, true
        ).data();

        const maxSimilitud = Math.max(...similitudes);
        if (maxSimilitud > mejorSimilitud) {
          mejorSimilitud = maxSimilitud;
          mejorCategoria = categoria;
        }
      }

      return mejorSimilitud > umbral
        ? respuestas[mejorCategoria]
        : obtenerSugerencias(preguntaNorm);

    } catch (error) {
      console.error("Error al procesar la pregunta:", error);
      return "Lo siento, hubo un error al procesar tu pregunta. Por favor, inténtalo de nuevo.";
    }
  };

  const manejarEnviarMensaje = async (e) => {
    e.preventDefault();
    if (!inputMensaje.trim() || cargando) return;

    setMensajes(prev => [...prev, { texto: inputMensaje, esUsuario: true }]);
    setInputMensaje('');

    const respuesta = await encontrarRespuesta(inputMensaje);
    if (respuesta) {
      setMensajes(prev => [...prev, { texto: respuesta, esUsuario: false }]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <div className='m-5'>
        <button
          onClick={() => navigate(-1)}
          className="
            bg-white text-gray-700 
            px-4 py-1.5 
            border border-gray-200 rounded-md 
            hover:bg-gray-50 
            transition-colors
            text-sm
            z-50
          "
          id='back'
        >
          ←
        </button>
      </div>
      {/* Sección del Spline (1/3 del ancho en desktop) */}
      <div className="w-full md:w-1/3 md:h-1/3 bg-black flex items-center justify-center mx-auto"> {/* mx-auto para centrar en móvil */}
        <div className="w-full h-[30vh] lg:h-full max-w-md  flex justify-center items-center "> {/* max-w-md limita el ancho en móvil */}
          <Spline
            className="w-full h-full "
            scene="https://prod.spline.design/eGGULNkNTtOWHzkD/scene.splinecode"
          />
        </div>
      </div>
      {/* Sección del Chat (2/3 del ancho en desktop) */}
      <div className="md:w-2/3 flex flex-col md:h-full h-2/3 bg-neutral-900 text-white rounded-l-lg shadow-xl">
        <div className="p-4 bg-neutral-800 border-b border-neutral-700">
          <h2 className="text-xl font-bold text-white">Asistente KarmaX</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            <div
              key={index}
              className={`mb-4 ${mensaje.esUsuario ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg max-w-xs md:max-w-md ${mensaje.esUsuario
                    ? 'bg-gray-700 text-white rounded-br-none'
                    : 'bg-gray-300 text-black rounded-bl-none'
                  }`}
              >
                {mensaje.texto.split('\n').map((linea, i) => (
                  <p key={i}>{linea}</p>
                ))}
              </div>
            </div>
          ))}
          {cargando && !modelo && (
            <div className="text-center text-gray-400">Cargando asistente...</div>
          )}
          <div ref={mensajesEndRef} />
        </div>

        <form onSubmit={manejarEnviarMensaje} className="p-4 border-t border-neutral-700">
          <div className="flex">
            <input
              type="text"
              value={inputMensaje}
              onChange={(e) => setInputMensaje(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 border border-gray-600 bg-black text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={cargando}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black rounded-r-lg hover:bg-gray-200 disabled:opacity-50"
              disabled={!inputMensaje.trim() || cargando}
            >
              Enviar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Escribe "salir" para terminar la conversación
          </p>
        </form>
      </div>


    </div>
  );
};

export default ChatBot;