import React, { useCallback, useState } from 'react';
import { Switch, TouchableHighlight } from 'react-native';
import { ScrollView, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLOR } from '../../common/color';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { FontAwesome } from '@expo/vector-icons'
import { BookIcon, CloseIcon, FlagIcon } from '../../Components/Icons/Icons';
import { TextInput } from 'react-native-gesture-handler';
import { Executor } from '../../Components/Executor/Executor';
import { ComponentWithNavigation } from '../../common/types';

const importanceValues = [
    "Важно",
    "Очень важно"
]

export const CreateResolucion: React.FC<ComponentWithNavigation> = ({ navigation, route }) => {
    const [importance, setImportance] = useState<string | null>(null);

    const importanceChangeCallback = useCallback(
        (value: string | null) => {
            if (value === importance) {
                setImportance(null)
            } else {
                setImportance(value);
            }
        }, [importance]
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={[{ justifyContent: 'space-between', paddingHorizontal: 20,  paddingVertical: 10, height: RFValue(100, DEFAULT_SCREEN_HEIGHT), backgroundColor: route.params.backgroundColor }]}>
                <View style={{marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={route.params.backgroundColor} onPress={e => navigation.goBack() } style={{flexDirection: 'row', alignItems: 'center'}}>
                        <>
                        <FontAwesome name="angle-left" color={COLOR.WHITE} size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} />
                        <Text style={{ marginLeft: 8, fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT), color: COLOR.WHITE }}>Назад</Text>
                        </>
                    </TouchableHighlight>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text numberOfLines={1} style={{fontSize: RFValue(21, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', color: COLOR.WHITE}}>
                        {/* { route.params.data.regNum } */}
                       Вх. №40770-ЭП/20 от 04.03.2020
                    </Text>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: COLOR.WHITE, flex: 1 }}>
                <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT), }}>
                        Важность
                    </Text>
                    <View style={{ width: '70%', flexDirection: 'row', padding: 10, borderWidth: .5, borderColor: 'rgba(0,0,0,.3)', justifyContent: 'space-between', borderRadius: 5,}}>
                        {
                            importanceValues.map((el, index) => (
                                <TouchableHighlight key={index} underlayColor={COLOR.WHITE} onPress={e => importanceChangeCallback(el)} style={[{ width: '50%', alignItems: 'center'}, index === importanceValues.length - 1 ? null : {
                                    borderRightWidth: .5, borderColor: 'rgba(0,0,0,.3)' 
                                }]}>
                                    <Text style={[{ fontSize: RFValue(14, DEFAULT_SCREEN_HEIGHT) }, importance === el ? { color: route.params.backgroundColor } : {}]}>
                                        {
                                            el
                                        }
                                    </Text>
                                </TouchableHighlight>
                            ))
                        }
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, }}>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 18, }}>
                            Список резолюций
                        </Text>
                    </View>
                    <View style={{ backgroundColor: COLOR.WHITE, padding: 16, elevation: 3, borderRadius: 5, }}>
                        <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            Текст резолюции
                            </Text>
                            <TouchableHighlight >
                                <CloseIcon width={25} height={25} color={"#D43434"} />
                            </TouchableHighlight>
                        </View>
                        <View style={{  marginBottom: 15  }}>
                            <View style={{ borderColor: 'rgba(0,0,0,.3)', borderWidth: .5, borderRadius: 5, padding: 10}}>
                                <TextInput placeholder="Текст резолюции"></TextInput>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                    Исполнители
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 10 }}>
                            <Executor backgroundColor={route.params.backgroundColor} name="Александр полунин, программист" onDelete={(e: any) => {}} onPress={e => {}}/>
                        </View>
                        <View style={{ marginBottom: 10, }}>
                            {/* <Input /> */}
                            <View style={{ borderColor: 'rgba(0,0,0,.3)', borderWidth: .5, borderRadius: 5, padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                
                                <TextInput style={{ width: '90%' }} placeholder="Введите имя сотрудника"/>
                                <TouchableHighlight underlayColor={COLOR.WHITE}  onPress={e => navigation.navigate("ExecutorList", route.params)}>
                                    <BookIcon  width={20} height={25} color={route.params.backgroundColor}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>
                                    Срок исполнения:
                                </Text>
                            </View>
                            <View>
                                <View style={{ borderWidth: .5, borderColor: 'rgba(0,0,0,.3)', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 16 }}>
                                        21.03.2020
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>
                                    Для информирования:
                                </Text>
                            </View>
                            <View>
                                <Switch value={false} thumbColor={true ? COLOR.WHITE : route.params.backgroundColor} ios_backgroundColor={true ? route.params.backgroundColor : COLOR.WHITE} trackColor={{ 
                                    true: route.params.backgroundColor,
                                    false: "#F9F9F9"
                                }}>

                                </Switch>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 30 }}>
                        <View style={{ width: '100%', alignItems: 'center', backgroundColor: COLOR.WHITE, elevation: 2, paddingVertical: 10, borderRadius: 5 }}>
                            <Text>
                                Добавить резолюцию
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}