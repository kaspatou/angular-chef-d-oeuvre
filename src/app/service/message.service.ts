import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  afficher = false;
  messages: string[] = [];
  dureAffichage = 5;
  afficheDepuis = 0;
  timer;

  onInit() {
  }

  add(message: string, affichage = false) {
    if (affichage) {
      this.afficher = true;
      this.messages.push(message);
      this.dureAffichage = 0;
      this.timer = setInterval(() => {
        this.afficheDepuis = this.afficheDepuis + 1;
        if (this.afficheDepuis >= this.dureAffichage) {
          this.clear();
        }
      }, 3000);
    }
  }


  clear() {
    this.afficher = false;
    this.messages = [];
    clearInterval(this.timer);
  }
}
