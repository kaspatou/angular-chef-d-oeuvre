import {Injectable} from '@angular/core';
import {PretService} from './pret.service';
import {ActivatedRoute} from '@angular/router';
import {Pret} from '../model/pret.model';
import {Event} from '../model/event.model';

@Injectable ({
  providedIn: 'root'
})

export class EventService {

  //materielId: number;

  constructor(private pretService: PretService, private route: ActivatedRoute) {
    }

  static pretsToEvent(pret: Pret): Event {
    const evt = new Event();
    evt.id = pret.id;

    // une ligne pour chaque matériel

    evt.title = 'indisponible';
    evt.start = pret.debut + '';
    evt.end = pret.finPrevue + '';

    // choix de la couleur de fond des périodes de prêt sur le calendrier
    evt.color = '#FF0000';
    evt.url = `http://localhost:4200/pret/${pret.id}`;
    evt.rendering = 'background';
    return evt;
  }

  getEvents(materielId: number) {
    return this.pretService.getListePretsByMateriel(+materielId)
      .toPromise()
      .then(
        prets => {
          return prets.map(EventService.pretsToEvent);
        }
      );

  }


}
