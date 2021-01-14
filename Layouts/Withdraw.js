import { CheckBox, Radio } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TextInput, AsyncStorage, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyInput from 'react-native-currency-input';

class Withdraw extends Component{
    state = {
        nominal: '',
        merchant_balance : '',
        digitalpayment : ['gajek'],
        bank : ['clover'],
        numbers : '',
        errorbalance : '',
        isModalDeleteVisible: false,
        merchant_id_balance: this.props.route.params.merchant_id_balance
    }
    
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount() {
        this.getCardData()
    }

    getCardData = () => {
        fetch("http://192.168.100.136:3002/merchant/getMerchant/id/" + this.props.route.params.merchant_id_balance)
        .then(response => response.json())
        .then(res => {
            this.setState({merchant_balance : res.merchant_balance})
            this.setState({merchant_name : res.merchant_name})
        })
    }

    deleteCard = () => {
        fetch('http://192.168.100.136:3002/mycard/deletecard/' + this.state.mycard_id)
        .then(response => response.json())
        .then(res => {
            if(res.status === 401){
                Alert.alert(
                    "Delete Failed!"
                )
            }
            else {
                this.props.navigation.push('TheHome')
            }
        })
    }
    
    render(){
        const NominalScreen = () => {
            const [checked, setChecked] = useState('');
            const [allowpayment, setallowpayment] = useState(false)
            const [nominal, setNominal] = useState(20000);
            const [number, setNumber] = useState('');
            const [payment_method, setPayment_method] = useState('')
            const [payment_type, setPayment_type] = useState('')
            const [errorBalance, setErrorbalance] = useState('')
            const enabled = nominal >= 20000 && nominal < this.state.merchant_balance && !isNaN(nominal) && allowpayment == true && String(number).length > 5;
            return(
                <View style={ styles.container }>
                    <View style={{margin:10}}>
                        <Text style={{fontWeight:'500', fontSize:16}}>Input Nominal Top Up</Text>
                    </View>
                    
                    <View style={{ marginStart: 20, borderColor: '#000000', borderWidth: 1, height: 50, marginTop: 10, marginEnd: 20, borderRadius: 10,  marginBottom: 20, }}>
                        <View style={{ flexDirection: 'row', marginStart: 20, }}>
                            <Text style={{ lineHeight: 44, fontSize: 16, paddingTop: 2, color: "#000000" }}>IDR    </Text>
                            <CurrencyInput 
                                mode='outlined'
                                placeholder="Input Nominal" 
                                style={{ fontSize: 16, paddingTop: 2 }} 
                                value={nominal} 
                                onChangeValue= {setNominal}
                                delimiter=","
                                separator="."
                                precision={0}
                                keyboardType={'decimal-pad'}
                            />
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'right' }}>*min. IDR 20.000</Text>
                    </View>

                    <View style={{ marginStart: 20, borderColor: '#000000', borderWidth: 1, height: 50, marginTop: 10, marginEnd: 20, borderRadius: 10,  marginBottom: 20, }}>
                        <View style={{ flexDirection: 'row', marginStart: 10, }}>
                            <Icon name='account-plus' size={30} color="#4287f5" style={{ padding:8, alignItems:'center', justifyContent:'center', marginRight:10 }}/>
                            <TextInput
                                placeholder='Input Account Number'
                                onChangeText={val => setNumber(val)}
                                style={{fontSize:16}}
                                keyboardType='number-pad'
                            >
                                <Text>{number}</Text>
                            </TextInput>
                        </View>
                    </View>

                    <View style={{flexDirection:'column', height: 300}}>
                        <View style={{margin:10}}>
                            <Text style={{fontWeight:'500', fontSize:16}}>Select Digital Payment Account</Text>
                        </View>
                        <FlatList data={this.state.digitalpayment}
                            alwaysBounceVertical={true}
                            keyExtractor={(y, i) => i.toString()}
                            style={{marginStart: 20, maxHeight:130}}
                            renderItem={({item}) =>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <RadioButton value={item}
                                        status={ checked === item ? 'checked' : 'unchecked' }
                                        onPress={() => {
                                            setallowpayment(true)
                                            setChecked(item)
                                            setPayment_method(item)
                                            setPayment_type("digitalpayment")
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row', marginLeft: 10}}>
                                        <Text style={{fontSize: 16, color: "#000000", textTransform:'uppercase', fontWeight:'bold' }}>{item}</Text>
                                
                                    </View>
                                </View>
                                }
                        />
                        <View style={{margin:10}}>
                            <Text style={{fontWeight:'500', fontSize:16}}>Select Bank Account</Text>
                        </View>
                        <FlatList data={this.state.bank}
                            alwaysBounceVertical={true}
                            keyExtractor={(y, i) => i.toString()}
                            style={{marginStart: 20, maxHeight:130}}
                            renderItem={({item}) =>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <RadioButton value={item}
                                        status={ checked === item ? 'checked' : 'unchecked' }
                                        onPress={() => {
                                            setallowpayment(true)
                                            setChecked(item)
                                            setPayment_method(item)
                                            setPayment_type("bank")
                                        }}
                                    />
                                    <View style={{ flexDirection: 'row', marginLeft: 10}}>
                                        <Text style={{fontSize: 16, color: "#000000", textTransform:'uppercase', fontWeight:'bold' }}>{item}</Text>
                                
                                    </View>
                                </View>
                                }
                        />
                    </View>

                    <View style={{ alignItems:'center', marginTop: 100, marginBottom: 0 }}>
                        <TouchableOpacity
                            disabled={ !enabled }
                            onPress={() => this.props.navigation.navigate('SecurityWithdraw', {
                                nominal : nominal,
                                accountnumber : number,
                                payment_method : payment_method,
                                payment_type : payment_type,
                                merchant_id_balance: this.props.route.params.merchant_id_balance
                            })}
                            style={[
                                styles.containerBtnSearch,
                                { 
                                    backgroundColor: enabled ? '#4263D5' : '#4263D530'
                                }
                                ]}>
                            <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            );
        }
        return(
            <NominalScreen />
        );
    }
}

export default Withdraw;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
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
        backgroundColor: '#4287f5',
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
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        height: 165,
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
        fontWeight: '500',
        fontSize: 16,
    },
    addr: {
        lineHeight: 14,
        marginEnd: 14,
        fontSize: 12,
        marginTop: 5,
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

    input: {
        flexDirection: 'row',
        width: 350,
        height: 55,
        backgroundColor: 'white',
        margin: 20,
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
});