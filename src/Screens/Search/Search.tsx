import React, { useState, useCallback } from 'react';
import { View, Text, TouchableHighlight, Route, Image } from 'react-native';
import { COLOR } from '../../common/color';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { PageStatus, Navigation, Document } from '../../common/types';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';


export interface ISearchProps {
    navigation: Navigation;
    route: Route;
    pageStatus: PageStatus;
    helpers: any;
    error: any | null;
    search: (str: string) => void;
    getDocumentByHelper: (helper: string) => void;
    searchedDocuments: any;
    searchEnd: (helpers: any) => void;
}

export const Search: React.FC<ISearchProps> = ({ navigation, route, pageStatus, helpers, error, search, getDocumentByHelper, searchedDocuments, searchEnd }) => {
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [helpersShow, setHelpersShow] = useState(false);

    let searchRef: any;

    const searchFocus = useCallback(
        (e: any) => {
            setFocused(true);
            setHelpersShow(true);
        }, [focused, helpersShow]
    )

    const searchBlur = useCallback(
        (e: any) => {
            setFocused(false);
        }, [focused]
    )


    const searchValueHandler = useCallback(
        (e: any) => {
            setSearchValue(e.nativeEvent.text);
            if (e.nativeEvent.text === '') {
                searchEnd([]);
            } else {
                search(e.nativeEvent.text);
            }
        }, [searchValue]
    )
    
    const helperPressHandler = (e: any, helper: string) => {
        setSearchValue(helper);
        getDocumentByHelper(helper);
        setHelpersShow(false);
    }

    return(
        <ScrollView style={{backgroundColor: COLOR.WHITE, }}>
            <View style={[{ justifyContent: 'space-between', paddingHorizontal: 20,  paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(142,142,147, .3)' }]}>
                {
                    focused ?
                    null
                    :
                    <>
                    <View style={{marginBottom: 3}}>
                        <TouchableHighlight underlayColor={COLOR.WHITE} onPress={e => navigation.goBack() } style={{flexDirection: 'row', alignItems: 'center'}}>
                            <>
                            <FontAwesome name="angle-left" size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} />
                            <Text style={{ marginLeft: 8, fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT) }}>Назад</Text>
                            </>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={{fontSize: RFValue(36, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold'}}>
                            Поиск
                        </Text>
                    </View>
                    </>
                }
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <View style={{ backgroundColor: 'rgba(142,142,147,.12)', borderRadius: 10, justifyContent: 'center', width: focused ? '75%' : '100%'}}>
                        <View style={{position: 'absolute', left: 5}}>
                            <EvilIcons name="search" size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} color="#8E8E93" />
                        </View>
                        <TextInput onChange={searchValueHandler} value={searchValue} onFocus={e => searchFocus(e)} ref={ref => searchRef = ref} placeholderTextColor="#8E8E93" style={{paddingLeft: RFValue(40, DEFAULT_SCREEN_HEIGHT), height: RFValue(40, DEFAULT_SCREEN_HEIGHT), width: '100%', fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT)}}  placeholder="Поиск" clearButtonMode="always"></TextInput>
                    </View>
                    {
                        focused ?
                        <TouchableHighlight underlayColor={COLOR.WHITE} onPress={searchBlur} style={{width: '25%', alignItems: 'flex-end'}}>
                            <Text style={{ color: '#007AFF', fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT) }}>Отмена</Text>
                        </TouchableHighlight>
                        :
                        null
                    }
                </View>
            </View>
            {
                helpersShow ?
                <View style={{ paddingHorizontal: 10 }}>
                    {
                        helpers.map((el: string, index: number) => (
                            <TouchableHighlight onPress={e => helperPressHandler(e, el)} underlayColor={COLOR.WHITE} key={index}>
                                <Helper str={el}/>
                            </TouchableHighlight>
                        )
                        )
                    }
                </View>:
                null
            }
            {
                !helpersShow ?
                searchedDocuments.map((el: any, index: number) => {
                    console.log(el)
                    return(
                        <View onTouchStart={e => navigation.navigate("DocViewSearch", {
                            data: el
                        })} key={index}>
                            <DocumentItem {...el}/>
                        </View>
                    )
                })
                :
                null
            }
        </ScrollView>
    )
}

interface IHelperProps {
    str: string;
}

const Helper: React.FC<IHelperProps> = ({ str }) => {
    return(
        <View style={{ height: RFValue(40) }}>
            <Text style={{fontFamily: 'PingFang', fontSize: RFValue(30, DEFAULT_SCREEN_HEIGHT), color: 'gray', }}>{str}</Text>
        </View>
    )
}

interface IDocumentItemProps extends Document {
    
    // infoData: {
    //     answerWaitingData: null | string;
    //     commission: Array<any>;
    //     confidentiality: {
    //         id: number;
    //         name: string;
    //     },
    //     copyCount: number;
    //     correspondents: Array<string>;
    //     createDate: string;
    //     docNum: string;
    //     ground2Type: {
    //         id: number;
    //         name: string;
    //     };
    //     isFinalAnswer: boolean;
    //     isInterimAnswer: boolean;
    //     isRequest: boolean;
    //     nomenclature: any;
    //     rubric: any;
    //     signer: string;
    //     strongBlancks: Array<any>;
    //     worker: string;
    //     annotation: string;
    //     attachPageCount: number;
    //     content: {
    //         id: number;
    //         name: string;
    //     };
    //     docKind: {
    //         id: number;
    //         name: string;
    //     };
    //     docPageCount: number;
    //     docType: { id: number; name: string;};
    //     docUid: string;
    //     procedure: {
    //         id: number;
    //         name: string;
    //     };
    //     regDate: string;
    //     regNum: string;
    //     remark: any;
    // }
}

export const DocumentItem: React.FC<IDocumentItemProps> = ({ annotation, attachments, correspondents, docType, info, regDate, regNum, setViewed, state, title }) => {
    
    const caseDoctypeIcon = (docType: { id: number, name: string }) => {
        console.log(state);
        switch(docType.id) {
            case 16: {
                return <Image source={state !== 0 ? require(`../../../assets/Images/inbox_fas_read.svg.png`) : require(`../../../assets/Images/inbox_fas.svg.png`)} style={{
                    width: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    height: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    marginTop: 5
                }}/>
            }
            case 17: {
                return <Image source={state !== 0 ? require(`../../../assets/Images/outbox_fas_read.svg.png`) : require(`../../../assets/Images/outbox_fas.svg.png`)} style={{
                    width: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    height: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    marginTop: 5
                }}/>
            }
            case 18: {
                return <Image source={state !== 0 ? require(`../../../assets/Images/internal_fas_read.svg.png`) : require(`../../../assets/Images/internal_fas.svg.png`)} style={{
                    width: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    height: RFValue(35, DEFAULT_SCREEN_HEIGHT),
                    marginTop: 5
                }}/>
            }
        }
    }

    return(
        <View style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(142,142,147, .3)' }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '70%' }}>
                    <Text allowFontScaling={false} style={{fontFamily: 'HelveticaMedium', color: COLOR.BLACK, fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT)}}>{correspondents.map(el => el)}</Text>
                    <Text allowFontScaling={false} style={{fontFamily: 'HelveticaMedium', color: COLOR.BLACK, marginTop: 5 , fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT)}} lineBreakMode="clip" numberOfLines={2}>{annotation}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', width: '30%' }}>
                    <Text allowFontScaling={false} style={{fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), fontFamily: 'HelveticaLight'}}>{moment(regDate).format('DD.MM.YYYY')}</Text>
                    <Text allowFontScaling={false} style={{fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), fontFamily: 'HelveticaLight', marginTop: 5}}>{regNum}</Text>
                    <View>
                        {caseDoctypeIcon(docType)}
                    </View>
                </View>
            </View>
            
        </View>
    )
}
