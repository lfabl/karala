import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Share } from 'react-native';
import { shadow, generateStringDate } from '../../Tools';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Button, Dialog } from '../../Components';
import { deleteObject } from '../../Database';
import { ModalContext } from '../../Context';
class NoteObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }
    setMenu() {
        this.setState({
            menu: !this.state.menu
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data) {
            this.setData();
        }
    }
    setData() {
        this.data = {};
        const data = this.props.data;
        const dataKeys = Object.keys(data);
        dataKeys.forEach((item,index) => {
            this.data[item] = data[item];
        });
    }
    componentWillMount() {
        // Sürüme özel acil bir geçici çözümdür. KESİNLİKLE DÜZELTİLECEK.
        this.setData();
    }
    render() {
        const { bgColor, onPress, style, navigation, moveUpFunc, moveDownFunc, movement, disableMovement } = this.props;
        const { menu } = this.state;
        return <TouchableOpacity
            onPress={() => {
                navigation.navigate("NotePreview", {
                    id: this.data.id
                });
                if(onPress) onPress();
            }}
            onLongPress={() => this.setMenu()}
            style={
                [
                    styles.container,
                    {
                        backgroundColor: bgColor,
                        ...shadow(5,bgColor)
                    },
                    style
                ]
            }
        >
            {
                menu ?
                    <View style={styles.menu}>
                        {
                            movement ?
                                <View style={styles.movementButtons}>
                                    <TouchableOpacity
                                        style={
                                            [
                                                styles.movementButton,
                                                {
                                                    backgroundColor: "#715DD6",
                                                    borderTopLeftRadius: 8,
                                                    opacity: disableMovement === "top" ? 0.5 : 1
                                                }
                                            ]
                                        }
                                        disabled={disableMovement === "top"}
                                        onPress={disableMovement === "top" ? null : moveUpFunc}
                                    >
                                        <Icon
                                            name="chevron-up"
                                            size={16}
                                            color="#f5f5f5"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={
                                            [
                                                styles.movementButton,
                                                {
                                                    backgroundColor: "#715DD6",
                                                    borderBottomLeftRadius: 8,
                                                    opacity: disableMovement === "bottom" ? 0.5 : 1
                                                }
                                            ]
                                        }
                                        disabled={disableMovement === "bottom"}
                                        onPress={disableMovement === "bottom" ? null : moveDownFunc}
                                    >
                                        <Icon
                                            name="chevron-down"
                                            size={16}
                                            color="#f5f5f5"
                                        />
                                    </TouchableOpacity>
                                </View>
                            :
                                null
                        }
                        <Button
                            icon={{
                                name: "share-alt",
                                size: 20
                            }}
                            style={styles.menuButton}
                            bgColor="transparent"
                            shadow={false}
                            onPress={() => {
                                this.context.showModal(<Dialog
                                    title="Emin misiniz ?"
                                    content="Bu notu paylaşmak istiyor musunuz ?"
                                    icon={{
                                        color: "#444444",
                                        name: "exclamation-circle"
                                    }}
                                    acceptValue="Evet"
                                    rejectValue="Hayır"
                                    acceptFunc={() => {
                                        Share.share({
                                            title: this.data.title,
                                            message: this.data.content
                                        });
                                        this.context.hideModal();
                                    }}
                                    rejectFunc={() => {
                                        this.context.hideModal();
                                    }}
                                />);
                            }}
                        />
                        <Button
                            icon={{
                                name: "pencil-alt",
                                size: 20
                            }}
                            style={styles.menuButton}
                            bgColor="transparent"
                            shadow={false}
                            onPress={() => {
                                this.setMenu();
                                navigation.navigate("NoteDetail", {
                                    data: this.data
                                });
                            }}
                        />
                        <Button
                            icon={{
                                name: "trash",
                                size: 20
                            }}
                            style={styles.menuButton}
                            bgColor="transparent"
                            shadow={false}
                            onPress={() => {
                                this.context.showModal(<Dialog
                                    title="Emin misiniz ?"
                                    content="Onaylamanız durumunda bu not tamamen silinecektir. Bu işlem geri alınamaz. Onaylıyor musunuz ?"
                                    icon={{
                                        color: "#444444",
                                        name: "exclamation-circle"
                                    }}
                                    acceptValue="Evet"
                                    rejectValue="Hayır"
                                    acceptFunc={() => {
                                        deleteObject(this.data);
                                        this.context.hideModal();
                                    }}
                                    rejectFunc={() => {
                                        this.context.hideModal();
                                    }}
                                />);
                            }}
                        />
                        <Button
                            icon={{
                                name: "times",
                                size: 25
                            }}
                            style={styles.closeButton}
                            bgColor="#715DD6"
                            color="#F5F5F5"
                            shadow={false}
                            onPress={() => this.setMenu()}
                        />
                    </View>
                :
                    null
            }
            <View style={styles.content}>
                {
                    !this.data.icon ?
                        <Icon
                            name={this.data.icon}
                            size={30}
                            color="#f5f5f5"
                            style={styles.icon}
                        />
                    :
                        null
                }
                <View style={styles.texts}>
                    <Text style={styles.title}>
                        {this.data.title}
                    </Text>
                    <Text style={styles.date}>
                        {generateStringDate(this.data.createdAt)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    }
}
NoteObject.contextType = ModalContext.Consumer;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8
    },
    content: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    texts: {
        flex: 1,
        flexDirection: "column"
    },
    icon: {
        marginRight: 10
    },
    title: {
        color: "#f5f5f5",
        fontSize: 18,
        fontFamily: "Exo2.0-SemiBold"
    },
    date: {
        color: "#f5f5f5",
        fontSize: 14,
        fontFamily: "Exo2.0-Regular"
    },
    menu: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.90)",
        borderRadius: 8,
        flexDirection: "row"
    },
    movementButtons: {
        flexDirection: "column"
    },
    movementButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    menuButton: {
        flex: 1,
        height: "100%",
        borderRadius: 0
    },
    closeButton: {
        flex: 0.5,
        height: "100%",
        borderRadius: 0,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
});
export default NoteObject;