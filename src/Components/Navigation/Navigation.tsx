import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Auth } from '../../Screens/Auth/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../../Screens/Home/Home';
import { Settings } from '../../Screens/Settings/Settings';
import { Search } from '../../Screens/Search/Search';
import { Header } from '../Header/Header';
import { AuthContainer } from '../../Screens/Auth/AuthContainer';
import { useStore } from 'react-redux';
import { HomeContainer } from '../../Screens/Home/HomeContainer';
import { SettingsContainer } from '../../Screens/Settings/SettingsContainer';
import { SearchContainer } from '../../Screens/Search/SearchContainer';
import { DocViewSearchContainer } from '../../Screens/DocViewSearch/DocViewSearchContainer';
import { DocInfo } from '../../Screens/DocInfo/DocInfo';
import { DocAttachments } from '../../Screens/DocAttachments/DocAttachments';
import { DocList } from '../../Screens/DocList/DocList';
import { DocViewContainer } from '../../Screens/DocView/DocViewContainer';
import { DocAttachmentsContainer } from '../../Screens/DocAttachments/DocAttachmentsContainer';
import { CreateResolucion } from '../../Screens/CreateResolucion/CreateResolucion';
import { ExecutorList } from '../../Screens/ExecutorList/ExecutorList';

export interface INavigationProps {
    data: {
        name: string;
        refreshToken: string;
        token: string;
    } | null;
    setIsFirstOpen: (data: boolean) => void;
}

const StackNavigation = createStackNavigator();

export const Navigation: React.FC<INavigationProps> = ({ setIsFirstOpen, data }) => {
    return(
        <NavigationContainer>
            <StackNavigation.Navigator headerMode="screen" screenOptions={{ header: (props) => <Header {...props}/>, }}>
                {
                    data?.token && data?.refreshToken ? 
                    <>
                        <StackNavigation.Screen name="Home" initialParams={{ title: 'Документы', backgroundColor: '#fff', content: "dark-content"}} component={HomeContainer}/>
                        <StackNavigation.Screen name="Settings" initialParams={{ title: '', content: "dark-content", backgroundColor: '#fff' }} component={SettingsContainer}/>
                        <StackNavigation.Screen name="DocViewSearch" initialParams={{ title: '', content: "dark-content", backgroundColor: '#fff' }} options={{ headerStyle: { display: "none" } }} component={DocViewSearchContainer}/>
                        <StackNavigation.Screen name="DocView" options={{ headerStyle: { display: "none" } }} component={DocViewContainer}/>
                        <StackNavigation.Screen name="Search" options={{ headerTitle: 'Поиск', headerStyle: { display: "none" } }} initialParams={{
                            back: true,
                            title: '',
                            content: "dark-content", 
                            backgroundColor: '#fff'
                        }} component={SearchContainer}/>
                        <StackNavigation.Screen name="DocList" initialParams={{ title: '', titleColor: '#fff', back: true, backgroundColor: '#fff', content: 'light-content' }} options={{ headerTintColor: '', headerStyle: {
                            paddingBottom: 10
                        } }} component={DocList}/>
                        <StackNavigation.Screen name="DocInfo" initialParams={{ title: '',  backgroundColor: '#fff', content: 'dark-content' }} options={{ headerStyle: { display: "none", }}} component={DocInfo}/>
                        <StackNavigation.Screen name="DocAttachments" initialParams={{ title: '', content: 'dark-content', backgroundColor: '#fff' }} options={{ headerStyle: { display: "none" }}} component={DocAttachmentsContainer}/>
                        <StackNavigation.Screen name="CreateResolucion" initialParams={{ title: '', content: 'light-content', backgroundColor: '#fff' }} options={{ headerStyle: { display: "none" }}} component={CreateResolucion}/>
                        <StackNavigation.Screen name="ExecutorList" initialParams={{ title: '', content: 'light-content', backgroundColor: '#fff' }} options={{ headerStyle: { display: "none" }}} component={ExecutorList}/>
                    </>
                    :
                    <StackNavigation.Screen initialParams={{ title: 'ФАС Док', content: "dark-content", backgroundColor: '#fff' }} options={{ headerTitle: 'ФАС Док' }} name="Auth" component={AuthContainer}/>
                }
               
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}