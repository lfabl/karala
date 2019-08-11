import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Home from '../Pages/Home';
import NoteDetail from '../Pages/NoteDetail';
import Search from '../Pages/Search';
import NotePreview from '../Pages/NotePreview';
import BottomMenu from './Components/BottomMenu';
const HomeStack = createStackNavigator(
    {
        "Home": Home
    },
    {
        initialRouteName: "Home"
    }
);
const SearchStack = createStackNavigator(
    {
        "Search": Search
    },
    {
        initialRouteName: "Search"
    }
);
const Menu = createBottomTabNavigator(
    {
        "Home": HomeStack,
        "Search": SearchStack
    },
    {
        initialRouteName: "Home",
        tabBarComponent: props => <BottomMenu
            {...props}
        />,
        navigationOptions: {
            header: null
        }
    }
);
const Root = createStackNavigator(
    {
        "Home": {
            screen: Menu,
            navigationOptions: {
                header: null
            }
        },
        "NoteDetail": {
            screen: NoteDetail,
            navigationOptions: {
                headerStyle: {
                    elevation: 0,
                    backgroundColor: "#f5f5f5"
                }
            }
        },
        "NotePreview": {
            screen: NotePreview,
            navigationOptions: {
                headerStyle: {
                    elevation: 0,
                    backgroundColor: "#f5f5f5"
                }
            }
        }
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            }
        }
    }
);
export default createAppContainer(Root);