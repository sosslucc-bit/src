// Quiero conectar mi formulario a una plataforma como formspree
//
// Para hacer un request, del tipo POST, donde enviaré información
// para que sea guardada debo interactuar con lo que se conoce de 
// forma genérica como ENDPOINT.

// ¿Cómo defino un ENDPOINT? como una url

//const ENDPOINT = 'https://api.example.com/v1/users'
const ENDPOINT = 'https://formspree.io/f/movnpeab'

// Para poder implementar la funcionalidad en mi formulario necesito
// tener forma de referenciar a sus elementos. Con el fin de poder
// - observarlos 
// - manipularlos

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submitButton');

// esta funcion tiene que ser declara asincronica
// debido a que es una funciona que hace un pedido a un servicio
// externo y debe aguardar la respuesta por lo cual no puedo 
// saber de antemano el tiempo de su ejecución
async function sendForm(fd){
    return fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: fd
    });
}

// agregar async aca una vez creado
// async function sendForm
form.addEventListener('submit', async (e) => {
    // Detiene comportamiento normal de submit
    e.preventDefault();
    // Vamos a borrar el class name de statusEl
    // adjudicar distintos nombres de clase puede servirnos
    // para modificar color, por ej verde bien, rojo error 
    statusEl.className = '';
    // Aca vamos a asignar distintos textos, de acuerdo a como
    // fue el proceso.
    statusEl.textContent = '';

    // Interacción...
    submitBtn.disabled = true;
    statusEl.textContent = 'Enviando...';
    
    try{
    // empaquetamos los datos del form
    const fd = new FormData(form);
    //console.log([...fd]);
    // Queremos mandar nuestra información
    // Queremos implementar una funcionalidad
    const res = await sendForm(fd);
    if (!res.ok) throw new Error('HTTP' + res.status);

    form.reset();
    statusEl.textContent = "¡Gracias! Tu mensaje se envió correctamente.";
    statusEl.className="status-ok";
    } catch(err) {
        statusEl.textContent = "Hubo un error al enviar el mensaje!";
        statusEl.className="status-error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
    }
});
