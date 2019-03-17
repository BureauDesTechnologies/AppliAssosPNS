import {Component, Input, OnInit} from '@angular/core';
import {Event} from "src/app/models/event";
import {Router} from "@angular/router";

@Component({
    selector: 'app-schedule-event-item',
    templateUrl: './schedule-event-item.component.html',
    styleUrls: ['./schedule-event-item.component.scss']
})
export class ScheduleEventItemComponent implements OnInit {

    @Input()
    event: Event;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    gotoEvent() {
        this.router.navigate(['/event', {id: this.event.id}]);
    }
}
