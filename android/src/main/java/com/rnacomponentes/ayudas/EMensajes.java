package com.rnacomponentes.ayudas;

/**
 * @author Allam López
 * Esta enumeración indica los diferentes mensajes que puedan existir
 * entre archivos del proyecto, dependiendo el mensaje así será
 * de la forma en que se debera responder
 */
public enum EMensajes {
    ERROR {
        public String toString(){
            return "AERROR";
        }
    },
    ACERTADO {
        public String toString(){
            return "AACERTADO";
        }
    },
    ADVERTENCIA {
        public String toString(){
            return "AADVERTENCIA";
        }
    },
    CANCELADO {
        public String toString(){
            return "ACANCELADO";
        }
    },
    EVENTO {
        public String toString(){
            return "AEVENTO";
        }
    }
}