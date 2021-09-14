import axios from "axios";
import HtmlEntity from "./HtmlEntity";

function generateQueryParams(setting) {
    let queryStr = '';
    Object.keys(setting).forEach(k => queryStr += setting[k] ? `${k}=${encodeURIComponent(setting[k])}&` : '');
    return queryStr.slice(0, -1);
}

class YTAPI {
    static API_URL = 'https://www.googleapis.com/youtube/v3/';
    static API_KEY = 'AIzaSyDdIuxIhjH9h39S3bcqtRsHR3NdAU6y4J4';//'AIzaSyC7Vgokbg3RXEbPZYzUQfFzSCpOBVEMiGc';

    static query = (searchText, pageToken = null) => {
        const setting = {
            part: 'snippet',
            maxResults: 25,
            type: 'video',
            pageToken: pageToken,
            q: searchText, // query
            key: YTAPI.API_KEY
        };

        const url = `${YTAPI.API_URL}search?${generateQueryParams(setting)}`;
        //console.log(url);
        return axios.get(url);
    };

    static EMBED_URL = 'https://www.youtube.com/embed/';
    static queryResult = response => {
        return response.data.items.map(item => {
            const detail = item.snippet;
            const thumbnail = detail.thumbnails;
            return {
                url: YTAPI.EMBED_URL + item.id.videoId,
                channel: { id: detail.channelId, title: HtmlEntity.decode(detail.channelTitle) },
                title: HtmlEntity.decode(detail.title),
                description: HtmlEntity.decode(detail.description),
                thumbnail: (thumbnail.high || thumbnail.medium || thumbnail.default).url
            }
        });
    };

    static channel = id => {
        const setting = {
            key: YTAPI.API_KEY,
            part: 'snippet',
            id: id
        };

        const url = `${YTAPI.API_URL}channels?${generateQueryParams(setting)}`;
        return axios.get(url);
    };

    static channelResult = response => {
        const [channel] = response.data.items;
        const thumbnail = channel.snippet.thumbnails;
        return {
            id: channel.id,
            title: HtmlEntity.decode(channel.snippet.title),
            thumbnail: (thumbnail.medium || thumbnail.default).url
        }
    };

    static getNextPageToken = response => response.data.nextPageToken;

    static errorMessage = error => {
        if (error.response) {
            // Request made and server responded
            const apiError = error.response.data;
            return apiError.error.message;
        }
        else if (error.request) {
            // The request was made but no response was received
            return 'Unable to reach API service.';
        }
        else {
            // Something happened in setting up the request that triggered an Error
            return 'Unexpected error has occurred.';
        }
    }
};

export default YTAPI;