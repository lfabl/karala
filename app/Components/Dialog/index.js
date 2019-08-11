import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '..';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { shadow } from '../../Tools';
class Dialog extends React.Component {
    render() {
        const { icon, title, content, acceptFunc, acceptValue, rejectFunc, rejectValue } = this.props;
        return <View style={styles.container}>
            <View style={styles.header}>
                {
                    icon ?
                        <Icon
                            name={icon.name}
                            size={30}
                            color={icon.color}
                            style={styles.icon}
                        />
                    :
                        null
                }
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>{content}</Text>
            </View>
            <View style={styles.buttons}>
                {
                    rejectFunc ?
                        <Button
                            value={rejectValue}
                            bgColor="#ececec"
                            color="#444444"
                            onPress={rejectFunc}
                            style={
                                [
                                    styles.button,
                                    {
                                        marginRight: 5
                                    }
                                ]
                            }
                            shadow={false}
                        />
                    :
                        null
                }
                <Button
                    value={acceptValue}
                    onPress={acceptFunc}
                    style={
                        [
                            styles.button,
                            {
                                marginLeft: rejectFunc ? 5 : null
                            }
                        ]
                    }
                    shadow={false}
                />
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        ...shadow(8)
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginRight: 5
    },
    content: {
        marginVertical: 10
    },
    buttons: {
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: "Exo2.0-SemiBold",
        color: "#444444"
    },
    contentText: {
        fontFamily: "Exo2.0-Regular",
        color: "#444444"
    }
});
export default Dialog;