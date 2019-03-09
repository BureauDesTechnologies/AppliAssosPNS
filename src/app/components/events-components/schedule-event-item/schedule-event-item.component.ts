import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-schedule-event-item',
    templateUrl: './schedule-event-item.component.html',
    styleUrls: ['./schedule-event-item.component.scss']
})
export class ScheduleEventItemComponent implements OnInit {

    @Input()
    event: Event;

    constructor() {
    }

    ngOnInit() {
    }

}
