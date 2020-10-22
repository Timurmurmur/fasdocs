import * as Media from 'expo-media-library';

export const getMediaPermissions = async () => {
    const permission = await Media.getPermissionsAsync();
    if (!permission.granted) {
        let status = await Media.requestPermissionsAsync();
        if (status.granted) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}