# SCRE Design System

Biblioteca de componentes de interfaz de usuario (UI) para React, construida estrictamente a partir del sistema de diseño SCRE en Figma. Este paquete proporciona componentes fuertemente tipados, accesibles y consistentes para acelerar el desarrollo de interfaces modernas.

## Características principales
- **100% TypeScript:** Tipado estricto para un autocompletado perfecto.
- **Sin dependencias externas de CSS:** Estilos encapsulados utilizando *Design Tokens*.
- **Accesibilidad por diseño:** Soporte nativo para navegación por teclado (estados de foco) y lineamientos de alto contraste.
- **Fidelidad al manual de marca:** Cumplimiento riguroso de reglas visuales.

## Instalación

Puedes instalar la biblioteca en tu proyecto de React utilizando npm:

```bash
npm install @lenonwolf/scre-design-system
```
*(Nota: Requiere React 18 o superior).*

## Uso básico

Importa los componentes directamente desde el paquete y úsalos en tu aplicación React:

```tsx
import { Button, Alert, Card } from '@lenonwolf/scre-design-system';

function App() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card>
        <Alert title="¡Bienvenido a SCRE!" variant="info">
          El sistema de diseño está configurado correctamente.
        </Alert>
        
        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => alert('¡Funciona!')} variant="primary">
            Comenzar
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
```

## Componentes disponibles

El sistema incluye 10 componentes modulares basados en el catálogo de instancias:

1. **Button**: Acciones principales y secundarias con estados de carga y éxito.
2. **Input**: Campo de texto con validación visual y soporte para iconos.
3. **Card**: Contenedor de contenido plano basado en bordes.
4. **Alert**: Retroalimentación semántica (Éxito, Información, Error).
5. **Switch**: Interruptor animado para opciones booleanas.
6. **Checkbox**: Casilla de verificación accesible.
7. **Radio**: Selector de opción única.
8. **Dropdown**: Menú desplegable interactivo.
9. **Tabs**: Navegación por pestañas.
10. **Modal**: Superposición para diálogos críticos (el único componente que emplea elevación/sombra).

## Design Tokens

La librería exporta los tokens fundamentales del sistema por si necesitas construir componentes personalizados manteniendo la identidad visual:

```tsx
import { colors, typography, spacing, elevation, motion } from '@lenonwolf/scre-design-system/tokens';
```

- **colors**: Paleta corporativa (forest, mint, sage, etc.).
- **typography**: Tamaños y pesos basados en la fuente Agency FB.
- **spacing**: Espaciados y radios de borde estándar.
- **elevation**: Sombras funcionales.
- **motion**: Duraciones de transición (hover, pressed, focus).

## Lineamientos de Accesibilidad (A11y)

Este paquete fue diseñado siguiendo reglas estrictas de UX/UI:

- **Errores:** Los estados de error se comunican mediante iconografía, grosor de bordes (3px) y el color corporativo oscuro, evitando el uso del color rojo para mantener la accesibilidad visual.
- **Movimiento:** Las transiciones respetan los tiempos funcionales (160ms para hover, 80ms para presión).
- **Superficies:** La elevación (sombra) está estrictamente reservada para el componente Modal.

---
*Desarrollado para el catálogo de instancias SCRE.*