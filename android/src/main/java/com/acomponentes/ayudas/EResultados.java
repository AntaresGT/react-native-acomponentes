package com.antarescorreos.ayudas;

/**
 * @author Allam López
 * Esta enumaración representa los diferentes codigos de error o de respuestas
 * en los activities y fragments
 */
public enum EResultados {
    ERROR(1),
    ACERTADO(2),
    ADVERTENCIA(3),
    CANCELADO(4),
    EVENTO(5);

    private int valor;

    EResultados(int valor) {
        this.valor = valor;
    }

    private void fijarValor(int valor){
        this.valor = valor;
    }

    public int obtenerValor(){
        return this.valor;
    }
}
