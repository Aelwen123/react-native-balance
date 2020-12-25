import { CheckBox, Radio } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyInput from 'react-native-currency-input';

class InputNominal extends Component{
    state = {
        nominal: '',
        mycard_phonenumber: '',
        mycard_type : '',
        mycard : [],
        errorbalance : '',
        promo_name : '',
        promo_discount : this.props.route.params.discount,
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
                this.setState({mycard: res})
                this.setState({mycard_phonenumber: result})
            }).catch(err => {
                console.log(err)
            })
        })
    }
    
    render(){
        const NominalScreen = () => {
            const [checked, setChecked] = useState('');
            const [allowpayment, setallowpayment] = useState(false)
            const [nominal, setNominal] = useState(this.props.route.params.nominal);
            const [nominalAfterPromo, setNominalAfterPromo] = useState(nominal - this.props.route.params.discount)
            const [discounts, setDiscount] = useState(Number(this.props.route.params.discount))
            const [mycard_number, setMycard_number] = useState('')
            const [mycard_type, setMycard_type] = useState('')
            const [mycard_name, setMycard_name] = useState('')
            const [errorBalance, setErrorbalance] = useState('')
            const discount = this.props.route.params.minimal < nominal || this.props.route.params.minimal == undefined;
            const enabled = nominal > 9999 && nominal < 1000001 && !isNaN(nominal) && allowpayment == true && errorBalance == '' && discount;
            
            return(
                <View style={ styles.container }>
                    <TouchableOpacity
                        style={ styles.containerBox }
                        onPress={() => null}>
                        <View style={ styles.container1 }>
                            <View style={ styles.containerText }>
                                <Text style={ styles.merchant }>{this.props.route.params.merchant_name}</Text>
                                <Text style={ styles.addr }>{this.props.route.params.merchant_location}</Text>
                                <Text style={ styles.addr }>{this.props.route.params.merchant_address}</Text>
                                <View style={ styles.timeSqr }>
                                    <Text style={ styles.time }>{this.props.route.params.merchant_workhour_start} - {this.props.route.params.merchant_workhour_finish}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={ styles.containerJudul }>
                        <Text>Input Nominal</Text>
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
                        <CurrencyInput 
                                mode='outlined' 
                                placeholder="Input Nominal" 
                                style={{ fontSize: 12, marginTop: 10, textAlign: 'right', height: this.props.route.params.minimal != undefined ? 40 : 0 }} 
                                value={this.props.route.params.minimal} 
                                onChangeValue= {setNominal}
                                unit="*min. IDR "
                                delimiter=","
                                separator="."
                                precision={0}
                                keyboardType={'decimal-pad'}
                            />
                        <Text style={{ fontSize: 12, marginTop: 10, textAlign: 'right', height: this.props.route.params.minimal == undefined ? 40 : 0 }}>*min. IDR 10.000</Text>
                        
                    </View>

                    <View style={ styles.containerJudul }>
                        <Text>Select Source Account</Text>
                    </View>

                    <FlatList data={this.state.mycard}
                    alwaysBounceVertical={true}
                    keyExtractor={(y, i) => i.toString()}
                    style={{marginStart: 20, maxHeight:130}}
                    renderItem={({item}) =>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <RadioButton value={`${item.mycard_name}`}
                                status={ checked === `${item.mycard_name}` ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    setChecked(`${item.mycard_name}`)
                                    setallowpayment(true)
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
                                <Text style={{marginLeft: checked === `${item.mycard_name}` ? 10 : 0, height: checked === `${item.mycard_name}` ? 20 : 0, color: 'red', opacity : errorBalance === '' ? 0 : 1}}>*{errorBalance}</Text>
                            </View>
                        </View>
                        }
                    />

                    <View style={{height:100, display:'flex', flexDirection:'row', borderWidth:1, height:50, width: 350, marginStart:20, borderRadius:10}}>
                        <TouchableOpacity style={{
                            width: this.props.route.params.discount != undefined ? '100%' : 0,
                            justifyContent:'center',
                            height: this.props.route.params.discount != undefined ? 50 : 0,
                            opacity: this.props.route.params.discount != undefined ? 50 : 0
                        }}

                        onPress={() => {
                            setNominalAfterPromo(undefined)
                            this.props.route.params.discount = undefined
                            this.props.route.params.minimal = undefined

                        }}>
                            <Icon name='onepassword' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={{borderRadius:20, width:this.props.route.params.discount != undefined ? 300 : 350}}
                            onPress={() => this.props.navigation.navigate("CustomerPromo", {
                                nominal : nominal
                            })}>
                            <View style={{justifyContent:'center'}}>
                                <View style={ {marginTop: this.props.route.params.discount != undefined ? 14 : 0, height: this.props.route.params.discount != undefined ? 50 : 0, opacity: this.props.route.params.discount != undefined ? 50 : 0} }>
                                    <Text style={{ textAlign: 'center', textTransform: 'uppercase' }}>{this.props.route.params.promo_name}</Text>
                                </View>

                                <View style={ {marginTop: this.props.route.params.discount == undefined ? 14 : 0, height: this.props.route.params.discount == undefined ? 50 : 0,} }>
                                    <Text style={{ textAlign: 'center' }}>PROMO {"&"} CASHBACK</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, height: nominal > 10000 ? 60 : 0, opacity: nominal > 10000 ? 1 : 0}}>
                        <View style={{borderRadius: 10, marginStart: 20, marginEnd: 20, borderWidth: this.props.route.params.discount != undefined ? 0 : 1, paddingTop:6, height: this.props.route.params.discount != undefined ? 0 : 40, marginBottom: 5}}>
                            <CurrencyInput 
                                mode='outlined' 
                                placeholder="Input Nominal" 
                                style={{ fontSize: 16, alignSelf:'center' }} 
                                value={nominal}
                                unit="Total amount promo: IDR "
                                delimiter=","
                                separator="."
                                precision={0}
                                keyboardType={'decimal-pad'}
                                editable={false}
                            />
                        </View>
                        <View style={{borderRadius: 10, marginStart: 20, marginEnd: 20, borderWidth: this.props.route.params.discount != undefined ? 1 : 0, paddingTop:6, height: this.props.route.params.discount != undefined ? 40 : 0}}>
                        <CurrencyInput
                                mode='outlined' 
                                placeholder="You can use a promo if you want to" 
                                style={{ fontSize: 16, alignSelf:'center' }} 
                                value={nominal - this.props.route.params.discount}
                                unit="Total amount promo: IDR "
                                delimiter=","
                                separator="."
                                precision={0}
                                keyboardType={'decimal-pad'}
                                editable={false}
                                onChangeText={(formattedValue) => {
                                    setNominalAfterPromo(nominal - this.props.route.params.discount)
                                }}
                            />
                        </View>
                    </View>
                    
                    <View style={{ alignItems:'center', marginTop: 30, marginBottom: 0 }}>
                        <TouchableOpacity
                            disabled={ !enabled }
                            onPress={() => {
                                if(!isNaN(nominalAfterPromo)){
                                    this.props.navigation.navigate('SecurityPINScreen', {
                                        merchant_id_gajek : this.props.route.params.merchant_id_gajek,
                                        merchant_clover_account : this.props.route.params.merchant_clover_account,
                                        nominalBeforePromo : nominal,
                                        nominal : nominalAfterPromo,
                                        mycard_number : mycard_number,
                                        mycard_type : mycard_type,
                                        mycard_name : mycard_name,
                                        mycard_phonenumber : this.state.mycard_phonenumber,
                                        payment_promo : this.props.route.params.promo_name
                                    })
                                } else if (isNaN(nominalAfterPromo)){
                                    this.props.navigation.navigate('SecurityPINScreen', {
                                        merchant_id_gajek : this.props.route.params.merchant_id_gajek,
                                        merchant_clover_account : this.props.route.params.merchant_clover_account,
                                        nominalBeforePromo : nominal,
                                        nominal : nominal,
                                        mycard_number : mycard_number,
                                        mycard_type : mycard_type,
                                        mycard_name : mycard_name,
                                        mycard_phonenumber : this.state.mycard_phonenumber,
                                        payment_promo : this.props.route.params.promo_name
                                    })
                                }
                            }}
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

export default InputNominal;

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