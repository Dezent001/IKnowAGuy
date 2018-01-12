import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import moment from 'moment';
import axios from 'axios';

export default class Login extends Component {
    state = {
        temp: "Create user"
    }

    _Post() {
        if (this.state.password1 == this.state.password2 && this.state.email !== undefined && this.state.fullName !== undefined && this.state.dateOfBirth !== undefined) {
            Alert.alert('User ' + this.state.fullName.split(' ').slice(0, 1)+ ' was added!')
            this.props.navigation.navigate('Login', {})
            return axios.post('https://backendteststuff.glitch.me/user/', {
                id: this.state.email,
                fullName: this.state.fullName,
                dateOfBirth: this.state.dateOfBirth,
                password: this.state.password1,
                posts: 0,
                tokens: 0
            })
                .then(res => res.data)
                .catch((error) => {
                    Alert.alert(error)
                })
        } else {
            this.setState({ temp: "Passwords did not match or you are missing some of the fields" })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>{this.state.temp}</Text>
                </View>
                <ScrollView style={styles.formContainer}>
                    <View style={styles.containerText}>
                        <Text>Full name</Text>
                        <TextInput
                            placeholder="Full name"
                            onChangeText={(text) => this.setState({ fullName: text })}
                            onSubmitEditing={() => this.groupInput1.focus()}
                            autoCorrect={false}
                            style={styles.input}
                        />
                        <Text>Email</Text>
                        <TextInput
                            placeholder="Email"
                            onChangeText={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => this.groupInput2.focus()}
                            style={styles.input}
                            autoCorrect={false}
                            keyboardType="email-address"
                            ref={(input) => this.groupInput1 = input}
                        />
                        <Text>Date of birth</Text>
                        <TextInput
                            placeholder="DDMMYY"
                            onChangeText={(text) => this.setState({ dateOfBirth: text })}
                            onSubmitEditing={() => this.groupInput3.focus()}
                            style={styles.input}
                            autoCorrect={true}
                            keyboardType="numeric"
                            ref={(input) => this.groupInput2 = input}
                        />
                        <Text>Password</Text>
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text) => this.setState({ password1: text })}
                            onSubmitEditing={() => this.groupInput4.focus()}
                            style={styles.input}
                            autoCorrect={false}
                            secureTextEntry={true}
                            ref={(input) => this.groupInput3 = input}
                        />
                        <Text>Retype password</Text>
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text) => this.setState({ password2: text })}
                            onSubmitEditing={() => this._Post()}
                            style={styles.input}
                            autoCorrect={false}
                            secureTextEntry={true}
                            ref={(input) => this.groupInput4 = input}
                        />
                        <TouchableOpacity
                            onPress={() => this._Post()}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Create user</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    containerText: {
        padding: 20,
        alignItems: 'center',
    },
    formContainer: {
    },
    container: {
        flex: 1
    },
    logoContainer: {
        marginTop: 35,
        alignItems: 'center',
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