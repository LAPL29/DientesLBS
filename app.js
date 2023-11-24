const dientes = [];
for (let i = 1; i <= 32; i++) {
    let diente = document.querySelector(`#dientesucio${i}`);
    diente.classList.add('dienteTransicion');
    dientes.push({ element: diente, limpio: false });
}

Draggable.create("#cepilloconpasta, #pasta1", {
    bounds: "body",
    onDrag: function () {
        // Obtener la posición de la punta del cepillo (pastasola)
        let pastaSolaRect = document.querySelector("#pasta1").getBoundingClientRect();

        // Se Itera sobre los dientes del 1 al 32
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
