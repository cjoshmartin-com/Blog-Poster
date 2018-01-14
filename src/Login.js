import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import { auth } from './firebase.js'

import {Jiro} from 'react-native-textinput-effects'

import { FontAwesome, EvilIcons } from '@expo/vector-icons';

import { NavigationActions } from 'react-navigation'

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
        };

        this.login = this.login.bind(this);
    }

    login(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ]
        })
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => this.props.navigation.dispatch(resetAction) )
    }

    render(){
        return(
            <View >
                <View style={{flex:2}} />

                <KeyboardAvoidingView  behavior="padding">
                    <Jiro
                        label={"Email"}
                        borderColor={"rgba(255,255,255,.5)"}
                        labelStyle={{ color: 'white' }}
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCapitalize="none"
                        ref={(input)=> this.emailInput = input}
                        onSubmitEditing={()=> this.passwordInput.focus()}
                        onChangeText={(email)=>{this.setState({email}) }}
                    />
                    <Jiro
                        label={"Password"}
                        borderColor={"rgba(255,255,255,.5)"}
                        labelStyle={{ color: 'white' }}
                        password={true}
                        returnKeyType="go"
                        autoCapitalize="none"
                        onSubmitEditing={this.login}
                        ref={(input)=> this.passwordInput = input}
                        onChangeText={(password)=>{this.setState({password}) }}

                    />
                    <View style={{flexDirection:"row", paddingTop: 30}} >
                        <TouchableOpacity  onPress={this.login}>
                            <Text style={{color:"rgba(255,255,255,.6)",fontWeight:'700'}}> LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={{flex:1,alignItems: 'center'}} />
            </View>
        );
    }

}

