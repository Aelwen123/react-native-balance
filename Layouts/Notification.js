import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

var hours = new Date().getHours(); 
var min = new Date().getMinutes(); 
var sec = new Date().getSeconds();

export default class Notification extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateNow: date + '-' + month + '-' + year,
            timeNow: hours +':'+ min +':'+ sec,
            data : []
        };
    }

    componentDidMount(){
        console.log(this.props.route.params.user_phonenumber)
        fetch('http://192.168.100.136:3002/payment/' + this.props.route.params.user_phonenumber)
        .then(response => response.json())
        .then(res => {
            this.setState({data : res})
        })
    }

    render(){
        return(
            <View style={ styles.container }>
                <FlatList data={this.state.data}
                    horizontal={false}
                    keyExtractor={(y, i) => i.toString()}
                    style={{height:210}}
                    renderItem={({item}) =>
                    <View style={ styles.rectangle }>
                        <View style={ styles.content }>
                            <View style={ styles.containerText }>
                                <Text style={ styles.styleTime }>Date : {`${item.payment_date}`}</Text>
                                <Text style={ styles.styleTime }>Sender : {`${item.payment_sender}`}</Text>
                                <Text style={ styles.styleTime }>Receiver : {`${item.payment_receiver}`}</Text>
                                <Text style={ styles.styleTime }>Payment Method : {`${item.payment_method}`}</Text>
                                <Text style={ styles.styleTime }>Amount After Promo : {`${item.payment_amountAfterPromo}`}</Text>
                                <Text style={ styles.styleTime }>Amount Before Promo : {`${item.payment_amountBeforePromo}`}</Text>
                                <Text style={ styles.styleTime }>Payment Status : {`${item.payment_status}`}</Text>
                                <Text style={ styles.styleTime }>Payment Promo : {`${item.payment_promo}`}</Text>
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
        color: '#FF6347',
        marginBottom: 4,
        fontSize: 14,
    },
    styleText: {
        position: 'relative',
        fontSize: 14.5,
    }
});