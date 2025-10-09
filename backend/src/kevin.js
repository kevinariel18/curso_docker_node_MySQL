// Función que retorna una promesa que se resuelve después de 'ms' milisegundos
function espera(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función asíncrona que simula una tarea con espera
async function demo() {
    console.log('Inicio de la tarea'); // Se imprime antes de esperar
    await espera(2000);                // Espera 2 segundos (2000 ms)
    console.log('Fin de la tarea');    // Se imprime después de esperar
}

// Ejecuta la función demo
demo();

// Este mensaje se imprime inmediatamente, no espera a que demo termine
console.log('FIN DE la tarea');