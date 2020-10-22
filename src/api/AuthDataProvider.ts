import { BaseDataProvider } from "./BaseDataProvider";
import axios from 'axios';
import { Constants } from "react-native-unimodules";
import { Platform } from "react-native";
const info = Platform.OS === "ios" ?
{
    appName: Constants.manifest.name,
    packageName: Constants.manifest.ios.bundleIdentifier,
    version: Constants.manifest.version,
    deviceName: Constants.platform?.ios?.model,
    build: Constants.manifest.ios.buildNumber,
    iosVersion: Constants.platform?.ios?.systemVersion

} :
{
    appName: Constants.manifest.name,
    packageName: Constants.manifest.android.package,
    version: Constants.manifest.version,
    deviceName: Constants.deviceName,
    build: Constants.manifest.ios.buildNumber,
    androidVersion: Constants.systemVersion,
}

export class AuthDataProvider extends BaseDataProvider {
    
    
    login = async (username: string, password: string) => {
        const data = await axios.post(`${this.host}/auth/signin`, {
            username,
            password,
            info
        }).then(res => res.data)
        console.log(data);
        data.user.exp = new Date().getTime() + 3600000;
        return data; 
    }

    refresh = async (refreshToken: string) => {
        const data = await axios.post(`${this.host}/auth/refresh`, {}, {
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        }).then(res => res.data);
        data.exp = new Date().getTime() + 3600000;
        return data;
    }
}