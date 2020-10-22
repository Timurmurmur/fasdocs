import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StatusBar } from 'react-native';
import { COLOR } from '../../common/color';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';


export const DocInfo: React.FC = ({ route, navigation }: any) => {
    const { info } = route.params;
    useEffect(() => {
        console.log(route.params);
    }, [])
    

    const renderCorrespondents = (corr: Array<string>) => {
        let str: string = '';
        corr.map((el: string, index: number) => {
            str += el + ','
        })
        console.log(str, "STR");
        return str;
    }
    console.log(info.docType.id === 18)

    return (
        <>
        <View style={{ backgroundColor: '#fff'}}>
            <StatusBar translucent barStyle="dark-content" backgroundColor={'#fff'}/>
        </View>
        <ScrollView style={{backgroundColor: COLOR.WHITE}}>
            <View>
                <TouchableHighlight onPress={e => navigation.goBack()} underlayColor={COLOR.WHITE} style={{ marginTop: 5 }}>
                    <Text allowFontScaling={false} style={{fontFamily: 'PingFang', fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'rgb(108,95,91)', textAlign: 'center'}}>Закрыть</Text>
                </TouchableHighlight>
            </View>
            <View style={{ paddingHorizontal: 16}}>
                <DocInfoItem title="Тип документа" text={info.docType.name}/>
            </View>
            {
                info.docType.id === 16 && info.docNum === null || info.docNum === undefined ? null :
                <View style={{ paddingHorizontal: 16}}>
                    <DocInfoItem title="Идентификатор" text={info.docNum}/>
                </View>
            }
            {
                info.regNum === null || info.regNum === undefined ? null :
                <View style={{ paddingHorizontal: 16}}>
                    <DocInfoItem title="Регистрационный номер" text={info.regNum}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.createDate === null || info.createDate === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Дата создания" text={moment(info.createDate).format('DD.MM.YYYY')}/>
                </View>
            }
            <View style={{paddingHorizontal: 16}}>
                <DocInfoItem title="Дата регистрации" text={moment(info.dateReg).format('DD.MM.YYYY')}/>
            </View>
            {
                info.docType.id === 18 && info.confidentiality === null || info.confidentiality === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Конфиденциальность" text={info.confidentiality.name}/>
                </View>
            }
            {
                info.nomenclature === null || info.nomenclature === undefined && info.docType.id !== 16 || info.docType.id !== 17 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Номенклатура дел" text={info.nomenclature.toString()}/>
                </View>
            }
            {
                info.docType.id !== 16 && info.extNum === null || info.extNum === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Номер исходящий" text={info.extNum}/>
                </View>
            }
            {
                info.docType.id !== 16 && info.extDate === null || info.extDate === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Дата исходящяя" text={moment(info.extDate).format('DD.MM.YYYY')}/>
                </View>
            }
            {
                info.docType.id !== 16 && info.delivery === null || info.delivery === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Вид доставки" text={info.delivery.name}/>
                </View>
            }
            {
                info.docType.id !== 16 && info.original === null || info.original === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Оригинал" text={`${info.isOriginal ? 'Да' : 'Нет'}`}/>
                </View>
            }
            {
                info.correspondents === null || info.correspondents === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Корреспонденты" text={renderCorrespondents(info.correspondents)}/>
                </View>
            }
            {
                info.docType.id !== 16 || info.docType.id !== 17 && info.annotation === null || info.annotation === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Аннотация" text={info.annotation}/>
                </View>
            }
            { 
                info.docType.id === 16 || info.docType.id === 17 && info.annotation === null || info.annotation === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Наименование" text={info.annotation}/>
                </View>
            }
            {
                info.docType.id !== 16 || info.docType.id !== 17 && info.rubric === null || info.rubric === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Рубрики" text={info.rubric.name}/>
                </View>
            }
            {
                info.subjects === null || info.subjects === undefined && info.docType.id !== 16 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Тематики" text={info.subjects.name}/>
                </View>
            }
            {
                info.procedure === null || info.procedure === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Процедура" text={info.procedure.name}/>
                </View>
            }
            {
                info.docPageCount === null || info.docPageCount === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Листов документа" text={info.docPageCount}/>
                </View>
            }
            {
                info.attachPageCount === null || info.attachPageCount === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Листов приложений" text={info.attachPageCount}/>
                </View>
            }
            {
                info.docType.id !== 16 || info.docType.id !== 17 && info.copyCount === null || info.copyCount === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Экземпляров" text={info.copyCount}/>
                </View>
            }
            {
                info.docKind === null || info.docKind === undefined ? null :
                <View style={{ paddingHorizontal: 16}}>
                    <DocInfoItem title="Вид документа" text={info.docKind.name}/>
                </View>
            }
            {
                info.content === null || info.content === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Содержание 1" text={info.content?.name}/>
                </View>
            }
            {
                info.content2 === null || info.content2 === undefined && info.docType.id === 18 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Содержание 2" text={info.content2?.name}/>
                </View>
            }
            {
                info.remark === null || info.remark === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Примечание" text={info.remark}/>
                </View>
            }
            {
                info.docType.id === 16 && info.worker === null || info.worker === undefined ? null :
                <View style={{ paddingHorizontal: 16}}>
                    <DocInfoItem title="Исполнитель (Кто подготовил)" text={info.worker}/>
                </View>
            }
            {
                info.docType.id === 16 && info.signer === null || info.signer === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Подписал" text={info.signer}/>
                </View>
            }
            {
                info.docType.id === 16 || info.docType.id === 17 && info.commission === null || info.commission === undefined || info.commission.length === 0 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Должностные лица" text={renderCorrespondents(info.commission)}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.isFinalAnswer === null || info.isFinalAnswer === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Окончательный ответ" text={`${info.isFinalAnswer ? 'Да' : 'Нет'}`}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.isRequest === null || info.isRequest === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Запрос" text={`${info.isRequest ? 'Да' : 'Нет'}`}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.isInterimAnswer === null || info.isInterimAnswer === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Промежуточный ответ" text={`${info.isInterimAnswer ? 'Да' : 'Нет'}`}/>
                </View>
            }
            {
                info.answerWaitingDate === null || info.answerWaitingDate === undefined  &&  info.docType.id !== 17 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Ответ ожидается к" text={moment(info.answerWaitingDate).format('DD.MM.YYYY')}/>
                </View>
            }
             {
                info.docType.id === 16 || info.docType.id === 18  && info.ground2Type === null || info.ground2Type === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Основание вынесения" text={info.ground2Type.name}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.strongBlancks === null || info.strongBlancks === undefined || info.strongBlancks.length === 0 ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Бланки строгой отчетности" text={''}/>
                </View>
            }
            {
                info.docType.id !== 17 && info.controllers === null || info.controllers === undefined ? null :
                <View style={{paddingHorizontal: 16}}>
                    <DocInfoItem title="Члены комиссии" text={'ХЗ'}/>
                </View>
            }
            {
                info.docType.id === 17 || info.docType.id !== 16 || info.docType.id !== 18 && info.controllers === null || info.controllers === undefined ? null :
                <View style={{marginTop: 15, paddingHorizontal: 16}}>
                    <DocInfoItem title="Контролеры" text={'Контролёры'}/>
                </View>
            }
            {
                info.docType.id === 17 || info.docType.id !== 16 || info.docType.id !== 18 && info.state === null || info.state === undefined ? null :
                <View style={{marginTop: 15, paddingHorizontal: 16}}>
                    <DocInfoItem title="Контролеры" text={info.state}/>
                </View>
            }
            <View style={{marginBottom: 20}}></View>
        </ScrollView>
        </>
    )
}

const DocInfoItem = ({ title, text }: any) => {
    return (
        <View style={{ borderBottomWidth: .5, borderBottomColor: '#C8C7CC', paddingVertical: 5, width: '100%' }}>
            <View>
                <Text allowFontScaling={false} style={{ fontFamily: 'PingFang', fontSize: RFValue(20, DEFAULT_SCREEN_HEIGHT), color: 'gray' , minHeight: 25, paddingTop: 5}}>{title}</Text>
            </View>
            <View style={{width: '100%'}}>
                <Text allowFontScaling={false} style={{ fontFamily: 'PingFang', fontSize: RFValue(22, DEFAULT_SCREEN_HEIGHT), color: COLOR.BLACK, width: '100%', minHeight: 25}}>{text}</Text>
            </View>
        </View>
    )
}