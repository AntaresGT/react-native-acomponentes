import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import {
    devolverTamanoTextoPorPixeles
} from './AExtensiones';

class ABoton extends React.Component {

    /**
     * Este componente representa un boton
     * @param {Object} props Esta propiedad la llena automaticamente react native
     * @param {string} props.texto Esta propiedad muestra un texto dentro del boton
     * @param {React.MutableRefObject} [props.ref] Referencia a la caja de texto
     * @param {Function} props.botonPresionado Evento que se ejecuta cuando el boton es presionado
     * @param {StyleSheet} [props.estilos] Esta propiedad le da estilos al View que contiene el TouchableOpacity
     * @param {StyleSheet} [props.estilosTexto] Esta propiedad le da estilos al Text que contiene el boton
     * @param {Function} [props.botonPresionadoBastanteTiempo] Evento que se ejecuta cuando el boton es presionado bastante tiempo
     * @param {string} [props.tipoBoton] Tema del boton a mostrar en pantalla, puede ser primario|secundario|advertencia|advertencia
     * @param {boolean} [props.visible] Esta propiedad le permite ocultar el boton
     * @returns {React.Component}
     */
    constructor(props) {
        super(props);
        this.state = {
            tamanoLetra: devolverTamanoTextoPorPixeles(Dimensions.get('window').width)
        };

        this.estilosBoton = botonPrimario;
        this._limpioMemoria = false;
        this._elegirTemaBoton();
    }

    componentDidMount() {
        this._limpioMemoria = true;
        this._limpioMemoria && this._eventos();
    }

    _eventos(){
        const suscripcionTamano = Dimensions.addEventListener("change", ({ window }) => {
            const tamano = devolverTamanoTextoPorPixeles(window.width);
            this._limpioMemoria && this.setState({ tamanoLetra: tamano });

            return tamano;
        }, [this.state.tamanoLetra]);

        suscripcionTamano?.remove();
    }

    componentWillUnmount(){
        this._limpioMemoria = false;
    }

    get TipoControl() {
        return "ABoton";
    }

    _elegirTemaBoton() {
        // Tema Boton
        this.estilosBoton = botonPrimario;
        if (this.props.hasOwnProperty('tipoBoton')) {
            if (this.props.tipoBoton.toLowerCase() === "primario") {
                this.estilosBoton = botonPrimario;
            }
            else
                if (this.props.tipoBoton.toLowerCase() === "secundario") {
                    this.estilosBoton = botonSecundario;
                }
                else
                    if (this.props.tipoBoton.toLowerCase() === "advertencia") {
                        this.estilosBoton = botonAdvertencia;
                    }
                    else {
                        this.estilosBoton = botonPrimario;
                    }
        }
    }

    _botonPresionadoBastanteTiempo = async (e) => {
        e.preventDefault();
        if (this.props.hasOwnProperty(`botonPresionadoBastanteTiempo`)) {
            await this.props.botonPresionadoBastanteTiempo(e);
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
                        estilosGenericosBoton.botonPresionable,
                        this.estilosBoton.coloresBoton,
                        this.props.estilos
                    ]}
                >
                    <TouchableOpacity
                        onPress={this.props.botonPresionado}
                        style={[estilosTouchable.touchable]}
                        onLongPress={this._botonPresionadoBastanteTiempo}
                    >
                        <Text
                            style={[
                                this.estilosBoton.texto,
                                {
                                    fontSize: this.state.tamanoLetra
                                },
                                this.props.estilosTexto
                            ]}
                        >
                            {this.props.texto}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return <></>;
        }
    }
}

const estilosTouchable = StyleSheet.create({
    touchable: {
        flexDirection: "row",
        display: "flex",
        width:"100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

const estilosGenericosBoton = StyleSheet.create({
    botonPresionable: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    }
});

const botonPrimario = StyleSheet.create({
    coloresBoton: {
        backgroundColor: '#0D546C',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    texto: {
        color: '#fff'
    }
});

const botonSecundario = StyleSheet.create({
    coloresBoton: {
        backgroundColor: "#1F94AF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    texto: {
        color: '#fff'
    }
});

const botonAdvertencia = StyleSheet.create({
    coloresBoton: {
        backgroundColor: "#FFC107",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    texto: {
        color: "black"
    }
});

export default ABoton;