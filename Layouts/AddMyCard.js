import React , { Component, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, Alert, Picker, ImageBackground, AsyncStorage } from 'react-native';
import Modal from 'react-native-modal';
import { Container, Item, Button, Label, Form, CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
var bg = require("../img/background.png");

class AddMyCard extends Component{
    state = {
        user_phonenumber: '',
        dataMycard_type : ['banks', 'digitalpayment'],
        mycard_type: '',
        dataMycardDigital_name: ['gajek'],
        dataMycardBank_name: ['clover'],
        mycard_name: '',
        mycard_number: '',
        modalDigitalVisible : false,
        modalBankVisible : false
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    addMyCard = () => {
        console.log(this.state)
    }

    submitData = () => {
        const { user_phonenumber, mycard_type, mycard_name, mycard_number } = this.state;
        if(mycard_type == 'digitalpayment'){
            console.log("digital")
            fetch('http://192.168.100.136:3002/mycard/addDigitalMyCard', {
                method:'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_phonenumber : user_phonenumber,
                    mycard_type : mycard_type,
                    mycard_name : mycard_name,
                    mycard_number : mycard_number
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status == 200){
                    Alert.alert(
                        "Card successfully added!"
                    )
                    this.props.navigation.push('TheHome')
                } else {
                    Alert.alert(
                        "Failed to add card!"
                    )
                    console.log(res)
                }
            })
        }
        else{
            console.log("bank")
            fetch('http://192.168.100.136:3002/mycard/addBankMyCard', {
                method:'post',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_phonenumber : user_phonenumber,
                    mycard_type : mycard_type,
                    mycard_name : mycard_name,
                    mycard_number : mycard_number
                })
            })
            .then(response => response.json())
            .then(res => {
                if(res.status == 200){
                    Alert.alert(
                        "Card successfully added!"
                    )
                    this.props.navigation.push('TheHome')
                } else {
                    Alert.alert(
                        "Failed to add card!"
                    )
                    console.log(res)
                }
            })
        }
        
    }

    componentDidMount() {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            this.setState({user_phonenumber: result})
          })
    }
  
render(){
    const checkNumber = this.state.mycard_number == this.state.user_phonenumber && this.state.mycard_type == 'digitalpayment'

    return(
        <View style={styles.container}>
            <ImageBackground source={bg} style={{width: '100%', height: '100%', margin:0}}>
            <View style={styles.form}>
                <View style={[ styles.input, this.state.user_phonenumber.length > 5 && this.state.user_phonenumber.length < 16 ? styles.noterror : styles.error ]}>
                    <Icon name='account-plus' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', padding:12 }}/>
                    <TextInput
                        ref={"user_phonenumber"}
                        style={ styles.textinput } 
                        mode='outlined'
                        editable={false}
                        keyboardType='number-pad'
                        placeholder="User Phonenumber" 
                        onSubmitEditing={() => { this.phonenumber.focus(); }}
                        onChangeText={val => this.onChangeText('user_phonenumber', val)}
                        >
                        <Text>{this.state.user_phonenumber}</Text>
                    </TextInput>
                </View>

                <View style={[styles.input, this.state.mycard_type === '' ? styles.error : styles.noterror]}>
                    <Icon name='phone' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                    <Picker
                        selectedValue={this.state.mycard_type}
                        style={{ height: 50, width: 250 }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({mycard_type: itemValue})

                            if(itemValue == 'bank'){
                                this.setState({modalBankVisible: true})
                                this.setState({modalDigitalVisible: false})
                            } else if (itemValue == 'digitalpayment') {
                                this.setState({modalBankVisible: false})
                                this.setState({modalDigitalVisible: true})
                                this.setState({mycard_number: this.state.user_phonenumber})
                            }
                        }}
                        >
                            <Picker.Item key='' value='' label='Choose Type' />
                            <Picker.Item key='bank' value='bank' label='Bank' />
                            <Picker.Item key='digitalpayment' value='digitalpayment' label='Digital Payment' />
                    </Picker>

                    <Modal isVisible={this.state.modalBankVisible} backdropTransitionOutTiming={0} hideModalContentWhileAnimating={true} onBackdropPress={() => this.setState({modalBankVisible: false})} avoidKeyboard={true} animationOutTiming={800}>
                        <View style={{backgroundColor: 'white', width: 350, height: 200, justifyContent: 'center', padding: 15}}>
                            <FlatList data={this.state.dataMycardBank_name}
                                horizontal={true}
                                keyExtractor={(y, i) => i.toString()}
                                style={{height:210}}
                                renderItem={({item}) =>
                                <TouchableOpacity activeOpacity={0.95} style={{marginStart: 8, width: 200, height: 40, justifyContent:'center', marginLeft: 55 }} onPress={() => {
                                    this.setState({mycard_name: item})
                                    this.setState({modalBankVisible: false})
                                }}>
                                    <Text style={{color: 'white', backgroundColor: 'black', textTransform: 'uppercase', margin: 10, textAlign: 'center', fontSize: 18}}>{item}</Text>
                                    
                                </TouchableOpacity>
                                }
                            />
                        </View>
                    </Modal>

                    <Modal isVisible={this.state.modalDigitalVisible} backdropTransitionOutTiming={0} hideModalContentWhileAnimating={true} onBackdropPress={() => this.setState({modalDigitalVisible: false})} avoidKeyboard={true} animationOutTiming={800}>
                        <View style={{backgroundColor: 'white', width: 350, height: 200, justifyContent: 'center', padding: 15}}>
                            <FlatList data={this.state.dataMycardDigital_name}
                                horizontal={true}
                                keyExtractor={(y, i) => i.toString()}
                                style={{height:210}}
                                renderItem={({item}) =>
                                <TouchableOpacity activeOpacity={0.95} style={{marginStart: 8, width: 200, height: 40, justifyContent:'center', marginLeft: 55 }} onPress={() => {
                                    this.setState({mycard_name: item})
                                    this.setState({modalDigitalVisible: false})
                                }}>
                                    <Text style={{color: 'white', backgroundColor: 'black', textTransform: 'uppercase', margin: 20, textAlign: 'center', fontSize: 18}}>{item}</Text>
                                    
                                </TouchableOpacity>
                                }
                            />
                        </View>
                    </Modal>
                </View>
                
                <View style={[styles.input, this.state.mycard_name != '' ? styles.noterror : styles.error]}>
                    <Icon name='email' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                    <TextInput
                        editable={false}
                        keyboardType='numeric' 
                        style={styles.textinput} 
                        mode='outlined' 
                        placeholder="MyCard Name"
                        onChangeText={val => this.onChangeText('mycard_name', val)}>
                        <Text style={{textTransform: 'uppercase'}}>{this.state.mycard_name}</Text>
                    </TextInput>
                </View>

                <View style={[ styles.input, this.state.mycard_number != '' ? styles.noterror : styles.error ]}>
                    <Icon name='onepassword' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                    <TextInput
                        keyboardType='numeric' 
                        style={styles.textinput} 
                        mode='outlined' 
                        placeholder="MyCard Number" 
                        onChangeText={val => this.onChangeText('mycard_number', val)}>
                        <Text style={{textTransform: 'uppercase'}}>{this.state.mycard_number}</Text>
                    </TextInput>
                </View>
                
                <View style={{alignItems:'center', marginTop: 46}}>
                    <TouchableRipple
                        disabled={ this.state.mycard_number == '' && this.state.user_phonenumber == '' && this.state.mycard_type == '' && this.state.mycard_name == '' }
                        onPress={this.submitData.bind(this)}
                        style={[
                            styles.styleButtonSignUp,
                            { 
                                backgroundColor: this.state.mycard_number != '' && this.state.mycard_number != '' && this.state.user_phonenumber != '' && this.state.mycard_type != '' && this.state.mycard_name != '' ? '#4263D5' : '#4263D550'
                            }
                        ]}>
                        <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>Add MyCard</Text>
                    </TouchableRipple>
                </View>
            </View>
            </ImageBackground>
            
        </View>
    );
  }
}

export default AddMyCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
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
        top:100,
        left:95
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
    modalContent: {
        justifyContent: undefined,
        alignItems: undefined,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        margin: 50
      },

    viewCompany : {
        alignContent:'center',
        color: '#90dae1',
        alignSelf:'center',
        margin: 10,
        borderWidth:1,
        borderRadius:20,
        padding:20
    },
});