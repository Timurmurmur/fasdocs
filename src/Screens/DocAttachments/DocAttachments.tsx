import React from 'react';
import { ScrollView, View, Text, TouchableHighlight, Image, Alert } from 'react-native';
import { COLOR } from '../../common/color';
import { DocAttachment, Navigation, Route, PageStatus } from '../../common/types';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { getMediaPermissions } from '../../helpers/media';
import { DownloadContainer } from '../../Components/Download/DownLoadContainer';

export interface IDocAttachmentsProps {
    navigation: Navigation;
    route: any;
    downloadFile: (document: any) => {};
    downloadStatus: PageStatus;
}
export const DocAttachments: React.FC<IDocAttachmentsProps> = ({ navigation, route, downloadFile, downloadStatus }) => {
    const { attachments, selectedAttachment, routeName } = route.params;
    // console.log(attachments);

    const caseDocumentStyle = (attachment: DocAttachment) => {
        const docType = attachment.name.split('.')[1];
        // console.log(docType);

        switch(docType) {
            case 'pdf': {
                return { part1Color: 'rgb(180, 97, 97)', part2Color: 'rgb(136, 74, 74)', icon: require('../../../assets/Images/Attachments/pdf.png')}
            };
            case 'odt': {
                return { part1Color: 'rgb(92, 143, 200)', part2Color: 'rgb(58, 93, 129)', icon: require('../../../assets/Images/Attachments/odt.png')}
            };
            case 'doc':
            case 'docx': {
                return { part1Color: 'rgb(92, 143, 200)', part2Color: 'rgb(58, 93, 129)', icon: require('../../../assets/Images/Attachments/word.png')}
            };
            case 'log':
            case 'txt':
            case 'csv': {
                return { part1Color: 'rgb(92, 143, 200)', part2Color: 'rgb(58, 93, 129)', icon: null}
            };
            case 'bpm':
            case 'png':
            case 'jpg': {
                return { part1Color: 'rgb(210, 141, 99)', part2Color: 'rgb(132, 89, 64)', icon: require('../../../assets/Images/Attachments/image.png')}
            };
            case 'xls':
            case 'xlsx': {
                console.log("XLS");
                return { part1Color: 'rgb(110, 179, 105)', part2Color: 'rgb(78, 128, 75)', icon: require('../../../assets/Images/Attachments/xls.png')}
            };
            default: {
                return { part1Color: 'rgb(211, 211, 211)', part2Color: 'rgb(169, 169, 169)'}
            }
        }
    }

    const attachmentPressHandler = async (e: any, doc: DocAttachment, index: number) => {
        let fileExtencion = doc.name.split('.')[1];
        if (fileExtencion === 'zip' || fileExtencion === "xls" || fileExtencion === 'xls') {
            const perm = await getMediaPermissions();
            if (perm) {
                downloadFile(doc);
            } else {
                Alert.alert("Что бы мы могли скачать ваше вложение вы должны разрешить доступ к файловой системе");
            }
        } else {
           navigation.navigate(routeName, { selectedAttachment: index });
        }
    }
    
    return (
        <ScrollView style={{ backgroundColor: COLOR.WHITE, flex: 1 }}>
            <View style={{flex: 1}}>
                {
                    downloadStatus === PageStatus.LOADING ?
                    <View style={{ position: 'absolute', zIndex: 1000, left: '10%', width: '80%', top: '50%'}}>
                        <DownloadContainer />
                    </View>
                    :
                    null
                }
                <View>
                    <TouchableHighlight onPress={e => navigation.goBack()} underlayColor={COLOR.WHITE} style={{ marginTop: 5 }}>
                        <Text allowFontScaling={false} style={{fontFamily: 'PingFang', fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'rgb(108,95,91)', textAlign: 'center'}}>Закрыть</Text>
                    </TouchableHighlight>
                </View>
                <View style={{marginTop: 15, paddingHorizontal: 16 }}>
                    <View>
                        {
                            attachments.map((el: DocAttachment, index: number) => {
                                const { part1Color, part2Color, icon } = caseDocumentStyle(el);
                                return (
                                    <TouchableHighlight underlayColor={COLOR.WHITE} style={{ marginBottom: 15 }} key={index} onPress={e => attachmentPressHandler(e, el, index)}>
                                        <DocAttachmentItem selected={index === selectedAttachment} part1Color={part1Color} part2Color={part2Color} icon={icon} version={el.version} name={el.name} size={el.size}></DocAttachmentItem>
                                    </TouchableHighlight>

                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}


const DocAttachmentItem: React.FC = ({ part1Color, part2Color, version, name, size, icon, selected }: any) => {
    return (
        <View style={{ height: RFValue(110, DEFAULT_SCREEN_HEIGHT), flexDirection: 'row'}}>
            <View style={{ width: 4, borderRadius: 15, backgroundColor: 'gray', height: '100%', marginRight: 2, overflow: 'hidden' }}>
                <View style={{ height: '60%', backgroundColor: selected ? part1Color : 'rgb(255,255,255)' }}></View>
                <View style={{ height: '40%', backgroundColor: selected ? part2Color : 'rgb(255,255,255)' }}></View>
            </View>
            <View style={{  width: '99%', borderRadius: 3, overflow: 'hidden'}}>
                <View style={{ backgroundColor: part1Color, height: '60%', alignItems: 'flex-end' , paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', justifyContent : 'space-between' }}>
                    <View>
                        { icon !== null ?
                        <Image source={icon} style={{ width: RFValue(55, DEFAULT_SCREEN_HEIGHT), height: RFValue(55, DEFAULT_SCREEN_HEIGHT) }} />
                        : null}
                    </View>
                    <View style={{ justifyContent: 'space-between', height: '100%' }}>
                        <Text allowFontScaling={false} style={{ color: COLOR.WHITE, fontFamily: 'PingFang', fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT)}}>{`Версия ${version}`}</Text>
                        <Text allowFontScaling={false} style={{ color: COLOR.WHITE, fontFamily: 'PingFang', fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), textAlign: 'right'}}>{`${(Number(size) / 1024).toFixed(1)} KB`}</Text>
                    </View>
                </View>
                <View style={{backgroundColor: part2Color, height: '40%', paddingHorizontal: 10, justifyContent: 'center'}}>
                    <Text allowFontScaling={false} style={[{textAlign: 'right', color: '#fff', fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT) }, selected ? { fontFamily: 'HelveticaMedium', } : { fontFamily: 'HelveticaLight' }]}>{name}</Text>
                </View>
            </View>

        </View>
    )
}