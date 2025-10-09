function esperar (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function demo() {
    console.log('Inicio de la espera');
    await esperar(2000);
    console.log('Fin de la espera');
}



demo();
console.log('FIN DEL PROGRAMA');    