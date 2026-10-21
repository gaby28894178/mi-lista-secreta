# Documentacion del proyecto: Mi Lista de Tareas

## 1. Descripcion

La aplicacion permite administrar una lista de tareas desde un telefono o desde
Expo. Al iniciar, muestra tres tareas de ejemplo. El usuario puede agregar
tareas, marcarlas como pendientes o completadas, eliminarlas individualmente y
vaciar la lista. Tambien incluye un modo secreto que se activa escribiendo
`123456` en el mismo campo donde se escriben las tareas.

La interfaz cambia a un tema oscuro y dorado cuando el modo secreto esta
activo. El codigo secreto no se agrega como tarea.

## 2. Estructura de archivos

| Archivo | Responsabilidad |
| --- | --- |
| `App.js` | Punto de entrada visual. Configura el proveedor y el contenedor de area segura y muestra la pantalla principal. |
| `index.js` | Registra el componente `App` para que Expo inicie la aplicacion. |
| `data/tareasIniciales.json` | Contiene las tres tareas de ejemplo que se cargan al iniciar. |
| `components/FormularioTarea.js` | Presenta el campo de texto y el boton para agregar una tarea o enviar el codigo secreto. |
| `components/TareaItem.js` | Dibuja una tarea y ofrece acciones para cambiar su estado o eliminarla. |
| `screens/TareasScreen.js` | Mantiene la lista y el modo secreto, aplica las operaciones y organiza la pantalla. |
| `package.json` | Declara las dependencias y comandos del proyecto Expo. |

## 3. Componentes y propiedades

### `App`

Envuelve la pantalla en `SafeAreaProvider` y `SafeAreaView` de
`react-native-safe-area-context`. Esto ayuda a que el contenido no quede debajo
de elementos del telefono, como la barra de estado o el area de la camara.
Tambien muestra `StatusBar` y renderiza `TareasScreen`.

### `TareasScreen`

Es el componente principal y contiene la logica de la lista. Renderiza el
formulario, los contadores, las tareas y el boton para limpiar la lista.

Envía estas propiedades a `FormularioTarea`:

| Propiedad | Tipo | Para que se usa |
| --- | --- | --- |
| `onProcesarTexto` | Funcion | Entrega el texto ingresado a la pantalla principal para decidir si es una tarea o el codigo secreto. |
| `modoSecreto` | Booleano | Permite cambiar el texto, el color del boton y el estilo del formulario. |

Envía estas propiedades a cada `TareaItem`:

| Propiedad | Tipo | Para que se usa |
| --- | --- | --- |
| `tarea` | Objeto | Incluye `id`, `texto` y `completada`. |
| `onAlternar` | Funcion | Cambia entre pendiente y completada. |
| `onEliminar` | Funcion | Elimina la tarea seleccionada. |
| `modoSecreto` | Booleano | Aplica el estilo oscuro y dorado a la tarjeta. |

### `FormularioTarea`

Controla el campo de texto con `useState`. Impide enviar un texto vacio,
notifica el error con `Alert.alert`, llama a `onProcesarTexto` y limpia el campo
despues del envio. El envio se puede hacer con el boton o con la accion
`done` del teclado.

### `TareaItem`

Muestra el texto y el estado visual de una tarea. Al tocar el texto se llama a
`onAlternar`; al tocar el boton del cesto se llama a `onEliminar`. Las tareas
completadas aparecen tachadas. El control de alternado incluye una etiqueta de
accesibilidad.

## 4. Funciones principales y conceptos utilizados

La logica de estas funciones esta en `screens/TareasScreen.js`:

- **`procesarTextoInput(texto)`**: comprueba si el texto, una vez quitados los
  espacios de los extremos, es `123456`. Si coincide, activa o desactiva el
  modo secreto y muestra una alerta. Si no coincide, crea una tarea con un ID
  basado en `Date.now()` y la agrega a la lista.
- **`alternarTarea(id)`**: usa `map()` para producir una lista nueva y cambiar
  el valor de `completada` solo en la tarea cuyo ID coincide.
- **`eliminarTarea(id)`**: usa `filter()` para producir una lista sin la tarea
  seleccionada.
- **`pendientes` y `completadas`**: usan `filter()` y `length` para calcular y
  mostrar las cantidades actuales.
- **Limpiar todas**: el boton aparece cuando hay tareas y reemplaza la lista
  por una lista vacia.

Los datos se representan con un arreglo de objetos. `useState` controla la
lista, el modo secreto y el texto escrito en el formulario. Los eventos
`onPress`, `onChangeText` y `onSubmitEditing` conectan las acciones de la
interfaz con las funciones.

La lista se presenta con `FlatList`, componente nativo de React Native adecuado
para listas desplazables. `map()` se utiliza para actualizar las tareas al
alternar su estado.

## 5. Donde ingresar el codigo secreto

1. Abre la aplicacion.
2. En el campo de texto que tambien se usa para agregar tareas, escribe
   `123456`.
3. Presiona **Agregar Tarea**.
4. Aparecera una alerta y la pantalla cambiara al modo oscuro y dorado.
5. Repite el mismo procedimiento para desactivar el modo secreto.

El codigo no queda en la lista como una tarea.

## 6. Tecnologias y dependencias

- **JavaScript** para la logica de la aplicacion.
- **Expo SDK 57** para ejecutar y desarrollar la app.
- **React 19** y **React Native 0.86** para componentes, estado e interfaz.
- **`react-native-safe-area-context`** para respetar las areas seguras del
  telefono.
- **`expo-status-bar`** para controlar la barra de estado.
- **JSON local** como fuente de las tareas iniciales.

No se usa una API, una base de datos remota ni una libreria de navegacion.

## 7. Instalacion y ejecucion

Requisitos: Node.js instalado y las dependencias del proyecto disponibles. En
la terminal, desde la carpeta del proyecto:

```bash
npm install
npx expo start
```

Cuando Expo muestre el codigo QR, escanealo con Expo Go en el telefono. En
Android, se puede escanear desde Expo Go; en iPhone, se puede usar la camara y
abrir el enlace con Expo Go. Para cerrar el servidor, vuelve a la terminal y
presiona `Ctrl+C`.

## 8. Pruebas manuales sugeridas

1. Confirmar que al iniciar aparecen las tres tareas de ejemplo.
2. Agregar una tarea normal y comprobar que aumentan los pendientes.
3. Intentar agregar un texto vacio y comprobar que aparece el aviso de error.
4. Tocar una tarea y confirmar que cambia entre pendiente y completada, y que
   los contadores se actualizan.
5. Eliminar una tarea y comprobar que desaparece de la lista.
6. Limpiar todas las tareas y confirmar que queda vacia la lista.
7. Escribir `123456`, pulsar agregar y confirmar que cambia el tema sin crear
   una tarea.
8. Volver a escribir `123456` y confirmar que se desactiva el modo secreto.

## 9. Cumplimiento del TP

La siguiente evaluacion se basa en los requisitos y conceptos mencionados en
las instrucciones compartidas. Si la consigna oficial incluye otros puntos,
hay que compararlos tambien antes de afirmar un cumplimiento total.

| Requisito o concepto | Estado | Evidencia / aclaracion |
| --- | --- | --- |
| Componentes separados y estructura por carpetas | Cumple | Datos, componentes y pantalla estan en `data/`, `components/` y `screens/`. |
| Datos en arreglos y objetos | Cumple | Cada tarea tiene `id`, `texto` y `completada`. |
| `useState` | Cumple | Controla tareas, modo secreto y texto del formulario. |
| `TextInput` y eventos de entrada | Cumple | El formulario usa `value`, `onChangeText` y `onSubmitEditing`. |
| Botones y eventos de presion | Cumple | Se usan para agregar, eliminar y limpiar tareas. |
| Funciones y condicionales | Cumple | Se usan para procesar el codigo, validar texto y decidir estilos y acciones. |
| `map()` | Cumple | Se usa para actualizar el estado de cada tarea. |
| `filter()` | Cumple parcialmente | Se usa para eliminar tareas y calcular contadores. No hay un buscador o filtro seleccionable por el usuario. |
| Calculos derivados de los datos | Cumple | Los contadores se calculan desde el estado actual de la lista. |
| Codigo secreto y cambio visual | Cumple | `123456` alterna el tema y no se agrega como tarea. |
| Guardado permanente de cambios | No implementado | El JSON solo aporta datos iniciales. Los cambios viven en memoria y se pierden al cerrar o recargar la app. |

**Conclusion:** la aplicacion cumple las funciones descritas para una lista de
tareas con modo secreto y demuestra el uso de estado, componentes, arreglos,
objetos, funciones, condicionales, `map()` y `filter()`. No tiene persistencia
de datos ni busqueda por texto o categoria. Si cualquiera de esas dos
funcionalidades figura como requisito obligatorio en la consigna oficial, hay
que implementarla para cumplirla completamente.
