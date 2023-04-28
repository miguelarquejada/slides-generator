import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LyricService {

  title: string = '';
  lyric: string = '';

  constructor() { }

  setData(lyric: string, title: string) {
    this.title = title;
    this.lyric = lyric;
  }

  getTitle(): string {
    return this.title;
  }

  getLyric(): string {
    return this.lyric;
  }

  getData(): string[] {
    let arrayResult = this.lyric.split('\n').filter(linha => linha.trim() !== '');
    arrayResult.unshift(this.title);
    return arrayResult;
  }
}
