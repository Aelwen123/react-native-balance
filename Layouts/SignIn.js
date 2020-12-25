import React, { useState, useRef, useEffect } from 'react';
import { View, PixelRatio, Text, StyleSheet, ImageBackground, StatusBar, Image, TextInput, Button, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

var bg = require("../img/background.png");
var lg = require("../img/Logo_Balance.png");

export default class SignIn extends React.Component{
        state = {
            phonenumber: '085347622944', 
            securitypin: '2580',
        }
        
        onChangeText = (key, val) => {
            this.setState({ [key]: val })
        }

        signIn = () => {
            console.log('haha')
            const { phonenumber, securitypin } = this.state
            fetch('http://192.168.100.136:3002/customer/signin', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_phonenumber : phonenumber,
                    user_pin : securitypin
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status != 200){
                    console.log(res)
                }
                else{
                    AsyncStorage.setItem('token', res.token)
                    AsyncStorage.setItem('phonenumber', res.user_phonenumber)
                    AsyncStorage.getItem('token', (err, result) => {
                        this.props.navigation.navigate('TheHome', {
                            token : result,
                            user_phonenumber : res.user_phonenumber,
                            user_email: res.user_email,
                            user_name: res.user_name
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }

        
        render(){            
            const { phonenumber, securitypin, submitButton } = this.state;
                
            return(
                <View style={ styles.container }>
                    <ImageBackground source={bg} style={ styles.imgb }> 
                        <View style={{ marginStart: 35, marginTop: 24 }}>
                            <Text style={ styles.judul }>Welcome</Text>
                            <View style={ styles.square }/> 
                        </View>
    
                        <View style={{ marginStart: 35, marginTop: 46}}>
                            <Text style={{ textAlign: 'left', fontSize: 16, color: '#fff' }}>Please Input the fields below</Text>
                        </View>
    
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.form}>
    
                                <View style={[ styles.input, this.state.phonenumber.length > 9 && this.state.phonenumber.length < 13 && this.state.phonenumber.substr(0,1) !== '8' && !isNaN(phonenumber) ? styles.noterror : styles.error  ]}>
                                    <Icon name='phone' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                                    <TextInput 
                                        ref={"phonenumber"}
                                        keyboardType='numeric' 
                                        style={styles.textinput} 
                                        mode='outlined' 
                                        placeholder="Phone number" 
                                        onSubmitEditing={() => { this.securitypin.focus(); }}
                                        onChangeText={val => this.onChangeText('phonenumber', val) }>
                                        <Text>{this.state.phonenumber}</Text>
                                    </TextInput>
                                </View>
    
                                <View style={[ styles.input, this.state.securitypin.length >= 4 && this.state.securitypin.length <= 4 && !isNaN(securitypin) ? styles.noterror : styles.error ]}>
                                    <Icon name='onepassword' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                                    <TextInput 
                                        ref={(securitypin) => { this.securitypin = securitypin; }}
                                        keyboardType='numeric' 
                                        style={styles.textinput} 
                                        mode='outlined' 
                                        placeholder="Security pin" 
                                        secureTextEntry={true} 
                                        onChangeText={val => this.onChangeText('securitypin', val) }>
                                        <Text style={{ textAlign: 'center' }}>{this.state.securitypin}</Text>
                                    </TextInput>
                                </View>
                            
                            </View>
                        </View>
            
                        <View style={ styles.bottom }>
                            <View style={{alignItems:'center', marginTop: 0 }}>
                                <TouchableOpacity
                                    disabled={ this.state.phonenumber == '' && this.state.securitypin >= 4 && this.state.securitypin <= 4 && this.state.phonenumber.substr(0,1) != '8' }
                                    onPress={this.signIn.bind(this)}
                                    style={{ backgroundColor: '#4287f5', borderRadius: 20 }}
                                    style={[
                                        styles.styleButtonSignin,
                                            { 
                                                backgroundColor: this.state.phonenumber != '' && this.state.securitypin != '' && this.state.phonenumber.substr(0,1) != '8' ? '#4263D5' : '#4263D550'
                                            }
                                        ]}
                                    onPress={this.signIn.bind(this)}>
                                    <Text style={ styles.styleTextSignIn }>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                        <View style={{justifyContent: 'center', backgroundColor: '#fff', alignItems:'center', marginTop: 0, marginBottom: 0, flexDirection: 'row'}}>
                            <Text style={{textAlign:'center', paddingTop:20, paddingBottom: 20, fontSize: 14}}>Don't have an account?</Text>
                            <TouchableOpacity
                                style={{ paddingTop: 0, paddingStart: 10, }}
                                onPress={() => this.props.navigation.navigate("SignUp")} >
                                <Text style={{ color: '#4287f5', fontSize: 14, fontWeight: 'bold'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            );
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgb : {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    imglogo:  {
        height: 100,
        resizeMode: "contain",
        marginLeft: 70,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
      flex: 1
    },
    judul: {
        fontSize: 50,
        color: "white",
        marginTop: 40,  
        fontWeight: 'bold',        
    },
    square: {
        width: 70,
        height: 4,
        backgroundColor: 'white'
    },
    containerJudulInput: {
        marginHorizontal: 40, 
        marginTop: 60
    },
    textJudul: {
        fontSize: 15,
        color: "#F2F2F2",
        fontWeight: 'bold'
    },
    containerInput: {
        marginTop: 40,
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 0,
        alignItems: 'center',
        // backgroundColor: 'white',
        // borderBottomWidth: 1.5,
    },
    containerPIN: {
        marginTop: 10,
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 0,
        alignItems: 'center',
        // backgroundColor: 'white',
        // borderBottomWidth: 1.5,
    },
    openDialogView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        lineHeight: 16,        
    },
    textIdCountry: {
        fontSize: 18,
        color: '#33333350',
    },
    txtInput: {
        width: 300, 
        height: 45, 
        backgroundColor: 'white', 
        marginTop: 10, 
        marginStart: 5,
        marginEnd: 5,
        flex: 1,
        height: 50
    },
    containerSignUp: {
        fontSize: 14, 
        color: '#F2F2F2',
        fontWeight: 'bold'
    },
    bottom: {
        flex: 1, 
        justifyContent: 'flex-end', 
        marginBottom: 14,
        display: 'flex',
        position: 'relative'
    },
    form:{
        position: 'absolute',
        top: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        width: 300,
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        color: '#90dae1',
        borderRadius: 20,
        fontSize: 18,
        fontWeight: '500',
        shadowColor:'black',
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textinput:{
        flex: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        color: '#424242',
        alignItems:'center',
        justifyContent:'center',
        fontSize: 18
    },
    styleButtonSignin: {
        width: 300, 
        height: 45, 
        borderRadius: 20 
    },
    styleTextSignIn: {
        textAlign: 'center', 
        alignItems: 'center', 
        fontSize: 20, lineHeight: 45, 
        color: '#ffffff', fontSize: 20 
    },
});

