import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert, ScrollView } from 'react-native';

export default class Login extends Component {
    state = {
        data: null
    }

    componentWillMount() {
        var myposts = [];
        var silverposts = [];
        var posts = [];
        var count = this.props.navigation.state.params.user.id.length;
        fetch('https://backendteststuff.glitch.me/post/')
            .then((res) => res.json())
            .then((data) => {

                for (let i = 0; i < Object.keys(data).length; i++) {
                    if (data[i].id.slice(0, count) == this.props.navigation.state.params.user.id) {
                        myposts.push(
                            <TouchableOpacity
                                style={styles.buttonContainerOwn}
                                onPress={() => this.props.navigation.navigate('Post', { data: data[i], user: this.props.navigation.state.params.user })}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>User: Yourself</Text>
                                    <Text style={styles.buttonText}>Distance: {data[i].distance}km</Text>
                                </View>

                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 22, textAlign: 'center' }}>{data[i].headline.slice(0, 20)}</Text>
                                    <Text style={styles.buttonText}>{data[i].text.slice(0, 90)}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>Price: {data[i].price}Kr</Text>
                                    <Text style={styles.buttonText}>Added: {data[i].timeStamp.split('-').slice(0, 1)}{"\n"}{data[i].timeStamp.split('-').slice(1, 2)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    } else if (data[i].promoted == 1) {
                        silverposts.push(
                            <TouchableOpacity
                                style={styles.buttonContainerSilver}
                                onPress={() => this.props.navigation.navigate('Post', { data: data[i], user: this.props.navigation.state.params.user })}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>User: {data[i].user.split(' ').slice(0, 1)}</Text>
                                    <Text style={styles.buttonText}>Distance: {data[i].distance}km</Text>
                                </View>

                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 22, textAlign: 'center' }}>{data[i].headline.slice(0, 20)}</Text>
                                    <Text style={styles.buttonText}>{data[i].text.slice(0, 90)}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>Price: {data[i].price}Kr</Text>
                                    <Text style={styles.buttonText}>Added: {data[i].timeStamp.split('-').slice(0, 1)}{"\n"}{data[i].timeStamp.split('-').slice(1, 2)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    } else {
                        posts.push(
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => this.props.navigation.navigate('Post', { data: data[i], user: this.props.navigation.state.params.user })}>
                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>User: {data[i].user.split(' ').slice(0, 1)}</Text>
                                    <Text style={styles.buttonText}>Distance: {data[i].distance}km</Text>
                                </View>

                                <View style={{ alignItems: 'center', flex: 1 }}>
                                    <Text style={{ fontSize: 22, textAlign: 'center' }}>{data[i].headline.slice(0, 20)}</Text>
                                    <Text style={styles.buttonText}>{data[i].text.slice(0, 90)}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.buttonText}>Price: {data[i].price}Kr</Text>
                                    <Text style={styles.buttonText}>Added: {data[i].timeStamp.split('-').slice(0, 1)}{"\n"}{data[i].timeStamp.split('-').slice(1, 2)}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }
                this.setState({ silverposts })
                this.setState({ posts })
                this.setState({ myposts })
            })
    }

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.title}>Browse posts</Text>
                <ScrollView>
                    <View style={{ alignItems: "center" }}>
                        {this.state.myposts}
                        {this.state.silverposts}
                        {this.state.posts}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerText: {
        padding: 20,
    },
    container: {
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    logo: {
        width: 100,
        height: 200
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30
    },
    input: {
        borderRadius: 15,
        height: 40,
        width: 250,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    buttonContainer: {
        borderRadius: 20,
        height: 160,
        width: 350,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    buttonContainerSilver: {
        borderRadius: 20,
        height: 160,
        width: 350,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'silver',
        justifyContent: 'center'
    },
    buttonContainerOwn: {
        borderRadius: 20,
        height: 160,
        width: 350,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'gold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }
});