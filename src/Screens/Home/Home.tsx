import React, { useEffect } from 'react';
import { View, Text, Modal, ScrollView, Route, ActivityIndicator, Image, ImageBackground, Dimensions, TouchableHighlight, StatusBar, Platform, RefreshControl} from 'react-native';
import { Entypo, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 
import { Settings } from '../Settings/Settings';
import { useDispatch, useStore } from 'react-redux';
import { Navigation, PageStatus } from '../../common/types';
import { COLOR } from '../../common/color';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { SafeAreaView } from 'react-navigation';
import * as Constants from 'expo-constants';

export interface IHomeProps {
    navigation: Navigation;
    route: Route;
    getAllDocuments: () => void;
    documents: any;
    error: any;
    setIsFirstOpen: (data: boolean) => void;
    isFirstOpen: boolean;
    pageStatus: PageStatus;
}

export const Home: React.FC<IHomeProps> = ({ navigation, route, getAllDocuments, documents, error, setIsFirstOpen, isFirstOpen, pageStatus}) => {
    useEffect(() => {
        if (isFirstOpen) {
            setIsFirstOpen(false);
        }
        if (documents === null) {
            getAllDocuments();
        }
    }, [documents]);

    useEffect(() => {
    }, [route])

    const folderPressHandler = (e: any, data: any, title: string, backgroundColor: string, inputBg: string = 'gray') => {
        navigation.navigate('DocList', { selectedDocList: data, title, backgroundColor, inputBg })   
    }

    if (pageStatus === PageStatus.LOADING) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={RFValue(50, DEFAULT_SCREEN_HEIGHT)} />
        </View>
    } else {
        // SafeAreaView forceInset={{ top: 'always', bottom: 'always' }} style={{ position: 'relative', flex: 1}}
        return(
            <>
            <View style={{ backgroundColor: '#fff'}}>
                <StatusBar translucent barStyle="dark-content" backgroundColor={'#fff'}/>
            </View>
            <ImageBackground source={require('../../../assets/Images/bg.png')} resizeMode="cover" style={{width: '100%', flex: 1}}>
            <ScrollView refreshControl={<RefreshControl refreshing={pageStatus === PageStatus.LOADING ? true : false} onRefresh={() => getAllDocuments()}></RefreshControl>}>
                <View style={{padding: 20}}>
                    <View style={{marginBottom: 10}}>
                    <TouchableHighlight  underlayColor={COLOR.WHITE}  onPress={e => folderPressHandler(e, 'incoming', 'Входящие', "rgb(87,142,200)", 'rgba(94,133,176, .6)')}>
                        <HomeItem color="rgb(87,142,200)" title="Входящие" count={documents.incoming.length} icon={<Entypo name="download" size={RFValue(40, DEFAULT_SCREEN_HEIGHT)} color="white" />}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{marginBottom: 10}}>
                    <TouchableHighlight  underlayColor={COLOR.WHITE}  onPress={e => folderPressHandler(e, 'government', 'Правительство', "rgb(176, 93, 94)", '#95504F')}>
                        <HomeItem color="rgb(176, 93, 94)" title="Правительство" count={documents.government.length} icon={<Image source={require('../../../assets/Images/goverment.png')} style={{width: RFValue(40, DEFAULT_SCREEN_HEIGHT), height: RFValue(40, DEFAULT_SCREEN_HEIGHT)}}/>}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{marginBottom: 10}}>
                    <TouchableHighlight  underlayColor={COLOR.WHITE}  onPress={e => folderPressHandler(e, 'internal', 'Внутренние', "rgb(100, 180, 100)", "#569954")}>
                        <HomeItem color="rgb(100, 180, 100)" title="Внутренние" count={documents.internal.length} icon={<MaterialCommunityIcons name="file-document-box-multiple-outline" size={RFValue(40, DEFAULT_SCREEN_HEIGHT)} color="white" />}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TouchableHighlight  underlayColor={COLOR.WHITE}  onPress={e => folderPressHandler(e, 'forapprove', 'На согласовании', "rgb(190, 138, 105)", "#A2755A")}>
                            <HomeItem color="rgb(190, 138, 105)" title="На согласовании" count={documents.forapprove.length} icon={<FontAwesome5 name="tasks" size={RFValue(40, DEFAULT_SCREEN_HEIGHT)} color="white" />}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TouchableHighlight  underlayColor={COLOR.WHITE}  onPress={e => folderPressHandler(e, 'forsign', 'На подпись', "rgb(231, 185, 118)", "#C39D64")}>
                            <HomeItem color="rgb(231, 185, 118)" title="На подпись" count={documents.forsign.length} icon={<FontAwesome5 name="pencil-alt" size={RFValue(40, DEFAULT_SCREEN_HEIGHT)} color="white" />}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TouchableHighlight underlayColor={COLOR.WHITE} onPress={e => folderPressHandler(e, 'current', 'Текущие', "rgb(103, 136, 136)", "#577374")}>
                        <HomeItem color="rgb(103, 136, 136)" title="Текущие" count={documents.current.length} icon={<FontAwesome name="gear" size={RFValue(40, DEFAULT_SCREEN_HEIGHT)} color="white" />}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
            <SafeAreaView>
            <View style={{width: '100%', height: 50, backgroundColor: '#FAFAFA', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,  }}>
                <View onTouchStart={e => navigation.navigate('Settings')}>
                    <Text allowFontScaling={false} style={{fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', color: 'rgb(205, 171, 129)'}}>Настройки</Text>
                </View>
                <View onTouchStart={e => navigation.navigate('Search')}>
                    <Text allowFontScaling={false} style={{fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', color: 'rgb(205, 171, 129)'}}>Поиск</Text>
                </View>
            </View>
            </SafeAreaView>
            </ImageBackground>
        </>
        )
    }
}

export const HomeItem: React.FC<{icon: any, title: string, count: number | string, color: string}> = ({icon, title, count, color }) => {
    return(
        <View style={{ backgroundColor: color, height: RFValue(75, DEFAULT_SCREEN_HEIGHT), width: '100%', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
            <View style={{width: 50}}>
                {icon}
            </View>
            <View>
                <Text allowFontScaling={false} style={{color: '#fff', fontSize: RFValue(27, DEFAULT_SCREEN_HEIGHT), }}>{title}</Text>
            </View>
            <View style={{ width: 50, alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{color: '#fff', fontSize: RFValue(30, DEFAULT_SCREEN_HEIGHT)}}>{count}</Text>
            </View>
        </View>
    )
}