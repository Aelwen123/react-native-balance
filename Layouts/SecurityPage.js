import React, { Component, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, BackHandler, Alert } from 'react-native';
import Logo from '../assets/bubblelogin.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Actions} from 'react-native-router-flux';
import CustomButtonBorder from './Components/Customebuttonborder';
import { Button, Form } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

export default class Security extends Component{
    state = {
        securitypin: '', currentDate: '', error:''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount(){
        this.currentDate()
        return false;
    }

    onClear = () => {
        this.setState({
            securitypin: ''
        })
    }


    currentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        this.setState({currentDate : date + '/' + month + '/' + year})
    }

    pay = () => {
        if(this.props.route.params.mycard_type == "digitalpayment"){
            fetch('http://192.168.100.136:3002/payment/payToMerchants', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    merchant_id_balance : this.props.route.params.merchant_id,
                    user_phonenumber : this.props.route.params.mycard_number,
                    securitypin : this.state.securitypin,
                    payment_method : this.props.route.params.mycard_name,
                    amountBeforePromo : this.props.route.params.nominalBeforePromo,
                    amountAfterPromo: this.props.route.params.nominal,
                    payment_date: this.state.currentDate,
                    payment_status: true,
                    payment_promo : this.props.route.params.payment_promo
                })
            }).then(response => response.json())
            .then(res => {
                if(res.status == 200){
                    this.props.navigation.push('TheHome')
                }
                else{
                    this.setState({error: "Payment Failed!"})
                }
            })
        } else {
            fetch('http://192.168.100.136:3002/payment/payToBanks', {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    merchant_id_balance : this.props.route.params.merchant_id,
                    user_phonenumber : this.props.route.params.mycard_phonenumber,
                    senderAccountNumber : this.props.route.params.mycard_number,
                    debitcardpin : this.state.securitypin,
                    payment_method : this.props.route.params.mycard_name,
                    amountBeforePromo : this.props.route.params.nominalBeforePromo,
                    amountAfterPromo: this.props.route.params.nominal,
                    payment_date: this.state.currentDate,
                    payment_status: true,
                    payment_promo : this.props.route.params.payment_promo
                })
            }).then(response => response.json())
            .then(res => {
                if(res.status == 200){
                    Alert.alert(
                        "Payment Success!"
                    )
                    this.props.navigation.push('TheHome')
                }
                else{
                    this.setState({error: "Payment Failed!"})
                }
            })
        }
    }

    onClear = () => {
        this.setState({
            securitypin: ''
        })
    }

    render(){
        const { securitypin } = this.state;
        const enabled = securitypin.length >= 4 && !isNaN(securitypin);

        const { handleSubmit, reset } = this.props;   
                
        return(
            <View style={ styles.container }>
                {/* <Image source={Logo} style={styles.image}></Image> */}
                <View style={ styles.styleTextPIN }>
                    <Text style={ styles.textPin }>Please input your Security PIN</Text>
                </View>
                <View style={styles.form} id="form">
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.input}>
                            <Icon name='account-circle' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            <TextInput keyboardType="number-pad" secureTextEntry={true} placeholder="Security Pin" style={{ alignItems: 'center', justifyContent: 'center' }} onChangeText={val => this.onChangeText('securitypin', val)}>
                                <Text style={{color: "black", alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>{this.state.securitypin}</Text>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{marginTop: 35}}>
                        <Text style={{ fontSize: 12, textAlign: 'right', marginEnd: 26, }}>*Must be a Number!</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{ fontSize: 12, textAlign: 'right', marginEnd: 26, color: 'red'}}>{this.state.error}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 54, marginEnd: 0 }}>
                        <View style={{ alignItems:'center', marginTop: 20, }}>
                            {/* <CustomButtonBorder title='Pay' colors={['#90dae1', '#4287f5']} onPress={() => null}/> */}
                            <TouchableOpacity 
                                name={ this.state.btnPay } 
                                disabled={ !enabled }
                                onPress={this.pay.bind(this)}
                                style={[
                                    styles.containerButtonPay,
                                    { 
                                        backgroundColor: enabled ? '#4263D5' : '#4263D530', 
                                    }
                                    ]}>
                                <Text
                                    style={[
                                        styles.styleTextPay,
                                        { 
                                            color: securitypin? 'white' : 'white' 
                                        }
                                        ]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginStart: 0, marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={this.onClear}>
                                <Text style={ styles.styleTextClear }>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },

    styleTextPIN: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },

    textPin: {
        fontSize: 16,
    },

    form:{
        top:50,
        flex:1,        
    },

    input:{
        flex: 1,
        position:'absolute',
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
        elevation: 5,
    },

    image:{
        position:'absolute',
        top:-50,
        left:-45
    },

    styleTextClear: {
        textAlign: 'center',
    },

    containerButtonPay: {
        width: 310,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },

    styleTextPay: {
        textAlign: 'center',
        fontSize: 15
    }
})