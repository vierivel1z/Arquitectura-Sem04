.MODEL SMALL
.STACK 100h

.DATA
    msg_inicio    DB "Restando numeros de la pila...", 13, 10, "$"
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

    ; 2. Llenar la Pila con los sustraendos
    MOV AX, 10
    PUSH AX
    MOV AX, 20
    PUSH AX
    MOV AX, 15
    PUSH AX

    ; 3. Preparar Resta (Minuendo = 100)
    MOV AX, 100
    MOV CX, 3

CICLO_RESTA:
    POP BX
    SUB AX, BX
    LOOP CICLO_RESTA

    ; 4. Mostrar Mensaje Resultado
    MOV BX, AX
    
    MOV DX, OFFSET msg_resultado
    MOV AH, 09h
    INT 21h
    
    MOV AX, BX

    ; 5. Imprimir el numero
    CALL IMPRIMIR_NUMERO

    ; Fin del programa
    MOV AX, 4C00h
    INT 21h

; --- SUBRUTINA: Convertir numero en AX a texto e imprimirlo ---
IMPRIMIR_NUMERO PROC
    MOV CX, 0
    MOV BX, 10

DIVIDIR:
    MOV DX, 0
    DIV BX
    PUSH DX
    INC CX
    CMP AX, 0
    JNE DIVIDIR

IMPRIMIR:
    POP DX
    ADD DL, 30h
    MOV AH, 02h
    INT 21h
    LOOP IMPRIMIR
    RET
IMPRIMIR_NUMERO ENDP

END start
