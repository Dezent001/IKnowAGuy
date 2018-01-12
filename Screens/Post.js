import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, KeyboardAvoidingView, TextInput, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import axios from 'axios';

export default class Login extends Component {
    state = {
        data: null,
        color: 'lightgrey'
    }

    _handlePress() {
        this.textInput.clear()
        setTimeout(() => this.componentWillMount(), 500)
        return axios.post('https://backendteststuff.glitch.me/chat/', {
            postid: this.props.navigation.state.params.data.id,
            userid: this.props.navigation.state.params.user.id,
            text: this.state.text,
            timeStamp: moment().format('HH:mm - DD/MM/YY'),
            userName: this.props.navigation.state.params.user.fullName
        })
            .then(res => res.data)
    }

    componentWillMount() {
        console.log("posts: " + this.props.navigation.state.params.data.id)
        var posts = [];
        var coun = this.props.navigation.state.params.user.id.length
        fetch('https://backendteststuff.glitch.me/chat/')
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i < Object.keys(data).length; i++) {
                    if(this.props.navigation.state.params.data.id == data[i].postid){
                        //Checker farven på posts & hvem der skriver hvad
                        var cou = data[i].userid.length;
                        console.log("USERID: " + data[i].userid + "POSTID: " + data[i].postid.slice(0,cou))
                        if (data[i].userid == this.props.navigation.state.params.user.id) {
                            this.setState({ align: <View><Text></Text></View> })
                            this.setState({ color: "lightgreen" })
                        }else if (data[i].userid == data[i].postid.slice(0,cou)) {
                            this.setState({ align: null })
                            this.setState({ color: "lightgrey" })
                        }else{
                            this.setState({ align: null })
                            this.setState({ color: "lightblue" })
                        }

                        posts.push(
                            <View 
                                style={{
                                    flexDirection: "row",
                                    justifyContent: 'space-between'
                                }}>
                                {this.state.align}
                            <View
                                style={{
                                    borderRadius: 20,
                                    width: 235,
                                    minHeight: 25,
                                    marginTop: 15,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    backgroundColor: this.state.color,
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.buttonText}>{data[i].text}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, textAlign: "left", marginRight: 15, marginLeft: 15 }}>Added: {data[i].timeStamp} {'\n'}User: {data[i].userName} </Text>
                                </View>
                            </View>
                            </View>
                        )
                    this.setState({ posts: posts })
                    }
                }
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={{
                    borderRadius: 20,
                    maxHeight: 250,
                    marginTop: 25,
                    backgroundColor: this.state.color,
                    justifyContent: 'center'
                }}>
                    <View style={styles.row}>
                        <Text style={styles.buttonText}>User: {this.props.navigation.state.params.data.user.split(' ').slice(0, 1)}</Text>
                        <Text style={styles.buttonText}>Distance: {this.props.navigation.state.params.data.distance}km</Text>
                    </View>

                    <ScrollView>
                        <Text style={{ fontSize: 22, textAlign: 'center' }}>{this.props.navigation.state.params.data.headline}</Text>
                        <Text style={styles.buttonText}>{this.props.navigation.state.params.data.text}</Text>
                    </ScrollView>

                    <View style={styles.row}>
                        <Text style={styles.buttonText}>Price: {this.props.navigation.state.params.data.price}Kr</Text>
                        <Text style={styles.buttonText}>Added: {this.props.navigation.state.params.data.timeStamp}</Text>
                    </View>
                </View>
                <ScrollView>
                    {this.state.posts}
                </ScrollView>
                <View style={styles.border}>
                    <TextInput
                        ref={input => { this.textInput = input }}
                        placeholder=" Message"
                        onChangeText={(text) => this.setState({ text: text })}
                        style={styles.input}
                        autoCorrect={true}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={() => this._handlePress()}>
                        <Icon name="arrow-circle-up" size={40} color="green" />
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
    border: {
        flexDirection: "row",
        justifyContent: 'space-between',
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
        borderRadius: 10,
        flex: 1,
        minHeight: 40,
        maxHeight: 80,
        margin: 2,
        backgroundColor: 'lightgrey',
        fontSize: 18,
        textAlign: 'left',
    },
    buttonContainer: {
        borderRadius: 20,
        height: 120,
        width: 235,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    buttonText: {
        fontSize: 18,
        marginRight: 15,
        marginLeft: 15
    }
});