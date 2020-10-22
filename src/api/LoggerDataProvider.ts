import { BaseDataProvider } from "./BaseDataProvider";
import Axios, { AxiosError } from "axios";
import { FileSystem, Constants } from "react-native-unimodules";
import moment from "moment";
export class LoggerDataProvider extends BaseDataProvider {
    createLogs = async () => {
        let date = new Date();
        const path = FileSystem.documentDirectory + moment(new Date()).format('YYYYMMDD-hhmmss') + '.log';
        await FileSystem.writeAsStringAsync(path, '');
        return { path, createdAt: date.getTime() * 60 * 60 * 24 }
    }

    writeLogs = async (path: any, err: AxiosError) => {
        let file = await FileSystem.readAsStringAsync(path, {
            encoding: 'utf8'
        })
        await FileSystem.deleteAsync(path, {
            idempotent: true
        });
        file += `${moment(new Date()).format('DD-MM-YYYY hh:mm:ss')} | ERROR | CONFIG: ${JSON.stringify(err.config)} | RESPONSE: ${JSON.stringify(err.message)}\n`;
        await FileSystem.writeAsStringAsync(path, file);
    }


    sendLogs = async (token: string) => {
        const directory = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (let file of directory) {
            if (file.search('.log') !== -1) {
                let readedFile = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + file);
                let createDate = file.split('.')[0];
                let uploadData = new TextEncoder().encode(readedFile);
                let buffer = await Axios.post(`${this.host}/api/logger/sendPackage`, uploadData, {
                    headers: {
                        'DeviceId': Constants.deviceId !== undefined ? Constants.deviceId : '',
                        "LogDate": createDate,
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/octet-stream"
                    },
                    
                }).then(res => {
                    console.log(res, res.status);
                    if (res.status === 200) {
                        FileSystem.deleteAsync(FileSystem.documentDirectory + file);
                    }
                    return res;
                }).catch(err => console.log("UPLOADERROR", err.response))
            }
        }
    }
    
}