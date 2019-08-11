import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { shadow as themeShadow } from '../../Tools';
class Button extends React.Component {
    render() {
        const { icon, value, style, wrap, type, bgColor, color, shadow, ...props } = this.props;
        return <TouchableOpacity
            {...props}
            style={
                [
                    styles.container,
                    {
                        alignSelf: wrap ? "baseline" : null,
                        flexDirection: icon ? "row" : null,
                        backgroundColor: bgColor ? bgColor: "#715DD6"
                    },
                    shadow ? { ...themeShadow(8) } : null,
                    type === "pageButton" ? { 
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        borderRadius: 50
                    } : null,
                    style
                ]
            }
        >
            {
                icon ?
                    <Icon
                        name={icon.name}
                        size={icon.size}
                        color={color ? color : "#f5f5f5"}
                        style={
                            [
                                styles.icon,
                                {
                                    marginRight: value ? 8 : null
                                }
                            ]
                        }
                    />
                :
                    null
            }
            {
                value ?
                    <Text
                        style={{
                            color: color ? color : "#f5f5f5"
                        }}
                    >
                        {value}
                    </Text>
                :
                    null
            }
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});
Button.defaultProps = {
    shadow: true
}
export default Button;