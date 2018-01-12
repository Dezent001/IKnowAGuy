import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'

import Login from './Screens/Login' 
import Home from './Screens/Home' 
import MakePost from './Screens/MakePost' 
import RecoverUser from './Screens/RecoverUser' 
import AddUser from './Screens/AddUser' 
import Posts from './Screens/Posts' 
import Post from './Screens/Post' 
import EditUser from './Screens/EditUser'
import AddTokens from './Screens/AddTokens'

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
  Login: { screen: Login, },
  Home: { screen: Home, },
  MakePost: { screen: MakePost, },
  RecoverUser: { screen: RecoverUser, },
  AddUser: { screen: AddUser, },
  Posts: { screen: Posts, },
  Post: { screen: Post, },
  EditUser: { screen: EditUser, },
  AddTokens: { screen: AddTokens, }
}, {
    headerMode: 'none',
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
