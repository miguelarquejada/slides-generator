import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LyricService } from '../lyric.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router, private lyricService: LyricService) { }

  lyrics: string = ''
  @ViewChild('myTextarea') myTextarea!: ElementRef;

  ngAfterViewInit(): void {
    this.lyrics = this.lyricService.getDataString()
    this.myTextarea.nativeElement.focus();
  }

  goToBlueTheme() {
    this.lyricService.setData(this.lyrics)
    if(!this.lyrics) {
      alert('Escreva algo para prosseguir')
      return
    }

    this.router.navigate(['blue']);
  }

  goToPinkTheme() {
    this.lyricService.setData(this.lyrics)
    if(!this.lyrics) {
      alert('Escreva algo para prosseguir')
      return
    }

    this.router.navigate(['pink']);
  }

  goToDarkTheme() {
    this.lyricService.setData(this.lyrics)
    if(!this.lyrics) {
      alert('Escreva algo para prosseguir')
      return
    }

    this.router.navigate(['dark']);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 49) {
      this.goToBlueTheme()
    }

    if (event.keyCode === 50) {
      this.goToPinkTheme()
    }

    if (event.keyCode === 51) {
      this.goToDarkTheme()
    }

    if (event.keyCode === 13) {
      this.myTextarea.nativeElement.focus();
    }

    if (event.keyCode === 27) {
      this.myTextarea.nativeElement.blur();
    }
  }

}
