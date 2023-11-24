import { gsap } from "https://cdn.skypack.dev/gsap";
import { Draggable } from "https://cdn.skypack.dev/gsap/Draggable";

gsap.registerPlugin(Draggable);

const dientes = [];
for (let i = 1; i <= 32; i++) {
    let diente = document.querySelector(`#dientesucio${i}`);
    diente.classList.add('dienteTransicion');
    dientes.push({ element: diente, limpio: false });
}
gsap.to("#pasta1", { opacity: 0});

Draggable.create("#cepilloconpasta", {
    bounds: "#brush-container",
    onDrag: function () {
        // Obtener la posición de la punta del cepillo (pastasola)
        const pastaSolaRect = document.querySelector("#pasta1").getBoundingClientRect();
        const pastaSola = document.querySelector("#pasta1");
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
        }
    }
});
Draggable.create("#pasta", {
    bounds: "#brush-container",
    onDrag: function () {
        let pastaSola = document.querySelector("#pasta1");
        if (this.hitTest(pastaSola, "50%")) {
            pastaSola.classList.remove('hidden');
            gsap.to("#pasta1", { opacity: 1, duration: 1});
        }
    }
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
