import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import scanQris from '../assets/scanQris.png';
import findMerchant from '../assets/findMerchant.png';
var bg = require("../img/background.png");

export default class Payment extends Component{
    render(){
        return(
            <View style={ styles.container }>
                <ImageBackground style={ styles.styleBackground } source={bg}>
                    <View style={ styles.containerMenus }>
                        <TouchableOpacity style={ styles.conatinerTouchScan }
                            onPress={() => this.props.navigation.navigate('ScanQRScreen')}>
                            <View style={ styles.containerScanQRIS }>
                                <View style={ styles.containerImageScan }>
                                    <Image source={ scanQris } />
                                </View>
                                <View style={ styles.containerTextScanQRIS }>
                                    <Text style={ styles.styleTextQRIS }>Scan QRIS</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.containerTouchFind }
                            onPress={() => this.props.navigation.navigate('FindMerchantScreen')}>
                            <View style={ styles.containerFind }>
                                <View style={ styles.containerImageFind }>
                                        <Image source={ findMerchant } />
                                </View>
                                <View style={ styles.containerTextFind }>
                                    <Text style={ styles.styleTextFind }>Find Merchant</Text>
                                </View>
                            </View>
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
    },

    conatinerTouchScan: {
        marginTop: 10,
        borderRadius: 10,
        borderColor: '#fff',
    },
    containerScanQRIS: {
        width: '100%',
        height: 194,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth:1
    },
    containerImageScan: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 32
    },
    containerTextScanQRIS: {
        justifyContent: 'center',
        flexDirection: 'column'
    },
    styleTextQRIS: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold'
    },

    containerTouchFind: {
        marginTop: 24,
        borderRadius: 10,
        borderColor: '#fff',
    },
    containerFind: {
        width: '100%',
        height: 194,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    containerImageFind: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    containerTextFind: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 40,
    },
    styleTextFind: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight:'bold'
    },
});