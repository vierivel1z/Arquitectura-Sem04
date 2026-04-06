// ============================================================
// SIMULADOR 8086 - 4 OPERACIONES ARITMÉTICAS
// ============================================================

const operations = {
    // ===================== SUMA =====================
    suma: {
        title: 'Suma (ADD)',
        consoleExe: 'run_suma.exe',
        codeLines: [
            '<span class="comment">; INICIALIZANDO VARIABLES</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">5</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">10</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">15</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">20</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">25</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="comment">; PREPARAR SUMA</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">0</span>',
            '<span class="instruction">MOV</span> <span class="register">CX</span>, <span class="number">5</span>',
            '<span class="label">CICLO:</span>',
            '<span class="instruction">POP</span> <span class="register">BX</span>',
            '<span class="instruction">ADD</span> <span class="register">AX</span>, <span class="register">BX</span>',
            '<span class="instruction">LOOP</span> <span class="label">CICLO</span>',
            '<span class="comment">; RESULTADO A CONSOLA</span>',
            '<span class="instruction">CALL</span> <span class="label">IMPRIMIR_NUM</span>',
            '<span class="instruction">HLT</span>'
        ],
        steps: [
            { codeLine: null, desc: '¡Bienvenido! Este programa <strong>suma</strong> 5 números (5+10+15+20+25) usando la Pila. Clic en <strong>Siguiente</strong>.', registers: {AX:0,BX:0,CX:0,DX:0}, stack: [] },
            { codeLine: 1, desc: '<code>MOV AX, 5</code>: Asignamos 5 a AX.', registers: {AX:5,BX:0,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'AX'} },
            { codeLine: 2, desc: '<code>PUSH AX</code>: Enviamos 5 a la Pila.', registers: {AX:5,BX:0,CX:0,DX:0}, stack: [5], anim: {type:'push',val:5} },
            { codeLine: 3, desc: '<code>MOV AX, 10</code>: Sobrescribimos AX con 10.', registers: {AX:10,BX:0,CX:0,DX:0}, stack: [5], anim: {type:'reg',target:'AX'} },
            { codeLine: 4, desc: '<code>PUSH AX</code>: Empujamos 10 encima del 5.', registers: {AX:10,BX:0,CX:0,DX:0}, stack: [5,10], anim: {type:'push',val:10} },
            { codeLine: 5, desc: '<code>MOV AX, 15</code>: Asignamos 15.', registers: {AX:15,BX:0,CX:0,DX:0}, stack: [5,10], anim: {type:'reg',target:'AX'} },
            { codeLine: 6, desc: '<code>PUSH AX</code>: Empujamos 15.', registers: {AX:15,BX:0,CX:0,DX:0}, stack: [5,10,15], anim: {type:'push',val:15} },
            { codeLine: 7, desc: '<code>MOV AX, 20</code>: Asignamos 20.', registers: {AX:20,BX:0,CX:0,DX:0}, stack: [5,10,15], anim: {type:'reg',target:'AX'} },
            { codeLine: 8, desc: '<code>PUSH AX</code>: Empujamos 20.', registers: {AX:20,BX:0,CX:0,DX:0}, stack: [5,10,15,20], anim: {type:'push',val:20} },
            { codeLine: 9, desc: '<code>MOV AX, 25</code>: Asignamos 25.', registers: {AX:25,BX:0,CX:0,DX:0}, stack: [5,10,15,20], anim: {type:'reg',target:'AX'} },
            { codeLine: 10, desc: '<code>PUSH AX</code>: Empujamos 25. ¡Es el <strong>tope</strong>!', registers: {AX:25,BX:0,CX:0,DX:0}, stack: [5,10,15,20,25], anim: {type:'push',val:25} },
            { codeLine: 12, desc: '<code>MOV AX, 0</code>: Limpiamos AX (acumulador).', registers: {AX:0,BX:0,CX:0,DX:0}, stack: [5,10,15,20,25], anim: {type:'reg',target:'AX'} },
            { codeLine: 13, desc: '<code>MOV CX, 5</code>: Contador = 5 vueltas.', registers: {AX:0,BX:0,CX:5,DX:0}, stack: [5,10,15,20,25], anim: {type:'reg',target:'CX'} },
            // VUELTA 1
            { codeLine: 15, desc: '<strong>VUELTA 1:</strong> <code>POP BX</code>: Sacamos tope (25) → BX.', registers: {AX:0,BX:25,CX:5,DX:0}, stack: [5,10,15,20], highlightType:'active-pop', anim: {type:'pop',val:25,fromIdx:4,toReg:'BX'} },
            { codeLine: 16, desc: '<strong>VUELTA 1:</strong> <code>ADD AX, BX</code>: 0 + 25 = <strong>25</strong>.', registers: {AX:25,BX:25,CX:5,DX:0}, stack: [5,10,15,20], highlightType:'active-add', anim: {type:'math',target:'AX'} },
            { codeLine: 17, desc: '<strong>VUELTA 1:</strong> <code>LOOP</code>: CX = 4. Repetimos.', registers: {AX:25,BX:25,CX:4,DX:0}, stack: [5,10,15,20], anim: {type:'reg',target:'CX'} },
            // VUELTA 2
            { codeLine: 15, desc: '<strong>VUELTA 2:</strong> <code>POP BX</code>: Sacamos 20 → BX.', registers: {AX:25,BX:20,CX:4,DX:0}, stack: [5,10,15], highlightType:'active-pop', anim: {type:'pop',val:20,fromIdx:3,toReg:'BX'} },
            { codeLine: 16, desc: '<strong>VUELTA 2:</strong> <code>ADD AX, BX</code>: 25 + 20 = <strong>45</strong>.', registers: {AX:45,BX:20,CX:4,DX:0}, stack: [5,10,15], highlightType:'active-add', anim: {type:'math',target:'AX'} },
            { codeLine: 17, desc: '<strong>VUELTA 2:</strong> <code>LOOP</code>: CX = 3.', registers: {AX:45,BX:20,CX:3,DX:0}, stack: [5,10,15], anim: {type:'reg',target:'CX'} },
            // VUELTA 3
            { codeLine: 15, desc: '<strong>VUELTA 3:</strong> <code>POP BX</code>: Sacamos 15 → BX.', registers: {AX:45,BX:15,CX:3,DX:0}, stack: [5,10], highlightType:'active-pop', anim: {type:'pop',val:15,fromIdx:2,toReg:'BX'} },
            { codeLine: 16, desc: '<strong>VUELTA 3:</strong> <code>ADD AX, BX</code>: 45 + 15 = <strong>60</strong>.', registers: {AX:60,BX:15,CX:3,DX:0}, stack: [5,10], highlightType:'active-add', anim: {type:'math',target:'AX'} },
            { codeLine: 17, desc: '<strong>VUELTA 3:</strong> <code>LOOP</code>: CX = 2.', registers: {AX:60,BX:15,CX:2,DX:0}, stack: [5,10], anim: {type:'reg',target:'CX'} },
            // VUELTA 4
            { codeLine: 15, desc: '<strong>VUELTA 4:</strong> <code>POP BX</code>: Sacamos 10 → BX.', registers: {AX:60,BX:10,CX:2,DX:0}, stack: [5], highlightType:'active-pop', anim: {type:'pop',val:10,fromIdx:1,toReg:'BX'} },
            { codeLine: 16, desc: '<strong>VUELTA 4:</strong> <code>ADD AX, BX</code>: 60 + 10 = <strong>70</strong>.', registers: {AX:70,BX:10,CX:2,DX:0}, stack: [5], highlightType:'active-add', anim: {type:'math',target:'AX'} },
            { codeLine: 17, desc: '<strong>VUELTA 4:</strong> <code>LOOP</code>: CX = 1.', registers: {AX:70,BX:10,CX:1,DX:0}, stack: [5], anim: {type:'reg',target:'CX'} },
            // VUELTA 5
            { codeLine: 15, desc: '<strong>VUELTA 5:</strong> <code>POP BX</code>: Sacamos el último (5). ¡Pila vacía!', registers: {AX:70,BX:5,CX:1,DX:0}, stack: [], highlightType:'active-pop', anim: {type:'pop',val:5,fromIdx:0,toReg:'BX'} },
            { codeLine: 16, desc: '<strong>VUELTA 5:</strong> <code>ADD AX, BX</code>: 70 + 5 = <strong>75</strong>. ¡Resultado!', registers: {AX:75,BX:5,CX:1,DX:0}, stack: [], highlightType:'active-add', anim: {type:'math',target:'AX'} },
            { codeLine: 17, desc: '<strong>VUELTA 5:</strong> <code>LOOP</code>: CX = 0. ¡Fin del ciclo!', registers: {AX:75,BX:5,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'CX'} },
            { codeLine: 19, desc: '<code>CALL IMPRIMIR_NUM</code>: Imprimimos en consola MS-DOS.', registers: {AX:75,BX:5,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_suma.exe<br>Sumando numeros de la pila...<br>El resultado es: <span style='color:#FCD34D'>75</span>_" },
            { codeLine: 20, desc: '<code>HLT</code>: Fin. <strong>5+10+15+20+25 = 75</strong> ✅', registers: {AX:75,BX:5,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_suma.exe<br>Sumando numeros de la pila...<br>El resultado es: <span style='color:#FCD34D'>75</span><br>C:\\> _" }
        ]
    },

    // ===================== RESTA =====================
    resta: {
        title: 'Resta (SUB)',
        consoleExe: 'run_resta.exe',
        codeLines: [
            '<span class="comment">; INICIALIZANDO VARIABLES</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">10</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">20</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">15</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="comment">; PREPARAR RESTA (Minuendo=100)</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">100</span>',
            '<span class="instruction">MOV</span> <span class="register">CX</span>, <span class="number">3</span>',
            '<span class="label">CICLO:</span>',
            '<span class="instruction">POP</span> <span class="register">BX</span>',
            '<span class="instruction">SUB</span> <span class="register">AX</span>, <span class="register">BX</span>',
            '<span class="instruction">LOOP</span> <span class="label">CICLO</span>',
            '<span class="comment">; RESULTADO A CONSOLA</span>',
            '<span class="instruction">CALL</span> <span class="label">IMPRIMIR_NUM</span>',
            '<span class="instruction">HLT</span>'
        ],
        steps: [
            { codeLine: null, desc: '¡Bienvenido! Este programa <strong>resta</strong>: 100 − 15 − 20 − 10 usando la Pila. Clic en <strong>Siguiente</strong>.', registers: {AX:0,BX:0,CX:0,DX:0}, stack: [] },
            { codeLine: 1, desc: '<code>MOV AX, 10</code>: Asignamos 10 a AX.', registers: {AX:10,BX:0,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'AX'} },
            { codeLine: 2, desc: '<code>PUSH AX</code>: Enviamos 10 a la Pila.', registers: {AX:10,BX:0,CX:0,DX:0}, stack: [10], anim: {type:'push',val:10} },
            { codeLine: 3, desc: '<code>MOV AX, 20</code>: Asignamos 20 a AX.', registers: {AX:20,BX:0,CX:0,DX:0}, stack: [10], anim: {type:'reg',target:'AX'} },
            { codeLine: 4, desc: '<code>PUSH AX</code>: Empujamos 20 encima.', registers: {AX:20,BX:0,CX:0,DX:0}, stack: [10,20], anim: {type:'push',val:20} },
            { codeLine: 5, desc: '<code>MOV AX, 15</code>: Asignamos 15 a AX.', registers: {AX:15,BX:0,CX:0,DX:0}, stack: [10,20], anim: {type:'reg',target:'AX'} },
            { codeLine: 6, desc: '<code>PUSH AX</code>: Empujamos 15. ¡Tope de la pila!', registers: {AX:15,BX:0,CX:0,DX:0}, stack: [10,20,15], anim: {type:'push',val:15} },
            { codeLine: 8, desc: '<code>MOV AX, 100</code>: Cargamos el minuendo <strong>100</strong>. Le restaremos los valores de la pila.', registers: {AX:100,BX:0,CX:0,DX:0}, stack: [10,20,15], anim: {type:'reg',target:'AX'} },
            { codeLine: 9, desc: '<code>MOV CX, 3</code>: Contador = 3 vueltas.', registers: {AX:100,BX:0,CX:3,DX:0}, stack: [10,20,15], anim: {type:'reg',target:'CX'} },
            // VUELTA 1
            { codeLine: 11, desc: '<strong>VUELTA 1:</strong> <code>POP BX</code>: Sacamos tope (15) → BX.', registers: {AX:100,BX:15,CX:3,DX:0}, stack: [10,20], highlightType:'active-pop', anim: {type:'pop',val:15,fromIdx:2,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 1:</strong> <code>SUB AX, BX</code>: 100 − 15 = <strong>85</strong>.', registers: {AX:85,BX:15,CX:3,DX:0}, stack: [10,20], highlightType:'active-sub', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 1:</strong> <code>LOOP</code>: CX = 2. Repetimos.', registers: {AX:85,BX:15,CX:2,DX:0}, stack: [10,20], anim: {type:'reg',target:'CX'} },
            // VUELTA 2
            { codeLine: 11, desc: '<strong>VUELTA 2:</strong> <code>POP BX</code>: Sacamos 20 → BX.', registers: {AX:85,BX:20,CX:2,DX:0}, stack: [10], highlightType:'active-pop', anim: {type:'pop',val:20,fromIdx:1,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 2:</strong> <code>SUB AX, BX</code>: 85 − 20 = <strong>65</strong>.', registers: {AX:65,BX:20,CX:2,DX:0}, stack: [10], highlightType:'active-sub', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 2:</strong> <code>LOOP</code>: CX = 1.', registers: {AX:65,BX:20,CX:1,DX:0}, stack: [10], anim: {type:'reg',target:'CX'} },
            // VUELTA 3
            { codeLine: 11, desc: '<strong>VUELTA 3:</strong> <code>POP BX</code>: Sacamos último (10). ¡Pila vacía!', registers: {AX:65,BX:10,CX:1,DX:0}, stack: [], highlightType:'active-pop', anim: {type:'pop',val:10,fromIdx:0,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 3:</strong> <code>SUB AX, BX</code>: 65 − 10 = <strong>55</strong>. ¡Resultado!', registers: {AX:55,BX:10,CX:1,DX:0}, stack: [], highlightType:'active-sub', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 3:</strong> <code>LOOP</code>: CX = 0. ¡Fin del ciclo!', registers: {AX:55,BX:10,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'CX'} },
            { codeLine: 15, desc: '<code>CALL IMPRIMIR_NUM</code>: Imprimimos 55 en consola.', registers: {AX:55,BX:10,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_resta.exe<br>Restando numeros de la pila...<br>El resultado es: <span style='color:#FB923C'>55</span>_" },
            { codeLine: 16, desc: '<code>HLT</code>: Fin. <strong>100 − 15 − 20 − 10 = 55</strong> ✅', registers: {AX:55,BX:10,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_resta.exe<br>Restando numeros de la pila...<br>El resultado es: <span style='color:#FB923C'>55</span><br>C:\\> _" }
        ]
    },

    // ===================== MULTIPLICACIÓN =====================
    multiplicacion: {
        title: 'Multiplicación (MUL)',
        consoleExe: 'run_mult.exe',
        codeLines: [
            '<span class="comment">; INICIALIZANDO VARIABLES</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">3</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">4</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">5</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="comment">; PREPARAR MULTIPLICACIÓN</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">1</span>',
            '<span class="instruction">MOV</span> <span class="register">CX</span>, <span class="number">3</span>',
            '<span class="label">CICLO:</span>',
            '<span class="instruction">POP</span> <span class="register">BX</span>',
            '<span class="instruction">MUL</span> <span class="register">BX</span>',
            '<span class="instruction">LOOP</span> <span class="label">CICLO</span>',
            '<span class="comment">; RESULTADO A CONSOLA</span>',
            '<span class="instruction">CALL</span> <span class="label">IMPRIMIR_NUM</span>',
            '<span class="instruction">HLT</span>'
        ],
        steps: [
            { codeLine: null, desc: '¡Bienvenido! Este programa <strong>multiplica</strong>: 5 × 4 × 3 usando la Pila. Clic en <strong>Siguiente</strong>.', registers: {AX:0,BX:0,CX:0,DX:0}, stack: [] },
            { codeLine: 1, desc: '<code>MOV AX, 3</code>: Asignamos 3 a AX.', registers: {AX:3,BX:0,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'AX'} },
            { codeLine: 2, desc: '<code>PUSH AX</code>: Enviamos 3 a la Pila.', registers: {AX:3,BX:0,CX:0,DX:0}, stack: [3], anim: {type:'push',val:3} },
            { codeLine: 3, desc: '<code>MOV AX, 4</code>: Asignamos 4 a AX.', registers: {AX:4,BX:0,CX:0,DX:0}, stack: [3], anim: {type:'reg',target:'AX'} },
            { codeLine: 4, desc: '<code>PUSH AX</code>: Empujamos 4 encima.', registers: {AX:4,BX:0,CX:0,DX:0}, stack: [3,4], anim: {type:'push',val:4} },
            { codeLine: 5, desc: '<code>MOV AX, 5</code>: Asignamos 5 a AX.', registers: {AX:5,BX:0,CX:0,DX:0}, stack: [3,4], anim: {type:'reg',target:'AX'} },
            { codeLine: 6, desc: '<code>PUSH AX</code>: Empujamos 5. ¡Tope de la pila!', registers: {AX:5,BX:0,CX:0,DX:0}, stack: [3,4,5], anim: {type:'push',val:5} },
            { codeLine: 8, desc: '<code>MOV AX, 1</code>: Cargamos <strong>1</strong> (identidad multiplicativa). AX acumulará el producto.', registers: {AX:1,BX:0,CX:0,DX:0}, stack: [3,4,5], anim: {type:'reg',target:'AX'} },
            { codeLine: 9, desc: '<code>MOV CX, 3</code>: Contador = 3 vueltas.', registers: {AX:1,BX:0,CX:3,DX:0}, stack: [3,4,5], anim: {type:'reg',target:'CX'} },
            // VUELTA 1
            { codeLine: 11, desc: '<strong>VUELTA 1:</strong> <code>POP BX</code>: Sacamos tope (5) → BX.', registers: {AX:1,BX:5,CX:3,DX:0}, stack: [3,4], highlightType:'active-pop', anim: {type:'pop',val:5,fromIdx:2,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 1:</strong> <code>MUL BX</code>: DX:AX = 1 × 5 = <strong>5</strong>. (DX=0, AX=5)', registers: {AX:5,BX:5,CX:3,DX:0}, stack: [3,4], highlightType:'active-mul', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 1:</strong> <code>LOOP</code>: CX = 2. Repetimos.', registers: {AX:5,BX:5,CX:2,DX:0}, stack: [3,4], anim: {type:'reg',target:'CX'} },
            // VUELTA 2
            { codeLine: 11, desc: '<strong>VUELTA 2:</strong> <code>POP BX</code>: Sacamos 4 → BX.', registers: {AX:5,BX:4,CX:2,DX:0}, stack: [3], highlightType:'active-pop', anim: {type:'pop',val:4,fromIdx:1,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 2:</strong> <code>MUL BX</code>: DX:AX = 5 × 4 = <strong>20</strong>. (DX=0, AX=20)', registers: {AX:20,BX:4,CX:2,DX:0}, stack: [3], highlightType:'active-mul', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 2:</strong> <code>LOOP</code>: CX = 1.', registers: {AX:20,BX:4,CX:1,DX:0}, stack: [3], anim: {type:'reg',target:'CX'} },
            // VUELTA 3
            { codeLine: 11, desc: '<strong>VUELTA 3:</strong> <code>POP BX</code>: Sacamos último (3). ¡Pila vacía!', registers: {AX:20,BX:3,CX:1,DX:0}, stack: [], highlightType:'active-pop', anim: {type:'pop',val:3,fromIdx:0,toReg:'BX'} },
            { codeLine: 12, desc: '<strong>VUELTA 3:</strong> <code>MUL BX</code>: DX:AX = 20 × 3 = <strong>60</strong>. ¡Resultado!', registers: {AX:60,BX:3,CX:1,DX:0}, stack: [], highlightType:'active-mul', anim: {type:'math',target:'AX'} },
            { codeLine: 13, desc: '<strong>VUELTA 3:</strong> <code>LOOP</code>: CX = 0. ¡Fin del ciclo!', registers: {AX:60,BX:3,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'CX'} },
            { codeLine: 15, desc: '<code>CALL IMPRIMIR_NUM</code>: Imprimimos 60 en consola.', registers: {AX:60,BX:3,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_mult.exe<br>Multiplicando numeros de la pila...<br>El resultado es: <span style='color:#A78BFA'>60</span>_" },
            { codeLine: 16, desc: '<code>HLT</code>: Fin. <strong>5 × 4 × 3 = 60</strong> ✅', registers: {AX:60,BX:3,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_mult.exe<br>Multiplicando numeros de la pila...<br>El resultado es: <span style='color:#A78BFA'>60</span><br>C:\\> _" }
        ]
    },

    // ===================== DIVISIÓN =====================
    division: {
        title: 'División (DIV)',
        consoleExe: 'run_div.exe',
        codeLines: [
            '<span class="comment">; INICIALIZANDO VARIABLES</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">2</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">3</span>',
            '<span class="instruction">PUSH</span> <span class="register">AX</span>',
            '<span class="comment">; PREPARAR DIVISIÓN (Dividendo=120)</span>',
            '<span class="instruction">MOV</span> <span class="register">AX</span>, <span class="number">120</span>',
            '<span class="instruction">MOV</span> <span class="register">CX</span>, <span class="number">2</span>',
            '<span class="label">CICLO:</span>',
            '<span class="instruction">POP</span> <span class="register">BX</span>',
            '<span class="instruction">MOV</span> <span class="register">DX</span>, <span class="number">0</span>',
            '<span class="instruction">DIV</span> <span class="register">BX</span>',
            '<span class="instruction">LOOP</span> <span class="label">CICLO</span>',
            '<span class="comment">; RESULTADO A CONSOLA</span>',
            '<span class="instruction">CALL</span> <span class="label">IMPRIMIR_NUM</span>',
            '<span class="instruction">HLT</span>'
        ],
        steps: [
            { codeLine: null, desc: '¡Bienvenido! Este programa <strong>divide</strong>: 120 ÷ 3 ÷ 2 usando la Pila. Clic en <strong>Siguiente</strong>.', registers: {AX:0,BX:0,CX:0,DX:0}, stack: [] },
            { codeLine: 1, desc: '<code>MOV AX, 2</code>: Asignamos 2 a AX.', registers: {AX:2,BX:0,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'AX'} },
            { codeLine: 2, desc: '<code>PUSH AX</code>: Enviamos 2 a la Pila.', registers: {AX:2,BX:0,CX:0,DX:0}, stack: [2], anim: {type:'push',val:2} },
            { codeLine: 3, desc: '<code>MOV AX, 3</code>: Asignamos 3 a AX.', registers: {AX:3,BX:0,CX:0,DX:0}, stack: [2], anim: {type:'reg',target:'AX'} },
            { codeLine: 4, desc: '<code>PUSH AX</code>: Empujamos 3 encima. ¡Tope de la pila!', registers: {AX:3,BX:0,CX:0,DX:0}, stack: [2,3], anim: {type:'push',val:3} },
            { codeLine: 6, desc: '<code>MOV AX, 120</code>: Cargamos el dividendo <strong>120</strong> en AX.', registers: {AX:120,BX:0,CX:0,DX:0}, stack: [2,3], anim: {type:'reg',target:'AX'} },
            { codeLine: 7, desc: '<code>MOV CX, 2</code>: Contador = 2 vueltas.', registers: {AX:120,BX:0,CX:2,DX:0}, stack: [2,3], anim: {type:'reg',target:'CX'} },
            // VUELTA 1
            { codeLine: 9, desc: '<strong>VUELTA 1:</strong> <code>POP BX</code>: Sacamos tope (3) → BX.', registers: {AX:120,BX:3,CX:2,DX:0}, stack: [2], highlightType:'active-pop', anim: {type:'pop',val:3,fromIdx:1,toReg:'BX'} },
            { codeLine: 10, desc: '<strong>VUELTA 1:</strong> <code>MOV DX, 0</code>: Limpiamos DX (necesario para DIV).', registers: {AX:120,BX:3,CX:2,DX:0}, stack: [2], anim: {type:'reg',target:'DX'} },
            { codeLine: 11, desc: '<strong>VUELTA 1:</strong> <code>DIV BX</code>: 120 ÷ 3 = <strong>40</strong> (cociente→AX), residuo 0→DX.', registers: {AX:40,BX:3,CX:2,DX:0}, stack: [2], highlightType:'active-div', anim: {type:'math',target:'AX'} },
            { codeLine: 12, desc: '<strong>VUELTA 1:</strong> <code>LOOP</code>: CX = 1. Repetimos.', registers: {AX:40,BX:3,CX:1,DX:0}, stack: [2], anim: {type:'reg',target:'CX'} },
            // VUELTA 2
            { codeLine: 9, desc: '<strong>VUELTA 2:</strong> <code>POP BX</code>: Sacamos último (2). ¡Pila vacía!', registers: {AX:40,BX:2,CX:1,DX:0}, stack: [], highlightType:'active-pop', anim: {type:'pop',val:2,fromIdx:0,toReg:'BX'} },
            { codeLine: 10, desc: '<strong>VUELTA 2:</strong> <code>MOV DX, 0</code>: Limpiamos DX.', registers: {AX:40,BX:2,CX:1,DX:0}, stack: [], anim: {type:'reg',target:'DX'} },
            { codeLine: 11, desc: '<strong>VUELTA 2:</strong> <code>DIV BX</code>: 40 ÷ 2 = <strong>20</strong>. ¡Resultado!', registers: {AX:20,BX:2,CX:1,DX:0}, stack: [], highlightType:'active-div', anim: {type:'math',target:'AX'} },
            { codeLine: 12, desc: '<strong>VUELTA 2:</strong> <code>LOOP</code>: CX = 0. ¡Fin del ciclo!', registers: {AX:20,BX:2,CX:0,DX:0}, stack: [], anim: {type:'reg',target:'CX'} },
            { codeLine: 14, desc: '<code>CALL IMPRIMIR_NUM</code>: Imprimimos 20 en consola.', registers: {AX:20,BX:2,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_div.exe<br>Dividiendo numeros de la pila...<br>El resultado es: <span style='color:#F87171'>20</span>_" },
            { codeLine: 15, desc: '<code>HLT</code>: Fin. <strong>120 ÷ 3 ÷ 2 = 20</strong> ✅', registers: {AX:20,BX:2,CX:0,DX:0}, stack: [], consoleOutput: "C:\\> run_div.exe<br>Dividiendo numeros de la pila...<br>El resultado es: <span style='color:#F87171'>20</span><br>C:\\> _" }
        ]
    }
};

// ============================================================
// STATE
// ============================================================
let currentOp = 'suma';
let currentStep = 0;

// UI Elements
const btnSiguiente = document.getElementById('btn-next');
const btnAnterior = document.getElementById('btn-prev');
const btnReset = document.getElementById('btn-reset');
const labelSP = document.getElementById('sp-label');
const flyingBox = document.getElementById('flying-box');
const stackContainer = document.getElementById('stack-container');

// ============================================================
// TAB SWITCHING
// ============================================================
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const opKey = tab.dataset.op;
        if (opKey === currentOp) return;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentOp = opKey;
        currentStep = 0;
        renderCodeLines();
        updateUI();
    });
});

// ============================================================
// RENDER CODE LINES (Dynamic)
// ============================================================
function renderCodeLines() {
    const op = operations[currentOp];
    const container = document.getElementById('code-container');
    container.innerHTML = '';
    op.codeLines.forEach((html, idx) => {
        const div = document.createElement('div');
        div.className = 'line';
        div.id = `line-${idx}`;
        div.innerHTML = `<span class="lineNumber">${idx + 1}: </span>${html}`;
        container.appendChild(div);
    });
    document.getElementById('code-panel-title').textContent = `📝 ${op.title}`;
}

// ============================================================
// UPDATE UI
// ============================================================
function updateUI() {
    const op = operations[currentOp];
    const stepData = op.steps[currentStep];

    btnAnterior.disabled = currentStep === 0;
    btnSiguiente.disabled = currentStep === op.steps.length - 1;

    // Code highlighting
    document.querySelectorAll('.line').forEach(el => { el.className = 'line'; });
    if (stepData.codeLine !== null) {
        const activeLine = document.getElementById(`line-${stepData.codeLine}`);
        if (activeLine) {
            const hType = stepData.highlightType || 'active';
            activeLine.classList.add(hType);
            activeLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Explanation
    document.getElementById('step-explanation').innerHTML = stepData.desc;

    // Registers
    document.getElementById('reg-AX').textContent = stepData.registers.AX;
    document.getElementById('reg-BX').textContent = stepData.registers.BX;
    document.getElementById('reg-CX').textContent = stepData.registers.CX;
    document.getElementById('reg-DX').textContent = stepData.registers.DX;

    // Stack (instant if not push/pop animation)
    if (!stepData.anim || (stepData.anim.type !== 'push' && stepData.anim.type !== 'pop')) {
        renderStack(stepData.stack);
    }

    // Console
    const consoleBox = document.getElementById('console-output');
    if (stepData.consoleOutput) {
        consoleBox.innerHTML = '<span class="console-text-new">' + stepData.consoleOutput + '</span>';
    } else {
        consoleBox.innerHTML = `<span style="color:#6B7280">C:\\> ${op.consoleExe}</span>`;
    }

    // SP Pointer
    const spPositions = ['-20px','33px','87px','141px','195px','249px'];
    labelSP.style.bottom = spPositions[stepData.stack.length];

    // Animations
    if (stepData.anim) triggerAnimation(stepData.anim, stepData);
}

// ============================================================
// RENDER STACK
// ============================================================
function renderStack(stackArray) {
    for (let i = 0; i < 5; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        slotEl.className = 'stack-slot';
        slotEl.querySelector('.slot-content').textContent = '';
    }
    stackArray.forEach((val, idx) => {
        const slotEl = document.getElementById(`slot-${idx}`);
        slotEl.classList.add('filled');
        slotEl.querySelector('.slot-content').textContent = val;
    });
}

// ============================================================
// ANIMATIONS
// ============================================================
function triggerAnimation(animData, stepData) {
    document.querySelectorAll('.register-card').forEach(el => {
        el.classList.remove('pop', 'math');
    });

    if (animData.type === 'reg' || animData.type === 'math') {
        const card = document.getElementById(`reg-${animData.target}-card`);
        card.classList.add(animData.type === 'math' ? 'math' : 'pop');
        setTimeout(() => { card.classList.remove('math', 'pop'); }, 600);
    }
    else if (animData.type === 'push') {
        const toIdx = stepData.stack.length - 1;
        const targetSlot = document.getElementById(`slot-${toIdx}`);
        const slotRect = targetSlot.getBoundingClientRect();
        const containerRect = stackContainer.getBoundingClientRect();

        flyingBox.textContent = animData.val;
        flyingBox.classList.remove('hidden');
        flyingBox.style.left = `${containerRect.left + (containerRect.width / 2) - 60}px`;
        flyingBox.style.top = `${containerRect.top - 80}px`;

        requestAnimationFrame(() => {
            flyingBox.style.top = `${slotRect.top}px`;
            flyingBox.style.left = `${slotRect.left + (slotRect.width / 2) - 60}px`;
        });

        setTimeout(() => {
            flyingBox.classList.add('hidden');
            renderStack(stepData.stack);
        }, 500);
    }
    else if (animData.type === 'pop') {
        const fromSlot = document.getElementById(`slot-${animData.fromIdx}`);
        const targetReg = document.getElementById(`reg-${animData.toReg}-card`);
        const slotRect = fromSlot.getBoundingClientRect();
        const regRect = targetReg.getBoundingClientRect();

        renderStack(stepData.stack);

        flyingBox.textContent = animData.val;
        flyingBox.classList.remove('hidden');
        flyingBox.style.top = `${slotRect.top}px`;
        flyingBox.style.left = `${slotRect.left + (slotRect.width / 2) - 60}px`;

        requestAnimationFrame(() => {
            flyingBox.style.top = `${regRect.top}px`;
            flyingBox.style.left = `${regRect.left}px`;
        });

        setTimeout(() => {
            flyingBox.classList.add('hidden');
            targetReg.classList.add('pop');
            setTimeout(() => targetReg.classList.remove('pop'), 500);
        }, 500);
    }
}

// ============================================================
// EVENT LISTENERS
// ============================================================
btnSiguiente.addEventListener('click', () => {
    const op = operations[currentOp];
    if (currentStep < op.steps.length - 1) { currentStep++; updateUI(); }
});

btnAnterior.addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; updateUI(); }
});

btnReset.addEventListener('click', () => {
    currentStep = 0;
    updateUI();
});

// ============================================================
// INIT
// ============================================================
renderCodeLines();
updateUI();
