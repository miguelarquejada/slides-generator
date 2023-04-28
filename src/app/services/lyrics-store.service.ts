import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore";
import { Song } from '../models/songs';

@Injectable({
  providedIn: 'root'
})
export class LyricsStoreService {

  firebaseConfig = {
    apiKey: "AIzaSyDioSVXDvPWxCrWZRK9Mzc_8H_7AH-CUVE",
    authDomain: "slidesgenerator-mov.firebaseapp.com",
    projectId: "slidesgenerator-mov",
    storageBucket: "slidesgenerator-mov.appspot.com",
    messagingSenderId: "684496981162",
    appId: "1:684496981162:web:042411dc8d0c39346094d3",
    measurementId: "G-7ZW7EZFM7B"
  }

  db: Firestore;

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  async addSong(song: Song) {
    await setDoc(doc(this.db, "songs", song.Title), {
      Title: song.Title,
      Lyric: song.Lyric
    });
  }

  async getSongs(): Promise<Song[]> {
    const q = query(collection(this.db, "songs"));
    const querySnapshot = await getDocs(q);

    let result: Song[] = [];
    querySnapshot.forEach((doc) => {
      result.push(<Song>doc.data())
    });

    return result;
  }

  async deleteSong(song: Song) {
    await deleteDoc(doc(this.db, "songs", song.Title));
  }
}
