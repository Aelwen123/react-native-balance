import React , { Component, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableRipple } from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';

import background from '../assets/background.png';

class CustomerService extends Component{
    state = {
        email: '', 
        kindComplaint: '',
        feedBack: '', 
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    render(){
        const { email, kindComplaint, feedBack } = this.state;
        const enabled = email.length > 8 && !email.includes('@') && !email.includes('.com') || kindComplaint.length > 5 && kindComplaint.length < 20 && feedBack.length > 5 && feedBack.length < 80;

        return(
            <View style={ styles.container }>
                <View>
                    <Text style={ styles.containerJudul }>
                        Hallo customerku, {"\n"}jika terdapat beberapa keluhan terhadap aplikasi 
                        tersebut atau ingin memberikan masukan.
                        Silahkan untuk mengisi data dibawah ini. {"\n"}Terima kasih :D
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={{ flexDirection: 'row', marginStart: -66, marginEnd: -66, }}>
                        <Icon name='email' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', paddingTop: 6, paddingStart: 6, marginTop: 16 }}/>
                            <View style={styles.input}>
                                <TextInput style={styles.textinput} mode='outlined' placeholder="Email Address" onChangeText={val => this.onChangeText('email', val)}>
                                    <Text>{this.state.email}</Text>
                                </TextInput>
                            </View>
                    </View>
                    <Text style={{ fontSize: 10, marginStart: 0, marginEnd: -90, marginBottom: 10 }}>*Greater than 8 Characters, Must include @, .com</Text>

                    <View style={{ flexDirection: 'row', marginStart: -66, marginEnd: -66, }}>
                        <Icon name='comment-text' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', paddingTop: 6, paddingStart: 6, marginTop: 16 }}/>
                            <View style={styles.input}>
                                <TextInput style={styles.textinput} mode='outlined' placeholder="Kind of Complaint" onChangeText={val => this.onChangeText('kindComplaint', val)}>
                                    <Text style={{ marginEnd: 20, overflow: 'hidden', padding: 12 }}>{this.state.kindComplaint}</Text>
                                </TextInput>
                            </View>
                    </View>
                    <Text style={{ fontSize: 10, marginStart: 138, marginEnd: -76, marginBottom: 10 }}>*Max 5-20 Characters</Text>

                    <View style={{ flexDirection: 'row', marginStart: -66, marginEnd: -66, }}>
                        <Icon name='text' size={30} color="#4287f5" style={{ alignItems:'center', justifyContent:'center', paddingTop: 6, paddingStart: 6, marginTop: 16 }}/>
                            <View style={styles.input1}>
                                <TextInput style={styles.textinput1} 
                                    multiline={true} 
                                    numberOfLines={4} 
                                    underlineColorAndroid="transparent"
                                    mode='outlined' 
                                    placeholder="Suggestion / Feedback" 
                                    onChangeText={val => this.onChangeText('feedBack', val)} >
                                    <Text style={{ overflow: 'hidden', padding: 12, justifyContent: 'flex-start', alignItems: 'flex-start', }}>{this.state.feedBack}</Text>
                                </TextInput>
                            </View>
                    </View>
                    <Text style={{ fontSize: 10, marginStart: 138, marginEnd: -76, marginBottom: 10 }}>*Max 5-80 Characters</Text>

                    <View style={{ alignItems:'center', marginTop: 40, marginBottom: 20 }}>
                        <TouchableOpacity
                            disabled={ !enabled }
                            onLongPress={() => this.props.navigation.navigate('ProfileScreen')}
                            style={[
                                styles.containerSubmit,
                                {
                                    backgroundColor: enabled ? '#4263D5' : '#4263D550'
                                }
                            ]} >
                            <Text style={{ textAlign: 'center', fontSize: 20, lineHeight: 43, color: '#ffffff', fontSize: 18 }}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default CustomerService;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        paddingStart: 24,
    },
    imgb : {
        height: '100%',
        width: '100%',
    },
    containerJudul: {
        fontFamily: 'Roboto',
        letterSpacing: 1,
        marginStart: 3,
        lineHeight: 20,
        marginTop: 20,
        marginEnd: 22,
        fontSize: 12,
        flex: 1,
    },
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 200,
        top: 134,
        flex: 1,
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
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        color: '#424242',
        borderRadius: 20,
        marginStart: 10,
        paddingLeft: 10,
        marginEnd: 20,
        flex: 1,
    },
    input1: {
        flex: 1,
        flexDirection: 'row',
        width: 310,
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
    textinput1: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
        backgroundColor: 'white',
        color: '#424242',
        borderRadius: 20,
        paddingLeft: 10,
        marginStart: 10,
        marginEnd: 20,
        height: 150,
        flex: 1,
    },
    bottom: {
        justifyContent: 'flex-end', 
        position: 'relative',
        marginBottom: 14,
        display: 'flex',
        flex: 1, 
    },
    containerSubmit: {
        backgroundColor: '#4287f5', 
        width: 310, height: 45, 
        borderRadius: 20,
    }
});