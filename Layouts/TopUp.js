import { CheckBox, Radio } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyInput from 'react-native-currency-input';

class TopUp extends Component{
    state = {
        nominal: '',
        mycard_number: '',
        mycard_type : '',
        mycard_digitalpayment : [],
        mycard_bank : [],
        errorbalance : ''
    }
    
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount() {
        this.getCardData()
    }

    getCardData = () => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/mycard/getCustomerCard/" + result)
            .then(response => response.json())
            .then(res => {
                res.forEach(item => {
                    if(item.mycard_type == "digitalpayment"){
                        this.setState(prevState => ({
                            mycard_digitalpayment : [item, ...prevState.mycard_digitalpayment]
                        }))
                    } else {
                        this.setState(prevState => ({
                            mycard_bank : [item, ...prevState.mycard_bank]
                        }))
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        })
    }
    
    render(){
        const NominalScreen = () => {
            const [checked, setChecked] = useState('');
            const [checkedDigital, setCheckedDigital] = useState('');
            const [allowpaymentDigital, setallowpaymentDigital] = useState(false)
            const [allowpaymentBank, setallowpaymentBank] = useState(false)
            const [nominal, setNominal] = useState(20000);
            const [Source_mycard_number, setSourceMycard_number] = useState('')
            const [Source_mycard_type, setSourceMycard_type] = useState('')
            const [Source_mycard_name, setSourceMycard_name] = useState('')
            const [mycard_number, setMycard_number] = useState('')
            const [mycard_type, setMycard_type] = useState('')
            const [mycard_name, setMycard_name] = useState('')
            const [errorBalance, setErrorbalance] = useState('')
            const enabled = nominal > 9999 && nominal < 1000001 && !isNaN(nominal) && allowpaymentDigital == true && allowpaymentBank == true && errorBalance == '';
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
                        <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'right' }}>*min. IDR 10.000</Text>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={{fontWeight:'500', fontSize:16}}>To Account</Text>
                    </View>
                    <FlatList data={this.state.mycard_digitalpayment}
                    alwaysBounceVertical={true}
                    keyExtractor={(y, i) => i.toString()}
                    style={{marginStart: 20, maxHeight:130}}
                    renderItem={({item}) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <RadioButton value={`${item.mycard_name}`}
                                status={ checkedDigital === `${item.mycard_name}` ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    setCheckedDigital(`${item.mycard_name}`)
                                    setallowpaymentDigital(true)
                                    setMycard_number(`${item.mycard_number}`)
                                    setMycard_type(`${item.mycard_type}`)
                                    setMycard_name(`${item.mycard_name}`)
                                    if(`${item.mycard_balance}` < nominal){
                                        setErrorbalance('Not enough!')
                                    } else {
                                        setErrorbalance('')
                                    }
                                    }} />
                            <View style={{ flexDirection: 'row', marginLeft: 10}}>
                                <Text style={{fontSize: 16, color: "#000000", textTransform:'uppercase', fontWeight:'bold' }}>{`${item.mycard_name}`} : </Text>
                                <CurrencyInput 
                                    mode='outlined' 
                                    placeholder="Input Nominal" 
                                    style={{ fontSize: 16, lineHeight:15}} 
                                    value={`${item.mycard_balance}`}
                                    unit="IDR "
                                    delimiter=","
                                    separator="."
                                    precision={0}
                                    keyboardType={'decimal-pad'}
                                    editable={false}
                                />
                            </View>
                        </View>
                        }
                    />

                    <View style={{margin:10}}>
                        <Text style={{fontWeight:'500', fontSize:16}}>Source Account</Text>
                    </View>

                    <FlatList data={this.state.mycard_bank}
                    alwaysBounceVertical={true}
                    keyExtractor={(y, i) => i.toString()}
                    style={{marginStart: 20, maxHeight:130}}
                    renderItem={({item}) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <RadioButton value={`${item.mycard_name}`}
                                status={ checked === `${item.mycard_name}` ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    setChecked(`${item.mycard_name}`)
                                    setallowpaymentBank(true)
                                    setSourceMycard_number(`${item.mycard_number}`)
                                    setSourceMycard_type(`${item.mycard_type}`)
                                    setSourceMycard_name(`${item.mycard_name}`)
                                    if(`${item.mycard_balance}` < nominal){
                                        setErrorbalance('Not enough!')
                                    } else {
                                        setErrorbalance('')
                                    }
                                    }} />
                            <View style={{ flexDirection: 'row', marginLeft: 10}}>
                                <Text style={{fontSize: 16, color: "#000000", textTransform:'uppercase', fontWeight:'bold' }}>{`${item.mycard_name}`} : </Text>
                                <CurrencyInput 
                                    mode='outlined' 
                                    placeholder="Input Nominal" 
                                    style={{ fontSize: 16, lineHeight:15}} 
                                    value={`${item.mycard_balance}`}
                                    unit="IDR "
                                    delimiter=","
                                    separator="."
                                    precision={0}
                                    keyboardType={'decimal-pad'}
                                    editable={false}
                                />
                                <Text style={{marginLeft: checked === `${item.mycard_name}` ? 10 : 0, height: checked === `${item.mycard_name}` ? 20 : 0, color: 'red', opacity : errorBalance === '' ? 0 : 1}}>*{errorBalance}</Text>
                            </View>
                        </View>
                        }
                    />
                    
                    <View style={{ alignItems:'center', marginTop: 84, marginBottom: 0 }}>
                        <TouchableOpacity
                            disabled={ !enabled }
                            onPress={() => this.props.navigation.navigate('SecurityTopUpScreen', {
                                nominal : nominal,
                                mycard_number : mycard_number,
                                mycard_name : mycard_name,
                                Source_mycard_number : Source_mycard_number,
                                Source_mycard_name : Source_mycard_name
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

export default TopUp;

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
});