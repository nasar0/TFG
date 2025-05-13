from sentence_transformers import SentenceTransformer, util
import re

# Diccionario de respuestas ampliado (claves como listas para incluir sinónimos)
respuestas = {
    ("pago", "formas de pago", "metodos de pago", "tarjetas", "paypal"): 
        "Puedes pagar con: \n- Tarjeta (Visa/Mastercard) \n- PayPal \n- Transferencia bancaria \n- Efectivo en tienda física.",

    ("horario", "horarios", "cuándo abren", "apertura"): 
        "Horario: \nLunes a Viernes: 9:00 - 18:00 \nSábados: 10:00 - 14:00 \n¡Te esperamos!",

    ("devolución", "devoluciones", "política de devoluciones", "reembolso"): 
        "Aceptamos devoluciones hasta 30 días después de la compra. Requisitos: \n- Etiqueta intacta \n- Producto sin usar.",

    ("contacto", "teléfono", "email", "redes sociales", "instagram"): 
        " Contáctanos: \nTel: +390289730679 \nEmail: info@karmax.com \nInstagram: @KarmaX_Moda \n📍 Calle Moda 123, Milán.",

    ("hola", "buenos días", "saludos", "qué tal", "hey"): 
        "¡Hola! Bienvenido/a a **KarmaX**. ¿En qué puedo ayudarte hoy? \n(Puedes preguntar por envíos, tallas, ofertas, etc.)",

    ("envío", "envíos", "gastos de envío", "tiempo de entrega", "cuándo llega"): 
        "Envíos a toda Europa: \n- 2-3 días (Italia/España) \n- 5-7 días (UE) \n¡ENVÍO GRATIS en compras >50€!",

    ("talla", "tallas", "tallas disponibles", "talla s", "talla xl"): 
        "Tallas disponibles: XS a XL.",

    ("nueva colección", "colección", "última colección", "primavera verano"): 
        "Nueva colección Primavera/Verano 2024: \n- Vestidos ligeros \n- Jeans sostenibles \n¡Mira el catálogo [aquí](www.karmax.com)!",

    ("oferta", "ofertas", "descuento", "promoción", "código descuento"): 
        "¡OFERTA ESPECIAL! \n30% de descuento con código **QWERTY**. Válido hasta 31/12.",

    ("seguimiento", "pedido", "dónde está mi pedido", "tracking"): 
        "Consulta el estado de tu pedido en el email de confirmación o escríbenos tu nº de pedido.",

    ("agradecimiento", "gracias", "thanks", "ok"): 
        "¡Gracias por elegir KarmaX! ¿Necesitas algo más?",

    ("adiós", "chao", "hasta luego", "despedida"): 
        "¡Hasta pronto! Si tienes más dudas, aquí estaré.",
}

# Normalizar texto (elimina acentos y mayúsculas)
def normalizar_texto(texto):
    texto = texto.lower().strip()
    texto = re.sub(r'[áäà]', 'a', texto)
    texto = re.sub(r'[éëè]', 'e', texto)
    texto = re.sub(r'[íïì]', 'i', texto)
    texto = re.sub(r'[óöò]', 'o', texto)
    texto = re.sub(r'[úüù]', 'u', texto)
    return texto

# Preparar embeddings (una clave por entrada)
modelo = SentenceTransformer('all-MiniLM-L6-v2')
claves_embedding = []
claves_originales = []

for sinonimos, respuesta in respuestas.items():
    for clave in sinonimos:
        claves_embedding.append(clave)
        claves_originales.append(sinonimos)  # Guardamos todos los sinónimos para referencia

embeddings = modelo.encode(claves_embedding, convert_to_tensor=True)

umbral = 0.6  # Más estricto para evitar falsos positivos

# Sistema de sugerencias si no hay match
sugerencias = {
    "pago": "💳 ¿Quieres saber sobre métodos de pago?",
    "envío": "🚚 Pregúntame por tiempos de entrega o gastos de envío.",
    "talla": "👖 Consulta tallas disponibles o cambios.",
}

def obtener_sugerencias(pregunta):
    palabras = pregunta.split()
    for palabra in palabras:
        for tema, mensaje in sugerencias.items():
            if palabra.startswith(tema):
                return mensaje
    return "Prueba con: 'pagos', 'envíos', 'tallas', 'ofertas' o 'contacto'."

while True:
    pregunta_usuario = input("Tú: ")
    if normalizar_texto(pregunta_usuario) == "salir":
        break

    pregunta_norm = normalizar_texto(pregunta_usuario)
    pregunta_embedding = modelo.encode(pregunta_norm, convert_to_tensor=True)
    similitudes = util.cos_sim(pregunta_embedding, embeddings)
    max_sim, idx_max = similitudes.max().item(), similitudes.argmax()

    if max_sim > umbral:
        sinonimos_respuesta = claves_originales[idx_max]
        respuesta = respuestas[sinonimos_respuesta]
        print("\nKarmaX:", respuesta)
    else:
        sugerencia = obtener_sugerencias(pregunta_norm)
        print(f"\nKarmaX: No entendí tu pregunta. {sugerencia}")