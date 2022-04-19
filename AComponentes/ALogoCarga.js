import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Modal
} from 'react-native';


// Componentes
import AEtiqueta from './AEtiqueta';

/**
 * componente de menú salida de proveedores
 */
class ALogoCarga extends React.Component {

    /**
       *
       * @param {Object} props este parametro lo llena automáticamente el react natiive
       * @param {boolean} props.visible Muestra el logo de carga si es verdadero, de lo contrario se oculta (Obligatorio)
       * @param {string} props.imagen Ruta de la imagen o gif que se mostrará en el logo de carga (Obligatorio)
       * @param {string} [props.mensaje] Texto que se mostrará en el logo de carga (Opcional)
       * @param {StyleSheet} [props.estilosImagen] Le da estilos a la imagen (Opcional)
       */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.visible}
            >
                <View style={[estilos.contenedor]}>
                    <View style={estilos.contenedorImagen}>
                        <Image source={this.props.imagen || require('./../recursos/img/logo_rotado.gif')}
                            style={[estilos.imagenFondo, this.props.estilosImagen]} />
                        {
                            this.props.hasOwnProperty('mensaje') &&
                            <AEtiqueta estilos={{ textAlign: "center" }}>
                                {this.props.mensaje}
                            </AEtiqueta>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
};

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "rgba(36, 36, 36, 0.8)"

    },
    contenedorImagen: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",

        alignItems: "center",
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    imagenFondo: {
        width: 50,
        height: 50
    }
});

export default ALogoCarga;