import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';
import {Notification} from '../../../models/notification';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    notification: Notification;
    message;

    constructor(private userService: UserService, private notificationService: NotificationService) {
        this.notification = new Notification("","");
    }

    async ngOnInit() {
        this.notificationService.getPermission(null);
        this.notificationService.receiveMessage();
        this.message = this.notificationService.currentMessage;
    }


}
