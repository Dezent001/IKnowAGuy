import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Game extends Component {
    state = {
        all: (<Text style={{ fontSize: 30 }}></Text>),
        load: false
    }

    componentWillUnmount() {
        Alert.alert('unmount')
    }

    componentWillMount() {
        var all = [];
        fetch('https://backendteststuff.glitch.me/user/' + this.props.navigation.state.params.userid)
        .then((res) => res.json())
        .then((data) => {
            if(data.tokens == null){
                this.setState({ tok: 0 })
            }else{
                this.setState({ tok: data.tokens })
            }
            all.push(
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <View style={styles.logoContainer}>
                    <Text style={{ fontSize: 28 }}>{data.fullName}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Number of posts: {data.posts}</Text>
                    <Text>       </Text>
                    <Text>Tokens left: {this.state.tok}</Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('MakePost', { user: data })}
                    style={styles.buttonContainer}
                >
                    <Text style={{fontSize:26}}>Make Post</Text>
                    <Icon name="file-text-o" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Posts', { user: data })}
                    style={styles.buttonContainer}
                >
                    <Text style={{fontSize:26}}>Browse</Text>
                    <Icon name="search" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('EditUser', { user: data })}
                    style={styles.buttonContainer}
                >
                    <Text style={{fontSize:26}}>Edit User</Text>
                    <Icon name="cogs" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('AddTokens', { user: data })}
                    style={styles.buttonContainer2}
                >
                    <Text style={{fontSize:26}}>Buy tokens</Text>
                    <Icon name="credit-card" size={26} color="gold" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.goBack()}
                    style={styles.buttonContainer1}
                >
                    <Text style={{fontSize:26}}>Sign Out</Text>
                    <Icon name="sign-out" size={26} color="red" />
                </TouchableOpacity>
                </View>
            )
            this.setState({ all })
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            {this.state.all}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonContainer: {
        borderRadius: 20,
        height: 80,
        width: 250,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    },
    buttonContainer2: {
        borderRadius: 20,
        height: 80,
        width: 250,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver'
    },
    buttonContainer1: {
        borderRadius: 20,
        height: 80,
        width: 250,
        marginTop: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightyellow'
    },
    logoContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'lightblue',
        fontSize: 20
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        color: 'lightblue',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
});