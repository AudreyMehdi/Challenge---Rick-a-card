import { Component, OnInit, OnDestroy } from '@angular/core';
import { CharacterService } from '../../character.service';
import { Character } from '../../Models/character';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit, OnDestroy {
  character: Character | null = null; // Initialisez character à null
  canClickButton: boolean = true;
  countdown: number = 0;
  countdownInterval: any;
  readonly FIVE_SECONDS = 5 * 1000; // 5 seconds in milliseconds

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    const lastClickTime = localStorage.getItem('lastClickTime');
    if (lastClickTime) {
      const timeElapsed = Date.now() - parseInt(lastClickTime, 10);
      if (timeElapsed < this.FIVE_SECONDS) {
        this.canClickButton = false;
        this.countdown = Math.floor((this.FIVE_SECONDS - timeElapsed) / 1000); // initial countdown in seconds
        this.startCountdown();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  getRandomCharacter() {
    if (!this.canClickButton) {
      alert('Vous devez attendre 5 secondes avant de cliquer à nouveau.');
      return;
    }

    this.characterService.getAllCharacters().subscribe((character: Character) => {
      this.character = character;
      localStorage.setItem('lastClickTime', Date.now().toString());
      this.canClickButton = false;
      this.countdown = this.FIVE_SECONDS / 1000; // 5 seconds in seconds
      this.startCountdown();
    });
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canClickButton = true;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }
}
