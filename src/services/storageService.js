import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { setUploadProgress, clearUploadProgress } from '@state/appSlice';

export const uploadWaterSourcePhoto =
    ({ markerId, image }) =>
    async (dispatch) => {
        const uri = image.uri;

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const storageRef = ref(getStorage(), 'images/' + markerId);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            'state_changed',
            ({ bytesTransferred, totalBytes, state }) => {
                const progress = bytesTransferred / totalBytes;

                dispatch(setUploadProgress(progress));

                switch (state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            async () => {
                dispatch(clearUploadProgress());
                const url = await getDownloadURL(uploadTask.snapshot.ref);

                return url;
            }
        );
    };
