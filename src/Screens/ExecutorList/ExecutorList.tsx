import React from 'react';
import { TouchableHighlight, View, Text, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../../common/color';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { RFValue } from 'react-native-responsive-fontsize';
import { ComponentWithNavigation } from '../../common/types';
import { DropDown } from '../../Components/DropDown/DropDown';
import { BookIcon, SearchIcon, UnitIcon } from '../../Components/Icons/Icons';
import { DropDownTitle } from '../../Components/DropDown/DropDownTitle/DropDownTitle';



export const ExecutorList: React.FC<ComponentWithNavigation> = ({navigation, route}) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={[{ justifyContent: 'space-between', paddingHorizontal: 20,  paddingVertical: 10, height: RFValue(140, DEFAULT_SCREEN_HEIGHT), backgroundColor: route.params?.backgroundColor }]}>
                <View style={{marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={route.params.backgroundColor} onPress={e => navigation.goBack() } style={{flexDirection: 'row', alignItems: 'center'}}>
                        <>
                        <FontAwesome name="angle-left" color={COLOR.WHITE} size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} />
                        <Text style={{ marginLeft: 8, fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT), color: COLOR.WHITE }}>Назад</Text>
                        </>
                    </TouchableHighlight>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text numberOfLines={1} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', color: COLOR.WHITE}}>
                        {/* { route.params.data.regNum } */}
                       Глобальный классификатор
                    </Text>
                </View>
                <View style={{ backgroundColor: route.params.inputBg, marginBottom: 20, alignItems: 'center', flexDirection: 'row', height: RFValue(40, DEFAULT_SCREEN_HEIGHT), borderRadius: 5}}>
                    <View style={{ marginLeft: RFValue(5, DEFAULT_SCREEN_HEIGHT), marginRight: 15 }}>
                        <SearchIcon width={RFValue(25, DEFAULT_SCREEN_HEIGHT)} height={RFValue(28, DEFAULT_SCREEN_HEIGHT)} color={COLOR.WHITE}/>
                    </View>
                    <TextInput style={{color: COLOR.WHITE, height: '100%', width: '100%'}} placeholderTextColor={COLOR.WHITE} placeholder="Поиск"></TextInput>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: COLOR.WHITE }}>
                <View style={{ marginTop: 10 }}>
                    <DropDown title={
                        <DropDownTitle isWorker={false} value={"Фас России"}/>
                    }>
                        {
                            [0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((el, index) => {
                                return (
                                    <DropDown key={index} title={
                                        <DropDownTitle value={`Подразделение ФАС ${index}`} isWorker={false} />
                                    } >
                                        {
                                            [0,0,0].map((el, index) => {
                                                return (
                                                    <View style={{ paddingLeft: 40, paddingVertical: 10 }}>
                                                        <DropDownTitle value={`Полунин А., Программист ${index}`} isWorker={true} />
                                                    </View>
                                                )
                                            })
                                        }
                                    </DropDown>
                                )
                            })
                        }
                    </DropDown>
                </View>
            </ScrollView>
        </View>
    )
}