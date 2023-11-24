import { gsap } from "https://cdn.skypack.dev/gsap";
import { Draggable } from "https://cdn.skypack.dev/gsap/Draggable";

gsap.registerPlugin(Draggable);

const dientes = [];

const manchas = [];

for (let i = 1; i <= 32; i++) {
    let diente = document.querySelector(`#dientesucio${i}`);
    diente.classList.add('dienteTransicion');
    dientes.push({ element: diente, limpio: false });
}

for (let i = 1; i <= 5; i++) {
    let mancha = document.querySelector(`#mancha${i}`);
    mancha.classList.add('manchaTransicion');
    manchas.push({ element: mancha, limpio: false });
}

gsap.to("#pasta1", { opacity: 0});

Draggable.create("#cepilloconpasta", {
    bounds: "#brush-container",
    onDrag: function () {
        // Obtener la posición de la punta del cepillo (pastasola)
        const pastaSolaRect = document.querySelector("#pasta1").getBoundingClientRect();
        const pastaSola = document.querySelector("#pasta1");
        const lenguaSucia = document.querySelector("#lenguasucia");
        lenguaSucia.classList.add('lenguaTransicion');
        // Se Itera sobre los dientes del 1 al 32
        if(!pastaSola.classList.contains('hidden')){ 
            for (let i = 0; i < 32; i++) {
                let diente = dientes[i].element;
                let dienteRect = diente.getBoundingClientRect();

                // Si el diente está limpio o no está dentro del área de pastasola, no se cambia la opacidad
                if (dientes[i].limpio || !isInArea(dienteRect, pastaSolaRect)) {
                    continue;
                }

                // Marcar el diente como limpio y cambiar su opacidad
                dientes[i].limpio = true;
                diente.style.opacity = 0;
            }
            for (let i = 0; i < 5; i++){
                let mancha = manchas[i].element;
                let manchaRect = mancha.getBoundingClientRect();

                // Si el diente está limpio o no está dentro del área de pastasola, no se cambia la opacidad
                if (manchas[i].limpio || !isInArea(manchaRect, pastaSolaRect)) {
                    continue;
                }

                // Marcar el diente como limpio y cambiar su opacidad
                manchas[i].limpio = true;
                mancha.style.opacity = 0;
            }
            let todasLimpias = manchas.every(mancha => mancha.limpio);
            if(todasLimpias){
                lenguaSucia.style.opacity = 0;
            }
        }
    },
    onRelease: function () {
        gsap.to("#cepilloconpasta", { x:0, y:0, duration: 0.7, ease: "power4.inOut" });
    },
});
Draggable.create("#pasta", {
    bounds: "#brush-container",
    onDrag: function () {
        const pastaSola = document.querySelector("#pasta1");
        const pastaSolaBounding = document.querySelector("#pasta1").getBoundingClientRect();
        const boquilla = document.querySelector("#boquilla-pasta").getBoundingClientRect(); 
        if (isInArea(boquilla, pastaSolaBounding)) {
            pastaSola.classList.remove('hidden');
            gsap.to("#pasta1", { opacity: 1, duration: 1});
        }
    },
    onRelease: function () {
        gsap.to("#pasta", { x:0, y:0, duration: 0.7, ease: "power4.inOut" });
    },
});

// Función para verificar si el diente está dentro del área de pastasola
function isInArea(dienteRect, pastaSolaRect) {
    return (
        dienteRect.left < pastaSolaRect.right &&
        dienteRect.right > pastaSolaRect.left &&
        dienteRect.top < pastaSolaRect.bottom &&
        dienteRect.bottom > pastaSolaRect.top
    );
}
