import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadWaterSourcePhoto = async ({ id, filename, image }) => {
  try {
    const uri = image.uri;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `/water-sources/${id}/${filename}"`);

    const result = await uploadBytes(fileRef, blob);

    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};
