import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    constructor(private userService: UserService, private notificationService: NotificationService) {
    }

    message;

    async ngOnInit() {
        this.userService.getUser('PCdpYgT9N2fCwHsVL2TYoHjg0Gk2').then( user => this.notificationService.getPermission(user));
        this.notificationService.receiveMessage();
        this.message = this.notificationService.currentMessage;
    }


}
