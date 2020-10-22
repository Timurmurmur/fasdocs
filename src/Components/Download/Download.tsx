import React from 'react'
import { View, Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants'
import { COLOR } from '../../common/color'
import { PageStatus } from '../../common/types'

export interface IDownloadProps {
    percent: string;
    document: any;
    downloadStatus: PageStatus;
}

export const Download: React.FC<IDownloadProps> = ({ percent = '10%', document, downloadStatus }) => {
    return (
        <>
            {
                downloadStatus === PageStatus.LOADING ? 
                <View style={{ height: RFValue(70, DEFAULT_SCREEN_HEIGHT), width: '100%', backgroundColor: 'rgb(184, 184, 184)', justifyContent: 'space-between'}}>
                    <View style={{ height: RFValue(32, DEFAULT_SCREEN_HEIGHT), paddingTop: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ width: '50%', alignItems: 'flex-start' }}>
                            <Text style={{ fontFamily: 'PingFang', fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT), color: COLOR.WHITE }}>Загрузка...</Text>
                        </View>
                        <View style={{ width: '50%', alignItems: 'flex-end'}}>
                            <Text style={{ fontFamily: 'PingFang', fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT), color: COLOR.WHITE}}>{document.size / 1024} KB</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'darkgray'}}>
                        <View style={{width: `${percent}`, backgroundColor: 'lightgray', height: 1}}></View>
                    </View>
                    <View style={{ height: RFValue(32, DEFAULT_SCREEN_HEIGHT), alignItems: 'flex-end', paddingBottom: 10, paddingHorizontal: 10, justifyContent: 'center'}}>
                        
                        <View>
                            <Text style={{ fontSize: RFValue(18, DEFAULT_SCREEN_HEIGHT), color: COLOR.WHITE}}>{document.name}</Text>
                        </View>
                    </View>
                </View>
                :
                null
            }
        </>
    )
}