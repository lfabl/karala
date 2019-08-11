import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            focus: false
        }
    }
    render() {
        const { onChangeText, placeholder, autoFocus, getRef, style } = this.props;
        return <TextInput
            ref={ref => {
                this.ref = ref,
                getRef(ref);
            }}
            autoFocus={autoFocus}
            value={this.state.value}
            placeholder={placeholder}
            style={
                [
                    styles.container,
                    {
                        borderBottomColor: this.state.value || this.state.focus ? "#444444" : "#e3e3e3"
                    },
                    style
                ]
            }
            onFocus={() => {
                this.setState({
                    focus: true
                });
            }}
            onBlur={() => {
                this.setState({
                    focus: false 
                });
            }}
            onChangeText={(e) => {
                this.setState({
                    value: e
                }, onChangeText ? () => onChangeText(e) : null);
            }}
        />
    }
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 0
    }
});
export default Search;