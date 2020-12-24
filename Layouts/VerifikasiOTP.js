import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class VerifikasiOTP extends Component{
    constructor(props){
        super(props);
        this.state = {
            pin1: '',
            pin2: '',
            pin3: '',
            pin4: '',
            otp_code:'',
            timer: 30,
        };
    }

    componentDidMount = () => {
        fetch('http://192.168.100.136:3002/email/sendEmail/' + this.props.route.params.user_phonenumber)
        .then(response => response.json())
        .then(res => {
            this.setState({otp_code: res.otp_code})
        })
        this.refs.pin1ref.focus();

        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    componentDidUpdate(){
        if(this.state.timer === 0){ 
            clearInterval(this.interval);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    onResendOTP = () => {
        if (this.state.timer === 0) {
            this.setState({ 
                timer: 30,
            })

            this.interval = setInterval(
                () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
                1000
            );

            fetch('http://192.168.100.136:3002/email/sendEmail/' + this.props.route.params.user_phonenumber)
            .then(response => response.json())
            .then(res => {
                this.setState({otp_code: res.otp_code})
            })
        }
    }

    onClear = () => {
        this.setState({
            pin1: '',
            pin2: '',
            pin3: '',
            pin4: '',
        })
    }

    render(){
        const { pin1, pin2, pin3, pin4 } = this.state;
        
        return(
            <View style={ styles.container }>

                <View style={ styles.containerJudul }>
                    <Text style={ styles.textTitle }>
                        {"Input your OTP code sent via Email"}
                    </Text>
                </View>

                <View style={ styles.containerTextInput }>
                    <TextInput 
                        ref={"pin1ref"}
                        onChangeText={(pin1) => {
                            this.setState({ pin1: pin1 })

                            if (pin1 != '') {
                                this.refs.pin2ref.focus() ? '#ffffff' : '#f5f4f2'
                            }
                        }}
                        value={pin1}
                        maxLength={1}
                        style={ styles.styleTextInput1 } />

                    <TextInput 
                        ref={"pin2ref"}
                        onChangeText={(pin2) => {
                            this.setState({ pin2: pin2 })

                            if (pin2 != '') {
                                this.refs.pin3ref.focus()
                            }
                        }}
                        value={pin2}
                        maxLength={1}
                        style={ styles.styleTextInput2 } />

                    <TextInput 
                        ref={"pin3ref"}
                        onChangeText={(pin3) => {
                            this.setState({ pin3: pin3 })

                            if (pin3 != '') {
                                this.refs.pin4ref.focus()
                            }
                        }}
                        value={pin3}
                        maxLength={1}
                        style={ styles.styleTextInput3 } />

                    <TextInput 
                        ref={"pin4ref"}
                        onChangeText={(pin4) => {
                            this.setState({ pin4: pin4 })

                            if (this.state.pin1 + this.state.pin2 + this.state.pin3 + pin4 == this.state.otp_code) {
                                Alert.alert(
                                    "SUCCESS!",
                                    "You have successfully verified your phone number",
                                    [
                                        {
                                            text: "OK", onPress: () => this.props.navigation.navigate("TheHome", {
                                                token : this.props.route.params.token,
                                                user_phonenumber : this.props.route.params.user_phonenumber,
                                                user_email: this.props.route.params.user_email,
                                                user_name: this.props.route.params.user_name
                                            })
                                        }
                                    ]
                                )
                            } else {
                                Alert.alert(
                                    "ERROR!",
                                    "Your PIN is Error!",
                                    [
                                        {
                                            text: "OK", onPress: () => console.log('OK')
                                        }
                                    ]
                                )
                                this.onClear()
                                this.refs.pin1ref.focus();
                            }
                        }}
                        value={pin4}
                        maxLength={1}
                        style={ styles.styleTextInput4 } />

                </View>

                <View style={ styles.bottomView }>
                    <TouchableOpacity onPress={this.onClear}>
                        <View style={ styles.btnChangeNumber }>
                            <Text style={ styles.textChange }>Change Number</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onResendOTP}>
                        <View style={ styles.btnResend }>
                            <Text style={ styles.textResend }>
                                Resend OTP ({this.state.timer})
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    containerJudul: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        marginBottom: 0,
        marginTop: 120,
        fontSize: 16
    },
    containerTextInput: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 30,
        padding: 4,
    },
    styleTextInput1: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderColor: 'gray',
        textAlign: 'center',
        fontWeight: '600',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        width: '14%',
        padding: 6,
        height: 50,
    },
    styleTextInput2: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderColor: 'gray',
        textAlign: 'center',
        fontWeight: '600',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        width: '14%',
        padding: 6,
        height: 50,
    },
    styleTextInput3: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderColor: 'gray',
        textAlign: 'center',
        fontWeight: '600',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        width: '14%',
        padding: 6,
        height: 50,
    },
    styleTextInput4: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderColor: 'gray',
        textAlign: 'center',
        fontWeight: '600',
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 20,
        width: '14%',
        padding: 6,
        height: 50,
    },
    bottomView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 50,
        flex: 1,
    },
    btnChangeNumber: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 10,
        width: 150,
        height: 50,
    },
    textChange: {
        alignItems: 'center',
        color: '#234db7',
        fontSize: 15,
    },
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textResend: {
        alignItems: 'center',
        fontSize: 15
    }
});