import React from 'react';
import { StyleSheet, Animated, View, TextInput as NativeTextInput } from 'react-native';
import { Text } from '..';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : null,
            focus: false,
            animation: new Animated.Value(props.value ? 1 : 0)
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value
            },() => {
                this.toggleAnimation();
            });
        }
    }
    componentDidMount() {
        this.toggleAnimation();
    }
    toggleAnimation() {
        Animated.timing(
            this.state.animation,
            {
              toValue: this.state.value || this.state.focus ? 1 : 0,
              duration: 150,
              useNativeDriver: true
            }
        ).start();
    }
    onFocus() {
        this.setState({
            focus: true
        },() => this.toggleAnimation());
    }
    onBlur() {
        this.setState({
            focus: false
        },() => this.toggleAnimation());
    }
    render() {
        const { title, icon, style, onFocus, onBlur, multiline, containerStyle, ...props } = this.props;
        const AnimatedText = Animated.createAnimatedComponent(Text);
        return <View
            style={
                [
                    styles.container,
                    {
                        borderBottomColor: this.state.value || this.state.focus ? "#444444" : "#e3e3e3"
                    },
                    containerStyle
                ]
            }
            onTouchStart={() => {
                this.ref.focus();
            }}
        >
            {
                icon ?
                    <Icon
                        name={icon.name}
                        size={25}
                        color={icon.color}
                        style={
                            [
                                styles.icon,
                                {
                                    alignSelf: multiline && this.state.value ? "flex-start" : null
                                }
                            ]
                        }
                    />
                :
                    null
            }
            <View
                style={
                    [
                        styles.content,
                        {
                            alignSelf: icon ? null : "stretch"
                        }
                    ]
                }
            >
                <AnimatedText
                    type="textInput"
                    style={{
                        transform: [{
                            translateY: this.state.animation.interpolate({
                                inputRange: [0,1],
                                outputRange: [10,0]
                            })
                        }]
                    }}
                >
                    {title}
                </AnimatedText>
                <NativeTextInput
                    {...props}
                    ref={ref => this.ref = ref}
                    value={this.state.value}
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    multiline={multiline}
                    style={
                        [
                            styles.nativeTextInput,
                            {
                                flex: multiline && this.state.value ? null : 1,
                                opacity: this.state.value || this.state.focus ? 1 : 0
                            },
                            style
                        ]
                    }
                />
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1
    },
    content: {
        flex: 1,
        paddingVertical: 5,
        flexDirection: "column"
    },
    icon: {
        margin: 10
    },
    nativeTextInput: {
        padding: 0,
        fontSize: 14,
        fontFamily: "Exo2.0-Regular"
    }
});
export default TextInput;