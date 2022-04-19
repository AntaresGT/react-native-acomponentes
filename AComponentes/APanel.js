import React from 'react';
import {
  Modal,
  StyleSheet,
  View
} from 'react-native';

/**
 * Este componente muestra una pantalla blanca
 * por delante de todo
 * Leer ejemplo de uso practico
 * @example
 * // Primero - Crear un componente tipo función anonima
 * frmProductos = (props) {
 *      return(
 *          <APanel visible={this.state.frmProductosVisible} transparente={false}>
 *              <AForms>
 *                  ...
 *                  ...
 *              </AForms>
 *              ...
 *          </APanel>
 *      );
 * }
 * 
 * // Segundo - Implementación en el render principal
 * render(){
 *      <this.frmProductos />
 * }
 */
class APanel extends React.Component {

  /**
   * @constructor
   * @param {Object} props Este objeto lo llena automaticamente react native
   * @param {Object} [props.estilos] Proporciona estilos al contenedor del modal
   * @param {boolean} props.visible Modifica la visibilidad de APanel {visible={false} No es visible visible={true} APanel Visible}
   * @param {boolean} [props.transparente] Modifica el modal, si es verdadero, el modal se vuelve transparente, de lo contrario es blanco por defecto
   * @param {Object} [props.estilosPanel] Le añade estilos al modal, como por ejemplo cambiar el color por defecto
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Modal
          transparent={(this.props.hasOwnProperty('transparente')) ? this.props.transparente : false}
          visible={this.props.visible}
          animationType={"slide"}
          style={[this.props.estilosPanel]}
        >
          <View style={[estilos.contenedor, this.props.estilos]}>
            {this.props.children}
          </View>
        </Modal>
      </View>

    );
  }

};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1
  }
});

export default APanel;