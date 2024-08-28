import { View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions,} from 'react-native'
import  { Paystack }  from 'react-native-paystack-webview';
import React,{ useState, useContext, useEffect } from 'react'
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Avatar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../api/constants';
import axios from 'axios';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Payment({ route }) {
    const { itemObj, ticketQuantities, totalPrice } = route.params;
    const [userDets, setUserDets] = useState({});

    const theme = useContext(themeContext);
    const navigation=useNavigation();
    
    const [item, setItem] = useState(itemObj);
    const [ticketsPurchased, setTicketsPurchased] = useState(ticketQuantities);

    const [loading, onLoading] = React.useState(false);
    const [error, onError] = React.useState('');

    useEffect(() => {
        const fetchUserDets = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userDetails');
                const parsedValue = JSON.parse(jsonValue);
                setUserDets(parsedValue);

            } catch (error) {
                console.log('Error in fetchData:', error);
                // Handle errors here if needed
            }
        };
    
        fetchUserDets();
    }, []);

    const saveTicket = async (paymentId) => {
        const jsonValue = await AsyncStorage.getItem('userDetails');
        const parsedValue = JSON.parse(jsonValue);
        onLoading(true);

        try {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parsedValue.token}`
                }
            };
        
            var data = {
                "eventId": item._id,
                "attendeeId": parsedValue.user.id,
                "paymentMethod": "none",
                "ticketInfo": ticketsPurchased,
                "status": "booked",
                "paymentId": paymentId
            };
            
            var url = ENDPOINTS.tickets;
        
            axios.post(url, data, config)
            .then((res) => {
                onLoading(false);
                navigation.navigate('SuccessfulBooking', { ticketId: res.data.data._id });
            })
            .catch(error => {
            
            if (error.response) {
                if(error.response.status === 403) {
                    signOut();
                    return;
                }

                onLoading(false);
                onError(error.response.data.error);
                navigation.navigate('FailedBooking');
            } else if (error.request) {
                console.log(error.request);
                onLoading(false);
                onError('Problem signing in. Please try later!');
                navigation.navigate('FailedBooking');
            } else {
                console.log(error);
                onLoading(false);
                onError('Problem signing in. Please try later!');
                navigation.navigate('FailedBooking');
            }
            });
            
        } catch (error) {
            onLoading(false);
            console.log(error);
        }
    };

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
        <View style={[style.main, { backgroundColor: theme.bg ,marginTop:20}]}>
            <Paystack  
                paystackKey="pk_live_7531b0888eb0df5935732db49e74f555695adb73"
                // paystackKey="pk_test_0d007b42a52a38d589cc0a4938040e1ff4406fdc"
                amount={totalPrice}
                billingEmail={userDets?.user?.email}
                billingName={`${userDets?.user?.firstName} ${userDets?.user?.lastName}`}
                activityIndicatorColor="green"
                currency="GHS"
                channels={["card", "mobile_money"]}
                onCancel={(e) => {
                    navigation.goBack()
                }}
                onSuccess={(res) => {
                    saveTicket(res.data.transactionRef.trxref);
                }}
                autoStart={true}
            />
        </View>
    </SafeAreaView>
  )
}