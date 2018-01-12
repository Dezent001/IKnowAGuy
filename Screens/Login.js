import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    state = {
        temp: "Sign in",
        loading: null
    }

    _Login() {
        this.setState({ loading: <ActivityIndicator size="large" color="blue" /> })
        fetch('https://backendteststuff.glitch.me/user/' + this.state.email)
            .then((res) => res.json())
            .then((data) => {
                if (data.id == this.state.email && data.password == this.state.password) {
                    this.setState({ temp: "Access granted" })
                    setTimeout(() => {
                        this.props.navigation.navigate('Home', { userid: data.id })
                        this.Unmount(), 1500
                    })
                } else if (data.id == this.state.email) {
                    this.setState({ temp: "Wrong password" })
                    this.setState({ loading: null })
                }
            }
            ).catch((error) => {
                this.setState({ temp: "User does not exist" })
                this.setState({ loading: null })
            })
    }

    Unmount() {
        this.groupInput.clear()
        this.groupInput1.clear()
        this.setState({ loading: null })
        this.setState({ temp: "Sign in" })
    }

    render() {
        return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.title}>{this.state.temp}</Text>
                    </View>
                    <View style={styles.formContainer}>
                        {this.state.loading}
                        <View style={styles.containerText}>
                            <TextInput
                                placeholder="Email"
                                onChangeText={(text) => this.setState({ email: text })}
                                onSubmitEditing={() => this.groupInput.focus()}
                                autoCorrect={false}
                                keyboardType="email-address"
                                style={styles.input}
                                ref={(input) => this.groupInput1 = input}
                            />
                            <TextInput
                                placeholder="Password"
                                onChangeText={(text) => this.setState({ password: text })}
                                style={styles.input}
                                autoCorrect={false}
                                secureTextEntry={true}
                                ref={(input) => this.groupInput = input}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this._Login()}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddUser', {})}>
                            <Icon name="user-plus" size={50} color="green" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('RecoverUser', {})}>
                            <Icon name="user-md" size={50} color="#900" />
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
    buttonContainer: {
        borderRadius: 20,
        height: 50,
        width: 150,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }
});
