import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    NativeModules
} from 'react-native';

import AEtiqueta from './AEtiqueta';
import APanel from './APanel';
import AForms from './AForms';
import ACajaTexto from './ACajaTexto';
import AListaPlana from './AListaPlana';
import ABoton from './ABoton';

import {
    EMensajes
} from './AExtensiones';

/**
 * Esta clase abre la camara del dispositivo para escanear un codigo de barras o QR
 * @class
 */
class ACamaraEscaner extends React.Component {

    /**
     * @constructor
     * @param {Object} props Este objeto lo llena automaticamente react
     * @param {string} [props.titulo] Le da un titulo al componente
     * @param {string} [props.valor] Le da un valor al componente
     * @param {FunctionStringCallback} props.textoCodigo Funcion que devuelve el código escaneado
     * @param {FunctionStringCallback} [props.huboError] Funcion que se ejecuta cuando hay un error
     */
    constructor(props) {
        super(props);
        this.state = {
            visible_panel_codigo_manual: false,
            visible_panel_codigos_barras: false,
            lista_codigos_barras: [],
            lbd_codigoBarras: "",
        };

        this.ACamaraNativo = NativeModules.ACamaraNativo;
    }

    _verificarCodgiosEscaneados(codigos_escaneados) {
        if(codigos_escaneados.toString().toLowerCase().includes("ingresar manualmente")){
            this.setState({
                visible_panel_codigo_manual: true,
                visible_panel_codigos_barras: false,
                lista_codigos_barras: [],
            });
        }
        else{
            const codigos = codigos_escaneados.split("|").filter(codigo => codigo !== "");
            if (codigos.length > 1) {
                let lista_codigos = [];

                for(let i = 0; i < codigos.length; i++) {
                    lista_codigos.push({
                        codigo_barra: codigos[i]
                    });
                }

                this.setState({
                    lista_codigosBarras: lista_codigos,
                    visible_panel_codigos_barras: true,
                    visible_panel_codigo_manual: false,
                    lbd_codigoBarras: ""
                });
            }
            else {
                this.setState({
                    lista_codigosBarras: [],
                    visible_panel_codigos_barras: false,
                    visible_panel_codigo_manual: false,
                });
                this.props.textoCodigo(codigos[0]);
            }
        }
    }

    _escanearCodigoBarrasQR() {
        this.setState({
            lista_codigosBarras: [],
            visible_panel_codigos_barras: false,
            visible_panel_codigo_manual: false,
        });

        this.ACamaraNativo.LeerCodigo()
            .then(res => {
                const respuestaACamaraNativo = res.toString();
                if(respuestaACamaraNativo.includes(EMensajes.CANCELADO)){
                    if(respuestaACamaraNativo.includes("Ingresar manualmente")){
                        this.setState({
                            visible_panel_codigo_manual: true,
                            visible_panel_codigos_barras: false,
                            lista_codigos_barras: [],
                        });
                    }
                    else
                    if(respuestaACamaraNativo.includes("Cancelado")){
                        this.setState({
                            visible_panel_codigo_manual: false,
                            visible_panel_codigos_barras: false,
                            lista_codigos_barras: [],
                        });
                    }
                    else{
                        this.setState({
                            visible_panel_codigo_manual: false,
                            visible_panel_codigos_barras: false,
                            lista_codigos_barras: [],
                        });
                    }
                }
                else{
                    this._verificarCodgiosEscaneados(respuestaACamaraNativo);
                }
            }).catch(err => {
                console.log(err);
                if(this.props.hasOwnProperty('huboError')){
                    this.props.huboError(err.toString());
                }
            });
    }

    ItemCodigos = (item, index) => {
        return (
            <View key={index} style={estilosGenerales.itemCodigos}>
                <TouchableOpacity
                    style={
                        {
                            width: "100%",
                        }
                    }
                    onPress={() => {
                        this.props.textoCodigo(item.codigo_barra);
                        this.setState({
                            visible_panel_codigo_manual: false,
                            visible_panel_codigos_barras: false,
                            lista_codigos_barras: [],
                        });
                    }}
                >
                    <AEtiqueta
                        estilos={{
                            textAlign: "left"
                        }}
                    >
                        {item.codigo_barra}
                    </AEtiqueta>
                </TouchableOpacity>
            </View>
        );
    }

    CodigosBarraQR = () => {
        return(
            <APanel
                visible={this.state.visible_panel_codigos_barras}
                estilos={{ flex: 1 }}
                transparente={false}
            >
                <AForms
                    titulo={"Seleccione un código"}
                    listaBotones={["Cancelar"]}
                    botonPresionado={(e) => {
                        this.setState({
                            visible_panel_codigo_manual: false,
                            visible_panel_codigos_barras: false,
                            lista_codigos_barras: []
                        });
                    }}
                    estilos={{ flex: 1 }}
                    estilosContenedorTitulo={{ flex: 0.2 }}
                    estilosScroll={{ flex: 1 }}
                    estilosPieBotones={{ flex: 0.5 }}
                >
                    <AListaPlana
                        estilos={{ flex: 1 }}
                        lista={this.state.lista_codigosBarras}
                        items={this.ItemCodigos}
                    />
                </AForms>
            </APanel>
        );
    }

    _enviarCodigoBarras(codigo_barras){
        if(codigo_barras === ""){
            
        }
        else{
            this.props.textoCodigo(codigo_barras);
            this.setState({
                visible_panel_codigo_manual: false,
                visible_panel_codigos_barras: false,
                lista_codigos_barras: [],
            });
        }
    }

    PanelCodigoManual = () => {

        const [ txt_codigoBarras, fijartxt_codigoBarras ] = useState("");

        return (
            <APanel
                visible={this.state.visible_panel_codigo_manual}
                estilos={{ flex: 1 }}
            >
                <AForms
                    titulo={"Ingresar código manualmente"}
                    estilos={{ flex: 1 }}
                    tipoFormulario={"simple"}
                >
                    <ACajaTexto
                        titulo={"Código de barras"}
                        placeholder={"Ingresar código de barras"}
                        valor={txt_codigoBarras}
                        cambioTextoTeclaPulsada={(e) => { fijartxt_codigoBarras(e); }}
                    />
                    <View style={[estilosGenerales.contenedorBotones]}>
                        <View style={[estilosGenerales.estilosBotones]}>
                            <ABoton
                                texto={"Aceptar"}
                                tipoBoton={"comun"}
                                estilos={{ alignItems: "center" }}
                                estilosTexto={{ textAlign: 'center' }}
                                botonPresionado={(e) => { this._enviarCodigoBarras(txt_codigoBarras); }}
                            />
                        </View>
                        <View style={[estilosGenerales.estilosBotones]}>
                            <ABoton
                                texto={"Cancelar"}
                                tipoBoton={"comun"}
                                estilos={{ alignItems: "center" }}
                                estilosTexto={{ textAlign: 'center' }}
                                botonPresionado={(e) => {
                                    fijartxt_codigoBarras("");
                                    this.setState({
                                        visible_panel_codigo_manual: false,
                                        visible_panel_codigos_barras: false,
                                        lista_codigos_barras: []
                                    });
                                }}
                            />
                        </View>
                    </View>
                </AForms>
            </APanel>
        );
    }

    _textoRender(){
        if(this.props.hasOwnProperty('valor')){
            if(this.props.valor !== ""){
                return this.props.valor;
            }
            else{
                return this.props.titulo || "Toca para escanear";
            }
        }
        else{
            return this.props.titulo || "Toca para escanear";
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
                        estilosGenerales.contenedor,
                        estilosGenerales.botonPresionable,
                        this.props.estilos
                    ]}
                >
                    <this.CodigosBarraQR />
                    <this.PanelCodigoManual />
                    <TouchableOpacity
                        style={[
                            estilosGenerales.touchable
                        ]}
                        onPress={() => {
                            this._escanearCodigoBarrasQR();
                        }}
                    >
                        <AEtiqueta estilos={{ textAlign: "center" }}>
                            {this._textoRender()}
                        </AEtiqueta>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return <></>;
        }
    }
};

const estilosGenerales = StyleSheet.create({
    contenedor: {
        backgroundColor: '#0D546C'
    },
    botonPresionable: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    touchable: {
        flexDirection: "row",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    itemCodigos:{
        margin: 15,
        borderBottomColor: "#2d2d2dad",
        borderBottomWidth: 1
    },
    contenedorBotones: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    estilosBotones: {
        width: 150,
        height: 60,
        paddingHorizontal: 10
    }
});

export default ACamaraEscaner;