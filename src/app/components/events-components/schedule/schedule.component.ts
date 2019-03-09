import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Event} from "src/app/models/event";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
    days: Date[];
    events: Event[];
    private DAY_TIME: number = 1000 * 60 * 60 * 24;

    constructor(private eventService: EventService) {
        this.days = [];
    }

    static getMonday(date: number): Date {
        let d = new Date(date);
        const day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    async ngOnInit() {
        let startWeek = ScheduleComponent.getMonday(Date.now());
        for (let i = 0; i < 28; ++i) {
            this.days.push(new Date(startWeek.getTime() + i * this.DAY_TIME))
        }
        this.events = await this.eventService.getAll();
    }

    eventOf(date: Date): Event[] {
        const startOfDay = date.getTime() - (date.getTime() % this.DAY_TIME);
        const endOfDay = startOfDay + this.DAY_TIME - 1;
        const result = [];
        if ((this.events !== null && this.events !== undefined)) {
            for (let event of this.events) {
                if (event.startDate.getTime() > startOfDay && event.startDate.getTime() < startOfDay + this.DAY_TIME - 1) {
                    result.push(event);
                }
            }
        }
        return result;
    }

}
