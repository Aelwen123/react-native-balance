import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Icon, Image, AsyncStorage } from 'react-native';
import { Button, Content, Header } from 'native-base';
import { Avatar, TouchableRipple } from 'react-native-paper';

import ProfilePicture from '../assets/aelwen1.jpg'
import profile_background from '../assets/background_profile.png';

import icon_edit_profile from '../assets/icon_edit_profile.png';
import icon_faq from '../assets/icon_faq.png';
import icon_cs from '../assets/icon_cs.png';

import arrow from '../assets/arrow.png';

import Footers from './Footers';

import * as Font from 'expo-font';
import { autofill } from 'redux-form';
import { TouchableOpacity } from 'react-native-gesture-handler';

// var bg = require("../img/background.png");

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
          name: '',
          balance : '',
          user_name : '',
          user_email : '',
          phonenumber : '',
          total_accounts : '',
        }
    }

    componentDidMount() {
        this.getUserData()
        this.getCardData()
    }

    getUserData = () => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/customer/getCustomer/" + result)
            .then(response => response.json())
            .then(res => {
                this.setState({user_name : res.user_name})
                this.setState({user_email : res.user_email})
                this.setState({phonenumber: res.user_phonenumber})
            })
        })
    }

    getCardData = () => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/mycard/getCustomerCard/" + result)
            .then(response => response.json())
            .then(res => {
                this.setState({total_accounts: res.length})
            }).catch(err => {
                console.log(err)
            })
        })
    }

    render(){
        return(
            <View style={ styles.container }>
                <ImageBackground source={profile_background} style={ styles.imgb }>
                    <Content>
                        <View style={ styles.containerJudul }>
                            <Text style={ styles.styleContainerJudul }>Profile</Text>
                        </View>
                        <View style={ styles.containerAvatar }>
                            <Avatar.Image source={ProfilePicture} size={80} style={ styles.containerStyleAvatar } />
                            <View style={ styles.containerProfileData }>
                                <Text style={{color:'white', fontSize:26, fontWeight:'bold', marginStart: 18, flexDirection: 'column'}}>{this.state.user_name}</Text>
                                <Text style={{color:'white', marginStart: 18 }}>{this.state.user_email}</Text>
                                <Text style={{color:'white', marginStart: 18 }}>Total accounts: {this.state.total_accounts}</Text>
                            </View>
                        </View>
                    </Content>
                </ImageBackground>
                
                <View style={ styles.containerProfileMenuAccount }>
                    <View style={ styles.styleMenuAccount }>
                        <Text style={ styles.styleMenuTextAccount }>Account</Text>
                    </View>

                    <View style={ styles.containerAccount }>
                    <TouchableOpacity style={ styles.styleButtonEditProfile }
                            onPress={() => this.props.navigation.navigate('EditProfileScreen', {
                                user_name : this.state.user_name,
                                user_email : this.state.user_email,
                                phonenumber: this.state.phonenumber,
                            })}>
                            <Image source={icon_edit_profile} style={ styles.styleImageEditProfile }/>
                            <Text style={ styles.styleTextEditProfile }>Edit Profile</Text>
                            <Image source={arrow} style={{ marginTop: 14, marginEnd: 20, width: 14, height: 14, marginEnd: 30, resizeMode: 'contain' }}/>
                    </TouchableOpacity>
                    </View>

                    <View style={ styles.containerAccount }>
                    <TouchableOpacity style={ styles.styleButtonEditProfile }
                            onPress={() => this.props.navigation.navigate('SignInMerchant')}>
                            <Image source={icon_edit_profile} style={ styles.styleImageEditProfile }/>
                            <Text style={ styles.styleTextEditProfile }>Sign In Merchant</Text>
                            <Image source={arrow} style={{ marginTop: 14, marginEnd: 20, width: 14, height: 14, marginEnd: 30, resizeMode: 'contain' }}/>
                    </TouchableOpacity>
                    </View>
                    
                </View>         

                <View style={ styles.containerProfileMenuOtherInfo }>
                    <View style={ styles.styleMenuOtherInfo }>
                        <Text style={ styles.styleTextOtherInfo }>Other Info</Text>
                    </View>

                    <View style={ styles.containerOtherInfo }>
                        <TouchableOpacity style={ styles.styleButtonFAQ } onPress={() => this.props.navigation.navigate('FAQScreen')}>
                            <Image source={icon_faq} style={{ marginTop: 10, marginStart: 22, width: 22, height: 22, marginEnd: 20, resizeMode: 'contain' }}/>
                            <Text style={{ lineHeight: 40, fontSize: 16 }}>FAQ</Text>
                            <Image source={arrow} style={{ marginTop: 14, marginStart: '68%', width: 14, height: 14, marginEnd: 30, resizeMode: 'contain' }}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: '#ffffff', height: 50, flexDirection: 'row' }}
                            onPress={() => this.props.navigation.navigate('CustomerServiceScreen', {
                                user_name : this.state.user_name,
                                user_email : this.state.user_email,
                                phonenumber: this.state.phonenumber,
                            })}>
                            <Image source={icon_cs} style={{ marginTop: 18, marginStart: 21, width: 20, height: 20, marginEnd: 20, resizeMode: 'contain' }}/>
                            <Text style={{ lineHeight: 54, fontSize: 16, marginEnd: '40%'}}>Customer Service</Text>
                            <Image source={arrow} style={{ marginTop: 14, marginEnd: 19, width: 14, height: 14, marginEnd: 30, resizeMode: 'contain' }}/>
                        </TouchableOpacity>
                    </View>
                </View>         

                <View style={ styles.containerButtonSignOut }>
                    <TouchableRipple
                        onPress={() => this.props.navigation.navigate('SignIn')} 
                        style={ styles.buttonSignOut }>
                        <Text style={ styles.styleTextSignOut }>SIGN OUT</Text>
                    </TouchableRipple>
                </View>

                <Content>
                </Content>
                <Footers />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgb : {
        height: 210,
        width: '100%',
    },
    containerJudul: {
        marginTop: 50,
        marginStart: 24,
    },
    styleContainerJudul: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    containerAvatar: {
        marginTop: 10, 
        marginLeft: 25, 
        flexDirection: 'row',
        marginTop: 28,
    },
    containerStyleAvatar: {
        backgroundColor:'white',
    },
    containerProfileData: {
        marginStart: 6,
    },
    containerProfileMenuAccount: {
        backgroundColor: 'white',
        width: '100%',
        height: 200,
    },
    styleMenuAccount: {
        marginStart: 24, 
        marginTop: 20,
    },
    styleMenuTextAccount: {
        fontSize: 20, 
        fontWeight: '500'
    },
    styleButtonEditProfile: {
        backgroundColor: '#ffffff', 
        height: 50, 
        flexDirection: 'row'
    },
    styleImageEditProfile: {
        marginTop: 10, 
        marginStart: 20, 
        width: 22, 
        height: 22, 
        marginEnd: 20, 
        resizeMode: 'contain'
    },
    styleTextEditProfile: {
        lineHeight: 38, 
        fontSize: 16 
    },
    containerAccount: {
        marginTop: 14
    },
    containerProfileMenuOtherInfo: {
        backgroundColor: 'white',
        width: '100%',
        height: '27%',
        marginTop: 6
    },
    styleMenuOtherInfo: {
        marginStart: 24, 
        marginTop: 20
    },
    styleTextOtherInfo: {
        fontSize: 20, 
        fontWeight: '500'
    },
    containerOtherInfo: {
        marginTop: 14
    },
    styleButtonFAQ: {
        backgroundColor: '#ffffff', 
        height: 50, 
        flexDirection: 'row'
    },
    containerButtonSignOut: {
        margin: 27.8,
        backgroundColor: '#EB5757',
        borderColor: '#EB5757',
        borderRadius: 20,
        borderStyle: "solid"
    },
    buttonSignOut: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    styleTextSignOut: {
        color: 'white',
        fontWeight: 'bold'
    },
});