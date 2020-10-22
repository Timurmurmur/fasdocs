import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableHighlight, Text, NativeSyntheticEvent, Route, Alert, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../../common/color';
import PDFReader from 'rn-pdf-reader-js';
import * as FileSystem from 'expo-file-system';
import { PageStatus, DocumentWithLoadedAtachments, Document, Navigation } from '../../common/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { getMediaPermissions } from '../../helpers/media';
import { DownloadContainer } from '../../Components/Download/DownLoadContainer';

export interface IDocViewProps {
    pageStatus: PageStatus;
    document: any;
    error: any;
    loadDocumentContent: (document: any) => void;
    navigation: Navigation;
    route: Route;
    downloadStatus: PageStatus;
    downloadFile: (document: any) => void;
}

export const DocViewSearch: React.FC<IDocViewProps> = ({ pageStatus, document, route, loadDocumentContent, navigation, error, downloadFile, downloadStatus}) => {
    const [selectedAttacment, setSelectedAttachment] = useState(0);
    const [isAttachDownLoaded, setIsAttachDownloaded] = useState(false);

    useEffect(() => {
        
        loadDocumentContent(route.params.data);
        if (route.params?.selectedAttachment !== undefined) {
            setSelectedAttachment(route.params.selectedAttachment);
        }
        setIsAttachDownloaded(false);
    }, [route.params?.selectedAttachment, route.params.data])

    useEffect(() => {
        if (pageStatus === PageStatus.LOADED && !isAttachDownLoaded) {
            let isDownload = document.attachments[selectedAttacment].name.split('.')[1] !== 'pdf';
            if (isDownload) {
                (async () => {
                    const perm = await getMediaPermissions();
                    if (perm) {
                        downloadFile(document.attachments[selectedAttacment]);
                        setIsAttachDownloaded(true);
                    } else {
                        Alert.alert("Что бы мы могли скачать ваше вложение вы должны разрешить доступ к файловой системе");
                    }
                })()
            }
        }
    }, [route.params?.selectedAttachment, pageStatus])

    return(
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
            <View style={[{ justifyContent: 'space-between', paddingHorizontal: 20,  paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(142,142,147, .3)', height: RFValue(100, DEFAULT_SCREEN_HEIGHT) }]}>
                <View style={{marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableHighlight underlayColor={COLOR.WHITE} onPress={e => navigation.goBack() } style={{flexDirection: 'row', alignItems: 'center'}}>
                        <>
                        <FontAwesome name="angle-left" size={RFValue(30, DEFAULT_SCREEN_HEIGHT)} />
                        <Text style={{ marginLeft: 8, fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT) }}>Поиск</Text>
                        </>
                    </TouchableHighlight>
                    <View>
                    <TouchableHighlight underlayColor={COLOR.WHITE} onPress={e => navigation.goBack() } style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ marginLeft: 8, fontSize: RFValue(23, DEFAULT_SCREEN_HEIGHT) }}>Обновить</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Text style={{fontSize: RFValue(30, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold'}}>
                        { route.params.data.regNum }
                    </Text>
                </View>
            </View>
            <View style={{flex: 1, backgroundColor: COLOR.WHITE, justifyContent: 'center'}}>
                {
                    downloadStatus === PageStatus.LOADING ?
                    null :
                    <View style={{ position: 'absolute', zIndex: 1000, left: '10%', width: '80%'}}>
                        <DownloadContainer />
                    </View>
                }
                {
                    pageStatus === PageStatus.LOADING ?
                    <ActivityIndicator />
                    :
                    <PDFReader source={{ uri: document.attachments[selectedAttacment].path }}  withScroll withPinchZoom customStyle={{
                        readerContainerZoomContainer: {
                            display: 'none'
                        }
                    }}></PDFReader>
                }
            </View>
            <View style={{ backgroundColor: 'rgba(192,192,192,.2)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: RFValue(60, DEFAULT_SCREEN_HEIGHT)}}>
                <View>
                    <TouchableHighlight underlayColor={'rgba(192,192,192,.2)'} onPress={e => navigation.navigate('DocInfo', { info: document.info })}>
                        <Text style={{color: 'rgb(108, 95, 91)', fontFamily: 'PingFang', fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT)}}>Документ</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight underlayColor={'rgba(192,192,192,.2)'} onPress={e => navigation.navigate('DocAttachments', { attachments: document.attachments, selectedAttachment : selectedAttacment, routeName: 'DocViewSearch' })}>
                        <Text style={{color: 'rgb(108, 95, 91)', fontFamily: 'PingFang', fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT)}}>Вложения { pageStatus === PageStatus.LOADING ? '' : document.attachments.length}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}