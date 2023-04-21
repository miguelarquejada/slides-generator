import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LyricService {

  lyric: string = ''

  constructor() { }

  setData(lyric: string) {
    this.lyric = lyric
  }

  getDataString() {
    return this.lyric
  }

  getData() {
    return this.lyric.split('\n').filter(linha => linha.trim() !== '');
  }
}
