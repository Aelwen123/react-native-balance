import { StatusBar } from 'expo-status-bar';
import { Content, Header } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, Button, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import * as Font from 'expo-font';

import ProfilePicture from '../assets/aelwen1.jpg';
import MyImage from '../assets/card_empty.png';

import MyImage1 from '../assets/zero_card.png';
import MyImage2 from '../assets/alfa_card.png';

import { Avatar } from 'react-native-paper';
import Footers from './Footers';

import {ScrollView} from 'react-native-gesture-handler';

var bg = require("../img/background.png");
var lg = require("../img/Logo_Balance.png");

const colors = {
  theme: "#4287f5",
  white:'white',
  grey:'#a4a4a4'
}

class HomeMerchant extends Component{
    constructor(props){
        super(props);
        this.state = {
            merchant_id_balance :  '',
            merchant_name: '',
            merchant_gajek : '',
            merchant_clover : '',
            merchant_phonenumber: '',
            merchant_type : '',
            merchant_location : '',
            merchant_email : '',
            merchant_workhour_start : '',
            merchant_workhour_finish : '',
            history : [],
            merchantCardDigital : [],
            merchantCardBank: []
        };
    }

    componentDidMount(){
        this.getMerchantData();
        this.getMerchantHistory();
        this.getMerchantWallet();
    }

    getMerchantData = () => {
        AsyncStorage.getItem('merchant_phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/merchant/getMerchant/phonenumber/" + result)
            .then(response => response.json())
            .then(res => {
                this.setState({merchant_id_balance: res._id})
                this.setState({merchant_gajek: res.merchant_id_gajek})
                this.setState({merchant_clover: res.merchant_clover_account})
                this.setState({merchant_name : res.merchant_name})
                this.setState({merchant_type: res.merchant_type})
                this.setState({merchant_location: res.merchant_location})
                this.setState({merchant_phonenumber: res.merchant_phonenumber})
                this.setState({merchant_email : res.merchant_email})
                this.setState({merchant_workhour_finish : res.merchant_workhour_finish})
                this.setState({merchant_workhour_start: res.merchant_workhour_start})
            })
        })
    }

    getMerchantWallet = () => {
        AsyncStorage.getItem('merchant_phonenumber', (err, result) => {
            fetch("http://192.168.100.136:3002/mycard/merchantCard/digitalpayment", {
                method: 'POST',
                headers: {
                  'Accept' : 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  digitalpaymentname : "gajek",
                  number : result
                })
            })
            .then(response => response.json())
            .then(res => {
                this.setState(prevState => ({
                  merchantCardDigital : [res, ...prevState.merchantCardDigital]
                }))
            })
        })

        fetch("http://192.168.100.136:3002/mycard/merchantCard/bank", {
            method: 'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bankname : "clover",
              number : this.props.route.params.merchant_clover_account
            })
        })
        .then(response => response.json())
        .then(res => {
            this.setState(prevState => ({
              merchantCardBank : [res, ...prevState.merchantCardBank]
            }))
        })
    }


    getMerchantHistory = () => {
        fetch("http://192.168.100.136:3002/payment/merchant/" + this.props.route.params.merchant_id)
        .then(response => response.json())
        .then(res => {
            this.setState({history: res})
        })
    }

    render(){
        return(
            <ScrollView stickyHeaderIndices={[3]} style={ styles.container }>
                <ImageBackground source={bg} style={ styles.imgb }>
                    <Content>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                            <Image source={lg} style={ styles.imglogo }/>
                            <View style={{ marginTop: 54, marginStart: 198, marginEnd: 40}}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('TheHome', {
                                    merchant_phonenumber: this.state.merchant_phonenumber
                                })}>
                                <Icons name="leftsquare" size={30} style={{ color: colors.white }}/>           
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: 10, marginLeft: 25, flexDirection: 'row' }}>
                            <Avatar.Image source={ProfilePicture} size={44} style={{backgroundColor:'white'}}/>
                            <View>
                                <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginStart: 18, flexDirection: 'column'}}>{this.state.merchant_name}</Text>
                                <Text style={{color:'white', marginStart: 18, fontWeight:'bold' }}>{this.state.merchant_phonenumber}</Text>
                                <Text style={{color:'white', marginStart: 18, fontWeight: 'bold' }}>{this.state.merchant_email}</Text>
                            </View>
                        </View>
                        
                        <View style={ styles.main }>
                        <FlatList data={this.state.merchantCardBank}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(y, i) => i.toString()}
                            style={{height:220}}
                            renderItem={({item}) =>
                              <TouchableOpacity activeOpacity={0.95} style={{backgroundColor:'#ffffff0', borderRadius:20, marginStart: 8, }}>
                                <View style={styles.card}>
                                  <View style={styles.cardImage}>
                                    <Image source={`${item.mycard_type}` == "digitalpayment" ? MyImage1 : MyImage2} style={{ marginTop: 4, width: '86%', height: '78%', resizeMode: 'stretch' }}/>
                                      <View style={{position:'absolute', paddingTop:10}}>
                                        <View style={{flexDirection:'row'}}>
                                          <View>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:16, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 60, letterSpacing: 1.2, textTransform:'uppercase' }}>clover</Text>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:16, textAlign: 'left', alignContent: 'center', marginStart: 30, letterSpacing: 1.2 }}>{`${item.accountnumber}`.toUpperCase()}</Text>
                                          </View>
                                        </View>
                                      
                                          <View style={{ flexDirection: 'row'}}>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:18, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 20, }}>IDR </Text>
                                            <CurrencyInput 
                                                mode='outlined' 
                                                placeholder="Input Nominal" 
                                                style={{ color:'#466FFF', fontWeight:'bold', fontSize:30, textAlign: 'left', alignContent: 'center', marginStart: 5, marginTop: 16, letterSpacing: 1}} 
                                                value={`${item.balance}`}
                                                delimiter=","
                                                separator="."
                                                precision={0}
                                                keyboardType={'decimal-pad'}
                                                editable={false}
                                            />
                                          </View>
                                        </View>
                                      </View>
                                  </View>
                              </TouchableOpacity>
                            }
                        />

                        <FlatList data={this.state.merchantCardDigital}
                            horizontal={true}
                            keyExtractor={(y, i) => i.toString()}
                            style={{height:220}}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) =>
                              <TouchableOpacity activeOpacity={0.95} style={{backgroundColor:'#ffffff0', borderRadius:20, marginStart: 8, }}>
                                <View style={styles.card}>
                                  <View style={styles.cardImage}>
                                    <Image source={MyImage1} style={{ marginTop: 4, width: '86%', height: '78%', resizeMode: 'stretch' }}/>
                                      <View style={{position:'absolute', paddingTop:10}}>
                                        <View style={{flexDirection:'row'}}>
                                          <View>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:16, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 60, letterSpacing: 1.2, textTransform:'uppercase' }}>gajek</Text>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:16, textAlign: 'left', alignContent: 'center', marginStart: 30, letterSpacing: 1.2 }}>{`${item.merchant_phonenumber}`.toUpperCase()}</Text>
                                          </View>
                                        </View>
                                      
                                          <View style={{ flexDirection: 'row'}}>
                                            <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:18, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 20, }}>IDR </Text>
                                            <CurrencyInput 
                                                mode='outlined' 
                                                placeholder="Input Nominal" 
                                                style={{ color:'#466FFF', fontWeight:'bold', fontSize:30, textAlign: 'left', alignContent: 'center', marginStart: 5, marginTop: 16, letterSpacing: 1}} 
                                                value={`${item.merchant_balance}`}
                                                delimiter=","
                                                separator="."
                                                precision={0}
                                                keyboardType={'decimal-pad'}
                                                editable={false}
                                            />
                                          </View>
                                        </View>
                                      </View>
                                  </View>
                              </TouchableOpacity>
                            }
                        />
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold', marginStart: 10, marginBottom:10}}>Transaction History</Text>
                            <FlatList data={this.state.history}
                                horizontal={true}
                                keyExtractor={(y, i) => i.toString()}
                                style={{height:170, backgroundColor:'rgba(255,255,255,0.3)', borderRadius:20}}
                                renderItem={({item}) =>
                                    <View style={ styles.content }>
                                        <TouchableOpacity style={ styles.containerText } onPress={() => this.props.navigation.navigate('HistoryMerchant', {
                                          merchant_id : this.props.route.params.merchant_id
                                        })}>
                                            <Text style={ [styles.styleTime, {marginRight:20,}] }>Date: {`${item.payment_date}`}</Text>
                                            <Text style={ styles.styleText2 }>From: {`${item.payment_sender}`}</Text>
                                            <Text style={ [styles.styleTime, {textTransform:'uppercase'}] }>Payment Via: {`${item.payment_method}`}</Text>
                                            <Text style={ styles.styleTime }>Payment Promo: {`${item.payment_promo}`}</Text>
                                            <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={[ styles.styleTime, { color:'#466FFF'}]} 
                                                    value={`${item.payment_amountAfterPromo}`}
                                                    delimiter=","
                                                    unit="Rp"
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                    </Content>
                </ImageBackground>
            </ScrollView>
        );
    }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    imgb : {
      height: '100%',
      width: '100%',
    },
    main:{
      paddingLeft:16,
      paddingRight:16,
      paddingBottom:16,
      paddingTop:20,  
    },
    imglogo:  {
      resizeMode: 'contain',
      marginTop: 30,
      marginLeft: 25,
      width: 100
    },
    containerTopUp: {
      backgroundColor:'white',
      flex: 1,
      position:'absolute',
      left:270
    },
    containerTopUpText: {
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    containerSmallCircle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    smallCircle: {
      width: 6,
      height: 6,
      backgroundColor: '#64E5F6',
      borderRadius: 10,
      margin: 4
    },
    smallCircle1: {
      width: 6,
      height: 6,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      margin: 4
    },
    circle: {
      backgroundColor: '#56CCF2',
      borderRadius: 90,
      height: 60,
      width: 60,
    },
    circleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 12
    },
    cardImage:{
      width:400, 
      height:260, 
      borderRadius:20,
      padding: 10
    },
    card:{ 
      marginTop: 120,
      justifyContent: 'center',
      shadowColor: 'black',
      borderColor:'black',
      borderRadius:20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 0, 
      height:10, 
      width:360,
      paddingTop:0
    },
    cardImage1:{
      width:380, 
      height:300, //260 
      borderRadius:20,
      padding: 10,
      marginStart: 90
    },
    card1:{
      marginTop: 120,
      justifyContent: 'center',
      alignItems:'center',
      shadowColor: 'black',
      borderColor:'black',
      borderRadius:20,    
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 0, 
      height:10, 
      width:360,
      paddingTop:0
    },
    howtousecard: {
      marginRight:20, 
      alignItems:'center', 
      borderColor:'black', 
      borderStyle:'solid', 
      borderWidth:1, 
      borderRadius:20
    },
    square: {
      height: 105,
      borderRadius: 20,
      backgroundColor: 'white',
      marginStart: 8,
      marginEnd: 8,
      marginTop: 12
    },
    content: {
        margin: 20,
    },
    containerText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginStart: 4,
        width:200
    },
    styleTime: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
        fontSize: 14,
    },
    styleText2: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
        fontSize: 20,
    },
    styleText: {
        position: 'relative',
        fontSize: 14.5,
    }
});

export default HomeMerchant;