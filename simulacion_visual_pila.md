# 🚀 Simulación Visual Paso a Paso: Suma en Ensamblador 8086 usando la Pila

¡Perfecto! Vamos a ver exactamente qué pasa dentro de la computadora (la CPU y la Memoria) mientras se ejecuta el programa `suma.asm`. Imagina que estás viendo el interior del microprocesador trabajando en cámara lenta.

---

## 🛠️ Los Protagonistas (Nuestras "Cajas" de Trabajo)

Antes de empezar, necesitamos conocer a nuestros actores principales:
- **La Pila (Stack):** Imagina que es como un tubo de pelotas de tenis o un apilador de platos. Solo puedes meter algo por arriba (eso es `PUSH`) y solo puedes sacar el de más arriba (eso es `POP`).
- **Registro AX:** Va a ser nuestro "Acumulador" y "Transportador". Al principio lleva los números al tubo, luego se encarga de guardar la **suma total**.
- **Registro BX:** Será nuestro ayudante para sacar los datos de la Pila antes de sumarlos.
- **Registro CX:** Será nuestro "Contador de vueltas".

---

## 🎬 FASE 1: Llenando la Pila (`PUSH`)

El código empieza a enviar los números (5, 10, 15, 20 y 25) a la pila.

**Código ejecutado:**
```assembly
MOV AX, 5
PUSH AX
MOV AX, 10
PUSH AX
... y así hasta el 25
```

**🎥 ¿Qué está pasando visualmente?**
Vamos apilando los números uno encima del otro. El **último en entrar queda hasta arriba**.

```text
       ESTADO DE LA PILA (STACK) AL TERMINAR LA FASE 1
       ===============================================
       
                                   ⬇️ (Tope actual de la pila / SP)
    [ 25 ]  <-- ¡Último en entrar! 
    -------
    [ 20 ]
    -------
    [ 15 ]
    -------
    [ 10 ]
    -------
    [  5 ]  <-- ¡Primero en entrar! (Quedó en el fondo)
    -------
```

---

## 🎬 FASE 2: Preparando todo para sumar

Antes de sumar, debemos asegurarnos de que la caja de la suma total (AX) esté vacía, y decirle al contador de vueltas (CX) cuántos números vamos a sumar.

**Código ejecutado:**
```assembly
MOV AX, 0    ; Ponemos el acumulador en CERO
MOV CX, 5    ; Vamos a dar 5 vueltas (porque hay 5 números)
```

**🎥 Estado de los Registros:**
> **AX** = `0` (Suma actual: cero)
> **CX** = `5` (Vueltas faltantes: cinco)

---

## 🎬 FASE 3: El Ciclo de Sumar (Extrayendo con `POP`)

Ahora entraremos en el bloque `CICLO:`. Por cada vuelta, sacamos el número de más arriba en la pila (`POP BX`), lo sumamos a `AX`, y restamos 1 a `CX` (`LOOP`).

### 🔄 VUELTA 1
Sacamos el primer número de arriba (que es `25`) y se lo damos a **BX**. Luego AX = AX + BX.

```text
    PILA ACTUAL         ACCIONES:
    [ 25 ]   =======>   POP BX   ➡️  BX ahora vale 25
    [ 20 ]              ADD AX, BX ➡️  AX = 0 + 25 = 25
    [ 15 ]              
    [ 10 ]              
    [  5 ]              (Quedan 4 vueltas) => CX ahora es 4
```

### 🔄 VUELTA 2
La pila bajó un nivel. El número de arriba ahora es `20`.

```text
    PILA ACTUAL         ACCIONES:
    [ 20 ]   =======>   POP BX   ➡️  BX ahora vale 20
    [ 15 ]              ADD AX, BX ➡️  AX = 25 + 20 = 45
    [ 10 ]              
    [  5 ]              (Quedan 3 vueltas) => CX ahora es 3
```

### 🔄 VUELTA 3
El número de arriba ahora es `15`.

```text
    PILA ACTUAL         ACCIONES:
    [ 15 ]   =======>   POP BX   ➡️  BX ahora vale 15
    [ 10 ]              ADD AX, BX ➡️  AX = 45 + 15 = 60
    [  5 ]              
                        (Quedan 2 vueltas) => CX ahora es 2
```

### 🔄 VUELTA 4
El número de arriba ahora es `10`.

```text
    PILA ACTUAL         ACCIONES:
    [ 10 ]   =======>   POP BX   ➡️  BX ahora vale 10
    [  5 ]              ADD AX, BX ➡️  AX = 60 + 10 = 70
    
                        (Queda 1 vuelta) => CX ahora es 1
```

### 🔄 VUELTA 5 (¡Última vuelta!)
El último número en el fondo era el `5`. ¡Lo sacamos y la pila queda vacía!

```text
    PILA ACTUAL         ACCIONES:
    [  5 ]   =======>   POP BX   ➡️  BX ahora vale 5
    (Vacía)             ADD AX, BX ➡️  AX = 70 + 5 = 75
    
                        (Quedan 0 vueltas) => CX ahora es 0. ¡EL CICLO TERMINA!
```

---

## 🏆 RESULTADO FINAL

* **Pila:** ¡Completamente vacía de nuevo!
* **Registro AX (Resultado):** `75`  (Que en número hexadecimal dentro del emulador se verá como **`004B`**)
* **Registro CX:** `0` (Porque ya dio todas las vueltas)

¡Y así es exactamente como el procesador 8086 entiende y opera los datos pieza por pieza!
