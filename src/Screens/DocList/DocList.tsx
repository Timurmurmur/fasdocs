import React, { useEffect, Dispatch, useState, useCallback } from 'react';
import { ComponentWithNavigation } from '../../common/types';
import { COLOR } from '../../common/color';
import { View, ScrollView, TouchableHighlight, StatusBar, Platform } from 'react-native';
import { DocumentItem } from '../Search/Search';
import { Header } from '../../Components/Header/Header';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { State, Action } from '../../../App';
import { Constants } from 'react-native-unimodules';
import { TextInput } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import moment from 'moment';
import { SearchIcon } from '../../Components/Icons/Icons';


export const Component: React.FC<ComponentWithNavigation> = ({ route, navigation, documents }: any) => {
    const { selectedDocList, title, titleColor, backgroundColor, inputBg }: any = route.params;
    const [search, setSearch] = useState('');


    const searchChangeCallback = useCallback(
        (e: any) => {
            setSearch(e.nativeEvent.text);
        }, [search]
    );

    return (
        <>
        <View style={{backgroundColor, paddingHorizontal: 20}}>
            <View style={{ backgroundColor: inputBg, marginBottom: 20, alignItems: 'center', flexDirection: 'row', height: RFValue(40, DEFAULT_SCREEN_HEIGHT), borderRadius: 5}}>
                <View style={{ marginLeft: RFValue(5, DEFAULT_SCREEN_HEIGHT), marginRight: 15 }}>
                    <SearchIcon width={RFValue(28, DEFAULT_SCREEN_HEIGHT)} height={RFValue(30, DEFAULT_SCREEN_HEIGHT)} color={COLOR.WHITE}/>
                </View>
                <TextInput value={search} onChange={searchChangeCallback} style={{color: COLOR.WHITE, height: '100%', width: '100%'}} placeholderTextColor={COLOR.WHITE} placeholder="Поиск"></TextInput>
            </View>
        </View>
        <View style={{backgroundColor: '#fff'}}>
            <ScrollView style={{ backgroundColor,}}>
                <View style={{ backgroundColor: backgroundColor }}>
                    {
                        documents[selectedDocList].filter(el => {
                            if (el.regNum.indexOf(search) !== -1 || moment(el.regDate).format("DD.MM.YYYY").indexOf(search) !== -1 || el.annotation.toLowerCase().indexOf(search.toLowerCase()) !== -1 || el.correspondents[0].toLowerCase().indexOf(search.toLowerCase()) !== -1)  {
                                return true;
                            }
                            return false;
                        }).map((el: any, index: number) => {
                            return(
                                <TouchableHighlight style={{backgroundColor: COLOR.WHITE, marginBottom: 5}} key={index} onPress={e => {
                                    navigation.navigate('DocView', { data: el, backgroundColor: backgroundColor, inputBg: inputBg });

                                }} underlayColor={COLOR.WHITE}>
                                    <DocumentItem {...el}/>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
        </>
    )
}



const mapStateToProps = (state: State): any => ({
    documents: state.home.documents,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
    return {}
};

export const DocList = connect(mapStateToProps,mapDispatchToProps)(Component)