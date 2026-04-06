# Presentación: Suma de Números usando la Pila (Stack) en Ensamblador 8086

Esta guía está diseñada para que un grupo de **5 personas** presente de forma clara, profesional y técnica un programa en lenguaje ensamblador utilizando el emulador **EMU8086**.

He modificado el código original (`suma.asm`) para que sea "completo", agregando Segmentos de Memoria (Código, Datos y Pila) y una interrupción de salida limpia, lo que demuestra un mayor dominio de la Arquitectura de Computadoras.

---

## 👥 Guía para los 5 Expositores

Dividan los roles y los tiempos de exposición de la siguiente manera:

### 🎤 Expositor 1: Introducción y Estructura del Programa (Segmentos)
* **Objetivo:** Explicar qué hace el programa y cómo está estructurado en memoria.
* **Qué decir:** 
  > "Buenos días, presentaremos un programa en lenguaje Ensamblador 8086 que suma una serie de 5 números utilizando la Pila (Stack). Para que el programa sea un ejecutable completo (.EXE) y tenga buenas prácticas, hemos declarado la memoria en tres Segmentos principales:
  > 1. **Segmento de Pila (STACK):** Reserva 256 bytes para alojar temporalmente los números.
  > 2. **Segmento de Datos (DATA):** Almacena un mensaje de texto para confirmar la finalización del programa.
  > 3. **Segmento de Código (CODE):** Contiene las instrucciones que el procesador 8086 va a ejecutar, comenzando por inicializar el segmento de datos (`MOV AX, DATA`...)."

/. 




### 🎤 Expositor 2: Fase 1 - Ingreso de Datos a la Pila (`PUSH`)
* **Objetivo:** Explicar la directiva `PUSH` y cómo los valores entran a la Pila.
* **Qué decir:** 
  > "En la primera fase del procesamiento, debemos almacenar los 5 valores que vamos a sumar (5, 10, 15, 20 y 25). Para llevar esto a cabo, el procesador no puede mover números directamente a la pila, se apoya del registro `AX`.
  > Primero movemos el número a `AX` (`MOV AX, 5`) y luego usamos la instrucción `PUSH AX`.
  > La Pila funciona bajo el principio **LIFO** (Last In, First Out - Último en entrar, Primero en salir). Esto significa que el número 25, que es el último en entrar, quedará en la parte más superior de la pila."

### 🎤 Expositor 3: Fase 2 - Preparación de Registros Acumulador y Contador
* **Objetivo:** Explicar para qué sirven los registros `AX` y `CX` en esta parte clave.
* **Qué decir:** 
  > "Una vez que todos los datos están en el Stack, preparamos nuestros registros para empezar a sumar. 
  > Primero, limpiamos el registro `AX` dándole un valor de 0 (`MOV AX, 0`), ya que lo utilizaremos como nuestro **Acumulador** general de la suma.
  > Luego, cargamos el registro `CX` con un 5 (`MOV CX, 5`), que actuará como nuestro **Contador**. En los procesadores 8086, el registro CX es fundamental porque la instrucción de bucle (`LOOP`) lo utiliza automáticamente para saber cuántas veces debe repetir un ciclo."

### 🎤 Expositor 4: Fase 3 - El Ciclo de Extracción y Suma (`POP` y `ADD`)
* **Objetivo:** El núcleo funcional del programa. Explicar cómo ocurre la suma repetitiva.
* **Qué decir:** 
  > "Entramos a la parte más importante: la etiqueta `CICLO:`. Aquí usamos un bucle iterativo que ocurre 5 veces.
  > 1. Con `POP BX`, la computadora saca el valor que está más arriba en la pila (empezando por el 25) y lo guarda en el registro `BX`.
  > 2. Una vez que tenemos el número, usamos `ADD AX, BX` para sumarle al acumulador lo que sacamos de la pila.
  > 3. Al llegar a `LOOP CICLO`, el procesador le resta 1 al contador `CX` (ahora vale 4). Como no ha llegado a cero, regresa al inicio de `CICLO:` hasta vaciar los 5 números y terminar la suma."

### 🎤 Expositor 5: Fase 4 - Simulación en EMU8086 y Finalización
* **Objetivo:** Mostrar los resultados en el emulador, hablar del cierre limpio del programa.
* **Qué decir:** 
  > "Para finalizar, no dejamos colgado al procesador en un bucle o detenemos el reloj bruscamente. En su lugar, usamos las **Interrupciones de DOS (`INT 21h`)**.
  > Pedimos al SO mostrar el mensaje final guardado en el segmento DATA. Y usando la función `4C00h`, le devolvemos el control completo del sistema a la computadora. 
  > Como podemos ver en EMU8086, el registro **AX** contiene ahora nuestro resultado, el número 75 (que en el registro se verá como su equivalente Hexadecimal: **004B**)."

---

## 🖥️ Simulación Visual del Proceso (Paso a Paso)

Esta es la simulación que deben observar cuando le den click a **"Single Step" (Ejecución Paso a Paso)** dentro del emulador **Emu8086**.

> **Tip para la exposición:** Durante la presentación, proyecten el emulador. Pulsen el botón **"Emulate"** y luego avancen usando la tecla **F8 (Single Step)**. Pídanle a su audiencia que se fije en los registros mencionados a continuación.

### 1. Estado al terminar los `PUSH`
Hemos guardado el 5, 10, 15, 20 y 25. El Pila (Stack) quedó así:
```text
  [25] <-- Último ingresado, será el primero en salir (LIFO)
  [20]
  [15]
  [10]
  [ 5]
```

### 2. Tras limpiar y preparar (Antes de entrar al ciclo)
| Registro | Valor (Decimal) | Valor (Hexadecimal) | Uso |
| :--- | :--- | :--- | :--- |
| **AX** | 0 | `0000` | Listo para acumular la suma |
| **CX** | 5 | `0005` | Contador del bucle (LOOP) |

### 3. Ejecución iterativa de `CICLO:`
A medida que oprimen *Single Step*, demuestren cómo cambian los valores:

**Vuelta 1:**
- `POP BX` -> BX se vuelve 25.
- `ADD AX, BX` -> AX = 0 + 25 -> AX = 25 (`0019` Hex).
- `LOOP` -> CX pasa a 4.

**Vuelta 2:**
- `POP BX` -> BX se vuelve 20.
- `ADD AX, BX` -> AX = 25 + 20 -> AX = 45 (`002D` Hex).
- `LOOP` -> CX pasa a 3.

**Vuelta 3:**
- `POP BX` -> BX se vuelve 15.
- `ADD AX, BX` -> AX = 45 + 15 -> AX = 60 (`003C` Hex).
- `LOOP` -> CX pasa a 2.

**Vuelta 4:**
- `POP BX` -> BX se vuelve 10.
- `ADD AX, BX` -> AX = 60 + 10 -> AX = 70 (`0046` Hex).
- `LOOP` -> CX pasa a 1.

**Vuelta 5:**
- `POP BX` -> BX se vuelve 5.
- `ADD AX, BX` -> AX = 70 + 5 -> **AX = 75 (`004B` Hex)**.
- `LOOP` -> CX pasa a 0. Termina el ciclo de repetición.

### 4. Fin de programa
Al finalizar todo y ejecutarse el cierre, si el público les pregunta: "¿Dónde está la suma final?", simplemente señalen en EMU8086 el registro **AX**. \nDeberá decir `004B`. El número `4B` en el sistema Hexadecimal equivale exactamente a `75` en Decimal.
