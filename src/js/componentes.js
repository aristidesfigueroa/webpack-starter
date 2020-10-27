
// Separando Funciones en un solo JS

// Para dejar el index.js con un solo llamado, siendo este mas eficiente.

import '../css/componentes.css';

export const saludar = ( nombre ) => {
    console.log ('Creando etiqueta h1 - con WebPack');

    const h1 = document.createElement('h1');
    h1.innerText = `Sure, ${ nombre }`;
    document.body.append(h1);
}


