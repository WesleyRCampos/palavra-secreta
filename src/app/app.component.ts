import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';

interface Card {
  letra: string;
  flipped: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FormsModule, CardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'palavra-secreta';
  secretPassword: Card[] = [];
  showLetter = false;
  wrongLetters: string[] = [];
  currentLetter = '';
  totalCharSecretWord = 0;
  tentativasRestantes: number;

  constructor() {
    this.tentativasRestantes = 0;
  }

  resetGame() {
    this.secretPassword = [];
    this.wrongLetters = [];
    this.currentLetter = '';
    this.tentativasRestantes = 0;

  }

  onPasswordChange(secretWord: string) {
    this.secretPassword = secretWord.split('').map(char => ({
      letra: char.toUpperCase(),
      flipped: true
    }));
    this.tentativasRestantes = secretWord.length * 2;
  }

  onAttempt() {
    let found = false;
    this.secretPassword = this.secretPassword.map(card => {
      if (card.letra === this.currentLetter.toUpperCase()) {
        found = true;
        return { ...card, flipped: false };
      }
      return card;
    });

    if (this.secretPassword.length === 0) {
      alert('Não é possivel Jogar pois a palavra secreta não foi preenchida!');
      return;
    }

    if (!found && !this.wrongLetters.includes(this.currentLetter.toUpperCase()) && this.currentLetter.toUpperCase()) {
      this.wrongLetters.push(this.currentLetter.toUpperCase());
      this.tentativasRestantes--;
    }
    if (this.tentativasRestantes === 0) {
      this.resetGame();
      setTimeout(() => {
        alert('Você Perdeu!');
        this.resetGame();
      }, 0);
    }
    else {
      this.checkWinCondition();
    }
    this.currentLetter = '';
  }
  checkWinCondition() {
    const isWin = this.secretPassword.every(card => !card.flipped);
    if (isWin) {
      this.flipAllCards();
      setTimeout(() => {
        alert('Parabéns, você venceu!');
        this.resetGame();
      }, 0);
    }
  }

  flipAllCards() {
    this.secretPassword = this.secretPassword.map(card => ({
      ...card,
      flipped: false
    }));
  }



}
