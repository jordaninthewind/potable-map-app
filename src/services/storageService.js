import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();

export const uploadWaterSourcePhoto = async ({ uri, id, filename }) => {
  try {
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

    const fileRef = ref(getStorage(), `/water-sources/${id}/${filename}.jpg"`);

    const result = await uploadBytes(fileRef, blob);

    blob.close();

    return await getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};
