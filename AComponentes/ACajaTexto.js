import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Appearance
} from 'react-native';

import {
    temaOscuro,
    temaClaro
} from './ATemas';
import AEtiqueta from './AEtiqueta';
import AExpReg from './ARegExp';


import {
    devolverTamanoTextoPorPixeles
} from './AExtensiones';

class ACajaTexto extends React.Component {

    /**
     * 
     * @param {Object} props Esto lo llena automaticamente react native
     * @param {string} [props.titulo] Este parametro muestra un texto arriba del TextInput
     * @param {StyleSheet} [props.estilos] Le da estilos al contenedor del ACajaTexto
     * @param {FunctionStringCallback} [props.cambioTexto] Función que se ejecuta cuando se cambia el texto del ACajaTexto
     * @param {FunctionStringCallback} [props.cambioTextoTeclaPulsada] Función que se ejecuta cuando se pulsa una tecla en el ACajaTexto
     * @param {FunctionVoidCallback} [props.onFocus] Función que se ejecuta cuando se pone el foco en el ACajaTexto
     * @param {boolean} [props.multilinea] Si es true, el ACajaTexto es multilinea y pueden escribir varias líneas
     * @param {boolean} [props.visible] Si es false, no se muestra el ACajaTexto
     * @param {boolean} [props.editable] Si es false, el ACajaTexto no se puede editar
     * @param {string} [props.tipoEntrada] Tipo de entrada que se le pasa al TextInput, para más información ver https://reactnative.dev/docs/textinput#keyboardtype
     * @param {number} [props.maxCaracteres] Limita al ACajaTexto a un número de caracteres
     * @param {string} [props.alineacionTexto] Alineación del texto dentro del texto editable (Puede ser left|right|center), para más información ver https://reactnative.dev/docs/textinput#textalign
     * @param {StyleSheet} [props.estilosTitulo] Estilos del texto del titulo
     * @param {StyleSheet} [props.estilosError] Estilos del texto editable
     * @param {RegExp} [props.expRegular] Patron para validar si el texto coincide con el mismo
     * @param {FunctionCallback} [props.contenidoCambioTamano] Función que se ejecuta cuando el ACajaTexto cambia de tamaño el texto escrito, esto solo funciona si el ACajaTexto es multilinea
     * @param {string} [props.colorPlaceholder] Color del placeholder
     * @param {StyleSheet} [props.estilosTxt] Le da estilos al TextInput
     */
    constructor(props) {
        super(props);
        const temaActual = Appearance.getColorScheme();
        this.state = {
            // Tema
            colorTitulo: (temaActual === 'dark') ? temaOscuro.colorTituloACajaTexto : temaClaro.colorTituloACajaTexto,
            colorPlaceholder: (this.props.hasOwnProperty('colorPlaceholder')) ? this.props.colorPlaceholder : (temaActual === 'dark') ? temaOscuro.placeholderACajaTexto : temaClaro.placeholderACajaTexto,
            colorMsjError: (temaActual === "dark") ? temaOscuro.msjError : temaClaro.msjError,
            colorNoEditable: (temaActual === "dark") ? temaOscuro.colorNoEditable : temaClaro.colorNoEditable,
            // Control
            errorTexto: "",
            texto: "",
        };

        let txt;
        this._limpioMemoria = false;
    }

    get TipoControl() {
        return "ACajaTexto";
    }

    componentDidMount() {
        this._limpioMemoria = true;
        this._limpioMemoria && this._eventos();
    }

    _eventos(){
        const suscripcionTema = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === "dark") {
                this._limpioMemoria && this.setState({
                    colorTitulo: temaOscuro.colorTituloACajaTexto,
                    colorPlaceholder: (this.props.hasOwnProperty('colorPlaceholder')) ? this.props.colorPlaceholder : (colorScheme === 'dark') ? temaOscuro.placeholderACajaTexto : temaClaro.placeholderACajaTexto,
                    colorMsjError: temaOscuro.msjError,
                    colorNoEditable: temaOscuro.colorNoEditable
                });
            }
            else {
                this._limpioMemoria && this.setState({
                    colorTitulo: temaClaro.colorTituloACajaTexto,
                    colorPlaceholder: (this.props.hasOwnProperty('colorPlaceholder')) ? this.props.colorPlaceholder : (colorScheme === 'dark') ? temaOscuro.placeholderACajaTexto : temaClaro.placeholderACajaTexto,
                    colorMsjError: temaClaro.msjError,
                    colorNoEditable: temaClaro.colorNoEditable
                });
            }

            return 0;
        });

        suscripcionTema?.remove();
    }

    componentWillUnmount(){
        this._limpioMemoria = false
    }

    _onFocus() {
        if (this.props.hasOwnProperty('onFocus')) {
            this.props.onFocus();
        }
    }

    /**
     * Fija el foco en el ACajaTexto
     */
    _fijarFocoTxt() {
        if (this.txt) {
            this.txt.focus();
        }
    }

    /**
     * Esta funcion valida la cadena contra la expresión regular
     * @param {string} cadena Cadena a validar
     * @returns {boolean} Si la cadena coincide con la expresión regular
     */
    _cadenaValida(cadena) {
        return AExpReg.validarExpresionRegular(this.props.expRegular, cadena);
    }

    /**
     * Envia el texto a la función que se le pase como prop
     * @param {string} e Texto que se ingresa en el TextInput
     */
    _cambioTexto(e) {
        this.setState({ texto: e });
        if (this.props.hasOwnProperty('cambioTexto')) {
            this.props.cambioTexto(e);
        }

        if (this.props.hasOwnProperty('requerido')) {
            if (this.props.requerido) {
                if (e.length === 0) {
                    this.fijarMsjError("Este campo es requerido");
                }
                else {
                    this.fijarMsjError("");
                }
            }
        }

        if (this.props.hasOwnProperty('expRegular')) {
            if (!this._cadenaValida(e)) {
                this.fijarMsjError("El campo contiene caracteres no válidos");
            }
            else {
                this.fijarMsjError("");
            }
        }
    }

    /**
     * Esta función devuelve un string por cada tecla pulsada
     * en el TextInput
     * @param {string} e Texto que se ingresa en el TextInput
     */
    _cambioTextoTeclaPulsada(e) {
        this.setState({ texto: e });
        if (this.props.hasOwnProperty('cambioTextoTeclaPulsada')) {
            this.props.cambioTextoTeclaPulsada(e);
        }
    }

    /**
     * Establece el foco en el campo de texto
     */
    focus() {
        this.txt.focus();
    }

    /**
     * Muestra un error en pantalla
     * @param {string} err Error al mostrar
     */
    fijarMsjError(err) {
        this.setState({ errorTexto: err });
    }

    /**
     * Este componente muestra un titulo arriba del TextInput
     * @returns {React.Component} Componente que muestra el titulo
     */
    ObtenerTituloComponente = () => {
        if (this.props.hasOwnProperty('titulo')) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => this._fijarFocoTxt()}
                >
                    <AEtiqueta
                        estilos={[
                            {
                                color: this.state.colorTitulo
                            },
                            this.props.estilosTitulo
                        ]}
                    >
                        {this.props.titulo}
                    </AEtiqueta>
                </TouchableWithoutFeedback>
            );
        }
        else {
            return <></>;
        }
    }

    /**
     * Este componente muestra un error en pantalla en relación a lo escrito en ACajaTexto
     * @returns {React.Component} Componente que muestra un error debajo del TextInput
     */
    ObtenerErrorTexto = () => {
        if (this.state.errorTexto === "") {
            return <></>;
        }
        else {
            return (
                <AEtiqueta
                    estilos={[
                        {
                            fontSize: devolverTamanoTextoPorPixeles(Dimensions.get('window').width) - 4,
                            color: this.state.colorMsjError,
                            paddingLeft: 3
                        },
                        this.props.estilosError
                    ]}
                >
                    {this.state.errorTexto}
                </AEtiqueta>
            );
        }
    }

    render() {
        let visible = true;
        if (this.props.hasOwnProperty('visible')) {
            visible = this.props.visible;
        }

        if (visible) {
            return (
                <View
                    style={[
                        estilosACajaTexto.contenedor,
                        this.props.estilos,
                    ]}
                >
                    <this.ObtenerTituloComponente />
                    <TextInput
                        ref={(p) => this.txt = p}
                        style={[
                            estilosACajaTexto.estilosTxt,
                            (this.props.hasOwnProperty('editable')) ? (this.props.editable == true) ? {} : { backgroundColor: this.state.colorNoEditable } : {},
                            this.props.estilosTxt
                        ]}
                        placeholder={(this.props.placeholder) ? this.props.placeholder : "Aa"}
                        placeholderTextColor={this.state.colorPlaceholder}
                        onChange={(e) => {e.preventDefault();  this._cambioTexto(e.nativeEvent.text)}}
                        onChangeText={(e) => {this._cambioTextoTeclaPulsada(e)}}
                        value={this.props.valor}
                        multiline={(this.props.multilinea) ? this.props.multilinea : false}
                        editable={(this.props.hasOwnProperty('editable')) ? this.props.editable : true}
                        onFocus={() => this._onFocus()}
                        keyboardType={(this.props.tipoEntrada) ? this.props.tipoEntrada : "default"}
                        textAlign={(this.props.alineacionTexto) ? this.props.alineacionTexto : "left"}
                        onContentSizeChange={this.props.contenidoCambioTamano}
                        returnKeyType={"next"}
                    />
                    <this.ObtenerErrorTexto />
                </View>
            );
        }
        else {
            return <></>;
        }
    }
};

const estilosACajaTexto = StyleSheet.create({
    contenedor: {
        display: "flex",
        flexDirection: "column",
    },
    estilosTxt: {
        borderBottomWidth: 1,
        borderBottomColor: "#A0A0A0",
        textAlignVertical: "center",
        paddingLeft: 1,
        marginBottom: 5,
    }
});

export default ACajaTexto;