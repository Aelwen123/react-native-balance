import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input';

var bg = require("../img/background.png");

import scanQris from '../assets/scanQris.png';
import findMerchant from '../assets/findMerchant.png';

export default class PaidPromo extends Component{
    state = {
        paidPromoData : []
    }

    componentDidMount(){
        this.getPaidPromo()
    }

    getPaidPromo = async() => {
        fetch('http://192.168.100.136:3002/promo/paid')
        .then(response => response.json())
        .then(res => {
            this.setState({paidPromoData : res})
        })
    }
    
    render(){
        return(
            <View style={ styles.container }>
                <ImageBackground style={ styles.styleBackground } source={bg}>
                    <View style={ styles.containerMenus }>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>Paid Promo</Text>
                        <FlatList data={this.state.paidPromoData}
                            keyExtractor={(x, i) => i.toString()}
                            style={{marginBottom:10}}
                            renderItem={({item}) =>
                                <TouchableOpacity style={ styles.containerPromo} onPress={() => this.props.navigation.push('BuyPromo', {
                                    promo_id : `${item._id}`
                                })}>
                                    <View style={ styles.containerPromos }>
                                        <View style={ styles.containerTextPromo }>
                                            <Text style={ styles.styleTextPromo }>{`${item.promo_name}`}</Text>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Discount: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:24, fontWeight:'bold'}} 
                                                    value={`${item.promo_discount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Minimal: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:24, fontWeight:'bold'}} 
                                                    value={`${item.promo_minimalamount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <Text style={ styles.styleTextExpired }>Expired {":"} {`${item.promo_expiredDate}`}</Text>
                                            <Text style={ styles.styleTextExpired }>Price {":"} {`${item.promo_price}`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                    <View style={{ alignItems:'center', marginTop: 20, }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.push('PromoScreen')}
                            style={[
                                styles.containerButtonPay,{ 
                                    backgroundColor: '#4263D5', 
                                }]}>
                                <Text style={styles.styleTextPay}>Free Promo</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    styleBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    containerMenus: {
        margin: 20,
        height:550
    },

    containerPromo: {
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#fff',
    },

    containerPromos: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent:'center',
        backgroundColor: 'rgba(255,255,255,0.3)'
    },

    containerTextPromo: {        
        flexDirection: 'column'
    },
    styleTextPromo: {
        textAlign: 'left',
        fontSize: 24,
        marginStart: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    styleTextExpired: {
        marginStart: 20,
        marginTop: 5,
        fontSize: 15,
        fontWeight: '900',
    },
    containerButtonPay: {
        width: 310,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },
    styleTextPay: {
        textAlign: 'center',
        fontSize: 15,
        color:'white'
    }
});