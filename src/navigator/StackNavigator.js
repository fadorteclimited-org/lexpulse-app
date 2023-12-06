import { View, Text, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventRegister } from 'react-native-event-listeners';
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import { Colors } from '../theme/color';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Letsin from '../screens/Letsin';
import Introduction from '../screens/Introduction';
import Location from '../screens/Location';
import PhotoId from '../screens/PhotoId';
import Otp from '../screens/Otp';
import Facereco from '../screens/Facereco';
import Facescan from '../screens/Facescan';
import Fingerprint from '../screens/fingerprint';
import ForgotPass from '../screens/ForgotPass';
import NewPass from '../screens/NewPass';
import Profilefill from '../screens/Profilefill';
import Selfi from '../screens/Selfi';
import OtpVerification from '../screens/OtpVerification';
import OtpBooking from '../screens/OtpBooking';
import Popular from '../screens/Popular';
import Resultlist from '../screens/Resultlist';
import ResultCard from '../screens/ResultCard';
import Direction from '../screens/Direction';
import EventLocation from '../screens/EventLocation';
import All from '../screens/All';
import Home from '../screens/Home';
import EventDetail from '../screens/EventDetail';
import Going from '../screens/Going';
import Gallery from '../screens/Gallery';
import BookEvent from '../screens/BookEvent';
import PaymentMethod1 from '../screens/PaymentMethod1';
import PaymentMethod2 from '../screens/PaymentMethod2';
import NewCard from '../screens/NewCard';
import ReviewSummary from '../screens/ReviewSummary';
import ETicket from '../screens/ETicket';
import FCards from '../screens/FCards';
import FList from '../screens/FList';
import Explore1 from '../screens/Explore1';
import Explore2 from '../screens/Explore2';
import Explore3 from '../screens/Explore3';
import Explore4 from '../screens/Explore4';
import Explore5 from '../screens/Explore5';
import Notification2 from '../screens/Notification2';
import TicketTab from '../screens/TicketTab';
import Cancelreason from '../screens/Cancelreason';
import Invited from '../screens/Invited';
import Profile from '../screens/Profile';
import BottomNavigator from './BottomNavigator';
import Organizer from '../screens/Organizer';
import BookEvent2 from '../screens/BookEvent2';
import Notification from '../screens/Notification';
import Profile2 from '../screens/Profile2';
import Payment from '../screens/Payment';
import Linkaccount from '../screens/Linkaccount';
import Security from '../screens/Security';
import Helpcenter from '../screens/Helpcenter';
import Language from '../screens/Language';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data)
      console.log(data)

    })

    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])

  const [showSplashScreen, setshowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowSplashScreen(false);
    }, 4000);


  }, [])
  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <StatusBar backgroundColor={darkMode === true ? Colors.active : Colors.secondary}
          barStyle={darkMode === true ? 'light-content' : 'dark-content'} translucent={false} />
        <Stack.Navigator>
          {
            showSplashScreen ?
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }} />
              : null
          }
          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Letsin"
            component={Letsin}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="PhotoId"
            component={PhotoId}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Facereco"
            component={Facereco}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Facescan"
            component={Facescan}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Fingerprint"
            component={Fingerprint}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="ForgotPass"
            component={ForgotPass}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="NewPass"
            component={NewPass}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Profilefill"
            component={Profilefill}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Selfi"
            component={Selfi}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="OtpVerification"
            component={OtpVerification}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="OtpBooking"
            component={OtpBooking}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="Popular"
            component={Popular}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Resultlist"
            component={Resultlist}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="ResultCard"
            component={ResultCard}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Direction"
            component={Direction}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="EventLocation"
            component={EventLocation}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="All"
            component={All}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="EventDetail"
            component={EventDetail}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Going"
            component={Going}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="BookEvent"
            component={BookEvent}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="PaymentMethod1"
            component={PaymentMethod1}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="PaymentMethod2"
            component={PaymentMethod2}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="NewCard"
            component={NewCard}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="ReviewSummary"
            component={ReviewSummary}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="ETicket"
            component={ETicket}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="FCards"
            component={FCards}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="FList"
            component={FList}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Explore1"
            component={Explore1}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Explore2"
            component={Explore2}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Explore3"
            component={Explore3}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Explore4"
            component={Explore4}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Explore5"
            component={Explore5}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Notification2"
            component={Notification2}
            options={{ headerShown: false }} />
          {/* <Stack.Screen
            name="TicketTab"
            component={TicketTab}
            options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="Cancelreason"
            component={Cancelreason}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Invited"
            component={Invited}
            options={{ headerShown: false }} />
          {/* <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="Organizer"
            component={Organizer}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="BookEvent2"
            component={BookEvent2}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }} />
            <Stack.Screen
            name="Profile2"
            component={Profile2}
            options={{ headerShown: false }} />
             <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }} />
            <Stack.Screen
            name="Linkaccount"
            component={Linkaccount}
            options={{ headerShown: false }} />
            <Stack.Screen
            name="Helpcenter"
            component={Helpcenter}
            options={{ headerShown: false }} />
            <Stack.Screen
            name="Security"
            component={Security}
            options={{ headerShown: false }} />
            <Stack.Screen
            name="Language"
            component={Language}
            options={{ headerShown: false }} />

          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  )
}