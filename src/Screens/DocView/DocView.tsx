import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableHighlight, Text, NativeSyntheticEvent, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../../common/color';
import PDFReader from 'rn-pdf-reader-js';
import { PageStatus, DocumentWithLoadedAtachments, Document, Navigation, Route } from '../../common/types';
import { NewsPaperIcon, AttachmentsIcon, InfoIcon, DotsIcon, AttachmentIcon, ResolucionIcon, DownloadIcon } from '../../Components/Icons/Icons';
import { host } from '../../common/host';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { Download } from '../../Components/Download/Download';
import { DownloadContainer } from '../../Components/Download/DownLoadContainer';
import { getMediaPermissions } from '../../helpers/media';

export interface IDocViewProps {
    pageStatus: PageStatus;
    document: any;
    error: any;
    loadDocumentContent: (document: any) => void;
    navigation: Navigation;
    route: any;
    token: string;
    downloadStatus: PageStatus;
    downloadFile: (document: any) => {};
}

export const DocView: React.FC<IDocViewProps> = ({ pageStatus, document, route, loadDocumentContent, navigation, error, token, downloadStatus, downloadFile }) => {
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
    }, [isAttachDownLoaded, pageStatus])

    return(
        <View style={{flex: 1}}>
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
                    <Text style={{fontSize: RFValue(30, DEFAULT_SCREEN_HEIGHT), fontWeight: 'bold', color: COLOR.WHITE}}>
                        { route.params.data.regNum }
                    </Text>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
            {
                downloadStatus === PageStatus.LOADING ?
                null :
                <View style={{ position: 'absolute', zIndex: 1000, left: '10%', width: '80%'}}>
                    <DownloadContainer />
                </View>
            }
            {

                pageStatus === PageStatus.LOADING ?
                <View style={{flex: 1, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={RFValue(50, DEFAULT_SCREEN_HEIGHT)}/>
                </View>
                :
                <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
                <PDFReader source={{ uri: `${document.attachments[selectedAttacment].path}`}} withScroll withPinchZoom customStyle={{
                    readerContainerZoomContainer: {
                        display: 'none'
                    }
                }}></PDFReader>
                </View>
            }
            </View>
            <View>
                <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <View style={[DotStyle.wrapper, { backgroundColor: route.params.backgroundColor }]}>
                        <DownloadIcon width={35} height={35} color={COLOR.WHITE}/>
                    </View>
                    <View style={[DotStyle.wrapper, { backgroundColor: route.params.backgroundColor }]}>
                        <TouchableHighlight underlayColor={route.params.backgroundColor} onPress={e => navigation.navigate("CreateResolucion", {
                            backgroundColor: route.params.backgroundColor,
                            inputBg: route.params.inputBg
                        })}>
                            <ResolucionIcon width={35} height={35} color={COLOR.WHITE}/>
                        </TouchableHighlight>
                    </View>
                    <View style={[DotStyle.wrapper, { backgroundColor: route.params.backgroundColor }]}>
                        <AttachmentIcon width={35} height={35} color={COLOR.WHITE}/>
                    </View>
                    <View style={[DotStyle.wrapper, { backgroundColor: route.params.backgroundColor }]}>
                        <InfoIcon width={15} height={35} color={COLOR.WHITE}/>
                    </View>
                    <View style={[DotStyle.wrapper, { backgroundColor: route.params.backgroundColor }]}>
                        <DotsIcon width={35} height={15} color={COLOR.WHITE}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const DotStyle = StyleSheet.create({
    wrapper: {
        width: 55, height: 55, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10
    }
})


{/* <View style={{ flexDirection: 'row' }}>
    {
        pageStatus === PageStatus.LOADED ?
        <>
        <TouchableHighlight underlayColor={route.params.backgroundColor} onPress={e => navigation.navigate('DocInfo', { info: document.info })} style={{ marginRight: 15 }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ marginRight: 5 }}>
                    <NewsPaperIcon width={RFValue(24, DEFAULT_SCREEN_HEIGHT)} height={RFValue(18, DEFAULT_SCREEN_HEIGHT)} color={COLOR.WHITE}/>
                </View>
                <Text style={{ color: COLOR.WHITE, fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT) }}>Документ</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={route.params.backgroundColor}  onPress={e => navigation.navigate('DocAttachments', { attachments: document.attachments, selectedAttachment : selectedAttacment, routeName: 'DocView' })} style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ marginRight: 5 }}>
                    <AttachmentsIcon width={RFValue(24, DEFAULT_SCREEN_HEIGHT)} height={RFValue(20, DEFAULT_SCREEN_HEIGHT)} color={COLOR.WHITE}/>
                </View>
                <Text style={{ color: COLOR.WHITE, fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT) }}>Вложения</Text>
            </View>
        </TouchableHighlight>
        </> : null
    }
</View> */}