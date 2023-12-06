import {
    View, Text, Dimensions,
    SafeAreaView,
    StatusBar,
    Image
} from 'react-native'
import React,{useState,useContext} from 'react'
import {BallIndicator,} from 'react-native-indicators'
import themeContext from '../theme/themeContex';
import style from '../theme/style';
import { Colors } from '../theme/color';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default function Splash() {
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[style.area, { color: theme.bg }]}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View style={{
                flex: 3, alignItems: 'center', justifyContent: 'center',flexDirection:'row'
            }}>
                <Image source={require('../../assets/image/Logo.png')}
                    style={{ resizeMode: 'stretch', height: height / 14, width: width / 6 }}
                />
                <Text style={[style.title,{marginLeft:5,fontSize:32}]}>Lexpulse</Text>
            </View>
            <View style={{
                flex: 0.5, alignItems: 'center',
            }}>
                <View style={{marginBottom:50}}>
                <BallIndicator size={30} color={Colors.primary} />
                </View>
            </View>
        </SafeAreaView>
    )
}