import { CheckBox, Radio } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyInput from 'react-native-currency-input';

var bg = require("../img/background.png");

class BuyPromo extends Component{
    state = {
        promo_id : this.props.route.params.promo_id,
        user_point : '',
        promo_name : '',
        promo_discount : '',
        promo_expiredDate : '',
        promo_forPaymentVia : '',
        promo_price : ''
    }
    
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount() {
        this.getUserData()
        this.getPromoData()
    }

    getUserData = () => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/customer/getCustomer/" + result)
            .then(response => response.json())
            .then(res => {
                this.setState({user_point: res.user_point})
            })
        })
    }

    getPromoData = () => {
        fetch('http://192.168.100.136:3002/promo/paid/' + this.state.promo_id)
        .then(response => response.json())
        .then(res => {
            this.setState({promo_name : res.promo_name})
            this.setState({promo_discount : res.promo_discount})
            this.setState({promo_expiredDate : res.promo_expiredDate})
            this.setState({promo_price : res.promo_price})
            this.setState({promo_forPaymentVia : res.promo_forPaymentVia})
        })
    }

    redeem = () => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch('http://192.168.100.136:3002/promo/buyPromo', {
                method: 'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    promo_id : this.state.promo_id,
                    phonenumber : result
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status == 200){
                    console.log(res)
                } else {
                    console.log(res)
                }
            })
        })
        
    }
    
    render(){
        const BuyPromo = () => {
            const [checked, setChecked] = useState('');
            const [allowpayment, setallowpayment] = useState(false)
            const [nominal, setNominal] = useState(10000);
            const [mycard_number, setMycard_number] = useState('')
            const [mycard_type, setMycard_type] = useState('')
            const [mycard_name, setMycard_name] = useState('')
            const [errorBalance, setErrorbalance] = useState('')
            const enabled = this.state.user_point >= this.state.promo_price
            // const enabled = nominal > 9999 && nominal < 1000001 && !isNaN(nominal) && allowpayment == true && errorBalance == '';
            return(
                <View style={ styles.container }>
                    <ImageBackground source={bg} style={ styles.imgb }>
                    <TouchableOpacity
                        style={ styles.containerBox }
                        onPress={() => null}>
                        <View style={ styles.container1 }>
                            <View style={ styles.containerText }>
                                <Text style={ styles.merchant }>{this.state.promo_name}</Text>
                                <Text style={ styles.merchant }>Price: {this.state.promo_price}</Text>
                                <Text style={ styles.addr }>Discount: {this.state.promo_discount}</Text>
                                <Text style={ styles.addr }>Expired Date: {this.state.promo_expiredDate}</Text>
                                <Text style={ styles.addr }>Payment Via: {this.state.promo_forPaymentVia}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={{ backgroundColor: 'rgba(255,255,255,0.3)', marginStart: 20, borderColor: '#000000', borderWidth: 1, height: 80, marginTop: 10, marginEnd: 20, borderRadius: 10,  marginBottom: 20, }}>
                        <View style={{margin:20, marginTop:15}}>
                            <Text style={{fontSize:16, fontWeight:'bold'}}>Your Point</Text>
                            <CurrencyInput 
                                mode='outlined' 
                                placeholder="Input Nominal" 
                                style={{ fontSize: 16, alignItems: "center"}} 
                                value={this.state.user_point}
                                editable={false}
                                delimiter=","
                                separator="."
                                precision={0}
                                keyboardType={'decimal-pad'}
                            />
                        </View> 
                        
                    </View>

                    <View style={{ alignItems:'center', marginTop: 20, }}>
                        <TouchableOpacity 
                            name={ this.state.btnPay } 
                            disabled={ !enabled }
                            onPress={this.redeem.bind(this)}
                            style={[
                                styles.containerButtonPay,{ 
                                    backgroundColor: enabled ? '#4263D5' : '#4263D530', 
                                }]}>
                                <Text style={styles.styleTextPay}>Redeem</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                </View>
            );
        }
        return(
            <BuyPromo />
        );
    }
}

export default BuyPromo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    imgb : {
        height: '100%',
        width: '100%',
      },
    containerJudul: {
        marginStart: 20,
        marginTop: 20,
    },
    styleText: {
        fontWeight: '500',
        fontSize: 16,
    },
    containerBox: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10,
        marginStart: 20,
        marginTop: 90,
        marginEnd: 20,
        height: 165,
    },
    containerBox1: {
        backgroundColor: '#4287f5',
        borderRadius: 10,
        marginStart: 20,
        marginEnd: 20,
        height: 50,
    },
    container1: {
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        height: 165
    },
    container2: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        height: 50,
    },
    containerText: {
        marginStart: 20,
        marginTop: 14,
    },
    containerText1: {
        marginStart: 0,
        marginTop: 14,
    },
    merchant: {
        fontWeight: 'bold',
        fontSize: 16,
        textTransform : 'uppercase'
    },
    addr: {
        lineHeight: 14,
        marginEnd: 14,
        fontSize: 14,
        marginTop: 10,
        textTransform: 'uppercase'
    },
    timeSqr: {
        backgroundColor: "#EB5757",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
        color: '#fff',
        width: 150,
        height: 26,
    },
    time: {
        color: '#ffffff',
    },
    form:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginStart: 80,
        marginTop: 200,
        height: 100,
        width: 200,
        flex: 1,
    },
    
    input: {
        shadowOffset:{width: 0, height: 2},
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowColor:'black',
        shadowRadius: 3.84,
        fontWeight: '500',
        color: '#90dae1',
        borderRadius: 20,
        fontSize: 18,
        elevation: 5,
        width: 310,
        height: 55,
        margin: 10,
        flex: 1,
    },
    textinput:{
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        color: '#424242',
        borderRadius: 20,
        paddingLeft: 10,
        flex: 1,
    },
    bottom: {
        justifyContent: 'flex-end', 
        position: 'relative',
        marginBottom: 14,
        display: 'flex',
        flex: 1, 
    },
    containerBtnSearch: {
        justifyContent: 'center',
        borderRadius: 20,
        width: 310,
        height: 40,
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
});