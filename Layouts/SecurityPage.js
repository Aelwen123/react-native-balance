import React, { Component, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import Logo from '../assets/bubblelogin.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Actions} from 'react-native-router-flux';
import CustomButtonBorder from './Components/Customebuttonborder';
import { Button, Form } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

// let merchant_balance = 0
// let user_balance = 0

export default class Security extends Component{
    state = {
        securitypin: '',
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount(){
        user_balance = this.props.user_balance
        merchant_balance = this.props.merchant_balance
    }

    onClear = () => {
        this.setState({
            securitypin: ''
        })
    }

    render(){
        const { securitypin } = this.state;
        const enabled = securitypin.length > 0;

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
                            <TextInput keyboardType="number-pad" placeholder="Security Pin" onChangeText={val => this.onChangeText('securitypin', val)}>
                                <Text style={{color: "black"}}>{this.state.securitypin}</Text>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 54, marginEnd: 0 }}>
                        <View style={{ alignItems:'center', marginTop: 20, }}>
                            {/* <CustomButtonBorder title='Pay' colors={['#90dae1', '#4287f5']} onPress={() => null}/> */}
                            <TouchableOpacity 
                                name={ this.state.btnPay } disabled={ !enabled }
                                style={[
                                    styles.containerButtonPay,
                                    { 
                                        backgroundColor: securitypin ? '#4263D5' : '#4263D530', 
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
        flex: 1
    },

    styleTextPIN: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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
        width: 350,
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
        width: 344,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },

    styleTextPay: {
        textAlign: 'center',
        fontSize: 15
    }
})