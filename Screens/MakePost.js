import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert, Switch } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    state = {
        toggled: false,
        count: 0
    }

    _Check() {
        if (this.state.toggled) {
            this.setState({ toggled: false })
        } else {
            if (this.props.navigation.state.params.user.tokens > 0) {
                this.setState({ toggled: true })
                this.setState({ count: 1 })
            } else {
                this.setState({ toggled: false })
                this.setState({ count: 0 })
                Alert.alert('No tokens left :(')
            }
        }
    }

    _Post() {
        setTimeout(() => {
            this.props.navigation.navigate('Home', { userid: this.props.navigation.state.params.user.id })
            , 2000})
        Alert.alert("Post created!")
        this._Test();
        return axios.post('https://backendteststuff.glitch.me/post/', {
            id: this.props.navigation.state.params.user.id + (this.props.navigation.state.params.user.posts + 1),
            headline: this.state.title,
            text: this.state.Text,
            timeStamp: moment().format('HH:mm - DD/MM/YY'),
            distance: this.state.radius,
            price: this.state.price,
            gps: "prut",
            oC: true,
            promoted: this.state.count,
            user: this.props.navigation.state.params.user.fullName
        })
            .then(res => res.data);
    }

    _Test() {
        return axios.put('https://backendteststuff.glitch.me/user/' + this.props.navigation.state.params.user.id, {
            posts: (this.props.navigation.state.params.user.posts + 1),
            tokens: (this.props.navigation.state.params.user.tokens - this.state.count)
        })
            .then(res => res.data);
    }


    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Create you post</Text>
                </View>
                <View style={styles.formContainer}>
                    <ScrollView style={styles.containerText}>
                        <Text>Headline</Text>
                        <TextInput
                            placeholder="Title"
                            onChangeText={(text) => this.setState({ title: text })}
                            onSubmitEditing={() => this.groupInput.focus()}
                            autoCorrect={false}
                            style={styles.input}
                        />
                        <Text>Info text</Text>
                        <TextInput
                            placeholder="Text"
                            onChangeText={(text) => this.setState({ Text: text })}
                            style={styles.input1}
                            autoCorrect={true}
                            multiline={true}
                            ref={(input) => this.groupInput = input}
                        />
                        <Text>Distance to viewers in kilometers</Text>
                        <TextInput
                            placeholder="Distance/radius"
                            onChangeText={(text) => this.setState({ radius: text })}
                            style={styles.input}
                            autoCorrect={true}
                            keyboardType="numeric"
                            ref={(input) => this.groupInput = input}
                        />
                        <Text>Pricing in DKK</Text>
                        <TextInput
                            placeholder="Price"
                            onChangeText={(text) => this.setState({ price: text })}
                            style={styles.input}
                            autoCorrect={true}
                            keyboardType="numeric"
                            ref={(input) => this.groupInput = input}
                        />
                        <View style={styles.row}>
                            <Text>Promote your post</Text>
                            <TouchableOpacity
                                onPress={() => Alert.alert('This action will make you post more visible, but cost you a token!')}>
                                <Icon name="info-circle" size={18} color="lightgrey" />
                            </TouchableOpacity>
                            <Text>    </Text>
                            <Switch
                                onValueChange={(value) => this._Check()}
                                value={this.state.toggled}
                            />
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => this._Post()}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerText: {
        padding: 20,
    },
    formContainer: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    },
    container: {
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
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
    input1: {
        borderRadius: 15,
        height: 80,
        width: 250,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    buttonContainer: {
        borderRadius: 20,
        height: 50,
        width: 150,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }
});