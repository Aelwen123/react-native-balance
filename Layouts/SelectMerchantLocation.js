import React, { Component, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Card, Button, Title, Paragraph } from 'react-native-paper'
var bg = require("../img/background.png");

export default class SelectMerchantLocation extends Component{
    state = {
        merchantName: this.props.route.params.merchant_name, 
        merchantData: [],
        viewMerchantData : false, 
        errormessage :'',
        address: 'lorum ipsumGrand Indonesia East Mall Lantai 3A, Jalan M.H. Thamrin No.28-30, Gondangdia, Menteng, RT.1/RW.5, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350',
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount(){
        this.onSearch()
    }

    onSearch = () => {
        const { merchantName } = this.state
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
    render(){
        return(
            <View style={ styles.container }>
                <ImageBackground source={bg} style={ {width: '100%', height: '100%'} }>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        scrollEventThrottle={14}
                        style={{overflow:'hidden', marginTop: 16, marginBottom: 16, paddingTop: 0, height:100}}>

                    <View style={ styles.containerJudul }>
                        <Text style={ styles.styleText }>Choose Location Merchant</Text>
                    </View>

                    <View style={styles.form}>
                    <FlatList data={this.state.merchantData}
                            style={{maxHeight: this.state.viewMerchantData === true ? 1000 : 0, width: 390}}
                            keyExtractor={(x, i) => i.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity
                                    style={ styles.containerBox }
                                    onPress={() => this.props.navigation.navigate("InputNominalScreen", {
                                        merchant_name: `${item.merchant_name}`,
                                        merchant_location : `${item.merchant_location}`,
                                        merchant_address : this.state.address,
                                        merchant_workhour_start : `${item.merchant_workhour_start}`,
                                        merchant_workhour_finish : `${item.merchant_workhour_finish}`,
                                        merchant_id_gajek : `${item.merchant_id_gajek}`,
                                        merchant_clover_account : `${item.merchant_clover_account}`
                                    })}>
                                    <View style={ styles.container1 }>
                                        <View style={ styles.containerText }>
                                            <Text style={ styles.merchant }>{`${item.merchant_name}`}</Text>
                                            <Text style={ styles.addr }>{`${item.merchant_location}`}</Text>
                                            <Text style={ styles.addr }>{this.state.address}</Text>
                                            <View style={ styles.timeSqr}>
                                                <Text style={ styles.time }>{`${item.merchant_workhour_start}`} - {`${item.merchant_workhour_finish}`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                    />
                    </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    form:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    containerJudul: {
        marginStart: 20,
        marginTop: 0,
    },
    styleText: {
        fontWeight: '500',
        fontSize: 16,
    },
    containerBox: {
        backgroundColor: '#4287f5',
        borderRadius: 10,
        height: 160,
        marginStart: 20,
        marginTop: 14,
        marginEnd: 20,
    },
    container1: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        height: 160,
    },
    containerText: {
        marginStart: 20,
        marginTop: 14
    },
    merchant: {
        fontWeight: 'bold',
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
});