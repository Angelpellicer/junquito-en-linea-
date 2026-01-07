# Junquito en Línea

Web app responsiva (MVP) - Directorio hiperlocal de servicios, oficios y negocios de El Junquito, Caracas.

## Características

- **Búsqueda inteligente**: Busca servicios por categoría, nombre o descripción
- **Filtros avanzados**: Filtra por zona, disponibilidad, calificación y más
- **Vista de mapa**: Visualiza proveedores en un mapa interactivo (mock)
- **Favoritos**: Guarda tus proveedores favoritos para acceso rápido
- **Perfiles completos**: Información detallada de cada proveedor
- **Contacto directo**: WhatsApp y llamadas con un clic
- **Publicación de servicios**: Wizard para que los proveedores publiquen sus servicios

## Stack Tecnológico

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Lucide React** (iconos)

## Estructura del Proyecto

```
/app
  /page.tsx              # Home
  /explore/page.tsx      # Explorar/Resultados
  /provider/[id]         # Perfil de proveedor
  /favorites/page.tsx    # Favoritos
  /profile/page.tsx      # Perfil de usuario
  /publish/page.tsx      # Publicar servicio

/components
  ServiceCard.tsx
  TrustBadge.tsx
  AvailabilityIndicator.tsx
  SearchBar.tsx
  FiltersPanel.tsx
  MapMock.tsx
  CategoryGrid.tsx
  ReviewCard.tsx
  SkeletonLoader.tsx
  EmptyState.tsx
  Navigation.tsx

/data
  providers.ts           # 20 proveedores mock
  categories.ts          # 12 categorías

/types
  provider.ts
  category.ts
```

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar producción
npm start
```

## Datos Mock

El proyecto incluye 20 proveedores de ejemplo con datos completos:
- Información personal y de contacto
- Servicios ofrecidos
- Horarios de disponibilidad
- Zonas de cobertura
- Calificaciones y badges de confianza

## Características Responsivas

- **Mobile** (360-430px): Bottom navigation, drawer de filtros, layout vertical
- **Tablet** (768-1024px): Layout híbrido con navegación simplificada
- **Desktop** (1280px+): Layout 3 columnas (Filtros | Lista | Mapa)
- **Wide** (1440px+): Contenedor centrado con más espacio

## Sistema Visual

- **Colores primarios**: Azul (#1E40AF) para marca y CTAs
- **Acentos funcionales**: Verde (disponible hoy), Amarillo (esta semana), Rojo (no disponible)
- **Tipografía**: System UI (sans-serif legible)
- **Estética**: Minimalismo funcional + calidez comunitaria

## Funcionalidades Principales

### Para Vecinos/Clientes
1. Buscar servicios por categoría o texto
2. Filtrar resultados por múltiples criterios
3. Ver perfiles completos de proveedores
4. Contactar directamente por WhatsApp o teléfono
5. Guardar favoritos para acceso rápido

### Para Proveedores
1. Publicar servicios mediante wizard de 4 pasos
2. Gestionar información de perfil
3. Actualizar disponibilidad y horarios
4. Guardar borradores de publicaciones

## Próximos Pasos (Evolución)

- Integración con backend real
- Autenticación de usuarios
- Sistema de pagos
- Reseñas reales de usuarios
- Notificaciones push
- Integración con mapas reales (Google Maps/Mapbox)

## Licencia

Este es un proyecto MVP para demostración.

