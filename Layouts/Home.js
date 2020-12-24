import { StatusBar } from 'expo-status-bar';
import { Content, Header } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, Button, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      user_name : '',
      user_email : '',
      phonenumber: '',
      point : '',
      mycard : [],
      my_acccount: [
        {MyImage1},
        {MyImage2},
      ]
    };
  }

  componentDidMount(){
    this.updateCardData();
    this.getUserData();
  }

  getUserData = () => {
    AsyncStorage.getItem('phonenumber', (err, result) => {
      fetch("http://192.168.100.136:3002/customer/getCustomer/" + result)
      .then(response => response.json())
      .then(res => {
        this.setState({user_name : res.user_name})
        this.setState({user_email : res.user_email})
        this.setState({phonenumber: res.user_phonenumber})
        this.setState({point: res.user_point})
      })
    })
  }

  updateCardData = () => {
    AsyncStorage.getItem('phonenumber', (err, result) => {
      fetch("http://192.168.100.136:3002/mycard/getCustomerCard/" + result)
      .then(response => response.json())
      .then(res => {
        res.forEach(item => {
          if(item.mycard_name == "clover"){
            fetch("http://192.168.100.136:3002/mycard/update/bank/clover/" + item.mycard_number)
          }
          else if (item.mycard_name == "gajek"){
            fetch("http://192.168.100.136:3002/mycard/update/digitalpayment/gajek/" + item.mycard_number)
          }
        })
        this.getCardData()
      }).catch(err => {
        console.log(err)
      })
    })
  }

  getCardData = () => {
    AsyncStorage.getItem('phonenumber', (err, result) => {
      fetch("http://192.168.100.136:3002/mycard/getCustomerCard/" + result)
      .then(response => response.json())
      .then(res => {
        this.setState({mycard: res})
      }).catch(err => {
        console.log(err)
      })
    })
  }

  render(){
    return(
      <View style={ styles.container }>
          <ImageBackground source={bg} style={ styles.imgb }>
              <Content>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                    <Image source={lg} style={ styles.imglogo }/>
                    <View style={{ marginTop: 54, marginStart: 198, marginEnd: 40}}>
                      <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('NotificationScreen', {
                            user_phonenumber: this.state.phonenumber
                          })}>
                          <Icon name="bell-outline" size={20} style={{ color: colors.white }}/>           
                      </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 25, flexDirection: 'row' }}>
                    <Avatar.Image source={ProfilePicture} size={44} style={{backgroundColor:'white'}}/>
                    <View>
                      <Text style={{color:'white', fontSize:20, fontWeight:'bold', marginStart: 18, flexDirection: 'column'}}>{this.state.user_name}</Text>
                      <Text style={{color:'white', marginStart: 18 }}>{this.state.user_email}</Text>
                      <Text style={{color:'white', marginStart: 18, fontWeight: 'bold' }}>Your Point : {this.state.point}</Text>
                    </View>
                </View>
                
                <View style={ styles.main }>
                  <Text style={{color:'white', fontSize:16, fontWeight:'200', marginStart: 10, marginTop: 20}}>My cards</Text>

                  

                  <View style={{ paddingBottom: 2 }}>
                  <FlatList data={this.state.mycard}
                    horizontal={true}
                    keyExtractor={(y, i) => i.toString()}
                    style={{height:210}}
                    renderItem={({item}) =>
                      <TouchableOpacity activeOpacity={0.95} style={{backgroundColor:'#ffffff0', borderRadius:20, marginStart: 8, }} onPress={() => this.props.navigation.push('TopUpScreen', {
                        source_mycard_type : `${item.mycard_type}`,
                        source_mycard_name : `${item.mycard_name}`,
                        source_mycard_balance : `${item.mycard_balance}`

                      })}>
                        <View style={styles.card}>
                          <View style={styles.cardImage}>
                            <Image source={`${item.mycard_type}` == "digitalpayment" ? MyImage1 : MyImage2} style={{ marginTop: 4, width: '86%', height: '78%', resizeMode: 'stretch' }}/>
                              <View style={{position:'absolute', paddingTop:10}}>
                                <View style={{flexDirection:'row'}}>
                                  <View>
                                    <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:16, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 60, letterSpacing: 1.2 }}>{`${item.mycard_name}`.toUpperCase()}</Text>
                                  </View>
                                    <View style={ styles.containerTopUpText }>
                                      <Text style={{ color:'#466FFF', fontSize:16, fontWeight:'200', marginTop: 0, textAlign: 'center', fontWeight:'bold' }}>{"+"} Top Up</Text>
                                    </View>
                                </View>
                               
                                  <View style={{ flexDirection: 'row'}}>
                                    <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:18, textAlign: 'left', alignContent: 'center', marginStart: 30, marginTop: 20, }}>IDR </Text>
                                    <Text style={{color:'#466FFF', fontWeight:'bold', fontSize:30, textAlign: 'left', alignContent: 'center', marginStart: 5, marginTop: 16, letterSpacing: 1}}>{`${item.mycard_balance}`}</Text>
                                  </View>
                                </View>
                              </View>
                          </View>
                      </TouchableOpacity>
                    }
                  />

                      <Text style={{color:'white', fontSize:16, fontWeight:'200', marginStart: 10, marginTop: 14}}>Promo {"&"} Cashback</Text>
                      <TouchableOpacity activeOpacity={0.85} onPress={() => this.props.navigation.navigate('PromoScreen')}>
                        <View style={ styles.square }>
                            <View style={{  alignItems: 'center', margin: 33 }}>
                                <Text style={{ fontSize: 16, textAlign: 'center', letterSpacing: 1 }}>Click to see the {"\n"}Promo {'&'} Cashback</Text>
                            </View>
                        </View>
                      </TouchableOpacity>
                  </View>
                </View>
              </Content>

              <Footers />
          </ImageBackground>
      </View>
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
  }
});

export default Home;