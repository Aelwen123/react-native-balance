import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

var hours = new Date().getHours(); 
var min = new Date().getMinutes(); 
var sec = new Date().getSeconds();

export default class HistoryMerchant extends Component{
    constructor(props){
        super(props);
        this.state = {
            history:[]
        };
    }

    componentDidMount(){
        this.getMerchantHistory()
    }

    getMerchantHistory = () => {
        fetch("http://192.168.100.136:3002/payment/merchant/" + this.props.route.params.merchant_id)
        .then(response => response.json())
        .then(res => {
            this.setState({history: res})
        })
    }

    render(){
        return(
            <View style={ styles.container }>
                <FlatList data={this.state.history}
                    horizontal={false}
                    keyExtractor={(y, i) => i.toString()}
                    style={{height:210}}
                    renderItem={({item}) =>
                    <View style={ styles.rectangle }>
                        <View style={ styles.content }>
                            <View style={ styles.containerText }>
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Text style={ [styles.styleTime, {marginRight:20,}] }>Date: {`${item.payment_date}`}</Text>
                                    <CurrencyInput 
                                        mode='outlined' 
                                        placeholder="Input Nominal" 
                                        style={[ styles.styleTime, { position:'absolute', left:280, color:'#466FFF'}]} 
                                        value={`${item.payment_amountAfterPromo}`}
                                        delimiter=","
                                        unit="Rp"
                                        separator="."
                                        precision={0}
                                        keyboardType={'decimal-pad'}
                                    />
                                </View>
                                <Text style={ styles.styleText2 }>From: {`${item.payment_sender}`}</Text>
                                <Text style={ styles.styleText2 }>To: {`${item.payment_receiver}`}</Text>
                                <Text style={ styles.styleTime }>Payment Via: {`${item.payment_method}`}</Text>
                                <Text style={ styles.styleTime }>Payment Promo: {`${item.payment_promo}`}</Text>
                            </View>
                        </View>
                    </View>
                    }
                  />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    rectangle: {
        borderColor: '#f5f4f3',
        borderWidth: 2,
    },
    content: {
        flexDirection: 'row',
        margin: 20,
    },
    containerText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginStart: 4,        
    },
    styleTime: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
        fontSize: 14,
    },
    styleText2: {
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
        fontSize: 20,
    },
    styleText: {
        position: 'relative',
        fontSize: 14.5,
    }
});