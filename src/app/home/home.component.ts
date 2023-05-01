import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LyricService } from '../services/lyric.service';
import { LyricsStoreService } from '../services/lyrics-store.service';
import { Song } from '../models/songs';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';

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

  theme: string = 'blue';

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
    this.deleteSuccess();
  }

  async save() {
    if(this.isEmpty()) {
      this.songIsEmptyMessage();
      return;
    }

    this.songIsSaving = true;
    let song = new Song(this.title, this.lyrics);
    await this.lyricsStoreService.addSong(song);
    this.getSongs();
    this.songIsSaving = false;
    this.saveSuccess();
  }

  goToTheme() {
    if(this.isEmpty()) {
      this.songIsEmptyMessage();
      return;
    }

    this.lyricService.setData(this.lyrics, this.title)
    this.router.navigate(['theme', this.theme]);
  }

  clean() {
    this.title = '';
    this.lyrics = '';
  }

  isEmpty(): boolean {
    return !this.title || !this.lyrics;
  }

  saveSuccess() {
    this.toastr.success('A música foi salva com sucesso', 'Sucesso', {
      closeButton: true
    });
  }

  deleteSuccess() {
    this.toastr.success('A música foi removida com sucesso', 'Sucesso', {
      closeButton: true
    });
  }

  songIsEmptyMessage() {
    this.toastr.info('Preencha todos os campos', 'Falha ao salvar música', {
      closeButton: true
    });
  }

  captureScreen()
  {
    // var pageWidth = 1920;
    // var pageHeight = 1080;

    // let pdf = new jsPDF({
    //   orientation: "landscape",
    //   unit: "px",
    //   format: [1920, 1080]
    // });

    // pdf.addFont("assets/fonts/RussoOne-Regular.ttf", "RussoOne", "normal");
    // pdf.setFont("RussoOne");

    // var fontSize = 100;
    // pdf.setFontSize(fontSize);
    // pdf.setTextColor(255,255,255)

    // pdf.addImage('assets/images/fundo-azul.png', 'PNG', 0, 0, pageWidth, pageHeight);

    // var text = "TEXTO PARA CENTRALIZAR";
    // var maxWidth = 1000;
    // var lineHeight = pdf.getLineHeight() / pdf.internal.scaleFactor;
    // var lines = pdf.splitTextToSize(text, maxWidth);
    // var textHeight = lines.length * lineHeight;
    // var textWidth = pdf.getTextWidth(lines[0]);
    // var textX = (pageWidth - textWidth) / 2;
    // var textY = (pageHeight - textHeight) / 2;

    // pdf.text(lines, textX, textY + lineHeight, { align: "center" });

    // pdf.save('letra.pdf');
  }
}
