
/*
  script.js
  Controla el calendario, sobres, cartas y música.
  EDITAR: nombre, bienvenida, fecha de prueba, frases y fotografías.
*/

// ==========================================
// 1. PERSONALIZACIÓN
// ==========================================

const CONFIG = {
    nombre: "Mi persona especial",

    bienvenida:
        "Hay cosas bonitas que merecen ser descubiertas poco a poco. Preparé 24 pequeñas cartas para ti."
};

// ==========================================
// 2. FECHA DE PRUEBA
// ==========================================

// Funcionamiento normal:
const FECHA_PRUEBA = "2026-12-05";
//const FECHA_PRUEBA = null;

// Para probar el día 5 de diciembre:
// const FECHA_PRUEBA = "2026-12-05";

// IMPORTANTE:
// El calendario utiliza la fecha local del dispositivo.

// ==========================================
// 3. FRASES Y FOTOGRAFÍAS
// ==========================================

const SORPRESAS = {

    1: {
        frase: "Hoy comienza una pequeña aventura. Espero que cada día te regale una sonrisa. ❤️",
        foto: "images/dia-01.jpg"
    },

    2: {
        frase: "Entre tantas casualidades, conocerte fue una de mis favoritas.",
        foto: "images/dia-02.jpg"
    },

    3: {
        frase: "Hay personas que hacen que los días normales se conviertan en especiales.",
        foto: "images/dia-03.jpg"
    },

    4: {
        frase: "Si pudiera guardar momentos en una cajita, elegiría aquellos en los que sonríes.",
        foto: "images/dia-04.jpg"
    },

    5: {
        frase: "No necesito una fecha especial para recordarte lo importante que eres.",
        foto: "images/dia-05.jpg"
    },

    6: {
        frase: "Tu sonrisa tiene esa bonita capacidad de mejorar cualquier día.",
        foto: "images/dia-06.jpg"
    },

    7: {
        frase: "Ojalá nunca te falten motivos para sonreír y personas que te recuerden lo increíble que eres.",
        foto: "images/dia-07.jpg"
    },

    8: {
        frase: "Algunos recuerdos son pequeños tesoros que siempre vale la pena conservar.",
        foto: "images/dia-08.jpg"
    },

    9: {
        frase: "Qué bonito es encontrar a alguien que hace especial hasta una conversación sencilla.",
        foto: "images/dia-09.jpg"
    },

    10: {
        frase: "Hoy quiero recordarte que mereces cosas tan bonitas como las que haces sentir.",
        foto: "images/dia-10.jpg"
    },

    11: {
        frase: "No todos los días son perfectos, pero siempre puede existir algo bonito en ellos.",
        foto: "images/dia-11.jpg"
    },

    12: {
        frase: "Si los momentos bonitos fueran estrellas, tendría un cielo entero de recuerdos contigo.",
        foto: "images/dia-12.jpg"
    },

    13: {
        frase: "Hay detalles pequeños que dicen mucho. Este es uno de ellos.",
        foto: "images/dia-13.jpg"
    },

    14: {
        frase: "Nunca olvides lo especial que eres, incluso en esos días en los que no lo notes.",
        foto: "images/dia-14.jpg"
    },

    15: {
        frase: "Me gusta pensar que todavía nos esperan muchos recuerdos bonitos por crear.",
        foto: "images/dia-15.jpg"
    },

    16: {
        frase: "La felicidad también está en esos pequeños instantes que parecen no tener importancia.",
        foto: "images/dia-16.jpg"
    },

    17: {
        frase: "Que la vida te sorprenda con motivos para reír, soñar y seguir brillando.",
        foto: "images/dia-17.jpg"
    },

    18: {
        frase: "Hay personas que dejan huellas bonitas sin siquiera darse cuenta.",
        foto: "images/dia-18.jpg"
    },

    19: {
        frase: "Si hoy pudiera regalarte algo, sería un poquito de toda la felicidad que mereces.",
        foto: "images/dia-19.jpg"
    },

    20: {
        frase: "Cada recuerdo bonito tiene algo que lo hace único. Gracias por formar parte de ellos.",
        foto: "images/dia-20.jpg"
    },

    21: {
        frase: "Que nunca pierdas esa luz tan bonita que te hace ser tú.",
        foto: "images/dia-21.jpg"
    },

    22: {
        frase: "Ya falta poquito para Navidad, pero los mejores regalos no siempre vienen envueltos.",
        foto: "images/dia-22.jpg"
    },

    23: {
        frase: "Mañana será un día especial, pero hoy también quería recordarte cuánto vales.",
        foto: "images/dia-23.jpg"
    },

    24: {
        frase: "Llegamos al último día. Mi deseo es que sonrías mucho, que seas feliz y que nunca te falten razones para creer en las cosas bonitas. Feliz Navidad. ❤️",
        foto: "images/dia-24.jpg"
    }

};

// ==========================================
// 4. ELEMENTOS HTML
// ==========================================

const calendario = document.getElementById("calendar-grid");

const mensajeFecha = document.getElementById("date-message");

const seccionCarta = document.getElementById("letter-section");

const tarjetaCarta = document.getElementById("letter-card");

const tituloCarta = document.getElementById("letter-title");

const imagenCarta = document.getElementById("letter-image");

const mensajeCarta = document.getElementById("letter-message");

const reproductor = document.getElementById("background-music");

const botonMusica = document.getElementById("music-button");

const iconoMusica = document.getElementById("music-icon");

const textoMusica = document.getElementById("music-label");

// ==========================================
// 5. FECHA ACTUAL
// ==========================================

function obtenerFechaActual() {

    if (FECHA_PRUEBA === null) {
        return new Date();
    }

    const coincidencia =
        /^(\d{4})-(\d{2})-(\d{2})$/.exec(FECHA_PRUEBA);

    if (!coincidencia) {
        throw new Error(
            "La fecha de prueba debe tener el formato AAAA-MM-DD."
        );
    }

    const anio = Number(coincidencia[1]);
    const mes = Number(coincidencia[2]);
    const dia = Number(coincidencia[3]);

    const fecha = new Date(anio, mes - 1, dia);

    if (
        fecha.getFullYear() !== anio ||
        fecha.getMonth() !== mes - 1 ||
        fecha.getDate() !== dia
    ) {
        throw new Error("La fecha de prueba no es válida.");
    }

    return fecha;
}

// ==========================================
// 6. COMPROBAR DISPONIBILIDAD
// ==========================================

function puertaDisponible(dia) {

    const fecha = obtenerFechaActual();

    const mes = fecha.getMonth() + 1;

    const diaActual = fecha.getDate();

    // Solo diciembre.
    if (mes !== 12) {
        return false;
    }

    // Solo se permite abrir días que ya llegaron.
    return diaActual >= dia;
}

// ==========================================
// 7. CREAR LOS SOBRES
// ==========================================

function crearCalendario() {

    calendario.innerHTML = "";

    for (let dia = 1; dia <= 24; dia++) {

        const disponible = puertaDisponible(dia);

        const sobre = document.createElement("button");

        sobre.type = "button";

        sobre.className = "envelope";

        sobre.dataset.day = dia;

        const numero = String(dia).padStart(2, "0");

        if (!disponible) {

            sobre.classList.add("locked");

            sobre.disabled = true;

            sobre.setAttribute(
                "aria-label",
                `Sobre del día ${dia}, bloqueado`
            );

            sobre.title =
                "Esta carta todavía no está disponible.";

        } else {

            sobre.setAttribute(
                "aria-label",
                `Abrir carta del día ${dia}`
            );

        }

        sobre.innerHTML = `
            <div class="envelope-body">

                <div class="envelope-flap"></div>

                <span class="envelope-heart">
                    ${disponible ? "♥" : "🔒"}
                </span>

                <span class="envelope-number">
                    ${numero}
                </span>

                <span class="envelope-caption">
                    ${disponible ? "ABRIR CARTA" : "BLOQUEADO"}
                </span>

            </div>
        `;

        if (disponible) {

            sobre.addEventListener("click", () => {

                abrirSobre(dia, sobre);

            });

        }

        calendario.appendChild(sobre);

    }

    actualizarMensajeFecha();

}

// ==========================================
// 8. MENSAJE DE FECHA
// ==========================================

function actualizarMensajeFecha() {

    const fecha = obtenerFechaActual();

    if (fecha.getMonth() !== 11) {

        mensajeFecha.textContent =
            "🔒 Tus cartas estarán disponibles durante diciembre. ¡Vuelve pronto!";

        return;
    }

    const dia = fecha.getDate();

    if (dia < 24) {

        mensajeFecha.textContent =
            `❤️ Hoy es ${dia} de diciembre. Puedes abrir las cartas del 1 al ${dia}.`;

    } else {

        mensajeFecha.textContent =
            "❤️ ¡Las 24 cartas están disponibles! Disfruta cada sorpresa.";

    }

}

// ==========================================
// 9. REPRODUCTOR DE MÚSICA
// ==========================================

function actualizarBotonMusica(reproduciendo) {

    if (reproduciendo) {

        iconoMusica.textContent = "Ⅱ";

        textoMusica.textContent = "Pausar canción";

        botonMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } else {

        iconoMusica.textContent = "▶";

        textoMusica.textContent = "Escuchar canción";

        botonMusica.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    }

}

async function reproducirMusica() {

    try {

        await reproductor.play();

        actualizarBotonMusica(true);

    } catch (error) {

        actualizarBotonMusica(false);

        mensajeFecha.textContent =
            "No se pudo reproducir la canción. Comprueba que music/perfect.mp3 exista y vuelve a intentarlo.";

        console.error("Error al reproducir la música:", error);

    }

}

function pausarMusica() {

    reproductor.pause();

    actualizarBotonMusica(false);

}

botonMusica.addEventListener("click", () => {

    if (reproductor.paused) {

        reproducirMusica();

    } else {

        pausarMusica();

    }

});

// Sincronizar el botón con el reproductor.
reproductor.addEventListener("play", () => {
    actualizarBotonMusica(true);
});

reproductor.addEventListener("pause", () => {
    actualizarBotonMusica(false);
});

reproductor.addEventListener("ended", () => {
    actualizarBotonMusica(false);
});

reproductor.addEventListener("error", () => {

    actualizarBotonMusica(false);

    console.error(
        "No se pudo cargar music/perfect.mp3"
    );

});

// ==========================================
// 10. ABRIR UN SOBRE
// ==========================================

function abrirSobre(dia, sobre) {

    // Volver a verificar la fecha antes de abrir.
    if (!puertaDisponible(dia)) {

        mensajeFecha.textContent =
            "🔒 Todavía no puedes abrir esta carta. Espera hasta su día.";

        return;
    }

    const sorpresa = SORPRESAS[dia];

    if (!sorpresa) {

        mensajeFecha.textContent =
            "No se encontró el contenido de esta carta.";

        return;
    }

    // Evitar múltiples clics durante la animación.
    if (
        sobre.classList.contains("opening") ||
        sobre.classList.contains("opened")
    ) {
        return;
    }

    // La música comienza al abrir el primer sobre
    // si el navegador permite su reproducción.
    if (reproductor.paused) {
        reproducirMusica();
    }

    sobre.disabled = true;

    sobre.classList.add("opening");

    // Esperar a que la solapa se abra.
    setTimeout(() => {

        sobre.classList.remove("opening");

        sobre.classList.add("opened");

        const corazon = sobre.querySelector(".envelope-heart");

        const texto = sobre.querySelector(".envelope-caption");

        corazon.textContent = "♥";

        texto.textContent = "ABIERTA";

        sobre.setAttribute(
            "aria-label",
            `Carta del día ${dia}, abierta`
        );

        mostrarCarta(dia, sorpresa);

    }, 750);

}

// ==========================================
// 11. MOSTRAR LA CARTA
// ==========================================

function mostrarCarta(dia, sorpresa) {

    tituloCarta.textContent =
        `Carta del ${dia} de diciembre`;

    mensajeCarta.textContent =
        sorpresa.frase;

    // Manejar fotografías que no existan.
    imagenCarta.onerror = function () {

        this.onerror = null;

        this.removeAttribute("src");

        this.alt =
            "No se encontró la fotografía. Revisa el archivo correspondiente en images.";

    };

    imagenCarta.src = sorpresa.foto;

    imagenCarta.alt =
        `Fotografía especial del día ${dia}`;

    seccionCarta.hidden = false;

    // Reiniciar la animación de entrada.
    tarjetaCarta.classList.remove("show");

    void tarjetaCarta.offsetWidth;

    tarjetaCarta.classList.add("show");

    setTimeout(() => {

        seccionCarta.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}

// ==========================================
// 12. PERSONALIZAR LA PÁGINA
// ==========================================

function personalizarPagina() {

    document.getElementById("person-name").textContent =
        CONFIG.nombre;

    document.getElementById("welcome-message").textContent =
        CONFIG.bienvenida;

}

// ==========================================
// 13. INICIAR EL CALENDARIO
// ==========================================

function iniciarCalendario() {

    try {

        personalizarPagina();

        crearCalendario();

    } catch (error) {

        console.error(error);

        mensajeFecha.textContent =
            "Hay un error en la configuración de la fecha. Revisa FECHA_PRUEBA en script.js.";

    }

}

iniciarCalendario();
