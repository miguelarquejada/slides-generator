import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { LyricService } from '../services/lyric.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  lyrics: string[] = [];
  index: number = 0;

  showTitle: boolean = true;
  showLogo: boolean = false;
  showContent: boolean = false;

  isFullScreen: boolean = false;

  themes = ['fundo-azul.png', 'fundo-rosa.png', 'fundo-preto.png']
  currentTheme: string = this.themes[0];

  constructor(private lyricService: LyricService, private router: Router, private route: ActivatedRoute) {
    let themeParameter = Number(this.route.snapshot.paramMap.get('theme')) ?? 0;
    this.currentTheme = this.themes[themeParameter];
  }

  ngOnInit() {
    this.lyrics = this.lyricService.getData();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 37 && this.index > 0) {
      this.index--;
    } else if (event.keyCode === 39 && this.index < this.lyrics.length) {
      this.index++;
    } else if (event.keyCode === 27 && this.isFullScreen) {
      this.isFullScreen = false
      this.router.navigate(['/']);
    } else if (event.keyCode === 27 && !this.isFullScreen) {
      this.router.navigate(['/']);
    } else if (event.keyCode === 13) {
      this.toggleFullScreen()
    }

    this.verifyPages()
  }

  verifyPages() {
    if (this.index == 0) {
      this.showTitle = true
      this.showLogo = false
      this.showContent = false
      return
    }

    if (this.index == this.lyrics.length) {
      this.showLogo = true
      this.showTitle = false
      this.showContent = false
      return
    }

    this.showLogo = false
    this.showTitle = false
    this.showContent = true
  }

  toggleFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen;
    const cancelFullScreen = doc.exitFullscreen;

    if (!this.isFullScreen) {
      this.isFullScreen = true;
      requestFullScreen.call(docEl);
    } else {
      this.isFullScreen = false;
      cancelFullScreen.call(doc);
    }
  }
}
