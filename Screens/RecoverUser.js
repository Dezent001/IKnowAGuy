import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert } from 'react-native';

export default class Login extends Component {
    _Login() {
        fetch('https://backendteststuff.glitch.me/user/' + this.state.email)
            .then((res) => res.json())
            .then((data) => {
                Alert.alert("your password is: " + data.password)
            }
        )
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>Did you forget you password?</Text>
                    <Text>Early build features available</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.containerText}>
                        <TextInput
                            placeholder="Type in email of lost account"
                            onChangeText={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => this.props.navigation.navigate('Login', {})}
                            autoCorrect={false}
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => this._Login()}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>Recover</Text>
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
    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }
});