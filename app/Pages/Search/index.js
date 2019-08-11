import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Search as SearchComponent, NoteObject, Text, Dialog } from '../../Components';
import { getNotes, deleteObject } from '../../Database';
import { ModalContext } from '../../Context';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { withNavigationFocus } from 'react-navigation';
class Search extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params && navigation.state.params.data ? true : false
        let options = {
            title: "Arama",
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
                                content="Onaylamanız halinde sayfada listelenen tüm notlar silinecektir."
                                icon={{
                                    color: "#444444",
                                    name: "exclamation-circle"
                                }}
                                acceptValue="Evet"
                                rejectValue="Hayır"
                                acceptFunc={() => {
                                    navigation.state.params.deleteFilterData();
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
            value: undefined,
            count: 0,
            data: []
        }
    }
    deleteFilterData() {
        deleteObject(this.state.data);
        this.setState({
            data: []
        });
    }
    getData() {
        if(this.state.value.length > 0) {
            let data = getNotes(undefined,undefined,'title CONTAINS[c] "' + this.state.value + '"');
            this.setState({
                data: data
            }, () => {
                this.props.navigation.setParams({
                    data: data.length > 0 ? true : false,
                    deleteFilterData: () => this.deleteFilterData()
                });
            });
        } else {
            this.setState({
                data: []
            });
            this.props.navigation.setParams({
                data: null
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isFocused !== this.props.isFocused && nextProps.isFocused) {
            this.searchInput.focus();
        }
    }
    render() {
        const { navigation } = this.props;
        return <View style={styles.container}>
            <SearchComponent
                placeholder="Arama metni giriniz."
                onChangeText={(e) => {
                    this.setState({
                        value: e
                    }, () => this.getData());
                }}
                autoFocus={true}
                getRef={(ref) => {
                    this.searchInput = ref;
                }}
                style={styles.search}
            />
            <ScrollView
                style={styles.scroll}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    this.state.data.length > 0 ?
                        this.state.data.map((item,index) => {
                            return <NoteObject
                                key={index}
                                data={item}
                                bgColor="#715DD6"
                                onPress={() => {
                                    navigation.navigate("NotePreview", {
                                        title: item.title,
                                        content: item.content
                                    })
                                }}
                                navigation={navigation}
                                style={styles.noteObject}
                            />
                        })
                    :
                        <Text style={styles.noObject}>
                            {this.state.value ? "Arama sonucu ile eşleşen hiç not bulunamadı." : "Arama yapmak için bir metin giriniz."}
                        </Text>
                }
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5"
    },
    scroll: {
        flex: 1
    },
    noteObject: {
        marginBottom: 5
    },
    search: {
        marginBottom: 20
    },
    noObject: {
        alignSelf: "center"
    }
});
export default withNavigationFocus(Search);