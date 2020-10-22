import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, TouchableHighlight, ImageBackground, Dimensions, Route, Image, Platform, StatusBar } from 'react-native';
import { Navigation, PageStatus } from '../../common/types';
import * as LocalAuth from 'expo-local-authentication';
import { COLOR } from '../../common/color';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_SCREEN_HEIGHT } from '../../common/contants';
import { Constants } from 'react-native-unimodules';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { Download } from '../../Components/Download/Download';

export interface IAuthProps {
    navigation: Navigation;
    route: Route;
    login: (username: string, password: string) => void;
    blockMessage: any;
    respError: any;
    loginRestore: () => void;
    authByBiometric: boolean | null;
    cachedAuthData: any;
    pageStatus: PageStatus;
    data: any;
    setAuthByBiometric: (data: boolean, hardwareStatus: number) => void;
    setIsFirstOpen: (data: boolean) => void;
    isFirstOpen: boolean;
    hardwareStatus: number;
}

export const Auth: React.FC<IAuthProps> = ({ login, authByBiometric, navigation, route, loginRestore, blockMessage, respError, cachedAuthData, pageStatus, data, setAuthByBiometric, setIsFirstOpen, isFirstOpen, hardwareStatus}) => {
    const [username, setUsername] = useState(cachedAuthData?.username ? cachedAuthData.username : '');
    const [isUsernameInputEdit, setIsUsernameEdit] = useState(cachedAuthData === null ? true : false);
    let usernameInputRef: any;
    const [password, setPassword] = useState('');
    // Fgh310Hjk
    const [error, setError] = useState('');
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [errorReduxVisible, setErrorReduxVisible] = useState(true);
    

    useEffect(() => {
        LocalAuth.isEnrolledAsync();
    })
    const loginChangeCallback = useCallback((e: any) => {
        if (e.nativeEvent) {
            setUsername(e.nativeEvent.text)
        }
    }, [username])

    const passwordChangeCallback = useCallback((e: any) => {
        if (e.nativeEvent) {
            setPassword(e.nativeEvent.text)
        }
    }, [password])

    const submitHandler = (e: any) => {
        setErrorReduxVisible(false);
        if (username === '' || password === '') {
            setError('Необходимо ввести логин и пароль');
            setIsErrorVisible(true);
        } else {
            setError('');
            setIsErrorVisible(false);
            login(username, password);
        }
    }

    const authByBiometricHandler = async (e: any) => {
        // console.log(await Constants.getWebViewUserAgentAsync());
        setIsErrorVisible(false);
        setError('');
        setErrorReduxVisible(false);
        let hasHardware = await LocalAuth.hasHardwareAsync();
        if (hasHardware) {
            let result = await LocalAuth.authenticateAsync({
                promptMessage: 'Аутентификация по Биометрии',
            });
            if (result.success) {
                login(cachedAuthData.username, cachedAuthData.password);
            } else {
                
            }
        } else {
            Alert.alert('На вашем устройстве не доступна аутентификация по биометрии');
        }
    }

    if (pageStatus === PageStatus.ERROR && errorReduxVisible === false && isErrorVisible === false) {
        setErrorReduxVisible(true);
    }

    // console.log(
    //     {
    //         appName: Constants.manifest.name,
    //         packageName: Constants.manifest.ios.bundleIdentifier,
    //         version: Constants.manifest.version,
    //         deviceName: Constants.platform?.ios?.model,
    //         build: Constants.manifest.ios.buildNumber,
    //         iosVersion: Constants.platform?.ios?.systemVersion
        
    //     },
    //     {
    //         appName: Constants.manifest.name,
    //         packageName: Constants.manifest.android.package,
    //         version: Constants.manifest.version,
    //         deviceName: Constants.deviceName,
    //         build: Constants.manifest.ios.buildNumber,
    //         androidVersion: Constants.systemVersion,
    //     }
    // );
    

    if (pageStatus === PageStatus.LOADED && data?.name && authByBiometric !== true) {
        
        (async () => {
            let HardwareStatus = await LocalAuth.supportedAuthenticationTypesAsync();
            if (HardwareStatus[0] === LocalAuth.AuthenticationType.FACIAL_RECOGNITION) {
                Alert.alert(data?.name,'Хотите использовать FaceID', 
                [
                    {
                        text: 'Нет',
                        style: 'default',
                        onPress: () => {
                            navigation.navigate('Home');
                            setAuthByBiometric(false, LocalAuth.AuthenticationType.FACIAL_RECOGNITION);
                        }
                    },
                    {
                        text: 'Да',
                        style: 'default',
                        onPress: () => {
                            navigation.navigate('Home');
                            setAuthByBiometric(true, LocalAuth.AuthenticationType.FACIAL_RECOGNITION);
                        }
                    },
                    
                ])
            } else if (HardwareStatus[0] === LocalAuth.AuthenticationType.FINGERPRINT) {
                Alert.alert(data.name,'Хотите использовать TouchId', 
                [
                    {
                        text: 'Нет',
                        style: 'default',
                        onPress: () => {
                            navigation.navigate('Home');
                            setAuthByBiometric(false, LocalAuth.AuthenticationType.FINGERPRINT);

                        }
                    },
                    {
                        text: 'Да',
                        style: 'default',
                        onPress: () => {
                            navigation.navigate('Home');
                            setAuthByBiometric(true, LocalAuth.AuthenticationType.FINGERPRINT);

                        }
                    },
                    
                ])
            }
        })()
    }

    return(
        <>
        <View style={{backgroundColor: '#fff'}}>
            <StatusBar translucent barStyle="dark-content" backgroundColor={'#fff'}/>
        </View>
        {/* <SafeAreaView style={{backgroundColor: '#fff'}} forceInset={{ bottom: 'always' }}> */}
        <ImageBackground source={require('../../../assets/Images/bg.png')} resizeMode="cover" style={{width: '100%', height: Dimensions.get('screen').height - 80}}>
            <ScrollView style={{paddingVertical: 50}}>
                <View style={style.form_container}>
                    <View style={style.form_wrapper}>
                    <View style={{ marginBottom: 10, minHeight: RFValue(65, DEFAULT_SCREEN_HEIGHT),  }}>
                    {pageStatus === PageStatus.LOADING ?
                    <Text allowFontScaling={false} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'darkgray', textAlign: 'center',fontFamily: 'PingFang'}}>Подключение...</Text>
                    : null}
                    <Text allowFontScaling={false} style={{fontSize: RFValue(25, DEFAULT_SCREEN_HEIGHT), color: 'red', textAlign: 'center',fontFamily: 'PingFang', width: '100%'}}>
                        { error }
                        { pageStatus === PageStatus.ERROR && errorReduxVisible ? 'Неверный логин или пароль' : null}
                    </Text>
                    </View>
                    <View style={style.input_wrapper}>
                        <TextInput onFocus={e => setIsUsernameEdit(true)} allowFontScaling={false} value={username} placeholderTextColor="rgba(0,0,0,.4)" onChange={loginChangeCallback} style={[style.input, isUsernameInputEdit ? { textAlign: 'left' } : { textAlign: 'center' }]} placeholder="Пользователь"/>
                    </View>
                    <View style={style.input_wrapper}>
                        <TextInput allowFontScaling={false} secureTextEntry placeholderTextColor="rgba(0,0,0,.4)"  value={password} keyboardType="visible-password" autoCapitalize="none" onChange={passwordChangeCallback} style={style.input} placeholder="Пароль"/>
                    </View>
                    <View style={style.button_container}>
                        {
                            hardwareStatus === null || authByBiometric !== true ?
                            <View>
                            </View>
                            :
                            <TouchableHighlight underlayColor={COLOR.WHITE} onPress={authByBiometricHandler}>
                                <Image source={hardwareStatus === 2 ? require('../../../assets/Images/faceid_black.png') : require('../../../assets/Images/touchid_black.png')} style={{width: 40, height: 40}}/>
                            </TouchableHighlight>
                        }
                        <TouchableHighlight underlayColor={'transparent'} onPress={submitHandler} style={style.button_wrapper}>
                            <View style={style.button}>
                                <Text allowFontScaling={false} style={{color: '#000', fontSize: RFValue(29, DEFAULT_SCREEN_HEIGHT), fontFamily: 'PingFang' }}>Войти</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
        {/* </SafeAreaView> */}
    </>
    )
}

const style = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'rgba(211,211,211, .5)',
        fontSize: RFValue(34, DEFAULT_SCREEN_HEIGHT),
        width: '100%',
        color: '#000',
        paddingLeft: 5,
        fontFamily: 'PingFang',
    },
    form_container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },
    form_wrapper: {
        width: 250
    },
    input_wrapper: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 5
    },
    button_container: {
        alignItems: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button_wrapper: {
        width: 200,
    },
    button: {
        height: 40,
        backgroundColor: 'rgba(211,211,211,.7)',
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    }
})