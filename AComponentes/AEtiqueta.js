import React from 'react';
import {
    Text,
    Dimensions,
    StyleSheet,
    Appearance
} from 'react-native';

import {
    devolverTamanoTextoPorPixeles
} from './AExtensiones';

/**
 * Este componente contiene todas las funciones automaticas para auto renderizarse
 * con respecto al tamaño de pantalla y el tema
 */
class AEtiqueta extends React.Component {

    /**
     * @param {Object} props Este parametro react native lo llena automaticamente
     * @param {StyleSheet} [props.estilos] Estilos que se le pasa a la etiqueta
     * @param {boolean} [props.visible] Si es false, no se muestra la etiqueta
     */
    constructor(props) {
        super(props);
        this.state = {
            tamanoLetra: devolverTamanoTextoPorPixeles(Dimensions.get('window').width),
            colorTexto: "black"
        }

        let _limpioMemoria = false;
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

        const suscripcionTema = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === "dark") {
                this._limpioMemoria && this.setState({
                    colorTexto: "white"
                })
            }
            else {
                this._limpioMemoria && this.setState({
                    colorTexto: "black"
                });
            }

            return 0;
        });

        suscripcionTamano?.remove();
        suscripcionTema?.remove();
    }

    componentWillUnmount(){
        this._limpioMemoria = false;
    }

    get TipoControl() {
        return "AEtiqueta";
    }

    render() {
        let visible = true;

        if (this.props.hasOwnProperty('visible')) {
            visible = this.props.visible;
        }

        if (visible) {
            return (
                <Text
                    style={[
                        {
                            fontSize: this.state.tamanoLetra,
                            color: this.state.colorTexto
                        },
                        this.props.estilos,
                    ]}
                >
                    {this.props.children}
                </Text>
            );
        }
        else {
            return <></>;
        }
    }
};

export default AEtiqueta;