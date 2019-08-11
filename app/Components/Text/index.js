import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as NativeText } from 'react-native';
const types = {
    h1: {
        sSize: 26,
        family: "Exo2.0-Medium"
    },
    h2: {
        size: 24,
        family: "Exo2.0-Bold"
    },
    h3: {
        size: 22,
        family: "Exo2.0-SemiBold"
    },
    body: {
        size: 14,
        family: "Exo2.0-Regular"
    },
    textInput: {
        size: 16,
        family: "Exo2.0-SemiBold"
    }
};
class Text extends React.Component {
    render() {
        const { children, type, style } = this.props;
        return <NativeText
            style={
                [
                    styles.container,
                    {
                        fontSize: types[type].size,
                        fontFamily: types[type].family
                    },
                    style
                ]
            }
        >
            {children}
        </NativeText>
    }
}
const styles = StyleSheet.create({
    container: {
        color: "#444444"
    }
});
Text.defaultProps = {
    type: "body"
}
export default Text;