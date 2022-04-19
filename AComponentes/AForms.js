import React, { useEffect, useImperativeHandle } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView
} from 'react-native';

import AEtiqueta from './AEtiqueta';
import ABoton from './ABoton';


class AForms extends React.Component {

    /**
     * Este componente es un contenedor de componentes que se pueden
     * agrupar en una sola vista.
     * @param {Object} props Este componente lo llena automaticamente react native
     * @param {React.MutableRefObject} ref Referencia al componente
     * @param {string} [props.titulo] Titulo que se muestra en el formulario
     * @param {StyleSheet} [props.estilos] Esta propiedad le asigna estilos al contenedor
     * @param {FunctionNumber} [props.botonPresionado] Retorna el indice del boton presionado number
     * @param {string} [props.colorStatusBar] Color del status bar (Notch)
     * @param {StyleSheet} [props.estilosPieBotones] Le da estilos a los botones del pie del formulario
     * @param {StyleSheet} [props.estilosPie] Le da estilos al pie del formulario
     * @param {StyleSheet} [props.estilosFormulario] Le da estilos al contenedor donde va el formulario
     * @param {StyleSheet} [props.estilosScroll] Le da estilos al scroll del formulario
     * @param {boolean} [props.statusBar] Esta propiedad le permite ocultar el status bar, por defecto es true
     * @returns {React.Component}
     */
    constructor(props) {
        super(props);

        this.anadeStatusBar = true;

        if (props.hasOwnProperty('statusBar')) {
            this.anadeStatusBar = this.props.statusBar;
        }
    }

    /**
      * Retorna el tipo de control
      * @returns {string} AForms
      */
    get TipoControl() {
        return "AForms";
    }

    /**
     * Esta funcion retorna el indice del botón presionado
     * @param {number} indiceBotonPresionado Indice del boton presionado
     */
    _btnPresionadoFormulario(indiceBotonPresionado) {
        if (this.props.hasOwnProperty('botonPresionado')) {
            this.props.botonPresionado(indiceBotonPresionado);
        };
    }

    /**
     * Retorna una configuración simple del formulario
     * @returns {React.Component}
     */
    RenderSimple = () => {
        return (
            <>
                <View
                    style={[
                        estilosAFormsGenerales.contenedorSimple,
                        this.props.estilos
                    ]}
                >
                    {(
                        this.props.titulo &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorTitulo,
                                this.props.estilosContenedorTitulo
                            ]}
                        >
                            <AEtiqueta estilos={[
                                estilosAFormsGenerales.titulo
                            ]}>
                                {this.props.titulo || "Formulario"}
                            </AEtiqueta>
                        </View>
                    )}
                    <View
                        style={[
                            this.props.estilosScroll,
                            {
                                marginTop: (this.props.titulo) ? 0 : 40,
                            }
                        ]}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={[this.props.estilosFormulario]}>
                                {this.props.children}
                            </View>
                        </ScrollView>
                    </View>
                    {(
                        this.props.listaBotones &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorBotones,
                                this.props.estilosPie
                            ]}
                        >
                            {
                                this.props.listaBotones.map((item, indice) => {
                                    return <ABoton key={indice} botonPresionado={() => this._btnPresionadoFormulario(indice)} estilos={[{ marginHorizontal: 10, marginBottom: 30, marginTop: 10 }, this.props.estilosPieBotones]} texto={item.toString()} />
                                })
                            }
                        </View>
                    )}
                </View>
                {(
                    this.anadeStatusBar == true &&
                    <StatusBar backgroundColor={this.props.colorStatusBar} />
                )}
            </>
        );
    };

    /**
     * Retorna una configuración de un formulario extenso
     * @returns {React.Component}
     */
    RenderExtenso = () => {
        return (
            <>
                <View
                    style={[
                        estilosAFormsGenerales.contenedorSimple,
                        this.props.estilos
                    ]}
                >
                    {(
                        this.props.titulo &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorTitulo,
                                this.props.estilosContenedorTitulo
                            ]}
                        >
                            <AEtiqueta estilos={[
                                estilosAFormsGenerales.titulo
                            ]}>
                                {this.props.titulo || "Formulario"}
                            </AEtiqueta>
                        </View>
                    )}
                    <View
                        style={[
                            this.props.estilosScroll,
                            {
                                marginTop: (this.props.titulo) ? 0 : 40,
                            }
                        ]}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={[this.props.estilosFormulario]}>
                                {this.props.children}
                            </View>
                        </ScrollView>
                    </View>
                    {(
                        this.props.listaBotones &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorBotones,
                                this.props.estilosPie
                            ]}
                        >
                            {
                                this.props.listaBotones.map((item, indice) => {
                                    return <ABoton key={indice} botonPresionado={() => this._btnPresionadoFormulario(indice)} estilos={[{ marginHorizontal: 10, marginBottom: 30, marginTop: 10 }, this.props.estilosPieBotones]} texto={item.toString()} />
                                })
                            }
                        </View>
                    )}
                </View>
                {(
                    this.anadeStatusBar == true &&
                    <StatusBar backgroundColor={this.props.colorStatusBar} />
                )}
            </>
        );
    };

    /**
     * Retorna una configuración Avanzada del formulario
     * @returns {React.Component}
     */
    RenderAvanzado = () => {
        return (
            <>
                <View
                    style={[
                        estilosAFormsGenerales.contenedorSimple,
                        this.props.estilos
                    ]}
                >
                    {(
                        this.props.titulo &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorTitulo,
                                this.props.estilosContenedorTitulo
                            ]}
                        >
                            <AEtiqueta estilos={[
                                estilosAFormsGenerales.titulo
                            ]}>
                                {this.props.titulo || "Formulario"}
                            </AEtiqueta>
                        </View>
                    )}
                    <View
                        style={[
                            this.props.estilosScroll,
                            {
                                marginTop: (this.props.titulo) ? 0 : 40,
                            }
                        ]}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={[this.props.estilosFormulario]}>
                                {this.props.children}
                            </View>
                        </ScrollView>
                    </View>
                    {(
                        this.props.listaBotones &&
                        <View
                            style={[
                                estilosAFormsGenerales.contenedorBotones,
                                this.props.estilosPie
                            ]}
                        >
                            {
                                this.props.listaBotones.map((item, indice) => {
                                    return <ABoton key={indice} botonPresionado={() => this._btnPresionadoFormulario(indice)} estilos={[{ marginHorizontal: 10, marginBottom: 30, marginTop: 10 }, this.props.estilosPieBotones]} texto={item.toString()} />
                                })
                            }
                        </View>
                    )}
                </View>
                {(
                    this.anadeStatusBar == true &&
                    <StatusBar backgroundColor={this.props.colorStatusBar} />
                )}
            </>
        );
    };

    render() {
        let tipoRender = "avanzado";

        if (this.props.hasOwnProperty('tipoFormulario')) {
            tipoRender = this.props.tipoFormulario;
        }

        if (tipoRender.toLowerCase() === "simple") {
            return <this.RenderSimple />;
        }
        else
            if (tipoRender.toLowerCase() === "extenso") {
                return <this.RenderExtenso />;
            }
            else
                if (tipoRender.toLowerCase() === "avanzado") {
                    return <this.RenderAvanzado />;
                }
    }
}

const estilosAFormsGenerales = StyleSheet.create({
    contenedorSimple: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    contenedorTitulo: {
        display: "flex",
        flexDirection: "column",
        marginTop: 40,
        marginBottom: 15,
        justifyContent: "center",
    },
    titulo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    contenedorBotones: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    }
});

export default AForms;