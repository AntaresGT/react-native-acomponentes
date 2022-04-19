import React from 'react';
import{
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

import AEtiqueta from './AEtiqueta';

/**
 * Este componente es una lista plana, que se puede usar para mostrar una lista de elementos
 */
class AListaPlana extends React.Component{

    /**
     * @constructor
     * @param {Object} props Este objeto lo llena automaticamente react native
     * @param {boolean} [props.visible] Si es true, se muestra la lista plana, si es false, no se muestra la lista
     * @param {Array<Object>} props.lista Lista de elementos que se mostrarán en la lista plana
     * @param {Function<React.Component>} props.items Esta función es la que se encarga de mostrar los elementos de la lista a como el programador le especifica
     * @param {string} [props.placeholder] Texto que se mostrará cuando la lista esté vacía
     * @param {StyleSheet} [props.estilosPlaceholder] Estilos que se aplicarán al texto del placeholder
     * @param {StyleSheet} [props.estilosNoDatos] Le da estilos al conenedor cuanod la lista esté vacía
     * 
     * La función para renderizar los items se hace como en este ejemplo:
     * @example
     * funcion_render_item(item, indice?){
     *  return(
     *      <Componente key={item.id || indice}
     *          {// Acá va todo el render JSX}
     *      </Componente>
     *  );
     * }
     */
    constructor(props){
        super(props);
    }

    SinDatos = () => {
        return(
            <View
                style={[estilosSinDatos.contenedor, this.props.estilosNoDatos]}
            >
                <AEtiqueta
                    estilos={this.props.estilosPlaceholder}
                >
                    {(
                        this.props.hasOwnProperty('placeholder') ? this.props.placeholder : "Sin Datos"
                    )}
                </AEtiqueta>
            </View>
        );
    }

    render(){
        let visible = true;

        if(this.props.hasOwnProperty('visible')){
            visible = this.props.visible;
        }

        if(visible){
            return(
                <>
                    {(
                        (this.props.lista.length === 0) &&
                        <this.SinDatos />
                    )}
                    <ScrollView stylte={[this.props.estilos]} keyboardShouldPersistTaps='handled'>
                        {
                            this.props.lista.map((item, indice) => {
                                return this.props.items(item, indice);
                            })
                        }
                    </ScrollView>
                </>
            );
        }
        else{
            return <></>;
        }
    }
};

const estilosSinDatos = StyleSheet.create({
    contenedor: {
        position: "relative",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default AListaPlana;