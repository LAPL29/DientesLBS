
const dientes = [];
for (let i = 1; i <= 32; i++) {
    let diente = document.querySelector(`#dientesucio${i}`);
    diente.classList.add('dienteTransicion');
    dientes.push({ element: diente, limpio: false }); // Para cada diente para saber si está limpio o no
}
Draggable.create("#cepilloconpasta", {
    bounds: "body",
    onDrag: function () {
        // Se Obtiene la posición del cepillo al arrastrar
        let cepilloRect = this.target.getBoundingClientRect();

        // Se Itera sobre los dientes del 1 al 32
        for (let i = 0; i < 32; i++) {
            let diente = dientes[i].element;
            let dienteRect = diente.getBoundingClientRect();

            // Si el diente está limpio, no se cambia la opacidad
            if (dientes[i].limpio) {
                continue;
            }
            // Verificar la colisión entre el cepillo y el diente actual
            if (
                cepilloRect.left < dienteRect.right &&
                cepilloRect.right > dienteRect.left &&
                cepilloRect.top < dienteRect.bottom &&
                cepilloRect.bottom > dienteRect.top
            ) {
                // Marcar el diente como limpio y cambiar su opacidad
                dientes[i].limpio = true;
                diente.style.opacity = 0;
            }
        }
    }
});
