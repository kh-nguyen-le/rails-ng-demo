import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ActionCable from 'actioncable';

@Injectable({
  providedIn: 'root'
})
export class CableService {
  sockUrl = environment.sockUrl;
  cable: ActionCable.Cable = ActionCable.createConsumer(environment.sockUrl);

  constructor() { }

  joinSynchroChannel(type: string, id: number, callbacks: Object) {
    return this.cable.subscriptions.create({channel: 'SynchroChannel', type: type, id: id}, callbacks);
  }

}
