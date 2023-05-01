import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LyricService } from '../services/lyric.service';
import { LyricsStoreService } from '../services/lyrics-store.service';
import { Song } from '../models/songs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router, private lyricService: LyricService, private lyricsStoreService: LyricsStoreService, private toastr: ToastrService) { }

  title: string = '';
  lyrics: string = '';

  songName: string = '';
  songs: Song[] = [];

  songsIsLoading: boolean = true;
  songIsSaving: boolean = false;

  @ViewChild('myTextarea') myTextarea!: ElementRef;

  ngAfterViewInit() {
    this.title = this.lyricService.getTitle();
    this.lyrics = this.lyricService.getLyric();
    this.myTextarea.nativeElement.focus();

    this.getSongs();
  }

  get filteredSongs() {
    return this.songs.filter(x => x.Title.toUpperCase().includes(this.songName.toUpperCase()))
  }

  showSuccess() {
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }

  getSongs() {
    this.songsIsLoading = true;
    this.lyricsStoreService.getSongs().then(result => {
      this.songs = result;
      this.songsIsLoading = false;
    });
  }

  replace(song: Song) {
    this.title = song.Title;
    this.lyrics = song.Lyric;
  }

  async delete(song: Song) {
    this.songsIsLoading = true;
    await this.lyricsStoreService.deleteSong(song);
    this.getSongs();
  }

  async save() {
    if(this.isEmpty())
      return;

    this.songIsSaving = true;
    let song = new Song(this.title, this.lyrics);
    await this.lyricsStoreService.addSong(song);
    this.getSongs();
    this.songIsSaving = false;
  }

  goToTheme(theme: number) {
    this.lyricService.setData(this.lyrics, this.title)
    if(!this.lyrics) {
      alert('Escreva algo para prosseguir')
      return
    }

    this.router.navigate(['theme', theme]);
  }

  clean() {
    this.title = '';
    this.lyrics = '';
  }

  isEmpty(): boolean {
    return !this.title || !this.lyrics;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 49) {
      this.goToTheme(0)
    }

    if (event.keyCode === 50) {
      this.goToTheme(1)
    }

    if (event.keyCode === 51) {
      this.goToTheme(2)
    }

    if (event.keyCode === 13) {
      this.myTextarea.nativeElement.focus();
    }

    if (event.keyCode === 27) {
      this.myTextarea.nativeElement.blur();
    }
  }

}
