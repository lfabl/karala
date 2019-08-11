import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { getNotes, resetData, dislocateNotes } from '../../Database';
import { NoteObject, Dialog, Button } from '../../Components';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { ModalContext } from '../../Context';
class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params && navigation.state.params.data ? true : false
        let options = {
            title: "Karala",
            headerStyle: {
                elevation: 0,
                backgroundColor: "#f5f5f5"
            },
            headerRight: params ? <ModalContext.Consumer>
                {
                    ({ showModal, hideModal }) => <TouchableOpacity
                        onPress={() => {
                            showModal(<Dialog
                                title="Emin misiniz ?"
                                content="Onaylamanız halinde tüm verileriniz silinecektir."
                                icon={{
                                    color: "#444444",
                                    name: "exclamation-circle"
                                }}
                                acceptValue="Evet"
                                rejectValue="Hayır"
                                acceptFunc={() => {
                                    resetData();
                                    hideModal();
                                }}
                                rejectFunc={() => hideModal()}
                            />);
                        }}
                        style={{
                            padding: 10
                        }}
                    >
                        <Icon
                            name="dumpster-fire"
                            size={30}
                            color="#444444"
                        />
                    </TouchableOpacity>
                }
            </ModalContext.Consumer> : null
        };
        return options;
    }
    constructor(props) {
        super(props);
        this.state = {
            notesChanged: [],
            limit: 10,
            moreable: false
        }
        this.notesChanged = this.notesChanged.bind(this);
    }
    notesChanged() {
        let noteData = getNotes(undefined,this.state.limit);
        noteData.sort((a, b) => {
            return a.specialIndex - b.specialIndex;
        });
        this.setState({
            notesChanged: []
        });
        setTimeout(() => null, 0);
        this.setState({
            notesChanged: noteData
        }, () => {
            this.props.navigation.setParams({
                data: noteData.length > 0 ? true : false
            });
            const getAllNotes = getNotes();
            let moreable = false;
            if(getAllNotes.length > noteData.length) {
                moreable = true;
            }
            this.setState({
                moreable: moreable
            });
        });
    }
    componentDidMount() {
        this.noteData = getNotes();
        this.noteData.addListener(this.notesChanged);
    }
    componentWillUnmount() {
        this.noteData.removeListener(this.notesChanged);
    }
    render() {
        const { notesChanged } = this.state;
        return <View style={styles.container}>
            <ScrollView
                style={styles.scrollview}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    notesChanged.length > 0?
                        notesChanged.map((item,index) => {
                            return <NoteObject
                                key={index}
                                data={item}
                                bgColor="#715DD6"
                                style={styles.noteObject}
                                navigation={this.props.navigation}
                                movement={notesChanged.length > 1}
                                disableMovement={notesChanged.length - 1 === index ? "bottom" : index === 0 ? "top" : null}
                                moveUpFunc={() => {
                                    dislocateNotes(index, item, true);
                                }}
                                moveDownFunc={() => {
                                    dislocateNotes(index, item, false);
                                }}
                            />
                        })
                    :
                        <Text style={styles.noFoundNote}>Hiç not bulunamadı</Text>
                }
                {
                    this.state.moreable ?
                        <Button
                            value="Daha Fazla"
                            style={styles.moreButton}
                            onPress={() => {
                                this.setState({
                                    limit: this.state.limit + 10
                                }, () => {
                                    this.notesChanged();
                                });
                            }}
                        />
                    :
                        null
                }
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20
    },
    scrollview: {
        flex: 1
    },
    noFoundNote: {
        alignSelf: "center",
        fontSize: 18,
        fontFamily: "Exo2.0-Regular"
    },
    noteObject: {
        marginBottom: 5
    },
    moreButton: {
        marginTop: 10
    }
});
export default Home;