import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    state = {
        temp: "Edit user"
    }

        _delete() {
            this.props.navigation.navigate('Login', {})
            return axios.delete('https://backendteststuff.glitch.me/user/' + this.props.navigation.state.params.user.id)
                .then(res => res.data)
                .catch((error) => {
                    Alert.alert(error)
                })
        }
    
        _Post() {
            if (this.state.password1 == this.state.password2 && this.state.email !== undefined && this.state.fullName !== undefined && this.state.dateOfBirth !== undefined) {
                setTimeout(() => {
                    this.props.navigation.navigate('Home', { userid: this.props.navigation.state.params.user.id })
                    , 2000})
                Alert.alert('User edited!')
                return axios.put('https://backendteststuff.glitch.me/user/' + this.props.navigation.state.params.user.id, {
                    id: this.state.email,
                    fullName: this.state.fullName,
                    dateOfBirth: this.state.dateOfBirth,
                    password: this.state.password1,
                })
                    .then(res => res.data)
                    .catch((error) => {
                        Alert.alert(error)
                    })
            } else {
                this.setState({ temp: "Passwords did not match" })
            }
        }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>{this.state.temp}</Text>
                </View>
                    <ScrollView>
                        <Text>Full name</Text>
                        <TextInput
                            placeholder= {this.props.navigation.state.params.user.fullName}
                            onChangeText={(text) => this.setState({ fullName: text })}
                            onSubmitEditing={() => this.groupInput1.focus()}
                            autoCorrect={false}
                            style={styles.input}
                        />
                        <Text>Email</Text>
                        <TextInput
                            placeholder= {this.props.navigation.state.params.user.id}
                            onChangeText={(text) => this.setState({ email: text })}
                            onSubmitEditing={() => this.groupInput2.focus()}
                            style={styles.input}
                            autoCorrect={false}
                            keyboardType="email-address"
                            ref={(input) => this.groupInput1 = input}
                        />
                        <Text>Date of birth</Text>
                        <TextInput
                            placeholder= {this.props.navigation.state.params.user.dateOfBirth.toString()}
                            onChangeText={(text) => this.setState({ dateOfBirth: text })}
                            onSubmitEditing={() => this.groupInput3.focus()}
                            style={styles.input}
                            autoCorrect={true}
                            keyboardType="numeric"
                            ref={(input) => this.groupInput2 = input}
                        />
                        <Text>Password</Text>
                        <TextInput
                            placeholder= {this.props.navigation.state.params.user.password}
                            onChangeText={(text) => this.setState({ password1: text })}
                            onSubmitEditing={() => this.groupInput4.focus()}
                            style={styles.input}
                            autoCorrect={false}
                            secureTextEntry={true}
                            ref={(input) => this.groupInput3 = input}
                        />
                        <Text>Retype password</Text>
                        <TextInput
                            placeholder= {this.props.navigation.state.params.user.password}
                            onChangeText={(text) => this.setState({ password2: text })}
                            onSubmitEditing={() => this._Post()}
                            style={styles.input}
                            autoCorrect={false}
                            secureTextEntry={true}
                            ref={(input) => this.groupInput4 = input}
                        />
                    </ScrollView>
                <View style={styles.row}>
                    <TouchableOpacity
                        onPress={() => this._Post()}>
                        <Icon name="check" size={50} color="green" />
                    </TouchableOpacity>
                    <Text>            </Text>
                    <TouchableOpacity
                        onPress={() => this._delete()}>
                        <Icon name="user-times" size={50} color="#900" />
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