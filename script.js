const datosArtefactos = {
    1: { nombre: "Mouse (Ratón)", emoji: "🖱️", color: "#f87171", opciones: ["Mouse (Ratón)", "Teclado", "Monitor"] },
    2: { nombre: "Teclado", emoji: "⌨️", color: "#60a5fa", opciones: ["Impresora", "Teclado", "CPU (Cerebro)"] },
    3: { nombre: "Monitor (Pantalla)", emoji: "🖥️", color: "#34d399", opciones: ["Auriculares", "Mouse (Ratón)", "Monitor (Pantalla)"] },
    4: { nombre: "CPU (Cerebro)", emoji: "🎛️", color: "#a78bfa", opciones: ["CPU (Cerebro)", "Monitor", "Teclado"] },
    5: { nombre: "Auriculares", emoji: "🎧", color: "#fbbf24", opciones: ["Mouse (Ratón)", "Auriculares", "Impresora"] },
    6: { nombre: "Impresora", emoji: "🖨️", color: "#f472b6", opciones: ["Impresora", "CPU (Cerebro)", "Monitor"] }
};

let estrellas = 0;
let artefactoActual = null;

function rollDice() {
    const dadoElemento = document.getElementById("dado-digital");
    const btn = document.getElementById("btn-roll");
    const imgContenedor = document.getElementById("contenedor-imagen");
    const opcionesContenedor = document.getElementById("opciones-contenedor");
    const feedback = document.getElementById("feedback-juego");
    
    btn.disabled = true;
    imgContenedor.innerText = "❓";
    opcionesContenedor.innerHTML = "";
    feedback.innerText = "";
    
    // Activar el giro de 360 grados continuo
    dadoElemento.classList.add("girando");
    
    let tiempoPasado = 0;
    const intervaloCambio = setInterval(() => {
        const idAleatorio = Math.floor(Math.random() * 6) + 1;
        dadoElemento.innerText = datosArtefactos[idAleatorio].emoji;
        dadoElemento.style.backgroundColor = datosArtefactos[idAleatorio].color;
        tiempoPasado += 100;
        
        // Detener el giro tras 2 segundos
        if (tiempoPasado >= 2000) {
            clearInterval(intervaloCambio);
            // Quitamos la clase 'girando' para que el dado se detenga por completo
            dadoElemento.classList.remove("girando");
            
            const resultadoFinal = Math.floor(Math.random() * 6) + 1;
            artefactoActual = datosArtefactos[resultadoFinal];
            
            dadoElemento.innerText = artefactoActual.emoji;
            dadoElemento.style.backgroundColor = artefactoActual.color;
            imgContenedor.innerText = artefactoActual.emoji;
            
            artefactoActual.opciones.forEach(opcion => {
                const boton = document.createElement("button");
                boton.className = "btn-opcion";
                boton.innerText = opcion;
                boton.onclick = () => verificarRespuesta(opcion);
                opcionesContenedor.appendChild(boton);
            });
        }
    }, 100);
}

function verificarRespuesta(opcionSeleccionada) {
    const feedback = document.getElementById("feedback-juego");
    const opcionesContenedor = document.getElementById("opciones-contenedor");
    const btn = document.getElementById("btn-roll");
    
    opcionesContenedor.innerHTML = "";

    if (opcionSeleccionada === artefactoActual.nombre) {
        feedback.className = "correcto";
        feedback.innerText = "🎉 ¡Súper! ¡Es correcto! ⭐";
        estrellas++;
        document.getElementById("contador-estrellas").innerText = estrellas;
        
        if (estrellas >= 5) {
            setTimeout(() => {
                document.getElementById("modal-victoria").style.display = "flex";
            }, 500);
            return; 
        }
    } else {
        feedback.className = "incorrecto";
        feedback.innerText = `❌ ¡Casi! Era el ${artefactoActual.nombre}. ¡Inténtalo otra vez!`;
    }
    
    btn.disabled = false;
}

function reiniciarJuegoCompleto() {
    estrellas = 0;
    document.getElementById("contador-estrellas").innerText = estrellas;
    document.getElementById("modal-victoria").style.display = "none";
    document.getElementById("contenedor-imagen").innerText = "❓";
    document.getElementById("feedback-juego").innerText = "";
    document.getElementById("btn-roll").disabled = false;
}
