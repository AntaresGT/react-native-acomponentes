/**
 * Está clase proporciona o valida expresiones regulares estandares
 * o cualquier otra expresión regular que se desee validar
 */
 class AExpReg{

    /**
     * @constructor
     */
    constructor(){

    }

    /**
     * Evalua el patrón con la cadena de texto especificada
     * si es valida devuelve true de lo contrario devuelve false
     * @param {RegExp} expreg Recibe el patrón a evaluar(Expresión regular)
     * @param {string} str Recibe la cadena de texto a evaluar
     * @returns {boolean}
     */
    static validarExpresionRegular(expreg, str){
        return expreg.test(str);
    }

    /**
     * Está función devuelve una expresión regular de numeros enteros
     * al menos 1 numero entero entre 0 y 9
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegNumeroEntero(){
        return /^[0-9]+$/
    }

    /**
     * Está función devuelve una expresión regular de correo electrónico
     * Una implementación del Estandard Official: RFC 5322: ( valida en el 99.99% de los emails existentes )
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerExpRegCorreoElectronico(){
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gm
    }

    /**
     * Está función devuelve una expresión regular
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegNumeroTelefono(){
        return /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/gm
    }

    /**
     * Está función devuelve una expresión regular
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegNumeroTelefonoSinSignoMas(){
        return /((\(?\+[0-9]{1,3}\)? ?-?)|)[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/gm
    }

    /**
     * Está función devuelve una expresión regular que valida solo letras con espacios
     * @returns {RegExp} Devuelve una expresión
     */
    static obtenerRegSoloLetrasConEspacios(){
        return /^[(a-z|A-Z) áéíóúÁÉÍÓÚ]*$/gm
    }

    /**
     * Está funcioón devuelve una expresión regular que valida solo letras, numeros con espacios
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegSoloLetrasNumerosConEspacios(){
        return /^[(a-z|A-Z)0-9 \_\-áéíóúÁÉÍÓÚ]*$/gm
    }

    /**
     * Está función devuelve una expresión regular que valida solo letras con espacios al menos 1 letra nada más
     * @returns {RegExp} Devuele una expresión regular
     */
    static obtenerRegSoloLetrasConEspaciosAlMenos1Letra(){
        return /^[a-zA-Z áéíóúÁÉÍÓÚ]+$/gm
    }

    /**
     * Está función devuelve una expresión regular de direcciones de casas, negocios, etc.
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegDirecciones(){
        return /^[(a-z|A-Z) _\.\-,0-9\n\#áéíóúÁÉÍÓÚ]*$/gm
    }

    /**
     * Está función devuelve una expresión regular de direcciones de casas, negocios, etc.
     * @returns {RegExp} Devuelve una expresión regular
     */
     static obtenerRegNombreNegocio(){
        return /^[(a-z|A-Z) _\.\-,0-9\n\#áéíóúÁÉÍÓÚ]+$/gm
    }

    /**
     * La contraseña debe tener al entre 8 y 16 caracteres,
     * al menos un dígito, al menos una minúscula,
     * al menos una mayúscula y al menos un caracter no alfanumérico.
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegContrasena(){
        return /(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/gm
    }

    /**
     * Está expresión valida un pin de entre 4 y 8 digitos
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegParaPin(){
        return /^\d{4,8}/gm
    }

    /**
     * Está expresión valida digitos enteros o que lleven 2 decimales
     * @returns {RegExp} Devuelve una expresión regular
     */
    static obtenerRegParaNumerosCon2Decimales(){
        return /^\d+(\.\d{1,2})?$/gm
    }

    /**
     * Valida un número entero, la cadena debe contener al menos un número entre 0 y 9
     * @param {string} texto Texto de entrada para validar
     * @returns {boolean} Devuelve verdadero si la cadena es valida
     */
    static validarNumeroEntero(texto){
        return AExpReg.obtenerRegNumeroEntero().test(texto);
    }

    /**
     * Valida un numeros entero o numeros con 2 decimales
     * @param {string} texto Texto de entrada para validar
     * @returns {boolean} Devuelve verdadero si la cadena es valida
     */
    static validarNumeroCon2Decimales(texto){
        return AExpReg.obtenerRegParaNumerosCon2Decimales().test(texto);
    }

    /**
     * Valida una cadena un pin de entre 4 y 8 digitos
     * @param {string} texto Texto a validar
     * @returns {boolean}
     */
    static validarPin(texto){
        return AExpReg.obtenerRegParaPin().test(texto);
    }

    /**
     * La contraseña debe tener al entre 8 y 16 caracteres,
     * al menos un dígito, al menos una minúscula,
     * al menos una mayúscula y al menos un caracter no alfanumérico.
     * @param {string} contrasena Parametro que recibe un string de la contraseña
     * @returns {boolean} Devuelve una expresión regular
     */
    static validarContrasena(contrasena){
        return AExpReg.obtenerRegContrasena().test(contrasena);
    }

    /**
     * Valida si el nombre de negocio contiene caracteres validos
     * @param {string} nombre_negocio Recibe un nombre de negocio
     * @returns {boolean}
     */
    static validarNombreNegocio(nombre_negocio){
        return AExpReg.obtenerRegDirecciones().test(nombre_negocio);
    }

    /**
     * Está función valida un correo electrónico y devuelve verdadero o falso si el patrón coincide
     * @param {string} correo Recibe el correo electrónico para validar
     * @returns {boolean}
     */
    static validarCorreoElectronico(correo){
        return AExpReg.obtenerExpRegCorreoElectronico().test(correo);
    }

    /**
     * Valida cualquier número de telefono
     * @param {string} telefono Recibe cualquier número de Teléfono
     * @returns {boolean} Devuelve verdadero si el número coincide, de lo contrario fallbackResource
     */
    static validarNumeroTelefonico(telefono){
        return AExpReg.obtenerRegNumeroTelefono().test(telefono);
    }

    /**
     * Valida cualquier número de telefono sin signo mas obligatorio
     * @param {string} telefono Recibe cualquier número de Teléfono
     * @returns {boolean} Devuelve verdadero si el número coincide, de lo contrario fallbackResource
     */
    static validarNumeroTelefonicoSinSignoMas(telefono){
        return AExpReg.obtenerRegNumeroTelefonoSinSignoMas().test(telefono);
    }

    /**
     * Validaa si el texto no contiene números o cualquier otro caracter que no sea de (A-Z|a-z) con espacios o sin espacios
     * @param {string} texto Recibe el texto a validar
     * @returns {boolean} Devuelve verdadero si el texto coincide con el patron
     */
    static validarSoloLetrasConEspacios(texto){
        return AExpReg.obtenerRegSoloLetrasConEspacios().test(texto);
    }

    /**
     * Valida si el texto no contiene números o cualquier otro caracter
     * el texto debe contener al menos un caracter para que devuelva verdadero
     * @param {string} texto Recibe el texto a validar
     * @returns {boolean} Devuelve verdadero si el texto coincide con el patrón
     */
    static validarSoloLetrasConEspaciosAlMenos1Letra(texto){
        return AExpReg.obtenerRegSoloLetrasConEspaciosAlMenos1Letra().test(texto);
    }

    /**
     * Está función valida si la dirección es contiene los caracteres correctos
     * @param {string} direccion Recibe el texto a validar
     * @returns {boolean} Devuelve verdadero si el texto coincide con el patrón
     */
    static validarDireccion(direccion){
        return AExpReg.obtenerRegDirecciones().test(direccion);
    }

    /**
     * Está función valida si el texto contiene los caracteres correctos en relación con el patrón
     * Si el patrón coincide con el texto devuelve verdadero, de lo contrario devuelve falso
     * @param {string} texto Recibe el texto a validar
     * @returns {boolean} Devuelve verdadero si el texto coincide con el patrón
     */
    static validarSoloLetrasNumerosConEspacios(texto){
        return AExpReg.obtenerRegSoloLetrasNumerosConEspacios().test(texto);
    }

};

export default AExpReg;