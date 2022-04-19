import {
    Alert,
    Platform,
    ToastAndroid
} from 'react-native';

/**
 * Este componente muestra mensajes en pantalla
 */
class AMensajes{

    /**
     * Retorna una promesa en verdadero y muestra un mensaje en pantalla
     * @param {string} mensaje Parametro para mostrar el mensaje en pantalla
     * @returns {Promise<boolean>} Retorna verdadero en una promesa cuando en el cuadro del mensaje se presiona Ok
     */
    static mostrarMensaje(mensaje){
        return new Promise(respuesta => {
            Alert.alert("Mensaje de la aplicación", mensaje, [
                {
                    text: "Ok", onPress: () => { respuesta(true) }
                }
            ]);
        });
    }

    /**
     * Muestra un mensaje en pantalla, retorna un entero dependiendo en la secuencia que se ingreso
     * las diferentes opciones de los botones
     * @param {string} mensaje Muestra un mensaje en pantalla
     * @param  {...string} botones Muestra los diferentes botones en pantalla
     * @returns Retorna una Promesa entera, dependiendo que opción sea clickada
     * @example
     *  mensajesSelectivo("Mensaje en pantalla", "Boton 1", "Boton 2", "Boton 3").then(res => {
     *      // Si se presiona el Boton 1
     *      // retorna 0
     *      // Si se presiona el Boton 2
     *      // retorna 1
     *      // y así sucesivamente
     * })
     */
    static mensajesSelectivo(mensaje, ...botones){
        return new Promise(respuesta => {
            const mostrar = [];
            for(let i = 0; i < botones.length; i++){
                mostrar.push({
                    text: botones[i],
                    onPress: () => { respuesta(i); }
                });
            }
            Alert.alert("Mensaje de la aplicación", mensaje, mostrar);
        });
    }

    /**
     * Muestra un toast en pantalla cuando es android, 
     * si es ios muestra un alert
     * @param {string} mensaje 
     */
     static Toast(mensaje){
        if(Platform.OS === 'android'){
            ToastAndroid.show(mensaje, ToastAndroid.SHORT);
        }else{
            Alert.alert("Mensaje de la aplicación", mensaje);
        }
    }

    /**
     * Está función muestra un mensaje personalizado con el siguiente texto
     * Error: Se ha perdido la conexión con la base de datos, cierre la aplicación y vuelva a intentarlo.
     * @returns {Promise<void>}
     */
    static conexionPerdidaBd(){
        return new Promise(respuesta => {
            Alert.alert("Error: Se ha perdido la conexión con la base de datos, cierre la aplicación y vuelva a intentarlo.");
            respuesta();
        })
    }

}

export default AMensajes;