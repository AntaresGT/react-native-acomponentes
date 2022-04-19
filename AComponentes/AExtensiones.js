// Este archivo es unicamente de utilidades
// no contiene ningún componente
// Las utilidades son para los componentes

import {
  PixelRatio
} from 'react-native';

/**
 * Esta funcion calcula un number a pixeles
 * si valor viene en porcentaje o string devuelve el mismo valor
 * @param {number|string} valor Valor a pasar a pixeles, si tiene texto retorna el mismo valor
 * @returns {number|string} Retorna los pixeles o el mismo valor
 */
function calcularPixeles(valor) {
  if(typeof valor === "number"){
    return PixelRatio.getPixelSizeForLayoutSize(valor);
  }
  else{
    return valor;
  }
}

/**
 * Está función devuelve un tamaño de texto prederterminado
 * en base al tamaño de ancho de la pantalla que se le pase
 * @param {number} ancho Ancho de la pantalla en pixeles
 * @returns {number} Retorna el tamaño de texto.
 */
function devolverTamanoTextoPorPixeles(ancho){
  let tamanoLetra = 15;
  if(ancho < 540){
    tamanoLetra = 15;
  }
  else
  if(ancho < 720){
    tamanoLetra = 17;
  }
  else
  if(ancho < 1024){
    tamanoLetra = 19;
  }
  else{
    tamanoLetra = 23;
  }

  return tamanoLetra;
}

/**
 * Este objeto simula ser un enum de strings
 * almacena las respuestas posibles que reciba
 * de android o de ios
 */
const EMensajes = {
  ERROR: "AERROR",
  ACERTADO_OK: "ACERTADO",
  ADVERTENCIA: "AAVERTENCIA",
  CANCELADO: "ACANCELADO",
  EVENTO: "AEVENTO",
};

export {
  EMensajes,
  calcularPixeles,
  devolverTamanoTextoPorPixeles
}