import React from 'react';
import 'text-encoding-polyfill';
import { ActivityIndicator, AsyncStorage, StatusBar, Dimensions, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Navigation } from './src/Components/Navigation/Navigation';
import * as Font from 'expo-font';
import { Epic, EpicMiddleware, createEpicMiddleware, combineEpics, } from 'redux-observable';
import { applyMiddleware, combineReducers, createStore, } from 'redux';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { AuthActions } from './src/Screens/Auth/actions';
import { AuthState } from './src/Screens/Auth/types';
import { AuthDataProvider } from './src/api/AuthDataProvider';
import { host } from './src/common/host';
import { auth } from './src/Screens/Auth/reducer';
import { authEpics } from './src/Screens/Auth/epics';
import { PersistGate } from 'redux-persist/integration/react';
import { NavContainer } from './src/Components/Navigation/NavContainer';
import { HomeActions } from './src/Screens/Home/actions';
import { DocumentsDataProvider } from './src/api/DocumentsDataProvider';
import { HomeState } from './src/Screens/Home/types';
import { home } from './src/Screens/Home/reducer';
import { homeEpics } from './src/Screens/Home/epics';
import { SearchActions } from './src/Screens/Search/actions';
import { SearchState } from './src/Screens/Search/types';
import { SearchDataProvider } from './src/api/SearchDataProvider';
import { search } from './src/Screens/Search/reducer';
import { searchEpics } from './src/Screens/Search/epics';
import { DocViewActions } from './src/Screens/DocViewSearch/actions';
import { DocViewState } from './src/Screens/DocViewSearch/types';
import { docView } from './src/Screens/DocViewSearch/reducer';
import { docViewEpics } from './src/Screens/DocViewSearch/epics';
import { authMiddleware } from './src/middleware/auth';
import { LoggerActions } from './src/Components/Logger/actions';
import { LoggerDataProvider } from './src/api/LoggerDataProvider';
import { LoggerState } from './src/Components/Logger/types';
import { logger } from './src/Components/Logger/reducer';
import { loggerMiddleware } from './src/Components/Logger/logger';
import { loggerEpics } from './src/Components/Logger/epics';
import * as Constants from 'expo-constants';
import { DownloadActions } from './src/Components/Download/actions';
import { DownloadState } from './src/Components/Download/types';
import { download } from './src/Components/Download/reducer';
import { downloadEpics } from './src/Components/Download/epics';


export type Action = AuthActions | HomeActions | SearchActions | DocViewActions | LoggerActions | DownloadActions;

export interface EpicDeps {
  authDataProvider: AuthDataProvider;
  documentsDataProvider: DocumentsDataProvider;
  searchDataProvider: SearchDataProvider;
  loggerDataProvider: LoggerDataProvider;
}

export interface State {
  auth: AuthState;
  home: HomeState;
  search: SearchState;
  docView: DocViewState;
  logger: LoggerState;
  download: DownloadState;
} 

const createMiddleware = (
  epicMiddleware: EpicMiddleware<Action,Action, State, EpicDeps>
) => applyMiddleware(epicMiddleware, authMiddleware, loggerMiddleware);

const epicMiddleware = createEpicMiddleware<Action, Action, State, EpicDeps>({
  dependencies: {
    authDataProvider: new AuthDataProvider(host),
    documentsDataProvider: new DocumentsDataProvider(host),
    searchDataProvider: new SearchDataProvider(host),
    loggerDataProvider: new LoggerDataProvider(host),
  }
});

const store = createStore<State, Action, {}, {}>(
  combineReducers({ auth, home, search, docView, logger, download }),
  createMiddleware(epicMiddleware)
)

const persistor = persistStore(store);

epicMiddleware.run(combineEpics(authEpics, homeEpics, searchEpics, docViewEpics, loggerEpics, downloadEpics));




export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  React.useEffect(() => {
    async function loadResourcesAndDataAsync () {
      try {
        await Font.loadAsync({
          "PingFang": require('./assets/fonts/PingFangLight.ttf'),
          "HelveticaMedium": require('./assets/fonts/HelveticaNeue-Medium.otf'),
          "HelveticaLight": require('./assets/fonts/HelveticaNeue-Light.otf')
        });
        StatusBar.setBarStyle('dark-content')
      } catch (e){
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }
    // AsyncStorage.clear();
    // async function getPermissions() {
    //   let grantedCameraRoll = await Permissions.getAsync('cameraRoll').then((value) => value.granted);
    //   let grantedCamera = await Permissions.getAsync('camera').then((value) => value.granted);
    //   if(!grantedCamera || !grantedCameraRoll){
    //     Permissions.askAsync('cameraRoll')
    //     Permissions.askAsync('camera')
    //   }
    // }
    // getPermissions();
    loadResourcesAndDataAsync();
  }, [])

  if (isLoadingComplete) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <View style={{flex: 1}}>
            <NavContainer />
          </View>
        </PersistGate>
      </Provider>
    );
  } else {
    return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator />
    </View>
  }
}
