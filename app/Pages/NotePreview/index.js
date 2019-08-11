import React from 'react';
import { StyleSheet, View, ScrollView, Clipboard, ToastAndroid, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text } from '../../Components';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { getNotes } from '../../Database';
import { generateStringDate } from '../../Tools';
class NotePreview extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        let options = {
            title: "Önizleme",
            headerRight: params ?
                <TouchableOpacity
                    onPress={() => {
                        const thisNote = getNotes(params.id)[0];
                        navigation.navigate("NoteDetail", {
                            data: thisNote
                        });
                    }}
                >
                    <Icon
                        name="pencil-alt"
                        size={22}
                        color="#444444"
                        style={styles.headerButtonIcon}
                    />
                </TouchableOpacity>
            :
                null
        };
        return options;
    }
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            modifiedAt: null,
            createdAt: null
        }
        this.dataChanged = this.dataChanged.bind(this);
    }
    dataChanged() {
        const data = getNotes(this.props.navigation.state.params.id)[0];
        setTimeout(() => null, 0);
        this.setState({
            title: data.title,
            content: data.content,
            modifiedAt: data.modifiedAt,
            createdAt: data.createdAt
        });
    }
    componentDidMount() {
        this.data = getNotes(this.props.navigation.state.params.id)[0];
        this.data.addListener(this.dataChanged);
    }
    componentWillUnmount() {
        this.data.removeListener(this.dataChanged);
    }
    render() {
        const { navigation } = this.props;
        const { title, content, createdAt, modifiedAt } = this.state;
        return <View style={styles.container}>
            <View style={[styles.createdAtContainer,styles.item]}>
                <Text type="body" style={styles.createdAtText}>Oluşturulma Tarihi: </Text>
                <Text type="body">{generateStringDate(createdAt)}</Text>
            </View>
            {
                modifiedAt ?
                    <View style={[styles.modifiedAtContainer,styles.item]}>
                        <Text type="body" style={styles.modifiedAtText}>Son Değiştirilme Tarihi: </Text>
                        <Text type="body">{generateStringDate(modifiedAt)}</Text>
                    </View>
                :
                    null
            }
            <Text type="h3" style={styles.title}>{title}</Text>
            <TouchableHighlight
                style={{flex: 1}}
                onLongPress={() => {
                    Clipboard.setString(title + "\n" + content);
                    ToastAndroid.show('İçerik kopyalandı.', ToastAndroid.SHORT);
                }}
                underlayColor="rgba(245,245,245,0.99)"
            >
                <ScrollView
                    style={{flex: 1}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.content}>{content}</Text>
                </ScrollView>
            </TouchableHighlight>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },
    item: {
        marginBottom: 5
    },
    title: {
        marginBottom: 5
    },
    content: {
        flex: 1
    },
    headerButtonIcon: {
        padding: 10
    },
    createdAtText: {
        flex: 1
    },
    modifiedAtText: {
        flex: 1
    },
    createdAtContainer: {
        flexDirection: "row"
    },
    modifiedAtContainer: {
        flexDirection: "row"
    }
});
export default NotePreview;