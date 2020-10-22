import React from 'react';
import { View, Text } from 'react-native';
import { COLOR } from '../../../common/color';
import { UnitIcon, WorkerIcon } from '../../Icons/Icons';

export const DropDownTitle: React.FC<{
    value: string;
    isWorker: boolean;
}> = ({
    value,
    isWorker
}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                !isWorker ?
                <UnitIcon width={20} height={20} color={COLOR.BLACK} />
                :
                <WorkerIcon width={20} height={20} color={COLOR.BLACK} />
            }
            <Text style={{ marginLeft: 10 }} numberOfLines={1}>
                { value }
            </Text>
        </View>
    )
}