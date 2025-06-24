# 🎮 Actividad Didáctica: Ingeniería de Prompts e IA - Versión Gamificada

[![GitHub stars](https://img.shields.io/github/stars/jhonlaurens/actividad-didactica-ingenieria-prompts-ia.svg?style=social&label=Star)](https://github.com/jhonlaurens/actividad-didactica-ingenieria-prompts-ia)
[![GitHub forks](https://img.shields.io/github/forks/jhonlaurens/actividad-didactica-ingenieria-prompts-ia.svg?style=social&label=Fork)](https://github.com/jhonlaurens/actividad-didactica-ingenieria-prompts-ia/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Esta es una plataforma web educativa interactiva diseñada para enseñar ingeniería de prompts e inteligencia artificial de manera atractiva y práctica.

## 🚀 Demo en Vivo

Visita la aplicación: [https://jhonlaurens.github.io/actividad-didactica-ingenieria-prompts-ia](https://jhonlaurens.github.io/actividad-didactica-ingenieria-prompts-ia)

## 🌟 Nuevas Características Implementadas

### 🎯 Sistema de Gamificación
- **Sistema de puntos**: Gana puntos por completar actividades
- **Logros y badges**: Desbloquea insignias por diferentes logros
- **Racha de actividades**: Mantén tu racha para obtener bonificaciones
- **Progreso visual**: Anillos de progreso y barras de completitud
- **Confetti y celebraciones**: Animaciones de celebración por logros

### 🎮 Juegos Interactivos
1. **Constructor de Prompts**: Juego de drag-and-drop para construir prompts efectivos
2. **Detector de Técnicas**: Quiz temporal para identificar técnicas de prompt engineering
3. **Simulador de Escenarios**: (Próximamente) Práctica con casos de uso reales
4. **Laboratorio de Optimización**: (Próximamente) Mejora iterativa de prompts

### 📊 Elementos Visuales Mejorados
- **Infografías interactivas**: Visualizaciones de conceptos clave
- **Navegación mejorada**: Indicadores de progreso y completitud
- **Componentes animados**: Microinteracciones y transiciones suaves
- **Feedback visual**: Respuestas inmediatas y explicaciones detalladas

### 💾 Persistencia de Datos
- **LocalStorage**: El progreso se guarda automáticamente
- **Estado global**: Sistema de contexto React para manejo de estado
- **Seguimiento de actividades**: Historial completo de actividades completadas

## 🚀 Cómo Ejecutar

**Prerrequisitos:** Node.js

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar la API key de Gemini en [.env.local](.env.local):
   ```
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Instalación Local

1. **Clonar el repositorio:**
```bash
git clone https://github.com/jhonlaurens/actividad-didactica-ingenieria-prompts-ia.git
cd actividad-didactica-ingenieria-prompts-ia
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

4. **Construir para producción:**
```bash
npm run build
```

### 🚀 Deploy

El proyecto está configurado para deploy fácil en:
- Vercel
- Netlify  
- GitHub Pages
- Cualquier hosting estático

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de interfaz de usuario
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **Framer Motion**: Animaciones y transiciones
- **React DnD**: Funcionalidad drag-and-drop
- **Recharts**: Gráficos y visualizaciones
- **React Confetti**: Efectos de celebración

## 📚 Estructura del Contenido Educativo

### 1. 🌟 Introducción
- Objetivos de aprendizaje
- Panorama general de la ingeniería de prompts

### 2. 💡 Comprensión de Conceptos
- Infografía: Anatomía de un prompt efectivo
- Conceptos fundamentales
- Quiz: Detector de técnicas de prompting
- Preguntas de comprensión

### 3. ⚗️ Aplicación Práctica
- Juego: Constructor de prompts
- Escenarios de generación de código
- Escenarios de redacción creativa

### 4. 📖 Reflexión Crítica
- Evaluación de respuestas de IA
- Consideraciones éticas
- Preguntas de reflexión interactivas

### 5. 🧩 Autoevaluación
- Desafío final: Asistente de proyectos
- Criterios de evaluación
- Aplicación práctica completa

### 6. ✅ Mapa Conceptual
- Guía para crear mapas conceptuales
- Elementos clave a incluir
- Consolidación del aprendizaje

## 🎯 Características del Sistema de Gamificación

### Logros Disponibles
- **🎯 Primeros Pasos**: Completa tu primera actividad
- **🧠 Maestro de Prompts**: Completa todos los escenarios prácticos
- **⭐ Puntuación Perfecta**: Responde correctamente todas las preguntas
- **🤔 Pensador Profundo**: Completa todas las reflexiones
- **🏆 Completista**: Completa toda la actividad didáctica

### Sistema de Puntos
- **Preguntas de opción múltiple**: 15 puntos
- **Preguntas abiertas**: 10 puntos
- **Juegos interactivos**: Variable según rendimiento
- **Bonificaciones**: Por velocidad y rachas

## 🔧 Arquitectura Técnica

### Contexto de Juego (GameContext)
- Manejo centralizado del estado de gamificación
- Persistencia automática en LocalStorage
- Sistema de logros y puntuaciones

### Componentes Modulares
- Renderers específicos para cada tipo de contenido
- Componentes de gamificación reutilizables
- Juegos interactivos independientes

### Tipos TypeScript
- Definiciones completas para todos los tipos de contenido
- Interfaces para gamificación y estado
- Tipado fuerte para mejor desarrollo

## 🎨 Mejoras Visuales

### Paleta de Colores Mejorada
- **Primarios**: Azules para elementos principales
- **Secundarios**: Amarillos para elementos de acento
- **Gamificación**: Verdes, naranjas y rojos para feedback

### Animaciones y Transiciones
- Microinteracciones en botones y elementos
- Transiciones suaves entre estados
- Animaciones de celebración y logros

## 📈 Métricas y Análisis

El sistema rastrea automáticamente:
- Tiempo invertido en cada sección
- Puntuación total y por actividad
- Progreso de completitud
- Patrones de uso y engagement

## 🔄 Roadmap Futuro

- [ ] Integración real con APIs de IA
- [ ] Más juegos interactivos
- [ ] Sistema de competencias entre usuarios
- [ ] Exportación de certificados
- [ ] Modo offline completo
- [ ] Análiticas avanzadas

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Desarrollado con ❤️ para hacer el aprendizaje de IA más interactivo y efectivo**