import React , { Component, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { Container, Item, Button, Label, Form, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

class SignUp extends Component{
  state = {
    name: '',
    email: '', 
    securitypin: '', 
    phonenumber: '', 
  }
  onChangeText = (key, val) => {
      this.setState({ [key]: val })
  }

  onSubmit = () => {
    const { name, email, securitypin, phonenumber } = this.state;
    fetch('http://192.168.100.136:3002/customer/signup', {
        method:'post',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_name : name,
            user_email : email,
            user_securitypin : securitypin,
            user_phonenumber : phonenumber
        })
      })
      .then(response => response.json())
      .then(res => {
          if(res.status == 200){
              this.props.navigation.navigate('SignIn')
          } else {
              Alert.alert(
                  "Sign up failed!"
              )
          }
      })
  }

  componentDidMount(){
    this.refs.name.focus();
  }
  
render(){
    const { name, phonenumber, email, securitypin } = this.state;
    
    return(
      <View style={styles.container}>
          <View>
              <Text style={ styles.containerJudul }>
                  Terima kasih telah bergabung bersama kami :) {'\n'}Kami akan mengirimkan 
                  <Text style={{ fontWeight: 'bold' }}> Kode OTP</Text> melalui 
                  <Text style={{ fontWeight: 'bold' }}> Email </Text> 
                  untuk proses verifikasi
              </Text>
          </View>

          <View style={styles.form}>

              <View style={[ styles.input, this.state.name.length > 5 && this.state.name.length < 16 ? styles.noterror : styles.error ]}>
                  <Icon name='account-plus' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', padding:12 }}/>
                      <TextInput 
                          ref={"name"}
                          style={ styles.textinput } 
                          mode='outlined' 
                          placeholder="Name" 
                          onSubmitEditing={() => { this.phonenumber.focus(); }}
                          onChangeText={val => this.onChangeText('name', val)}>
                          <Text>{this.state.name}</Text>
                      </TextInput>
              </View>
              <Text style={{ fontSize: 10, marginStart: 150, marginEnd: -60, marginBottom: 10 }}>*Max 5-16 Characters</Text>

              <View style={[ styles.input, this.state.phonenumber.length > 8 && this.state.phonenumber.length < 13 && !isNaN(phonenumber) && this.state.phonenumber.substr(0,1) != '8' ? styles.noterror : styles.error ]}>
                  <Icon name='phone' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                      <TextInput 
                          ref={(phonenumber) => { this.phonenumber = phonenumber; }}
                          style={styles.textinput} 
                          mode='outlined' 
                          placeholder="Phone number" 
                          onSubmitEditing={() => { this.email.focus(); }}
                          onChangeText={val => this.onChangeText('phonenumber', val)}>
                          <Text>{this.state.phonenumber}</Text>
                      </TextInput>
              </View>
              <Text style={{ fontSize: 10, marginStart: 10, marginEnd: -60, marginBottom: 10 }}>*Between 8-13 digits, Start with 0 {"&"} Must be a Number</Text>

              <View style={[ styles.input, this.state.email.length > 8 && this.state.email.includes('@') && this.state.email.includes('.com') ? styles.noterror : styles.error ]}>
                  <Icon name='email' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                      <TextInput 
                          ref={(email) => { this.email = email; }}
                          style={styles.textinput} 
                          mode='outlined' 
                          placeholder="Email Address" 
                          onSubmitEditing={() => { this.securitypin.focus(); }}
                          onChangeText={val => this.onChangeText('email', val)}>
                          <Text>{this.state.email}</Text>
                      </TextInput>
              </View>
              <Text style={{ fontSize: 10, marginStart: 0, marginEnd: -70, marginBottom: 10 }}>*Greater than 8 Characters, Must include @ and .com</Text>

              <View style={[ styles.input, this.state.securitypin.length >= 4 && this.state.securitypin.length <= 4 && !isNaN(securitypin) ? styles.noterror : styles.error ]}>
                  <Icon name='onepassword' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                  <TextInput 
                      ref={(securitypin) => { this.securitypin = securitypin; }}
                      keyboardType='numeric' 
                      style={styles.textinput} 
                      mode='outlined' 
                      placeholder="Security Pin" 
                      secureTextEntry={true} 
                      onChangeText={val => this.onChangeText('securitypin', val)}>
                      <Text>{this.state.securitypin}</Text>
                  </TextInput>
              </View>
              <Text style={{ fontSize: 10, marginStart: 104, marginEnd: -60, marginBottom: 0 }}>*Max 4 digits, Must be a Number</Text>
            
              <View style={{alignItems:'center', marginTop: 46}}>
                  <TouchableRipple
                      disabled={ this.state.name == '' && this.state.phonenumber == '' && this.state.email == '' && this.state.securitypin == '' && this.state.phonenumber.substr(0,1) != '8' }
                      onPress={() => this.props.navigation.navigate('SignIn')}
                      style={[
                          styles.styleButtonSignUp,
                          { 
                              backgroundColor: this.state.name != '' && this.state.phonenumber != '' && this.state.email != '' && this.state.securitypin != '' && this.state.phonenumber.substr(0,1) != '8' ? '#4263D5' : '#4263D550'
                          }
                      ]}>
                      <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>Sign Up</Text>
                   </TouchableRipple>
              </View>

              <View style={{alignItems:'center', flexDirection: 'row', marginTop: 0, marginBottom: 30 }}>
                  <Text style={{textAlign:'center', paddingTop:20, fontSize: 14}}>Already have an account?</Text>
                  <TouchableOpacity
                      style={{ paddingTop: 20, paddingStart: 10,  }}
                      onPress={() => this.props.navigation.navigate('SignIn')}>
                      <Text style={{ color: '#4287f5', fontSize: 14, fontWeight: 'bold' }}>Sign In</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
        paddingStart: 24,
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
});