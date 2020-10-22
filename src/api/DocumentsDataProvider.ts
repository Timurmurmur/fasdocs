import { BaseDataProvider } from "./BaseDataProvider";
import Axios from "axios";
import { Document, DocumentWithLoadedAtachments, DocAttachments } from "../common/types";
import * as FileSystem from 'expo-file-system';
import { Platform } from "react-native";
import * as Media from 'expo-media-library';
export class DocumentsDataProvider extends BaseDataProvider {

    clearCache = async (hashMap: any, totalCacheSize: number) => {
        if (totalCacheSize !== 0) {
            for (let key in hashMap) {
                FileSystem.deleteAsync(hashMap[key].uri, {
                    idempotent: true
                });
            }
        }

        let dir: any = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        for (let el of dir) {
            FileSystem.deleteAsync(FileSystem.documentDirectory + el, {
                idempotent: true
            });
        }

        return { hashMap: {}, totalCacheSize: 0 }
    }

    loadAttachments = async (document: any, token: string) => {
        return await Axios.get(`${this.host}${document.attachments}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
    }

    getAllDocuments = async (token: string) => {
        const forapprove = await Axios.get(`${this.host}/documents/forapprove`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
        const forsign = await Axios.get(`${this.host}/documents/forsign`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
        const government = await Axios.get(`${this.host}/documents/government`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
        const incoming = await Axios.get(`${this.host}/documents/incoming`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
        const internal = await Axios.get(`${this.host}/documents/internal`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data);
        const current = await Axios.get(`${this.host}/documents/current`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => res.data);
        console.log(incoming);
        return {
            forapprove,
            forsign,
            government,
            incoming,
            internal,
            current
        }

    }

    setDocumentViewed = async (url: string, token: string) => {
        return Axios.post(`${this.host}${url}`,{}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.data)
    }

    loadDocumentContent = async (document: any, token: string, hashMap: any, totalCacheSize: number) => {
        const attachments: DocAttachments = await this.loadAttachments(document, token);
        let result: any = Object.assign({}, document);
        if (document.state === 0) {
            this.setDocumentViewed(document.setViewed, token);
        }
        for (let attachment of attachments) {
            if (hashMap[attachment.mD5]) {
                attachment.path = hashMap[attachment.mD5].uri;
            } else if (attachment.name.split('.')[1] === 'pdf'){
                let { uri } = await FileSystem.downloadAsync(`${this.host}${attachment.content}`, 
                FileSystem.cacheDirectory + attachment.fileUid + '.pdf', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                console.log("RES", uri)
                hashMap[attachment.mD5] = {
                    uri,
                    size: attachment.size
                };
                totalCacheSize += attachment.size;
                attachment.path = uri;
            } else {
                let { uri } = await FileSystem.downloadAsync(`${this.host}${attachment.cachedPDF}`, 
                FileSystem.cacheDirectory + attachment.fileUid + '.pdf', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
                console.log("RES", uri)
                hashMap[attachment.mD5] = {
                    uri,
                    size: attachment.size
                };
                totalCacheSize += attachment.size;
                attachment.path = uri;
            }
        }
        

        const info = await Axios.get(`${this.host}${document.info}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => res.data)
        result.info = info;
        result.attachments = attachments;
        return { document: result, hashMap, totalCacheSize }
    }

    downloadFile = async (document: any, token: string) => {
        return await FileSystem.downloadAsync(`${this.host}${document.content}`, FileSystem.documentDirectory + document.name, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    saveToGalary = async (uri: string) => {
        let asset = await Media.createAssetAsync(uri);
        return await Media.createAlbumAsync("FASDOCS/Download", asset, true);
    }
}