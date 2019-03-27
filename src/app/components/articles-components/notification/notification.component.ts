import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';
import {Notification} from '../../../models/notification';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    notification: Notification;
    message;

    constructor(private userService: UserService, private notificationService: NotificationService, private snackbar: MatSnackBar) {
        this.notification = new Notification("","","");
    }

    async ngOnInit() {
        this.notificationService.getPermission(null);
        this.notificationService.receiveMessage();
        this.message = this.notificationService.currentMessage;
    }

    sendNotification() {
        if (this.notification.title !== '' && this.notification.body !== '' && this.notification.sendBy !== '') {
            this.notificationService.addNotification(this.notification).then(() => {
                this.snackbar.open('Notification a été ajouté', null, {duration: 1500});
            });
        } else {
            this.snackbar.open('Veuillez renseigner les champs obligatoires', null, {duration: 1500});
        }
    }

}
