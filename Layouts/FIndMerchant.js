import React, { Component, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Card, Button, Title, Paragraph } from 'react-native-paper'
import { Content } from 'native-base';
var bg = require("../img/background.png");

// import { useNavigation } from '@react-navigation/native';

export default class FindMerchant extends Component{
    state = {
        merchantName: '', merchantData: [], viewMerchantData : false, errormessage :''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    onClear = () => {
        this.setState({
            merchantName: '',
            merchantData: []
        })
    }

    onSearch = async() => {
        const { merchantName } = this.state

        if( merchantName === ''){
            fetch('http://192.168.100.136:3002/merchant')
            .then(response => response.json())
            .then(res => {
                if(res.status == 401){
                    this.setState({errormessage : "Merchant not found!"})
                } else {
                    this.setState({merchantData : res})
                    this.setState({viewMerchantData: true})
                    this.setState({errormessage : ''})
                }
            }).catch(err => {
                console.log(err)
            })
        }else {
            fetch('http://192.168.100.136:3002/merchant/getMerchant/name/' + merchantName)
            .then(response => response.json())
            .then(res => {
                if(res.status == 401){
                    this.setState({errormessage : "Merchant not found!"})
                } else {
                    this.setState({merchantData : res})
                    this.setState({viewMerchantData: true})
                    this.setState({errormessage : ''})
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render(){
        const { merchantName } = this.state;
        const enabled = merchantName.length >= 0 && merchantName.length < 20;

        return(
            <View style={styles.container}>
                <ImageBackground source={bg} style={ styles.imgb }>
                    <View style={styles.main}>
                    <View style={{marginLeft:15}}>
                        <Text style={ styles.containerJudul }>
                            Carilah merchant dan Lakukan transaksi  {'\n'}
                            pembayaran secara offsite dengan QRIS di merchant yang tersedia
                        </Text>
                    </View>

                <View style={styles.form}>
                    <View style={styles.input}>
                        <Icon name='home' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            <TextInput style={styles.textinput} mode='outlined' placeholder="Merchant Name" onChangeText={val => this.onChangeText('merchantName', val)}>
                                <Text>{this.state.merchantName}</Text>
                            </TextInput>
                    </View>

                    <View style={{height: this.state.errormessage === '' ? 0 : 50}}>
                        <Text style={{color: 'red'}}>{this.state.errormessage}</Text>
                    </View>
                    <FlatList data={this.state.merchantData}
                        style={{maxHeight: this.state.viewMerchantData === true ? 400 : 0, width: 300, borderRadius:20, borderWidth: this.state.viewMerchantData === true ? 1 : 0, backgroundColor: 'rgba(255,255,255,0.3)'}}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.viewMerchant} onPress = {() => this.props.navigation.navigate('SelectMerchantLocationScreen', {merchant_name : `${item.merchant_name}`})}>
                                <Text style={{fontSize: 20, textTransform: 'uppercase', fontWeight:'bold'}}>{`${item.merchant_name}`}</Text>
                                <Text style={{textTransform:'uppercase'}}>{`${item.merchant_type}`}</Text>
                                <Text>{`${item.merchant_location}`}</Text>
                                <Text>Check out {`${item.merchant_name}`} other branch</Text>
                            </TouchableOpacity>
                        }
                    />
                    
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                            disabled={ !enabled }
                            onPress={this.onSearch.bind(this)}
                            style={[
                                styles.containerBtnSearch,
                                { 
                                    backgroundColor: enabled ? '#4263D5' : '#4263D530',
                                    marginTop:10
                                }
                                ]}>
                            <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>SEARCH</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginStart: 0, marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>
                        <TouchableOpacity 
                            onPress={this.onClear}>
                            <Text style={ styles.styleTextClear }>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
  },
  imgb : {
      position:'absolute',
      height: '100%',
      width: '100%',
  },

  viewMerchant : {
      alignContent:'center',
      color: '#90dae1',
      alignSelf:'center',
      margin: 10,
      borderWidth:1,
      borderRadius:20,
      padding:20
  },
  
  containerJudul: {
      flex: 1,
      marginStart: -3,
      marginEnd: 20,
      fontSize: 12,
      fontFamily: 'Roboto',
      letterSpacing: 1,
      lineHeight: 20,
      top: 20,
  },
  
  form:{
      flex:1,
      width:200,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      top:100
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
    },
  
    bottom: {
      flex: 1, 
      justifyContent: 'flex-end', 
      marginBottom: 14,
      display: 'flex',
      position: 'relative'
    },

    containerBtnSearch: {
        width: 310,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },
    main:{
        alignItems:'center'
      },
  });