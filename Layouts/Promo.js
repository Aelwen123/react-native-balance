import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var bg = require("../img/background.png");

import scanQris from '../assets/scanQris.png';
import findMerchant from '../assets/findMerchant.png';

export default class Promo extends Component{
    state = {
        promoData : []
    }

    componentDidMount(){
        this.getPromo()
    }

    getPromo = async() => {
        fetch('http://192.168.100.136:3002/promo')
        .then(response => response.json())
        .then(res => {
            this.setState({promoData : res})
        })
    }
    render(){
        return(
            <View style={ styles.container }>
                <ImageBackground style={ styles.styleBackground }>
                    <View style={ styles.containerMenus }>
                        <FlatList data={this.state.promoData}
                            keyExtractor={(x, i) => i.toString()}
                            renderItem={({item}) =>
                                <TouchableOpacity style={ styles.containerPromo}>
                                    <View style={ styles.containerPromos }>
                                        <View style={ styles.containerTextPromo }>
                                            <Text style={ styles.styleTextPromo }>{`${item.promo_name}`}</Text>
                                            <Text style={ styles.styleTextPromo }>Discount : {`${item.promo_discount}`}%</Text>
                                            <Text style={ styles.styleTextExpired }>Expired {":"} {`${item.promo_expiredDate}`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
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
        margin: 20
    },

    containerPromo: {
        backgroundColor: '#4287f5',
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },

    containerPromos: {
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent:'center',
    },

    containerTextPromo: {        
        flexDirection: 'column'
    },
    styleTextPromo: {
        textAlign: 'left',
        fontSize: 24,
        marginStart: 20,
        fontWeight: '500'
    },
    styleTextExpired: {
        marginStart: 20,
        marginTop: 8,
        fontSize: 13,
        fontWeight: '500',
    }
});