import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input';

var bg = require("../img/background.png");

export default class CustomerPromo extends Component{
    state = {
        promoData : [],
        paidPromoData : [],
        promo_discount: ''
    }

    componentDidMount(){
        this.getPromo()
        this.getCustomerPromo()
    }

    getPromo = async() => {
        fetch('http://192.168.100.136:3002/promo/free')
        .then(response => response.json())
        .then(res => {
            this.setState({promoData : res})
        })
    }

    getCustomerPromo = async() => {
        AsyncStorage.getItem('phonenumber', (err, result) => {
            fetch('http://192.168.100.136:3002/promo/customerPromo/' + result)
            .then(response => response.json())
            .then(res => {
                this.setState({paidPromoData : res})
            })
            .catch(err => {
                console.log(err)
            })
        })
    }

    usePromo = (discount, minimal, name, paymentVia) => {
        this.props.navigation.navigate('InputNominalScreen', {
            promo_name : name,
            minimal : minimal,
            discount : discount,
            paymentVia : paymentVia,
            nominal : Number(this.props.route.params.nominal)
        })
    }

    render(){
        
        return(
            <View style={ styles.container }>
                <ImageBackground style={ styles.styleBackground } source={bg}>
                    <View style={ styles.containerMenus }>
                        <FlatList data={this.state.promoData}
                            keyExtractor={(x, i) => i.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity style={ styles.containerPromo} onPress={() => {
                                    this.setState({promo_discount: Number(`${item.promo_discount}`)})
                                    this.usePromo(`${item.promo_discount}`, `${item.promo_minimalamount}`, `${item.promo_name}`)
                                }}>
                                    <View style={ styles.containerPromos }>
                                        <View style={ styles.containerTextPromo }>
                                            <Text style={ styles.styleTextPromo }>{`${item.promo_name}`}</Text>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Discount: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:20, fontWeight:'bold'}} 
                                                    value={`${item.promo_discount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Minimal amount: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:20, fontWeight:'bold'}} 
                                                    value={`${item.promo_minimalamount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <Text style={ styles.styleTextExpired }>Expired {":"} {`${item.promo_expiredDate}`}</Text>
                                            
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />

                        <Text style={{fontSize:24, fontWeight:'bold', marginTop: 10}}>Your Exclusive Promo</Text>
                        <FlatList data={this.state.paidPromoData}
                            keyExtractor={(x, i) => i.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity style={ styles.containerPromo} onPress={() => {
                                    this.setState({promo_discount: Number(`${item.promo_discount}`)})
                                    this.usePromo(`${item.promo_discount}`, `${item.promo_minimalamount}`, `${item.promo_name}`, `${item.promo_forPaymentVia}`)
                                }}>
                                    <View style={ styles.containerPromos }>
                                        <View style={ styles.containerTextPromo }>
                                            <Text style={ styles.styleTextPromo }>{`${item.promo_name}`}</Text>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Discount: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:20, fontWeight:'bold'}} 
                                                    value={`${item.promo_discount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={ styles.styleTextPromo }>Minimal amount: IDR </Text>
                                                <CurrencyInput 
                                                    mode='outlined' 
                                                    placeholder="Input Nominal" 
                                                    style={{fontSize:20, fontWeight:'bold'}} 
                                                    value={`${item.promo_minimalamount}`}
                                                    editable={false}
                                                    delimiter=","
                                                    separator="."
                                                    precision={0}
                                                    keyboardType={'decimal-pad'}
                                                />
                                            </View>
                                            <Text style={ styles.styleTextExpired }>Expired {":"} {`${item.promo_expiredDate}`}</Text>
                                            <Text style={ styles.styleTextExpired }>Payment via {":"} {`${item.promo_forPaymentVia}`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                    <View style={{ alignItems:'center', marginTop: 20, }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.push('PaidPromo')}
                            style={[
                                styles.containerButtonPay,{ 
                                    backgroundColor: '#4263D5', 
                                }]}>
                                <Text style={styles.styleTextPay}>Paid Promo</Text>
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
    },
    containerMenus: {
        margin: 20,
        height:550,
        borderRadius: 20,
    },

    containerPromo: {
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#fff',
    },

    containerPromos: {
        width: '100%',
        height: 150,
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
        fontSize: 20,
        marginStart: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    styleTextExpired: {
        marginStart: 20,
        marginTop: 8,
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase'
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