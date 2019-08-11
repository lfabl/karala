import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from './Components';
import Router from './Navigation';
import { ModalContext } from './Context';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal = (data) => {
    this.modalData = data;
    this.setState({
      modal: true
    });
  }
  hideModal = () => {
    this.modalData = undefined;
    this.setState({
      modal: false
    });
  }
  render() {
    const { modal } = this.state;
    return <View style={styles.container}>
      <ModalContext.Provider value={{
        showModal: this.showModal,
        hideModal: this.hideModal
      }}>
        <Router/>
      </ModalContext.Provider>
      { modal ? <Modal data={this.modalData}/> : null }
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  }
});
export default App;