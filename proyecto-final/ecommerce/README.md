# 🏟️ Football Jersey eCommerce App

App mobile desarrollada en **React Native (Expo)** para explorar, seleccionar y comprar camisetas de fútbol. El usuario puede ver productos por categoría, gestionar su perfil (foto y dirección), y realizar un flujo de compra completo.

---

## ✨ Funcionalidades

- 🧢 Vista de productos clasificados por categoría
- 🔍 Detalle de producto con selector de cantidad
- 🛒 Carrito de compras con control de stock y total
- 📍 Selección y confirmación de ubicación vía GPS + Maps
- 👤 Perfil personal con imagen y dirección
- ☁️ Datos persistidos en Firebase Realtime Database

---

## 📲 Tecnologías y Librerías

### 🔧 Base
- **React Native (Expo)** – Desarrollo mobile multiplataforma rápido y flexible.
- **Expo Modules** – Para acceso simplificado a cámara, permisos, geolocalización, etc.

### 🧭 Navegación
- `@react-navigation/native`, `stack`, `bottom-tabs`  
  → Navegación modular por pantallas y secciones.

### ⚙️ Estado Global
- `@reduxjs/toolkit` y `react-redux`  
  → Manejo de estado eficiente para auth, productos, carrito y usuario.

- `@reduxjs/toolkit/query`  
  → Peticiones a Firebase optimizadas, con cache y control de errores.

### ☁️ Firebase
- **Realtime Database**: Guarda productos, direcciones y perfiles.
- **Firebase Auth REST API**: Gestión de login y registro (en proceso).

### 🗺️ Localización
- `expo-location`: Para obtener lat/lng del usuario.
- `Google Maps Geocoding API`: Convertir coordenadas a dirección textual.

### 📷 Imagen de Perfil
- `expo-image-picker`: Captura de imagen desde cámara nativa (en base64).
- Imagen guardada en Firebase con localId.

---

## ⚙️ Variables de Entorno

El proyecto usa un archivo `.env` para proteger claves sensibles. Este archivo no se sube al repo.

### `.env` (ejemplo)

```env
# Google Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=TU_CLAVE_DE_MAPS

# Firebase Auth REST API
EXPO_PUBLIC_FIREBASE_API_KEY=TU_API_KEY_FIREBASE
EXPO_PUBLIC_FIREBAE_AUTH_URL=https://identitytoolkit.googleapis.com/v1

# Firebase Realtime Database
EXPO_PUBLIC_REALTIME_DATABASE_URL=https://<project>.firebaseio.com/


## 📦 Instalación y Puesta en Marcha

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MarceloCarabajal/react-native-expo.git
cd proyecto-final
cd ecommerce

### 2. Instalar dependencias

npm install

### 3. Agregar el archivo .env
Creá un archivo .env en la raíz con las claves necesarias (ver sección anterior).

### 4. Ejecutar el proyecto
npx expo start

Abrí Expo Go en tu dispositivo o ejecutá en emulador.

📁 Estructura del Proyecto

├── components/         → UI reutilizable (cards, map, etc.)
├── databases/          → Claves externas (API Maps)
├── features/           → Redux slices y lógica de estado
├── navigation/         → Stacks y navegación
├── screens/            → Vistas principales (Home, Cart, Profile)
├── services/           → RTK Query para Firebase
├── assets/             → Imágenes, fuentes
├── .env                → Variables de entorno
└── App.js

📚 Pendientes / Futuras mejoras
🔐 Autenticación con Firebase Auth (completa)

💳 Integración con pasarela de pagos (MercadoPago, Stripe, etc.)

📦 Estado de pedidos

🧾 Historial de compras

👤 Autor
Marcelo Carabajal
Proyecto desarrollado como práctica profesional de React Native, Firebase y Redux.

📄 Licencia
© 2025

