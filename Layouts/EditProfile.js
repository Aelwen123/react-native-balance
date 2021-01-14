import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Content } from 'native-base';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';

import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfilePicture from '../assets/profile_icon.png';
import pencil from '../assets/pencil.png';

class Edits extends Component{
    state = {
        name: this.props.route.params.user_name,
        email: this.props.route.params.user_email,
        phonenumber: this.props.route.params.phonenumber, 
      }
      onChangeText = (key, val) => {
          this.setState({ [key]: val })
      }

      updateProfile = () => {
          const {name, email, phonenumber} = this.state
          console.log(this.state)
          fetch('http://192.168.100.136:3002/customer/update/' + phonenumber + "/" + name + "/" + email).
          then(response => response.json())
          .then(res => {
              this.props.navigation.push('ProfileScreen')
          })
      }


    render(){
        return(
            <View style={ styles.container }>
                <Content>
                    <TouchableOpacity
                        activeOpacity={0.95}
                        onPress={() => null}>
                    <View style={ styles.containerAvatar }>
                        <Avatar.Image source={ProfilePicture} size={140} style={ styles.containerStyleAvatar } />
                        <View style={ styles.circle }>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name="camera" size={30} style={{ color: '#ffffff', }} />
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                </Content>

                <View style={styles.form}>

                        <View style={styles.input}>
                            <Icon name='account' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                                <TextInput style={styles.textinput} mode='outlined' placeholder="Name" onChangeText={val => this.onChangeText('name', val)}>
                                    <Text>{this.state.name}</Text>
                                </TextInput>
                            <View style={{ alignItems:'center', justifyContent:'center', }}>
                                <Icon name='pencil' size={14} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            </View>
                        </View>

                        <View style={styles.input}>
                            <Icon name='email' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                                <TextInput style={styles.textinput} mode='outlined' placeholder="Email" onChangeText={val => this.onChangeText('email', val)}>
                                    <Text>{this.state.email}</Text>
                                </TextInput>
                            <View style={{ alignItems:'center', justifyContent:'center', }}>
                                <Icon name='pencil' size={14} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            </View>
                        </View>
                        
                        <View style={styles.input}>
                            <Icon name='phone' size={30} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                                <TextInput editable={false} style={styles.textinput} mode='outlined' placeholder="Phone number" onChangeText={val => this.onChangeText('phonenumber', val)}>
                                    <Text>{this.state.phonenumber}</Text>
                                </TextInput>
                            <View style={{ alignItems:'center', justifyContent:'center', }}>
                                <Icon name='pencil' size={14} color="#4287f5" style={{alignItems:'center', justifyContent:'center', padding:12}}/>
                            </View>
                        </View>

                        <View style={ styles.container1 }>
                            <TouchableOpacity
                                style={ styles.containerButton }
                                onPress={this.updateProfile.bind(this)}>
                                <View style={ styles.containerStyleButton }>
                                    <Text style={ styles.styleTextButton }>UPDATE PROFILE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                </View>

            </View>
        );
    }
}

export default Edits;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    containerAvatar: {
        marginBottom: 25,
        // marginStart: 120,
        marginTop: 25,
        alignSelf:'center',
    },
    styleContainerUpdate: {
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf:'center'
    },
    hoverButtonUpdate: {
        borderRadius: 20,
    },
    styleUpdateProfilePhoto: {
        textAlign: 'center',
        fontSize: 16
    },
    circle: {
        backgroundColor: '#4F74E2',
        justifyContent: 'center', 
        borderColor: '#4F74E2',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 50,
        marginStart: 90,
        marginTop: 110,
        borderWidth: 1,
        height: 46,
        width: 46,
    },
    form:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        position: 'absolute',
        marginStart: 80,
        marginTop: 192,
        width: 200,
        flex: 1,
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
        shadowOffset:{width: 0, height: 2},
        shadowColor:'black',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        fontWeight: '500',
        elevation: 5,
    },
    textinput:{
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        color: '#424242',
        borderRadius: 20,
        paddingLeft: 10,
        marginEnd: 20,
        flex: 1,
    },
    container1: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
        display: 'flex',
        marginTop: 130,
        flex: 1,
    },
    containerButton: {
        backgroundColor: '#4287f5',
        borderRadius: 20,
        marginTop: 24,
        width: '100%',
    },
    containerStyleButton: {
        backgroundColor: '#4F74E2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 310,
        height: 40,
    },
    styleTextButton: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 15,
    },
});