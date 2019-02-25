import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material";
import {Event} from "../../../models/event";
import {Router} from "@angular/router";
import {EventService} from "../../../services/event.service";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
    @Input()
    event: Event;

    user: User;
    imageToDisplay: string;

    constructor(private userService: UserService, private eventService: EventService,
                private snackbar: MatSnackBar, private router: Router) {
        this.event = new Event('', '', '', new Date(), new Date(), '', '');
        this.user = new User('', '', '', '', [], [], 'placeholder');
        this.imageToDisplay = '';
    }

    private _hourStart: number;

    get hourStart(): number {
        return this._hourStart;
    }

    set hourStart(value: number) {
        this._hourStart = (value > 23 ? 23 : (value < 0 ? 0 : value));
        if ((this.event.startDate !== null && this.event.startDate !== undefined)) {
            this.event.startDate.setHours(this.hourStart);
        }
    }

    private _minuteStart: number;

    get minuteStart(): number {
        return this._minuteStart;
    }

    set minuteStart(value: number) {
        this._minuteStart = (value > 59 ? 59 : (value < 0 ? 0 : value));
        if ((this.event.startDate !== null && this.event.startDate !== undefined)) {
            this.event.startDate.setMinutes(this.minuteStart);
        }
    }

    private _hourEnd: number;

    get hourEnd(): number {
        return this._hourEnd;
    }

    set hourEnd(value: number) {
        this._hourEnd = (value > 23 ? 23 : (value < 0 ? 0 : value));
        if ((this.event.endDate !== null && this.event.endDate !== undefined)) {
            this.event.endDate.setHours(this.hourEnd);
        }
    }

    private _minuteEnd: number;

    get minuteEnd(): number {
        return this._minuteEnd;
    }

    set minuteEnd(value: number) {
        this._minuteEnd = (value > 59 ? 59 : (value < 0 ? 0 : value));
        if ((this.event.endDate !== null && this.event.endDate !== undefined)) {
            this.event.endDate.setMinutes(this.minuteEnd);
        }
    }

    async ngOnInit() {
        this.hourStart = (this.event.startDate !== null && this.event.startDate !== undefined) ? this.event.startDate.getHours() : 0;
        this.minuteStart = (this.event.startDate !== null && this.event.startDate !== undefined) ? this.event.startDate.getMinutes() : 0;
        this.hourEnd = (this.event.endDate !== null && this.event.endDate !== undefined) ? this.event.endDate.getHours() : 0;
        this.minuteEnd = (this.event.endDate !== null && this.event.endDate !== undefined) ? this.event.endDate.getMinutes() : 0;
        this.user = await this.userService.getLoggedUser();
        if (this.user.canPublishAs.length === 1) {
            this.event.category = this.user.canPublishAs[0];
        }
    }
}
