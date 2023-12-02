import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Config } from 'src/config';
import { giveCurrentDateTime } from 'src/libs/common/helpers/utils';

initializeApp({
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  appId: Config.FIREBASE_APP_ID,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
});

const storage = getStorage();

export class FirebaseStorage {
  static uploadFile = async (doc: Express.Multer.File) => {
    try {
      const dateTime = giveCurrentDateTime();
      const storageRef = ref(
        storage,
        `files/${doc.originalname + '       ' + dateTime}`,
      );

      // Create file metadata including the content type
      const metadata = {
        contentType: doc.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        doc.buffer,
        metadata,
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('File successfully uploaded.');
      return {
        name: doc.originalname,
        url: downloadURL,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static uploadFiles = async (docs: Express.Multer.File[]) => {
    try {
      const documentDetails : {name: string, url: string}[] = [];
      for (const doc of docs) {
        const details = await FirebaseStorage.uploadFile(doc);
        documentDetails.push(details);
      }

      return documentDetails ;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
