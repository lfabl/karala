import React from 'react';
import { StyleSheet, Animated, View, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { shadow } from '../../../Tools';
const routes = {
    Home: {
        icon: {
            name: "home"
        }
    },
    Search: {
        icon: {
            name: "search"
        }
    },
    Native: {
        icon: {
            name: "search"
        }
    },
    NoteDetail: {
        icon: {
            name: "plus"
        }
    }
};
class BottomMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicator: new Animated.Value(props.navigation.state.index),
            barIndexes: []
        }
    }
    switchIndicator() {
        Animated.timing(
            this.state.indicator,
            {
              toValue: this.index,
              duration: 150,
              useNativeDriver: true
            }
        ).start();
    }
    calculateDimensions() {
        const dimensions = Dimensions.get('window').width;
        const objectWidth = dimensions - 40;
        const oneObjectLength = objectWidth / (this.totalPages + 1);
        const indicatorLength = 70.1;
        const reduceCount = (indicatorLength / 2);
        // TODO: Automatic barIndexes Calculator.
        this.barIndexes = [];
        this.barIndexes.push((oneObjectLength/2)-reduceCount);
        //this.barIndexes.push((oneObjectLength + (oneObjectLength/2))-reduceCount);
        this.barIndexes.push(((oneObjectLength*2) + (oneObjectLength/2))-reduceCount);
        this.setState({
            barIndexes: this.barIndexes
        });
    }
    componentWillMount() {
        this.index = this.props.navigation.state.index;
        this.data = this.props.navigation.state.routes;
        this.totalPages = this.data.length;
        this.newNoteButtonIndex = Math.ceil(this.totalPages) - 1;
        Dimensions.addEventListener('change', () => this.calculateDimensions());
        this.calculateDimensions();
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change');
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.navigation !== this.props.navigation) {
            this.index = nextProps.navigation.state.index;
            this.switchIndicator();
        }
    }
    bottomMenuButton = (item,index) => {
        return <TouchableHighlight
            key={index}
            style={
                [
                    styles.menuButton,
                    {
                        borderTopLeftRadius: index === 0 ? 50 : undefined,
                        borderBottomLeftRadius: index === 0 ? 50 : undefined,
                        borderTopRightRadius: index === this.totalPages-1 && item.routeName !== "NoteDetail" ? 50 : undefined,
                        borderBottomRightRadius: index === this.totalPages-1 && item.routeName !== "NoteDetail" ? 50 : undefined
                    }
                ]
            }
            onPress={() => {
                this.props.navigation.navigate(item.routeName);
            }}
            disabled={this.index === index && item.routeName !== "NoteDetail"}
            underlayColor="rgba(0,0,0,0.0)"
            onLayout={() => this.calculateDimensions()}
        >
            <Icon
                name={routes[item.routeName].icon.name}
                size={22.5}
                color={this.index === index ? "#C761B1" : "#f5f5f5"}
                style={
                    this.index !== index ?
                        {
                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: {width: 0, height: 1},
                            textShadowRadius: 2
                        }
                    :
                        null
                }
            />
        </TouchableHighlight>
    }
    render() {
        return <View style={styles.container}>
            <LinearGradient
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                colors={['#C25CD6', '#CC678C']}
                style={styles.menu}
            >
                {
                    this.data.map((item,index) => {
                        if(index < this.newNoteButtonIndex) return this.bottomMenuButton(item,index);
                    })
                }
                {this.bottomMenuButton({routeName: "NoteDetail"})}
                {
                    this.data.map((item,index) => {
                        if(index >= this.newNoteButtonIndex) return this.bottomMenuButton(item,index);
                    })
                }
                <Animated.View
                    style={
                        [
                            styles.indicator,
                            {
                                transform: [{
                                    translateX: this.state.indicator.interpolate({
                                        inputRange: [0,this.data.length-1],
                                        outputRange: this.state.barIndexes
                                    })
                                }]
                            }
                        ]
                    }
                />
            </LinearGradient>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    menu: {
        borderRadius: 50,
        flexDirection: "row",
        backgroundColor: "#715DD6",
        ...shadow(8)
    },
    menuButton: {
        zIndex: 999,
        padding: 15,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        padding: 30,
        backgroundColor: "#f5f5f5",
        borderRadius: 50,
        borderWidth: 5,
        zIndex: 99,
        borderColor: "#C761B1",
        position: "absolute",
        alignSelf: "center"
    }
});
export default BottomMenu;