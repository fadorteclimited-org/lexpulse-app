import { View, Text ,SafeAreaView, TextInput, StatusBar,TouchableOpacity,Image,ScrollView,Dimensions} from 'react-native'
import React,{useState, useContext, useEffect} from 'react'
import theme from '../theme/theme';
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';
import { AppBar, Avatar} from '@react-native-material/core';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Tabs = (props) => {

    return (
        <Tab.Navigator
        screenOptions={{
            // tabBarStyle: { height:50,marginVertical:30,marginHorizontal:2},
            tabBarLabelStyle: {
            fontSize: 15,
          },
          tabBarShowLabel:true,
          tabBarItemStyle:{marginHorizontal:-10},
          tabBarIndicatorStyle:{backgroundColor:Colors.primary},
          swipeEnabled:false,           

          }}>
            <Tab.Screen name="Tickets" component={Event}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabel: ({focused, color,}) => (
                    <Text style={{color: focused ? Colors.primary : Colors.disable,fontFamily:'Urbanist-Regular',textAlign:'center',fontSize:16}}>Tickets</Text>
                    ),
                    headerShown:false,
                }}/>
            {/* <Tab.Screen name="VIP" component={Event}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabel: ({focused, color,}) => (
                    <Text style={{color: focused ? Colors.primary : Colors.disable,fontFamily:'Urbanist-Regular',textAlign:'center',fontSize:16}}>VIP</Text>
                    ),
                    headerShown:false,
                }} /> */}
        </Tab.Navigator>
      )
}

const Event = (props) => {
    
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    
    const [ticketNumber, onTicketNumber] = useState(1);
    

    return(
        <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
            <Text style={[style.subtitle,{color:theme.txt,marginTop:20}]}>Choose number of tickets</Text>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:20}}>
                <View style={{width:width/9,height:height/22,borderColor:theme.border,backgroundColor:theme.borderbg,borderWidth:1,borderRadius:10,alignItems:'center'}}>
                    <Text style={[style.title,{color:Colors.primary,marginTop:-4}]}>-</Text>
                </View>
                <Text style={[style.title,{color:theme.txt,marginHorizontal:30}]}>{ticketNumber}</Text>
                <View style={{width:width/9,height:height/22,borderColor:theme.border,backgroundColor:theme.borderbg,borderWidth:1,borderRadius:10,alignItems:'center'}}>
                    <Text style={[style.title,{color:Colors.primary,marginTop:-4}]}>+</Text>
                </View>
            </View>

            <View style={{flex:1,justifyContent:'flex-end',marginBottom:20}}>
                <TouchableOpacity onPress={()=>navigation.navigate('BookEvent2')} 
                style={style.btn}>
                <Text style={style.btntxt}>Continue - $50.00</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default function BookEvent({ route }) {
    const { itemObj } = route.params;
  
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    
    const [item, setItem] = useState(itemObj);

    const [ticketQuantities, setTicketQuantities] = useState([]);

      /* useEffect(() => {
        // Set default ticket quantities to 1 for each ticket type
        const defaultQuantities = item.ticketInfo.map((ticketItem) => ({
          ticketType: ticketItem.ticketType,
          numberOfTickets: 1,
        }));
        setTicketQuantities(defaultQuantities);
      }, [item.ticketInfo]);

      const incrementTicket = (index) => {
        setTicketQuantities((prevQuantities) => {
          const updatedQuantities = [...prevQuantities];
          updatedQuantities[index] = {
            ...updatedQuantities[index],
            numberOfTickets: (updatedQuantities[index]?.numberOfTickets || 1) + 1,
          };
          return updatedQuantities;
        });
      };
    
      const decrementTicket = (index) => {
        setTicketQuantities((prevQuantities) => {
          const updatedQuantities = [...prevQuantities];
          const count = updatedQuantities[index]?.numberOfTickets || 1;
          updatedQuantities[index] = {
            ...updatedQuantities[index],
            numberOfTickets: count > 1 ? count - 1 : 1,
          };
          return updatedQuantities;
        });
      };

      const getTotalPrice = () => {
        let totalPrice = 0;
        item.ticketInfo.forEach((ticketItem, index) => {
          const quantity = ticketQuantities[index]?.numberOfTickets || 1;
          totalPrice += quantity * ticketItem.price;
        });
        return totalPrice;
      }; */

      console.log(item)

    useEffect(() => {
      // Initialize ticket quantities with default values of 0 for each ticket type
      const defaultQuantities = item.ticketInfo.map((ticketItem) => ({
        ticketType: ticketItem.ticketType,
        numberOfTickets: 0,
      }));
      setTicketQuantities(defaultQuantities);
    }, [item.ticketInfo]);
  
    const incrementTicket = (index) => {
      setTicketQuantities((prevQuantities) => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          numberOfTickets: updatedQuantities[index].numberOfTickets + 1,
        };
        return updatedQuantities;
      });
    };
  
    const decrementTicket = (index) => {
      setTicketQuantities((prevQuantities) => {
        const updatedQuantities = [...prevQuantities];
        const count = updatedQuantities[index].numberOfTickets;
        updatedQuantities[index] = {
          ...updatedQuantities[index],
          numberOfTickets: count > 0 ? count - 1 : 0,
        };
        return updatedQuantities;
      });
    };
  
    const getTotalTicketCount = () => {
      return ticketQuantities.reduce((total, current) => total + current.numberOfTickets, 0);
    };
  
    const getTotalPrice = () => {
      let totalPrice = 0;
      item.ticketInfo.forEach((ticketItem, index) => {
        const quantity = ticketQuantities[index]?.numberOfTickets || 0;
        totalPrice += quantity * ticketItem.price;
      });
      return totalPrice;
    };
  
    const handleContinue = () => {
      if (getTotalTicketCount() > 0) {
        navigation.navigate('ReviewSummary', { 
          itemObj: item, 
          ticketQuantities: ticketQuantities, 
          totalPrice: getTotalPrice() 
        });
      } else {
        alert('You must select at least one ticket.');
      }
    };

    return (
    /* <SafeAreaView style={[style.area,{backgroundColor:theme.bg,}]}>
      <View style={[style.main,{backgroundColor:theme.bg,marginTop:20}]}>
          <AppBar 
              color={theme.bg}
              title='Book Event'
              titleStyle={[style.apptitle,{color:theme.txt}]}
              elevation={0}
              leading={ <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"  
              // style={{backgroundColor:Colors.secondary,}}  
              color={theme.txt} size={30}
              />
              </TouchableOpacity>
          }/>

          <Text style={[style.subtitle,{color:theme.txt,marginTop:20}]}>Choose number of tickets</Text>

          {item.ticketInfo.map((ticketItem, index) => (
            <React.Fragment key={index}>
              <Text style={[style.subtitle, style.b16, { color: theme.txt, marginTop: 40 }]}>{ticketItem.ticketType}</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 50 }}>
                <TouchableOpacity
                  style={{ width: 40, height: 40, borderColor: theme.border, backgroundColor: theme.borderbg, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}
                  activeOpacity={0.9}
                  onPress={() => decrementTicket(index)}
                >
                  <Text style={[style.title, { color: Colors.primary, marginTop: -4 }]}>-</Text>
                </TouchableOpacity>
                <Text style={[style.title, { color: theme.txt, marginHorizontal: 30 }]}>
                  {ticketQuantities[index]?.numberOfTickets || 1}
                </Text>
                <TouchableOpacity
                  style={{ width: 40, height: 40, borderColor: theme.border, backgroundColor: theme.borderbg, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}
                  activeOpacity={0.9}
                  onPress={() => incrementTicket(index)}
                >
                  <Text style={[style.title, { color: Colors.primary, marginTop: -4 }]}>+</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          ))}

          <View style={{flex:1,justifyContent:'flex-end',marginBottom:20}}>
              <TouchableOpacity onPress={() => navigation.navigate('ReviewSummary', { itemObj: item, ticketQuantities: ticketQuantities, totalPrice: getTotalPrice() })} 
              style={style.btn}>
              <Text style={style.btntxt}>Continue - {getTotalPrice() === 0 ? (`Free Event`) : (`${item.currency} ${getTotalPrice()}`)}</Text>
              </TouchableOpacity>
          </View>

      </View>
    </SafeAreaView> */

    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      <View style={[style.main, { backgroundColor: theme.bg, marginTop: 20 }]}>
        <AppBar 
          color={theme.bg}
          title='Book Event'
          titleStyle={[style.apptitle, { color: theme.txt }]}
          elevation={0}
          leading={ 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" color={theme.txt} size={30} />
            </TouchableOpacity>
          }
        />

        <Text style={[style.subtitle, { color: theme.txt, marginTop: 20 }]}>
          Choose number of tickets
        </Text>

        {item.ticketInfo.map((ticketItem, index) => (
          <React.Fragment key={index}>
            <Text style={[style.subtitle, style.b16, { color: theme.txt, marginTop: 40 }]}>
              {ticketItem.ticketType}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 50 }}>
              <TouchableOpacity
                style={{ width: 40, height: 40, borderColor: theme.border, backgroundColor: theme.borderbg, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}
                activeOpacity={0.9}
                onPress={() => decrementTicket(index)}
              >
                <Text style={[style.title, { color: Colors.primary, marginTop: -4 }]}>-</Text>
              </TouchableOpacity>
              <Text style={[style.title, { color: theme.txt, marginHorizontal: 30 }]}>
                {ticketQuantities[index]?.numberOfTickets || 0}
              </Text>
              <TouchableOpacity
                style={{ width: 40, height: 40, borderColor: theme.border, backgroundColor: theme.borderbg, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}
                activeOpacity={0.9}
                onPress={() => incrementTicket(index)}
              >
                <Text style={[style.title, { color: Colors.primary, marginTop: -4 }]}>+</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity onPress={handleContinue} style={style.btn}>
            <Text style={style.btntxt}>
              Continue - {`${item.currency} ${getTotalPrice()}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}