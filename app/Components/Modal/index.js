import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ModalContext } from '../../Context';
class Modal extends React.Component {
    render() {
        const { data } = this.props;
        return <KeyboardAvoidingView
            style={styles.container}
        >
            {data}
        </KeyboardAvoidingView>
    }
}
Modal.contextType = ModalContext.Consumer;
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
        justifyContent: "center"
    }
});
export default Modal;