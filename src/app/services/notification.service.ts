import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {UserService} from './user.service';
import {User} from '../models/user';

@Injectable()
export class NotificationService {

    messaging = firebase.messaging();
    currentMessage = new BehaviorSubject(null);

    constructor(private userService: UserService) { }

    getPermission(user: User) {
        this.messaging.requestPermission()
            .then(() => {
                console.log('Notification permission granted.');
                return this.messaging.getToken();
            })
            .then(token => {
                console.log(token);
                this.userService.updateFcmToken(user, token);
            })
            .catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
    }

    receiveMessage() {
        this.messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
            this.currentMessage.next(payload);
        });

    }
}
