import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ActionCable from '@rails/actioncable';

@Injectable({
  providedIn: 'root',
})
export class CableService {
  sockUrl = environment.sockUrl;
  cable: ActionCable.Consumer = ActionCable.createConsumer(environment.sockUrl);

  joinSynchroChannel(
    type: string,
    id: number,
    callbacks: unknown
  ): ActionCable.Subscription {
    return this.cable.subscriptions.create(
      { channel: 'SynchroChannel', type: type, id: id },
      callbacks
    );
  }
}
