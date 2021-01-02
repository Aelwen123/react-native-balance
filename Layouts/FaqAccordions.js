import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
// import Accordian from '../Layouts/Components/FAQ';
import background from '../assets/background.png';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class FAQList extends Component{
    constructor(props){
        super(props);
        this.state = {
            menu :[
                {
                    title: 'Apa bedanya dengan Digital Payment yang sudah ada saat ini ?',
                    data: 'Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla \nBla Lorem Ipsum Bla Bla Bla Lorem Ipsum \nBla Bla Bla',
                },
                {
                    title: 'Kenapa saya harus menggunakan Balance Fintech ?',
                    data: 'Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla \nBla Lorem Ipsum Bla Bla Bla Lorem Ipsum \nBla Bla Bla'
                },
                {
                    title: 'Lorem Ipsum Bla Bla Lorem Lorem Ipsum Bla Bla Lorem ?',
                    data: 'Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum \nBla Bla Bla'
                },
                {
                    title: 'Lorem Ipsum Bla Bla Lorem Lorem Ipsum Bla Bla Lorem ?',
                    data: 'Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum \nBla Bla Bla'
                },
                {
                    title: 'Lorem Ipsum Bla Bla Lorem Lorem Ipsum Bla Bla Lorem ?',
                    data: 'Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum Bla Bla Bla Lorem Ipsum \nBla Bla Bla'
                },
            ]
        }
    }

    render(){
        return(
            <View>
                <View>
                    <ImageBackground source={ background } style={ styles.containerImgBg }>
                        <View style={{ overflow: 'hidden', marginTop: 30, marginBottom: 0, }}>
                            <View style={ styles.contentJudul }>
                                <Text style={styles.styleContentJudul }>
                                    Temukan Informasi yang {"\n"}anda butuhkan seputar {"\n"}Balance Fintech
                                </Text>
                            </View>

                            
                            <View style={ styles.containerPertanyaan }>
                                <View style={ styles.styleTextContainerPertanyaan }>
                                    <Text style={ styles.styleTextPertanyaan }>Pertanyaan</Text>
                                </View>
                            </View>

                            <View style={ styles.containerSubPertanyaan }>
                            <FlatList data={this.state.menu}
                                style={{maxHeight: 380, width: 400, padding: 10}}
                                keyExtractor={(x, i) => i.toString()}
                                renderItem={({item}) =>
                                    <View style={{margin : 10}}>
                                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{`${item.title}`}</Text>
                                        <Text style={{marginTop: 5}}>{`${item.data}`}</Text>
                                    </View>
                                }
                            />
                            </View>

                        </View>

                    </ImageBackground>
                </View>
            </View>
        );
    }

    renderFaqAccordions = () => {
        const items = [];
        let item = 0;
        for (item of this.state.menu) {
            items.push(
                <Accordian 
                    title = {item.title}
                    data = {item.data}
                />
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    containerImgBg: {
        height: '100%',
        width: '100%',
    },
    contentJudul: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 30,
        overflow: 'hidden',
    },
    styleContentJudul: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 26,
    },
    containerPertanyaan: {
        backgroundColor: '#F2F2F2',
        width: '100%',
        marginTop: 30,
    },
    styleTextContainerPertanyaan: {
        paddingStart: 8,
        margin: 20,
    },
    styleTextPertanyaan: {
        fontWeight: "bold",
        color: '#4F4F4F',
        fontSize: 18,
    },
    containerSubPertanyaan: {
        backgroundColor: '#ffffff',
        marginBottom: 0,
        height: '100%',
        width: '100%',
        marginTop: 0,
    },
});