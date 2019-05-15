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

    // a new line for each equipment
   // evt.title = `${pret.id}:${pret.debut}`;
    evt.title = 'indisponible';

    evt.start = pret.debut + '';
    evt.end = pret.finPrevue + '';

    // random color for this booking
    evt.color = '#FF0000';

    evt.url = `http://localhost:4200/pret/${pret.id}`;// TODO change to route

    evt.rendering = 'background';

    return evt;
  }

  getEvents(materielId: number) {
   // const materielId = +this.route.snapshot.params['id'];
    // console.log(this.route.snapshot.params.id);
    console.log(materielId);
    return this.pretService.getListePretsByMateriel(+materielId)
      .toPromise()
      .then(
        prets => {
          console.log(prets);
          return prets.map(EventService.pretsToEvent);
        }
      );

  }


}
