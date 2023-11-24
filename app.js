import { gsap } from "https://cdn.skypack.dev/gsap";
import { Draggable } from "https://cdn.skypack.dev/gsap/Draggable";

gsap.registerPlugin(Draggable);

const dientes = [];
const manchas = [];

function reiniciarTodo() {
    // Reiniciar la opacidad y el estado de los dientes
    dientes.forEach(diente => {
        diente.element.style.opacity = 1;
        diente.limpio = false;
    });

    // Reiniciar la opacidad y el estado de las manchas
    manchas.forEach(mancha => {
        mancha.element.style.opacity = 1;
        mancha.limpio = false;
    });

    // Ocultar elementos adicionales si es necesario
    const lenguaSucia = document.querySelector("#lenguasucia");
    const brillitos = document.querySelector("#Brillos2");
    lenguaSucia.style.opacity = 1;
    brillitos.classList.add('hidden');
    gsap.to("#Brillos2", { opacity: 0 });

    // Ocultar la pasta y restablecer su opacidad
    const pastaSola = document.querySelector("#pasta1");
    pastaSola.classList.add('hidden');
    gsap.to("#pasta1", { opacity: 0 });
}

// Evento clic para el botón de reinicio
const botonReiniciar = document.getElementById("BOTON");
botonReiniciar.style.cursor = "pointer";
botonReiniciar.addEventListener("click", reiniciarTodo);

for (let i = 1; i <= 32; i++) {
  let diente = document.querySelector(`#dientesucio${i}`);
  diente.classList.add("dienteTransicion");
  dientes.push({ element: diente, limpio: false });
}

for (let i = 1; i <= 5; i++) {
  let mancha = document.querySelector(`#mancha${i}`);
  mancha.classList.add("manchaTransicion");
  manchas.push({ element: mancha, limpio: false });
}

gsap.to("#pasta1", { opacity: 0 });
gsap.to("#Brillos2", { opacity: 0 });

Draggable.create("#cepilloconpasta", {
  bounds: "#brush-container",
  edgeResistance: 0.5,
  onDrag: function () {
    // Obtener la posición de la punta del cepillo (pastasola)
    const pastaSolaRect = document
      .querySelector("#pasta1")
      .getBoundingClientRect();
    const pastaSola = document.querySelector("#pasta1");
    const lenguaSucia = document.querySelector("#lenguasucia");
    const brillitos = document.querySelector("#Brillos2");
    lenguaSucia.classList.add("lenguaTransicion");
    // Se Itera sobre los dientes del 1 al 32
    if (!pastaSola.classList.contains("hidden")) {
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
      for (let i = 0; i < 5; i++) {
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
      let manchasLimpias = manchas.every((mancha) => mancha.limpio);
      let dientesLimpios = dientes.every((diente) => diente.limpio);
      if (manchasLimpias) {
        lenguaSucia.style.opacity = 0;
        if (dientesLimpios) {
          brillitos.classList.remove("hidden");
          gsap.to("#Brillos2", {
            opacity: 1,
            duration: 1,
            onComplete: function () {
              gsap.to(brillitos, { opacity: 0, duration: 1 });
            },
          });
        }
      }
    }
  },
  onRelease: function () {
    gsap.to("#cepilloconpasta", {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power4.inOut",
    });
  },
});
Draggable.create("#pasta", {
  bounds: "#brush-container",
  onDrag: function () {
    const pastaSola = document.querySelector("#pasta1");
    const pastaSolaBounding = document
      .querySelector("#pasta1")
      .getBoundingClientRect();
    const boquilla = document
      .querySelector("#boquilla-pasta")
      .getBoundingClientRect();
    if (isInArea(boquilla, pastaSolaBounding)) {
      pastaSola.classList.remove("hidden");
      gsap.to("#pasta1", { opacity: 1, duration: 1 });
    }
  },
  onRelease: function () {
    gsap.to("#pasta", { x: 0, y: 0, duration: 0.7, ease: "power4.inOut" });
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
