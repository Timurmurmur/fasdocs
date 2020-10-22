import React from 'react';
import { View, ScrollView, Text, AsyncStorage, NativeModules, TouchableHighlight, Alert } from 'react-native';
import { COLOR } from '../../common/color';
import { Navigation, Route } from '../../common/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { Constants } from 'react-native-unimodules';

export interface ISettingsProps {
    logout: () => void;
    navigation: Navigation;
    route: Route;
    name: string;
    totalCacheSize: any;
    clearCache: () => void;
}

export const Settings: React.FC<ISettingsProps> = ({navigation, route, logout, name, totalCacheSize, clearCache}) => {
    const exitButtonHandler = (e: any) => {
        Alert.alert('Подтвердить выход из приложения', '', [
            {
                text: 'Отмена',
                style: 'default',
                onPress: (value: string | undefined) => {
                    console.log('Отмена')
                } 
            },
            {
                text: 'Выйти',
                style: 'destructive',
                onPress: (value: string | undefined) => {
                    logout();
                }
            },
        ])
    }

    console.log(Constants.manifest.version);

    return(
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <View style={{}}>
                    <TouchableHighlight underlayColor={COLOR.WHITE} onPress={e => navigation.goBack()} style={{ alignItems: 'center', marginVertical: 5 }}>
                        <Text allowFontScaling={false} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'rgb(205, 171, 129)'}}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
                <View style={{}}>
                    <Text allowFontScaling={false} style={{textAlign: 'center', marginVertical: 5, fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT)}}>{name}</Text>
                    <TouchableHighlight underlayColor={COLOR.WHITE} onPress={exitButtonHandler} style={{ alignItems: 'center', marginVertical: 5 }}>
                        <Text allowFontScaling={false} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'rgb(205, 171, 129)'}}>Выйти</Text>
                    </TouchableHighlight>
                </View>
                <View style={{}}>
                    <Text allowFontScaling={false} style={{textAlign: 'center', marginVertical: 5, fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT)}}>{`${(Number(totalCacheSize) / 1024).toFixed(1)} KB`}</Text>
                    <TouchableHighlight onPress={e => clearCache()} underlayColor={COLOR.WHITE} style={{ alignItems: 'center', marginVertical: 5 }}>
                        <Text allowFontScaling={false} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'rgb(205, 171, 129)'}}>Очистить кэш</Text>
                    </TouchableHighlight>
                </View>
                <View style={{}}>
                    <Text allowFontScaling={false} style={{textAlign: 'center', marginVertical: 5, fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT)}}>Версия {Constants.manifest.version}</Text>
                </View>
            </View>
        </ScrollView>
    )
}