# KKARMAX - Tienda de Ropa Moderna

**KKARMAX** es una plataforma de e-commerce de moda desarrollada como proyecto de Fin de Grado en la Escuela Arte Granada, implementando las mejores prácticas de desarrollo web moderno.

## 🌟 Características Destacadas

### Experiencia de Usuario
- Catálogo interactivo con filtros avanzados
- Carrito de compras persistente
- Proceso de checkout seguro
- Lista de deseos
- Carrusel de productos destacados 

### Gestión de Productos
- Panel de administración completo
- Gestión de categorías y tallas
- Subida múltiple de imágenes
- Gestión de ofertas y promociones
- Busqueda de articulos instantaneos

### Sistema de Usuarios
- Registro y autenticación segura
- Perfiles personalizables
- Cambiar de contraseña
- Roles de administrador/cliente

## Stack Tecnológico

### Frontend Avanzado
- **React 18** con hooks
- **React Router** para navegación
- **Tailwind CSS** 
- **Framer Motion Y ANIMATE CSS** para animaciones
- **BOXICONS** para iconografía
- **Context** para estado global

### Backend Robusto
- **PHP 8.1** con programación orientada a objetos
- **Arquitectura MVC** limpia y escalable
- **MySQL** relacional


## Estructura del Proyecto Mejorada

```bash
KKARMAX/
│
├── backend/
│   ├── app/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── models/           # Entidades y DB
│   │   ├── core/             # Configuración
│   │   └── middleware/       # Autenticación/validación
│   ├── public/
│   │   └── api/              # Endpoints REST
│   └── config/
│       └── database.php      # Configuración DB
│
├── frontend/
│   ├── public/               # Assets estáticos
│   └── src/
│       ├── components/       # Componentes reutilizables
│       ├── contexts/         # Estado global
│       ├── hooks/            # Custom hooks
│       ├── pages/            # Vistas principales
│       ├── services/         # Conexión API
│       ├── styles/           # Estilos globales
│       └── utils/            # Funciones helpers
│
├── tfg.sql
│
└── docs/                     # Documentación técnica
```

## Instalación en 5 Pasos

1. **Requisitos previos**
```bash
   Node.js v16+
   PHP 8.1+
   MySQL 5.7+
   ```

2. **Configuración inicial**
```bash
   git clone https://github.com/nasar0/TFG.git
   cd TFG
   ```

3. **Backend**
```bash
   SOLO AÑADIR BIEN LAS CARPETAS MODELO Y CONTROLADOR EN XAMPP O SIMILARES 
  ```

4. **Frontend**
```bash
   cd vista
   npm install
   npm run dev
```

## Autor

**Nasrallah** - Estudiante de Desarrollo Web en Escuela Arte Granada

[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=react&logoColor=white)](http://nasrallah.kesug.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nasrallah-akrach-el-kaboussi-5a8677367/)

