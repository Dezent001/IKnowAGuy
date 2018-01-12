import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    state = {
        temp: "Buy tokens!"
    }

    _Post() {
        setTimeout(() => {
            this.props.navigation.navigate('Home', { userid: this.props.navigation.state.params.user.id })
            , 1500})
        Alert.alert('Tokens bougt')
        return axios.put('https://backendteststuff.glitch.me/user/' + this.props.navigation.state.params.user.id, {
            tokens: (this.props.navigation.state.params.user.tokens + 1)
        })
            .then(res => res.data)
            .catch((error) => {
                Alert.alert('Not able to get tokens')
            })

    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>{this.state.temp}</Text>
                    <Text style={styles.title}></Text>
                    <Icon name="credit-card" size={50} color="black" />
                </View>
                <View>
                    <Text>Card holder</Text>
                    <TextInput
                        value='John Doe'
                        style={styles.input}
                    />
                    <Text>Card nr.</Text>
                    <TextInput
                        value='1234 5678 9101 1121'
                        keyboardType="numeric"
                        style={styles.input}
                        ref={(input) => this.groupInput1 = input}
                    />
                    <View style={styles.row}>
                    <Text>Date</Text>
                    <Text>Control nr.</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            value='03/23'
                            keyboardType="numeric"
                            style={styles.input1}
                            ref={(input) => this.groupInput2 = input}
                        />
                        <TextInput
                            value='023'
                            keyboardType="numeric"
                            style={styles.input1}
                            ref={(input) => this.groupInput3 = input}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => Alert.alert('This is an early build therefore this service is diabled. Press the token key for a free token!')}>
                        <Icon name="shopping-cart" size={50} color="green" />
                    </TouchableOpacity>
                    <Text>            </Text>
                    <TouchableOpacity
                        onPress={() => this._Post()}>
                        <Icon name="try" size={50} color="blue" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 200
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30
    },
    input: {
        borderRadius: 5,
        height: 40,
        width: 250,
        backgroundColor: 'lightblue',
        marginBottom: 10,
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    input1: {
        borderRadius: 5,
        height: 40,
        width: 100,
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