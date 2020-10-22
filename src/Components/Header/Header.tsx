import React from 'react';
import { View, Text, TouchableHighlight, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../common/color';
import { FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import * as Constants from 'expo-constants';




export const Header: React.FC<any> = (props) => {
    
    
    return(
        <>
        <View style={{ height: Platform.OS === 'ios' ? 20 : Constants.default.statusBarHeight, backgroundColor: props.scene?.route?.params?.backgroundColor}}>
            <StatusBar translucent barStyle={props.scene.route.params.content} backgroundColor={props.scene?.route?.params?.backgroundColor}/>
        </View>
        <View style={[{ backgroundColor: COLOR.WHITE, minHeight: RFValue(80, DEFAULT_SCREEN_HEIGHT), justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 15 }, props.scene?.descriptor?.options?.headerStyle, props.scene?.route?.params?.backgroundColor ? { backgroundColor: props.scene.route.params.backgroundColor } : {}]}>
            <View>
                {
                    props.scene?.route?.params?.back ? 
                    <TouchableHighlight underlayColor={props.scene?.route?.params?.backgroundColor} onPress={e => props.navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center', height: RFValue(30, DEFAULT_SCREEN_HEIGHT)}}>
                        <>
                        <FontAwesome name="angle-left" color={'#fff'} size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} />
                        <Text style={{color: '#fff', marginLeft: 5, fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT)}}>Назад</Text>
                        </>
                    </TouchableHighlight>
                    :
                    null
                }
            </View>
            <View>
                <Text allowFontScaling={false} adjustsFontSizeToFit={true} style={[{fontSize: RFValue(45, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', paddingBottom: 5}, props.scene?.route?.params?.titleColor ? { color: props.scene.route.params.titleColor }: {}]}>
                    {props.scene.route.params.title}
                </Text>
            </View>
            <View>

            </View>
        </View>
        </>
    )
}