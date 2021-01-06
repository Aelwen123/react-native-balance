import React , { Component, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, Alert, ImageBackground, Picker } from 'react-native';
import { Container, Item, Button, Label, Form, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import { TouchableRipple } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
var bg = require("../img/background.png");

class SignUpMerchant extends Component{
    state = {
        merchant_clover_account: '50383682',
        merchant_type: 'medical', 
        merchant_location: 'Jakarta Barat', 
        merchant_phonenumber: '082212345', 
        merchant_workhour_finish: '',
        merchant_workhour_finish1: '',
        merchant_workhour_finish2: '',
        merchant_workhour_start: '',
        merchant_workhour_start1: '',
        merchant_workhour_start2: '',
        merchant_pin:'2580',
        isModalTimeStartVisible : false,
        isModalTimeFinishVisible : false,
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    onSubmit = () => {
        const { merchant_clover_account, merchant_type, merchant_location, merchant_phonenumber, merchant_workhour_finish, merchant_workhour_start, merchant_pin } = this.state;
        console.log(merchant_clover_account, merchant_location, merchant_type, merchant_phonenumber, merchant_workhour_finish, merchant_workhour_start)
        fetch('http://192.168.100.136:3002/merchant/addMerchant', {
            method:'post',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                merchant_clover_account : merchant_clover_account,
                merchant_type : merchant_type,
                merchant_location : merchant_location,
                merchant_phonenumber : merchant_phonenumber,
                merchant_workhour_start : merchant_workhour_start,
                merchant_workhour_finish : merchant_workhour_finish,
                merchant_pin : merchant_pin
            })
        })
        .then(response => response.json())
        .then(res => {
            if(res.status == 200){
                Alert.alert(
                    "Registration Sucessfull"
                )
                this.props.navigation.navigate("SignInMerchant")
            } else {
                Alert.alert(
                    "Registration failed!"
                )
            }
        })
    }
  
    render(){
        const enable = 
            Number(this.state.merchant_workhour_start1) < 24 && 
            Number(this.state.merchant_workhour_start1) >= 0 && 
            Number(this.state.merchant_workhour_start2) < 60 && 
            Number(this.state.merchant_workhour_finish1) < 24 && 
            Number(this.state.merchant_workhour_finish1) >= 0 && 
            Number(this.state.merchant_workhour_finish2) < 60 && 
            this.state.merchant_workhour_start1 != '' &&
            this.state.merchant_workhour_start2 != '' &&
            this.state.merchant_workhour_finish2 != '' &&
            this.state.merchant_workhour_finish1 != '' &&
            this.state.merchant_workhour_start1 < this.state.merchant_workhour_finish1
        return(
            <View style={styles.container}>
                <ImageBackground source={bg} style={{width: '100%', height: '100%', margin:0}}>
                    
                <View style={styles.form}>
                    <View style={{flexDirection:'column', height:95}}>
                        <View style={[ styles.input, this.state.merchant_phonenumber.length > 5 && this.state.merchant_phonenumber.length < 16 ? styles.noterror : styles.error ]}>
                            <Icon name='account-plus' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', padding:12 }}/>
                            <TextInput
                                ref={"merchant_phonenumber"}
                                style={ styles.textinput } 
                                mode='outlined'
                                editable={true}
                                keyboardType='number-pad'
                                placeholder="Merchant Phonenumber" 
                                onSubmitEditing={() => { this.merchant_phonenumber.focus(); }}
                                onChangeText={val => this.onChangeText('merchant_phonenumber', val)}
                                >
                                <Text>{this.state.merchant_phonenumber}</Text>
                            </TextInput>
                        </View>
                        <Text style={{marginLeft: 10, fontWeight:'bold'}}>*Make sure its avaiable!</Text>
                    </View>

                    <View style={{flexDirection:'column', height: 95}}>
                        <View style={[styles.input, this.state.merchant_clover_account != '' ? styles.noterror : styles.error]}>
                            <Icon name='bank' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            <TextInput
                                editable={true}
                                keyboardType='number-pad' 
                                style={styles.textinput} 
                                mode='outlined' 
                                placeholder="Merchant Clover Account"
                                onChangeText={val => this.onChangeText('merchant_clover_account', val)}>
                                <Text style={{textTransform: 'uppercase'}}>{this.state.merchant_clover_account}</Text>
                            </TextInput>
                        </View>
                        <Text style={{marginLeft: 10, fontWeight:'bold'}}>*Make sure its avaiable!</Text>
                    </View>
                    

                    <View style={{flexDirection:'row', justifyContent:'space-between', width: 325}}>
                        <View style={[ styles.input, Number(this.state.merchant_workhour_start1) < 24 && Number(this.state.merchant_workhour_start1) >= 0 && Number(this.state.merchant_workhour_start2) < 60 ? styles.noterror : styles.error]}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width: 150, padding:8}}>
                                <TextInput
                                    keyboardType='number-pad'
                                    maxLength={2}
                                    style={styles.textinput} 
                                    mode='outlined' 
                                    placeholder="Time"
                                    onChangeText={val => {
                                        this.setState({merchant_workhour_start1: val}, () => {
                                            this.setState({merchant_workhour_start: this.state.merchant_workhour_start1 + '.' + this.state.merchant_workhour_start2})
                                        })
                                    }}>
                                    <Text style={{textTransform: 'uppercase', textAlign:'center'}}>{this.state.merchant_workhour_start1}</Text>
                                </TextInput>

                                <Text style={{alignContent:'center', alignSelf:'center', textAlign:'center'}}> : </Text>
                                <TextInput
                                    keyboardType='numeric'
                                    maxLength={2}
                                    style={styles.textinput} 
                                    mode='outlined' 
                                    placeholder="Time" 
                                    onChangeText={val => {
                                        this.setState({merchant_workhour_start2: val}, () => {
                                            this.setState({merchant_workhour_start: this.state.merchant_workhour_start1 + '.' + this.state.merchant_workhour_start2})
                                        })
                                    }}>
                                    <Text style={{textTransform: 'uppercase', textAlign:'center'}}>{this.state.merchant_workhour_start2}</Text>
                                </TextInput>
                            </View>
                        </View>

                        <View style={[ styles.input, Number(this.state.merchant_workhour_finish1) < 24 && Number(this.state.merchant_workhour_finish1) >= 0 && Number(this.state.merchant_workhour_finish2) < 60 ? styles.noterror : styles.error ]}>
                            <View style={{flexDirection:'row', justifyContent:'space-between', width: 150}}>
                                <TextInput
                                    keyboardType='numeric'
                                    maxLength={2}
                                    style={styles.textinput} 
                                    mode='outlined' 
                                    placeholder="Time" 
                                    onChangeText={val => {
                                        this.setState({merchant_workhour_finish1 : val}, () => {
                                            this.setState({merchant_workhour_finish: this.state.merchant_workhour_finish1 + '.' + this.state.merchant_workhour_finish2})
                                        })
                                    }}>
                                    <Text style={{textTransform: 'uppercase'}}>{this.state.merchant_workhour_finish1}</Text>
                                </TextInput>

                                <Text style={{alignContent:'center', alignSelf:'center'}}> : </Text>
                                <TextInput
                                    keyboardType='numeric' 
                                    maxLength={2}
                                    style={styles.textinput} 
                                    mode='outlined' 
                                    placeholder="Time" 
                                    onChangeText={val => {
                                        this.setState({merchant_workhour_finish2 : val}, () => {
                                            this.setState({merchant_workhour_finish: this.state.merchant_workhour_finish1 + '.' + this.state.merchant_workhour_finish2})
                                        })
                                    }}>
                                    <Text style={{textTransform: 'uppercase'}}>{this.state.merchant_workhour_finish2}</Text>
                                </TextInput>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.input, this.state.merchant_location != '' ? styles.noterror : styles.error]}>
                        <Icons name='enviroment' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                        <TextInput
                            ref={"merchant_location"}
                            style={ styles.textinput } 
                            mode='outlined'
                            editable={true}
                            placeholder="Merchant Location"
                            onChangeText={val => this.onChangeText('merchant_location', val)}
                            >
                            <Text>{this.state.merchant_location}</Text>
                        </TextInput>
                    </View>

                    <View style={[styles.input, this.state.merchant_type === '' ? styles.error : styles.noterror]}>
                        <Icon name='phone' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                        <Picker
                            selectedValue={this.state.merchant_type}
                            style={{ height: 50, width: 250 }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({merchant_type: itemValue})
                            }}
                            >
                                <Picker.Item key='' value='' label='Choose Type' />
                                <Picker.Item key='food' value='food' label='Food' />
                                <Picker.Item key='medical' value='medical' label='Medical' />
                                <Picker.Item key='entertainment' value='entertainment' label='Entertainment' />
                                <Picker.Item key='property' value='property' label='Property' />
                        </Picker>
                    </View>

                    <View style={[ styles.input, this.state.merchant_pin.length == 4 ? styles.noterror : styles.error ]}>
                        <Icon name='onepassword' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', padding:12 }}/>
                        <TextInput
                            ref={"merchant_pin"}
                            style={ styles.textinput } 
                            mode='outlined'
                            secureTextEntry={true}
                            maxLength={4}
                            keyboardType='number-pad'
                            placeholder="Merchant Pin"
                            onChangeText={val => this.onChangeText('merchant_pin', val)}
                            >
                            <Text>{this.state.merchant_pin}</Text>
                        </TextInput>
                    </View>

                    <View style={{alignItems:'center', marginTop: 35}}>
                        <TouchableRipple
                            disabled={ this.state.merchant_clover_account == '' && this.state.merchant_location == '' && this.state.merchant_phonenumber == '' && this.state.merchant_pin.length != 4 && !enable }
                            onPress={this.onSubmit.bind(this)}
                            style={[
                                styles.styleButtonSignUp,
                                { 
                                    backgroundColor: this.state.merchant_clover_account != '' && this.state.merchant_location != '' && this.state.merchant_phonenumber != '' && this.state.merchant_pin.length == 4 && enable ? '#4263D5' : '#4263D550'
                                }
                            ]}>
                            <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>Sign Up Merchant</Text>
                        </TouchableRipple>
                    </View>
                    <View style={{alignItems:'center', flexDirection: 'row', marginTop: 0, marginBottom: 30 }}>
                        <Text style={{textAlign:'center', paddingTop:20, fontSize: 14}}>Already have an account?</Text>
                        <TouchableOpacity
                            style={{ paddingTop: 20, paddingStart: 10,  }}
                            onPress={() => this.props.navigation.navigate('SignInMerchant')}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Sign In Merchant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
            </View>
        );
    }
}

export default SignUpMerchant;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    containerJudul: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'Roboto',
        letterSpacing: 1,
        lineHeight: 20,
        top: 20,
        left: 3,
    },
    form:{
        flex:1,
        width:200,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:40,
        left:95
    },
    image:{
        position:'absolute',
        top:-50,
        left:-45
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        width: 310,
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
        elevation: 5
    },
    textinput:{
        flex: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        color: '#424242',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 20,
        marginEnd: 20,
    },
    bottom: {
        flex: 1, 
        justifyContent: 'flex-end', 
        marginBottom: 14,
        display: 'flex',
        position: 'relative'
    },
    styleButtonSignUp: {
        backgroundColor: '#4287f5', 
        borderRadius: 20,
        height: 45, 
        width: 310, 
    },
    error: {
        borderColor: 'red',
        borderWidth: 1,
    },
    noterror: {
        borderColor: 'lightgreen',
        borderWidth: 1,
    },
    modalContent: {
        justifyContent: undefined,
        alignItems: undefined,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        margin: 50
    },

    viewCompany : {
        alignContent:'center',
        color: '#90dae1',
        alignSelf:'center',
        margin: 10,
        borderWidth:1,
        borderRadius:20,
        padding:20
    },
});