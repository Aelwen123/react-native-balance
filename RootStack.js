import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './Layouts/Splash';
import Intro from './Layouts/Intro';
import SignIn from './Layouts/SignIn';
import SignUp from './Layouts/SignUp';
import Home from './Layouts/Home';
import VerifikasiOTP from './Layouts/VerifikasiOTP';
import SecurityPage from './Layouts/SecurityPage';
import Payment from './Layouts/Payment';
import Profile from './Layouts/Profile';
import Promo from './Layouts/Promo';
import Notification from './Layouts/Notification';
import ScanQR from './Layouts/ScanQR';
import FindMerchant from './Layouts/FIndMerchant';
import SelectMerchantLocation from './Layouts/SelectMerchantLocation'
import InputNominal from './Layouts/InputNominal';
import EditProfile from './Layouts/EditProfile';
import CustomerService from './Layouts/CustomerService';
import FAQ from './Layouts/FaqAccordions'
import TopUp from './Layouts/TopUp'
import SecurityTopUp from './Layouts/SecurityPIN'
import BuyPromo from './Layouts/BuyPromo'
import PaidPromo from './Layouts/PaidPromo'
import CustomerPromo from './Layouts/CustomerPromo'
import AddMyCard from './Layouts/AddMyCard'
import SignInMerchant from './Layouts/SignInMerchant'
import SignUpMerchant from './Layouts/SignUpMerchant'
import HomeMerchant from './Layouts/HomeMerchant'
import HistoryMerchant from './Layouts/HistoryMerchant'
import Withdraw from './Layouts/Withdraw'
import SecurityWithdraw from './Layouts/SecurityWithdraw'
  
  const Stack = createStackNavigator();
  export default function RootStack() {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MySignUp">
          <Stack.Screen name="TheSplash" 
                        component={Splash}
                        options={{ headerShown: false }}/>
          <Stack.Screen name="Intro"
                        component={Intro}
                        options={{ headerShown: false }}/>
          <Stack.Screen name="SignIn"
                        component={SignIn}
                        options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp"
                        component={SignUp}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Sign Up' }} />            
          <Stack.Screen name="VerifikasiOTP"
                        component={VerifikasiOTP}
                        options={{ title: "Verifikasi OTP" }}/>
          <Stack.Screen name="TheHome"
                        component={Home}
                        options={{ headerShown: false }}/>
          <Stack.Screen name="Payment"
                        component={Payment}
                        options={{ headerShown: true, headerTitleAlign: 'center' }}/>
          <Stack.Screen name="ProfileScreen"
                        component={Profile}
                        options={{ headerShown: false }}/>
          <Stack.Screen name="PromoScreen"
                        component={Promo}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Promo & Cashback' }}/>
          <Stack.Screen name="NotificationScreen"
                        component={Notification}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Transaction History' }}/>
          <Stack.Screen name="ScanQRScreen"
                        component={ScanQR}
                        options={{ headerShown: false, headerTitleAlign: 'center', title: ' ' }}/>
          <Stack.Screen name="FindMerchantScreen"
                        component={FindMerchant}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Find Merchant' }}/>
          <Stack.Screen name="SelectMerchantLocationScreen"
                        component={SelectMerchantLocation}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Merchant Location' }}/>
          <Stack.Screen name="InputNominalScreen"
                        component={InputNominal}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Input Nominal', headerTransparent: true }}/>
          <Stack.Screen name="SecurityPINScreen"
                        component={SecurityPage}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Security PIN', headerTransparent: true }}/>
          <Stack.Screen name="EditProfileScreen"
                        component={EditProfile}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Edit Profile', headerTransparent: false }}/>                        
          <Stack.Screen name="CustomerServiceScreen"
                        component={CustomerService}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Customer Service', headerTransparent: false }}/>
          <Stack.Screen name="FAQScreen"
                        component={FAQ}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'FAQ', headerTransparent: true, headerTitleStyle: { color: '#ffffff' } }}/>
          <Stack.Screen name="TopUpScreen"
                        component={TopUp}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Top Up', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="SecurityTopUpScreen"
                        component={SecurityTopUp}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Security Pin', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="BuyPromo"
                        component={BuyPromo}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Buy Promo', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="PaidPromo"
                        component={PaidPromo}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Paid Promo', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="CustomerPromo"
                        component={CustomerPromo}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Customer Promo', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="AddMyCard"
                        component={AddMyCard}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Add MyCard', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="SignInMerchant"
                        component={SignInMerchant}
                        options={{ headerShown: false, headerTitleAlign: 'center', title: 'Sign In Merchant', headerTransparent: true, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="SignUpMerchant"
                        component={SignUpMerchant}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Sign Up Merchant', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="HomeMerchant"
                        component={HomeMerchant}
                        options={{ headerShown: false, headerTitleAlign: 'center', title: 'Merchant Home', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>              
          <Stack.Screen name="HistoryMerchant"
                        component={HistoryMerchant}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'History Merchant', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="WithdrawMoney"
                        component={Withdraw}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Withdraw', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
          <Stack.Screen name="SecurityWithdraw"
                        component={SecurityWithdraw}
                        options={{ headerShown: true, headerTitleAlign: 'center', title: 'Security Pin', headerTransparent: false, headerTitleStyle: { color: 'black' } }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }