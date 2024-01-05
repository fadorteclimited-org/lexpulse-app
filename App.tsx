import { View, Text, StatusBar } from 'react-native'
import React, { useState, useEffect, createContext, useContext, useReducer, useMemo } from 'react'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventRegister } from 'react-native-event-listeners';
import theme from './src/theme/theme';
import themeContext from './src/theme/themeContex';
import { Colors } from './src/theme/color';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Letsin from './src/screens/Letsin';
import Introduction from './src/screens/Introduction';
import Location from './src/screens/Location';
import PhotoId from './src/screens/PhotoId';
import Otp from './src/screens/Otp';
import Facereco from './src/screens/Facereco';
import Facescan from './src/screens/Facescan';
import Fingerprint from './src/screens/fingerprint';
import ForgotPass from './src/screens/ForgotPass';
import NewPass from './src/screens/NewPass';
import Profilefill from './src/screens/Profilefill';
import Selfi from './src/screens/Selfi';
import OtpVerification from './src/screens/OtpVerification';
import OtpBooking from './src/screens/OtpBooking';
import Popular from './src/screens/Popular';
import Resultlist from './src/screens/Resultlist';
import ResultCard from './src/screens/ResultCard';
import Direction from './src/screens/Direction';
import EventLocation from './src/screens/EventLocation';
import All from './src/screens/All';
import Home from './src/screens/Home';
import EventDetail from './src/screens/EventDetail';
import Going from './src/screens/Going';
import Gallery from './src/screens/Gallery';
import BookEvent from './src/screens/BookEvent';
import PaymentMethod1 from './src/screens/PaymentMethod1';
import PaymentMethod2 from './src/screens/PaymentMethod2';
import NewCard from './src/screens/NewCard';
import ReviewSummary from './src/screens/ReviewSummary';
import ETicket from './src/screens/ETicket';
import FCards from './src/screens/FCards';
import FList from './src/screens/FList';
import Explore1 from './src/screens/Explore1';
import Explore2 from './src/screens/Explore2';
import Explore3 from './src/screens/Explore3';
import Explore4 from './src/screens/Explore4';
import Explore5 from './src/screens/Explore5';
import Notification2 from './src/screens/Notification2';
// import TicketTab from './src/screens/TicketTab';
import Cancelreason from './src/screens/Cancelreason';
import Invited from './src/screens/Invited';
// import Profile from './src/screens/Profile';
import Organizer from './src/screens/Organizer';
import BookEvent2 from './src/screens/BookEvent2';
import Notification from './src/screens/Notification';
import Profile2 from './src/screens/Profile2';
import Payment from './src/screens/Payment';
import Linkaccount from './src/screens/Linkaccount';
import Security from './src/screens/Security';
import Helpcenter from './src/screens/Helpcenter';
import Language from './src/screens/Language';
import SuccessfulBooking from './src/screens/SuccessfulBooking';
import FailedBooking from './src/screens/FailedBooking';
import SuccessfulOtpVerification from './src/screens/SuccessfulOtpVerification';

import BottomNavigator from './src/navigator/BottomNavigator';

import { ENDPOINTS } from './src/api/constants';
import axios from 'axios';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext();

export default function App({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            showSplashScreen: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            loginLoading: action.loginLoading,
            loginError: action.loginError
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      showSplashScreen: true,
      isSignout: false,
      userToken: null,
      loginLoading: false,
      loginError: ''
    }
  );

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
      console.log(data);
    })

    return () => {
      EventRegister.removeAllListeners(listener)
    };
  }, [darkMode]);

  useEffect(() => {
    // Check if user is authenticated (based on your authentication logic)
    /* AsyncStorage.getItem('userDetails').then((token) => {
      if (token) {
        setIsAuthenticated(true);
      }
      setshowSplashScreen(false);
    }); */

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userDetails');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (items) => {
        const { email, password } = items;

        dispatch({ type: 'SIGN_IN', token: null, loginLoading: true });

        try {
          var config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
      
          var data = {
            "email": email,
            "password": password
          };
          
          var url = ENDPOINTS.login;
      
          axios.post(url, data, config)
          .then(async (res) => {
            // onLoading(false);
            const jsonValue = JSON.stringify(res.data);
  
            await AsyncStorage.setItem('userDetails', jsonValue);
            // navigation.navigate('BottomNavigator');
            dispatch({ type: 'SIGN_IN', token: jsonValue, loginLoading: false });
          })
          .catch(error => {
            console.log(error);
            
            if (error.response) {
              dispatch({ type: 'SIGN_IN', token: null, loginLoading: false, loginError: error.response.data.msg });
              // onLoading(false);
              // onError(error.response.data.msg);
            } else if (error.request) {
              console.log(error.request);
              dispatch({ type: 'SIGN_IN', token: null, loginLoading: false, loginError: 'Problem signing in. Please try later!' });
              // onLoading(false);
              // onError('Problem signing in. Please try later!');
            } else {
              dispatch({ type: 'SIGN_IN', token: null, loginLoading: false, loginError: 'Problem signing in. Please try later!' });
              // onLoading(false);
              // onError('Problem signing in. Please try later!');
            }
          });
          
        } catch (error) {
          // onLoading(false);
          console.log(error);
        }

        
      },
      signOut: async () => {
        AsyncStorage.removeItem('userDetails');
        dispatch({ type: 'SIGN_OUT' });
      },
      successfulOtpHome: async () => {
        const tokenValue = await AsyncStorage.getItem('userDetails');
        dispatch({ type: 'SIGN_IN', token: tokenValue, loginLoading: false });
      },
    }),
    []
  );


  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <AuthContext.Provider value={{ ...authContext, state }}>
          <StatusBar
            backgroundColor={darkMode === true ? Colors.active : Colors.secondary}
            barStyle={darkMode === true ? 'light-content' : 'dark-content'}
            translucent={false}
          />
          <Stack.Navigator>
            {state.showSplashScreen ? (
              <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            ) : state.userToken ? (
              <>
                <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
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
                  name="SuccessfulBooking"
                  component={SuccessfulBooking}
                  options={{ headerShown: false }} />
                <Stack.Screen
                  name="FailedBooking"
                  component={FailedBooking}
                  options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name="Introduction" component={Introduction} options={{ headerShown: false }} />
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
                  name="SuccessfulOtpVerification"
                  component={SuccessfulOtpVerification}
                  options={{ headerShown: false }} />
                <Stack.Screen
                  name="OtpBooking"
                  component={OtpBooking}
                  options={{ headerShown: false }} />
                {/* Add other authentication screens here */}
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </themeContext.Provider>
  )
}