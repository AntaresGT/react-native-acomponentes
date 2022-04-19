import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Appearance,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import AEtiqueta from './AEtiqueta';
import APanel from './APanel';
import ACajaTexto from './ACajaTexto';
import ABoton from './ABoton';

// Temas
import { temaClaro, temaOscuro } from './ATemas';

/**
 * Este componente es una lista de elementos que se pueden desplegar.
 */
class ADesplegable extends React.Component {

    /**
     * @constructor Crea un nuevo componente
     * @param {Object} props Este objeto contiene las propiedades del componente
     * @param {string} [props.titulo] Este parametro muestra un texto arriba del ADesplegable
     * @param {StyleSheet} [props.estilosTitulo] Estilos para el titulo
     * @param {StyleSheet} [props.estilos] Estilos para el ADesplegable
     * @param {string} [props.placeholderFiltro] Está propiedad renderiza un placeholder en el texto del filtro
     * @param {Icon} [props.icono] Icono que se mostrara en el ADesplegable
     * @param {Array} props.datos Datos que se mostraran en el ADesplegable
     * @param {string} props.valor Es el valor seleccionado y se mostrara en pantalla
     * @param {CallableFunction<string|number>} [props.cambioSeleccion] Este es un evento que envía el valor seleccionado
     * @param {CallableFunction<string>} [props.guardarTexto] Genera un evento que devuelve un texto, este evento proviene el botón "+ Guardar <texto>"
     * @param {CallableFunction<string, number>} [props.textoEditado] Genera un evento que devuelve el nuevo texto de la palabra que viene del desplegable
     * @param {boolean} [props.generarEventoGuardar] Está propiedad renderiza un botón si es verdadero, esté botón le dice al desplegable que si el registro buscado no existe entonces puede generarUnEvento click para guardar el registro inexistente
     * @param {boolean} [props.puedeEditar] Si es true el ADesplegable habilita botones para poder editar el valor de un elemento seleccionado
     * 
     */
    constructor(props) {
        super(props);

        const tema = Appearance.getColorScheme('dark');
        let valor_edicion = "34534534563455345354543465543565345635454326545432654434553";
        this.state = {
            // Estilos
            color_titulo: (tema === "dark") ? temaOscuro.colorTituloACajaTexto : temaClaro.colorTituloACajaTexto,
            colores_textos: (tema === "dark") ? temaOscuro.colorTexto : temaClaro.colorTexto,
            contenedorModal: (tema === "dark") ? temaOscuro.contenedoresModales : temaClaro.contenedoresModales,
            fondos: (tema === "dark") ? "#2d2d2d" : "#fff",
            // Opciones modal
            modal_visible: false,

            // Valores generales
            valor_edicion: valor_edicion,
            lista_auxialiar: this.props.datos,
            txt_edicion: "",
            alto_filtro: 0,
            txtRegistroInexistente: ""
        };

        let txt_filtro;
        let txt_textoEdicion;
        let _limpioMemoria = false;
    }

    componentDidMount() {
        this._limpioMemoria = true;
        this._limpioMemoria && this._eventos();
    }

    _eventos() {
        const suscripcionTema = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === "dark") {
                this._limpioMemoria && this.setState({
                    color_titulo: (colorScheme === "dark") ? temaOscuro.colorTituloACajaTexto : temaClaro.colorTituloACajaTexto,
                    colores_textos: (colorScheme === "dark") ? temaOscuro.colorTexto : temaClaro.colorTexto,
                    contenedorModal: (colorScheme === "dark") ? temaOscuro.contenedoresModales : temaClaro.contenedoresModales,
                    fondos: (colorScheme === "dark") ? "#2d2d2d" : "#fff",
                });
            }
            else {
                this._limpioMemoria && this.setState({
                    color_titulo: (colorScheme === "dark") ? temaOscuro.colorTituloACajaTexto : temaClaro.colorTituloACajaTexto,
                    colores_textos: (colorScheme === "dark") ? temaOscuro.colorTexto : temaClaro.colorTexto,
                    contenedorModal: (colorScheme === "dark") ? temaOscuro.contenedoresModales : temaClaro.contenedoresModales,
                    fondos: (colorScheme === "dark") ? "#2d2d2d" : "#fff",
                });
            }

            return 0;
        });

        suscripcionTema?.remove();
    }

    componentWillUnmount() {
        this._limpioMemoria = false;
    }

    get TipoControl() {
        return "ADesplegable";
    }

    /**
     * Esta función limpia el desplegable y vuelve a cargar
     * los datos
     */
    actualizarADesplegable(){
        this.setState({
            lista_auxialiar: this.props.datos,
            txtRegistroInexistente: "",
            valor_edicion: this.valor_edicion
        });

        this._filtrarLista("");
    }

    /**
     * Esta funcion cancela la seleccion del valor.
     */
    _presionarBotonCancelarModal() {
        this.setState({
            modal_visible: false,
            txt_filtro: "",
            lista_auxialiar: this.props.datos,
            valor_edicion: this.valor_edicion,
            txtRegistroInexistente: "",
        });
    }

    /**
     * Esta funcion filtra los elementos de la lista.
     * @param {string} texto Texto para filtrar en la lista
     */
    _filtrarLista(texto) {
        this.setState({
            txt_filtro: texto,
            valor_edicion: this.valor_edicion
        });

        if(texto !== ""){
            const listaFiltrada = this.props.datos.filter(item => item.texto.toLowerCase().includes(texto.toLowerCase()));

            if(listaFiltrada.length === 0){
                let generaEventoGuardar = false;

                if(this.props.hasOwnProperty('generarEventoGuardar')){
                    generaEventoGuardar = this.props.generarEventoGuardar;
                }

                if(generaEventoGuardar){
                    this.setState({
                        txtRegistroInexistente: texto,
                        valor_edicion: this.valor_edicion
                    });
                }
                else{
                    this.setState({
                        txtRegistroInexistente: "",
                        valor_edicion: this.valor_edicion
                    });
                }
            }
            
            this.setState({
                lista_auxialiar: listaFiltrada,
            });
        }
        else{
            this.setState({
                lista_auxialiar: this.props.datos,
                txtRegistroInexistente: "",
                valor_edicion: this.valor_edicion,
            })
        }
    }

    /**
     * Esta funcion prepara un formulario con el item seleccionado para edicion
     * @param {Object} item Item seleccionado para edicion
     */
    _itemSeleccionadoParaEdicion(item) {
        this.setState({
            valor_edicion: item.valor,
            txt_edicion: item.texto,
            refrescar_lista: false,
        });
        setTimeout(() => {
            this.txt_textoEdicion.focus();
        }, 10);
    }

    /**
     * Esta funcion coloca en la pantalla el item seleccionado y limpia los filtros.
     * @param {Object} item Item seleccionado por el usuario
     */
    _itemSeleccionado(item) {
        this.props.cambioSeleccion(item.valor);
        this.setState({
            modal_visible: false,
            txt_filtro: "",
            lista_auxialiar: this.props.datos,
            valor_edicion: this.valor_edicion,
            txtRegistroInexistente: "",
        });
        this.txt_edicion = "";
    }

    /**
      * Está función devuelve un texto con nuevo valor editado y devuelve el indice
      * @param {string} texto Nuevo texto
      * @param {number} valor Indice del texto editado
      * @returns {CallableFunction<string, number>}
      */
    _btnEdicionGuardar(texto, valor) {
        if (this.props.hasOwnProperty('textoEditado')) {
            setTimeout(() => {
                this._filtrarLista("");
            }, 10);
            this.props.textoEditado(texto, valor);
        }
    }

    /**
     * Esta funcion cancela la edicion del elemento seleccionado
     */
    _btnCancelarEdicion() {
        this.setState({
            valor_edicion: this.valor_edicion,
        });
    }

    /**
     * Retorna un color para el valor seleccionado
     * @param {string} valor Valor selecciónado
     * @returns {string}
     */
    _devolverColorObjetoSeleccionado(valor) {
        if (Appearance.getColorScheme() === "dark") {
            return (valor == this.props.valor) ? "#2f2f2f" : "#242424";
        }
        else {
            return (valor == this.props.valor) ? "#e4e4e4" : "white";
        }
    }

    ItemsLista = ({ item }) => {

        const ItemNormal = () => {
            return (
                <TouchableOpacity
                    onPress={(e) => this._itemSeleccionado(item)}
                    style={[
                        estilosModal.contenedorItemLista,
                        {
                            paddingHorizontal: (item.valor === this.props.valor) ? 10 : 3,
                            borderRadius: (item.valor === this.props.valor) ? 10 : 2,
                            backgroundColor: this._devolverColorObjetoSeleccionado(item.valor)
                        }
                    ]}
                >
                    <AEtiqueta>{item.texto}</AEtiqueta>
                </TouchableOpacity>
            );
        }

        const ItemConEdicion = () => {
            return (
                <View
                    style={[
                        estilosModal.contenedorItemLista,
                        {
                            paddingHorizontal: (item.valor === this.props.valor) ? 10 : 3,
                            borderRadius: (item.valor === this.props.valor) ? 10 : 2,
                            backgroundColor: this._devolverColorObjetoSeleccionado(item.valor),
                            flexDirection: "row",
                            marginVertical: 12,
                            alignItems: "center"
                        }
                    ]}
                >
                    <TouchableOpacity
                        onPress={(e) => this._itemSeleccionado(item)}
                        style={[
                            { width: "90%" }
                        ]}
                    >
                        <AEtiqueta>{item.texto}</AEtiqueta>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(e) => { this._itemSeleccionadoParaEdicion(item); }}
                    >
                        <Feather name={"edit"} size={20} />
                    </TouchableOpacity>
                </View>
            );
        }

        const ItemEditable = () => {

            const [txt_edicion, fijarTxt_edicion] = useState(item.texto);

            return (
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: 50,
                    marginBottom: 50
                }}>
                    <ACajaTexto
                        ref={texto => this.txt_textoEdicion = texto}
                        estilos={{
                            width: "90%",
                            marginBottom: 5
                        }}
                        valor={txt_edicion}
                        cambioTexto={(e) => {
                            fijarTxt_edicion(e);
                        }}
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%"
                        }}
                    >
                        <ABoton
                            estilos={{
                                height: 30,
                                width: "40%",
                                marginLeft: 15
                            }}
                            texto={"Guardar"}
                            botonPresionado={(e) => { this._btnEdicionGuardar(txt_edicion, item.valor); }}
                        />
                        <ABoton
                            estilos={{
                                height: 30,
                                width: "40%",
                                marginRight: 10
                            }}
                            texto={"Cancelar"}
                            botonPresionado={(e) => { this._btnCancelarEdicion(); }}
                        />
                    </View>
                </View>
            );
        }

        if (this.props.hasOwnProperty('generarEventoGuardar')) {
            if ((this.state.valor_edicion == item.valor) && (this.state.valor_edicion != this.valor_edicion)) {
                return <ItemEditable />;
            }
            else
                if (this.props.hasOwnProperty('puedeEditar')) {
                    if (this.props.puedeEditar) {
                        return <ItemConEdicion />;
                    }
                    else {
                        return <ItemNormal />;
                    }
                }
                else {
                    return <ItemNormal />;
                }
        }
        else {
            return <ItemNormal />;
        }
    }

    _eventoGuardar(texto){
        if(this.props.hasOwnProperty('guardarTexto')){
            this.props.guardarTexto(texto);

            this.setState({
                valor_edicion: this.valor_edicion
            });
        }
    }

    /**
     * Este componente representa el desplegable.
     * @returns {React.Component}
     */
    PanelFiltro = () => {
        return (
            <APanel
                transparente={true}
                visible={this.state.modal_visible}
                estilos={[
                    estilosModal.contenedor
                ]}
            >
                <View
                    style={[
                        estilosModal.contenedorListaAListaPlana,
                        {
                            backgroundColor: this.state.contenedorModal,
                            borderRadius: 10,
                        }
                    ]}
                >
                    {/** Contenedor del filtro con icono */}
                    <View
                        style={[
                            estilosModal.contenedorFiltroConIcono
                        ]}
                    >
                        {/** Contenedor del filtro */}
                        <View
                            style={[
                                { flex: 6 }
                            ]}
                        >
                            {/** Filtro */}
                            <ACajaTexto
                                ref={p => this.txt_filtro = p}
                                valor={this.state.txt_filtro}
                                cambioTexto={(e) => {
                                    this._filtrarLista(e);
                                }}
                                colorPlaceholder={"#a2a2a2"}
                                placeholder={this.props.placeholderFiltro || "Filtrar Registros"}
                                multilinea={true}
                                contenidoCambioTamano={(e) => { this.setState({ alto_filtro: e.nativeEvent.contentSize.height }); }}
                                estilosTxt={{
                                    width: "100%",
                                    borderBottomWidth: 0
                                }}
                            />
                        </View>
                        {/** Icono Busqueda */}
                        <View
                            style={[{ flex: 1 }]}
                        >
                            <TouchableWithoutFeedback
                                onPress={(e) => this.txt_filtro.focus()}
                            >
                                <Feather name="search" size={20} style={[{ color: this.state.colores_textos }]} />
                            </TouchableWithoutFeedback>
                        </View>
                        {/** Boton Cancelar */}
                        <View
                            style={[
                                { flex: 2 }
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => this._presionarBotonCancelarModal()}
                                style={{ padding: 2 }}
                            >
                                <AEtiqueta estilos={{ color: "#007ACC" }}>Cancelar</AEtiqueta>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/** Contenedor Lista */}
                    <SafeAreaView style={{ display:"flex", flexDirection:"column" }}>
                        {/* Este view le muestra un botón al usuario si el registro que busca no existe */}
                        {/* El botón genera la acción de guardar el registro que no existe si el usuario quiere */}
                        {/* También se añade la condición si el desplegable puede generar un evento de guardar o no */}
                        {(
                            this.state.txtRegistroInexistente != "" &&
                            this.props.generarEventoGuardar != undefined &&
                            <View style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 10
                            }}>
                                <TouchableOpacity style={[{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }]} onPress={(e) => {e.preventDefault(); this._eventoGuardar(this.state.txtRegistroInexistente); }} >
                                    <Feather name="save" size={20} style={[{
                                        color: "#007ACC",
                                        padding: 5
                                    }]} />
                                    <AEtiqueta estilos={[{
                                        color: "#007ACC",
                                        padding: 5
                                    }]}>Toca aquí para guardar: {this.state.txtRegistroInexistente}</AEtiqueta>
                                </TouchableOpacity>
                            </View>
                        )}
                        <FlatList
                            data={this.state.lista_auxialiar}
                            renderItem={this.ItemsLista}
                            keyExtractor={(item) => item.valor.toString()}
                            extraData={true}
                            keyboardShouldPersistTaps="handled"
                        />
                    </SafeAreaView>
                </View>
            </APanel>
        );
    }

    /**
       * Este componente muestra un titulo arriba del Desplegable.
       * @returns {React.Component} Componente que muestra el titulo
       */
    TituloComponente = () => {
        if (this.props.hasOwnProperty('titulo')) {
            return (
                <AEtiqueta
                    estilos={[
                        {
                            color: this.state.color_titulo,
                        },
                        this.props.estilosTitulo
                    ]}
                >
                    {this.props.titulo}
                </AEtiqueta>
            );
        }
        else {
            return <></>;
        }
    }

    /**
     * Esta funcion muestra en pantalla el valor seleccionado.
     * @param {string} valor Valor que se mostrara en pantalla
     * @returns {string}
     */
    _renderizarSeleccion(valor) {
        const lista = this.props.datos;
        const listaFiltrada = lista.filter(item => item.valor == valor);
        if (listaFiltrada.length > 0) {
            return listaFiltrada[0].texto;
        }
        else {
            let placeholder = "(NO DEFINIDO)";

            if (this.props.hasOwnProperty('placeholder')) {
                placeholder = this.props.placeholder;
            }

            return placeholder;
        }
    }

    /**
     * Esta funcion abre el desplegable si editable es igual a true.
     */
    _botonDesplegablePresionado() {
        let editable = true;
        if (this.props.hasOwnProperty("editable")) {
            editable = this.props.editable;
        }

        if (editable) {
            this.setState({
                modal_visible: true,
                txt_filtro: "",
                txtRegistroInexistente: "",
            });
        }
    }

    RenderizarIconoExtra = () => {
        return this.props.icono;
    }

    /**
     * Este componente muestra un boton debajo del titulo.
     * Este boton despliega el desplegable.
     * @returns {React.Component}
     */
    BotonDesplegable = () => {
        return (
            <TouchableWithoutFeedback
                onPress={() => this._botonDesplegablePresionado()}
            >
                <View
                    style={[
                        estilosGeneralesADesplegable.contenedorBoton
                    ]}
                >
                    <View>
                        <AEtiqueta>
                            {this._renderizarSeleccion(this.props.valor)}
                        </AEtiqueta>
                    </View>
                    <View
                        style={{ paddingHorizontal: 5 }}
                    >
                        {(
                            this.props.hasOwnProperty('icono') &&
                            <this.RenderizarIconoExtra />
                        )}
                        {(
                            !this.props.hasOwnProperty('icono') &&
                            <Feather name={"chevron-down"} size={25} />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        let visible = true;

        if (this.props.hasOwnProperty("visible")) {
            visible = this.props.visible;
        }

        if (visible) {
            return (
                <View
                    style={[
                        estilosGeneralesADesplegable.contenedor,
                        estilosGeneralesADesplegable.desplegable,
                        this.props.estilos
                    ]}
                >
                    <this.TituloComponente />
                    <this.BotonDesplegable />
                    <this.PanelFiltro />
                </View>
            );
        }
        else {
            return <></>
        }
    }
}

const estilosGeneralesADesplegable = StyleSheet.create({
    contenedor: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 5
    },
    contenedorBoton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    desplegable: {
        borderBottomWidth: 1,
        borderBottomColor: "#A0A0A0",
        textAlignVertical: "center",
        paddingLeft: 3,
    }
});

const estilosModal = StyleSheet.create({
    contenedor: {
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    contenedorFiltroConIcono: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    contenedorListaAListaPlana: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: "80%",
        //height: "100%", // Si se le pone el 70% la lista se sobre pone por encima del todo, solucionar bug más adelante
        marginTop: 50,
        marginBottom: 60,
        borderRadius: 10,
    },
    lista: {
        position: "relative",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    contenedorItemLista: {
        marginHorizontal: 10,
        marginVertical: 8,
        paddingVertical: 7,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0,0.5)"
    }
});

export default ADesplegable;