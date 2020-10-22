import { BaseDataProvider } from "./BaseDataProvider";
import Axios from "axios";

export class SearchDataProvider extends BaseDataProvider {
    search = (str: string, token: string) => {
        return Axios.get(`${this.host}/search/helpers?numberPart=${str}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.data);
    }

    getDocumentByHelper = async (helper: string, token: string) => {
        const documents: any = await Axios.get(`${this.host}/search/bystring?searchStr=${helper}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.data);
        // for (let el of documents) {
        //     const info = await Axios.get(`${this.host}${el.attachments}`, {
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         }
        //     }).then(res => res.data);
            
        //     el.attachments = info;
        // }

        return documents;

        // documents.map( async (el: any, index: number) => {
        //     const info = await Axios.get(`${this.host}${el.info.slice(0,1)}`).then(res => res.data);
        //     el.infoData = info;
        //     return el
        // })
    }
}