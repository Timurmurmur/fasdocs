import React, { useState } from 'react';
import { View, Text, TouchableHighlight, Pressable } from 'react-native';
import { COLOR } from '../../common/color';
import { CloseIcon, FlagIcon } from '../Icons/Icons';

export const Executor: React.FC<{
    backgroundColor: string;
    name: string;
    onDelete: (e: any) => void;
    onPress: (e: any) => void;
}> = ({ name, backgroundColor, onDelete, onPress }) => {
    const [isSelected, setIsSelected] = useState(true);

    return (
        <Pressable onPress={e => {
            setIsSelected(!isSelected);
        }} style={({pressed}) => {
            console.log(pressed);
            if (pressed) {
                return (
                    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderWidth: 1, borderColor: backgroundColor, padding: 7, paddingHorizontal: 15, borderRadius: 25, opacity: .9, backgroundColor: isSelected ? backgroundColor: COLOR.WHITE, }
                )
            } else {
                return (
                    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderWidth: 1, borderColor: backgroundColor, paddingVertical: 7, paddingHorizontal: 15, borderRadius: 25, backgroundColor: isSelected ? backgroundColor : COLOR.WHITE }
                )
            }
        }}>
            <>
            <View style={{}}>
                <Text style={{ color: isSelected ? COLOR.WHITE : COLOR.BLACK }}>
                    {
                        name
                    }
                </Text>
            </View>
            <View style={{}}>
                <TouchableHighlight underlayColor={"transparent"} onPress={onDelete}>
                    <CloseIcon width={25} height={25} color={isSelected ? COLOR.WHITE : backgroundColor } />
                </TouchableHighlight>
            </View>
            </>
        </Pressable>
    )
}