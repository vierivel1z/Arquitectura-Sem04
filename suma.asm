.MODEL SMALL
.STACK 100h

.DATA
    msg_inicio    DB "Sumando los numeros de la pila...", 13, 10, "$"
    msg_resultado DB 13, 10, "El resultado es: $"

.CODE
start:
    ; 1. Inicializar Segmento de Datos
    MOV AX, @DATA
    MOV DS, AX

    ; Mostrar mensaje inicio
    MOV DX, OFFSET msg_inicio
    MOV AH, 09h
    INT 21h

    ; 2. Llenar la Pila
    MOV AX, 5
    PUSH AX
    MOV AX, 10
    PUSH AX
    MOV AX, 15
    PUSH AX
    MOV AX, 20
    PUSH AX
    MOV AX, 25
    PUSH AX

    ; 3. Preparar Suma
    MOV AX, 0
    MOV CX, 5

CICLO_SUMA:
    POP BX
    ADD AX, BX
    LOOP CICLO_SUMA

    ; 4. Mostrar Mensaje Resultado
    MOV BX, AX ; Guardar la suma (75 = 004Bh) en BX temporalmente
    
    MOV DX, OFFSET msg_resultado
    MOV AH, 09h
    INT 21h
    
    MOV AX, BX ; Recuperar la suma en AX

    ; 5. Imprimir el numero convirtiendolo a texto usando la pila
    CALL IMPRIMIR_NUMERO

    ; Fin del programa
    MOV AX, 4C00h
    INT 21h

; --- SUBRUTINA: Convertir numero en AX a texto e imprimirlo ---
IMPRIMIR_NUMERO PROC
    MOV CX, 0       ; Contador de digitos
    MOV BX, 10      ; Divisor

DIVIDIR:
    MOV DX, 0
    DIV BX          ; AX = AX / 10, DX = Residuo
    PUSH DX         ; Guardamos el digito en la Pila
    INC CX          ; Contamos +1 digito
    CMP AX, 0       ; Terminamos de dividir?
    JNE DIVIDIR

IMPRIMIR:
    POP DX          ; Sacar digito de la Pila
    ADD DL, 30h     ; Convertir a texto ASCII
    MOV AH, 02h
    INT 21h         ; Imprimir digito
    LOOP IMPRIMIR
    RET
IMPRIMIR_NUMERO ENDP

END start
