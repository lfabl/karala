import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { createNote, update } from '../../Database';
import { Button, TextInput, Text, Dialog } from '../../Components';
import { generateStringDate } from '../../Tools';
import { ModalContext } from '../../Context';
class NoteDetail extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params ? true : null;
        let options = {
            headerTitle: params ? "Notu Düzenle" : "Not Oluştur"
        }
        return options;
    }
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            createdAt: null,
            modifiedAt: null
        }
    }
    componentWillMount() {
        this.edit = this.props.navigation.state.params ? true : false;
        if(this.edit) {
            this.data = this.props.navigation.state.params.data;
            this.setState({
                title: this.data.title,
                content: this.data.content,
                createdAt: this.data.createdAt,
                modifiedAt: this.data.modifiedAt ? this.data.modifiedAt : null
            });
        }
    }
    render() {
        return <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <TextInput
                    title="Başlık"
                    value={this.state.title}
                    icon={{
                        name: "quote-right",
                        color: "#444444"
                    }}
                    maxLength={90}
                    onChangeText={(e) => {
                        if(this.state.title) {
                            if(e.length < 90 && this.state.title.length < 90) {
                                this.setState({
                                    title: e
                                });
                            }
                        } else {
                            this.setState({
                                title: e
                            })
                        }
                    }}
                    containerStyle={styles.textInput}
                />
                <TextInput
                    title="Açıklama"
                    value={this.state.content}
                    maxLength={60000}
                    icon={{
                        name: "comment-dots",
                        color: "#444444"
                    }}
                    multiline={true}
                    onChangeText={(e) => {
                        this.setState({
                            content: e
                        });
                    }}
                    containerStyle={styles.textInput}
                />
                {
                    this.state.createdAt ?
                        <View style={styles.infoDataContainer}>
                            <Text style={styles.infoDataTitle}>Oluşturulma Tarihi:</Text>
                            <Text>{generateStringDate(this.state.createdAt)}</Text>
                        </View>
                    :
                        null
                }
                {
                    this.state.modifiedAt ?
                        <View style={styles.infoDataContainer}>
                            <Text style={styles.infoDataTitle}>Son Düzenlenme Tarihi:</Text>
                            <Text>{generateStringDate(this.state.modifiedAt)}</Text>
                        </View>
                    :
                        null
                }
            </ScrollView>
            <View style={styles.footer}>
                <Button
                    icon={{
                        name: "check",
                        size: 22
                    }}
                    wrap={true}
                    type="pageButton"
                    onPress={() => {
                        if(this.data) {
                            if(this.state.title !== "" && this.state.title !== undefined && this.state.title !== null && this.state.content !== "" && this.state.content !== undefined && this.state.content !== null && this.state.title.trim() !== "") {
                                update("Note",{
                                    id: this.data.id,
                                    title: this.state.title,
                                    content: this.state.content,
                                    modifiedAt: new Date()
                                });
                                this.props.navigation.goBack();
                            } else {
                                this.context.showModal(<Dialog
                                    title="Dikkat !"
                                    content="Hiçbir veri boş bırakılamaz. Lütfen tüm kısımları doldurup tekrar deneyiniz."
                                    icon={{
                                        color: "#444444",
                                        name: "exclamation-circle"
                                    }}
                                    acceptValue="Tamam"
                                    acceptFunc={() => {
                                        this.context.hideModal();
                                    }}
                                />);
                            }
                        } else {
                            if(this.state.title !== "" && this.state.title !== undefined && this.state.title !== null && this.state.content !== "" && this.state.content !== undefined && this.state.content !== null && this.state.title.trim() !== "") {
                                createNote({
                                    ...this.state,
                                    specialIndex: 0,
                                    // colorID oluşturulacak.
                                    icon: 'clock'
                                });
                                this.props.navigation.goBack();
                            } else {
                                this.context.showModal(<Dialog
                                    title="Dikkat !"
                                    content="Hiçbir veri boş bırakılamaz. Lütfen tüm kısımları doldurup tekrar deneyiniz."
                                    icon={{
                                        color: "#444444",
                                        name: "exclamation-circle"
                                    }}
                                    acceptValue="Tamam"
                                    acceptFunc={() => {
                                        this.context.hideModal();
                                    }}
                                />);
                            }
                        }
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    }
}
NoteDetail.contextType = ModalContext.Consumer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5"
    },
    infoDataContainer: {
        marginVertical: 5,
        flexDirection: "row"
    },
    infoDataTitle: {
        flex: 1
    },
    textInput: {
        marginVertical: 10
    },
    footer: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    }
});
export default NoteDetail;