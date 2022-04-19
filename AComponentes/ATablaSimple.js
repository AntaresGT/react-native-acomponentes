import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import AEtiqueta from './AEtiqueta';

class ATablaSimple extends React.Component {

    /**
     * @constructor
     * @param {Object} props Este parametro lo llena automaticamente React
     * @param {boolean} [props.visible=true] Indica si la tabla esta visible o no
     * @param {StyleSheet} [props.estilos] Estilos a aplicar a la tabla
     * @param {StyleSheet} [props.estilosScroll] Estilos a aplicar al scroll de la tabla
     * @param {Array<string>} props.encabezados Encabezados de la tabla
     * @param {Array<Array<React.Component|string>>} props.datosTabla Datos de la tabla, cada fila es un array, cada celda es un componente o un string, los datos se compoonen array de arrays
     * @param {Array<number|string>|string|number} [props.anchoEncabezados] Ancho de los encabezados
     */
    constructor(props) {
        super(props);
    }

    render() {
        let visible = true;

        if (this.props.hasOwnProperty('visible')) {
            visible = this.props.visible;
        }

        if (visible) {
            return (
                <View style={[estilosGenerales.contenedor]}>
                    {/** Encabezados de la tabla */}
                    {(
                        this.props.hasOwnProperty('encabezados') &&
                        <View style={[estilosGenerales.contenedorCabeceras]}>
                            {
                                this.props.encabezados.map((encabezado, indice) => {
                                    if(typeof encabezado === "string"){
                                        return <AEtiqueta key={indice} estilos={{ textAlign: "center", color: "white", flex: 1 }}>{encabezado}</AEtiqueta>
                                    }
                                    else{
                                        return <View key={indice} style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>{encabezado}</View>;
                                    }
                                })
                            }
                        </View>
                    )}
                    {/** Datos de la tabla */}
                    <ScrollView
                        nestedScrollEnabled={true}
                        needsOffscreenAlphaCompositing={true}
                    >
                        <View style={estilosGenerales.contenedorDatos}>
                            {
                                this.props.datosTabla.map((fila, indiceFila) => {
                                    return <View key={indiceFila} style={[estilosGenerales.filas]}>
                                        {
                                            fila.map((celda, indiceCelda) => {
                                                if(typeof celda === "string"){
                                                    return <AEtiqueta key={indiceCelda} estilos={{ flex: 1, textAlign: "center" }}>{celda}</AEtiqueta>;
                                                }
                                                else{
                                                    return <View key={indiceCelda} style={{ flex: 1, alignItems: "center", justifyContent:"center" }}>{celda}</View>;
                                                }
                                            })
                                        }
                                    </View>;
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else {
            return <></>;
        }
    }
}

const estilosGenerales = StyleSheet.create({
    contenedor: {
        width: "100%",
        marginVertical: 10
    },
    contenedorCabeceras: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#0D546C',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    contenedorDatos: {
        borderWidth: 2,
        borderColor: '#0D546C',
        height: 100
    },
    contenedorCeldas: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
    },
    filas: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10
    }
});

export {
    ATablaSimple
}