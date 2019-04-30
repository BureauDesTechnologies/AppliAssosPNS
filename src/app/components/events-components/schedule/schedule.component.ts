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
        // this.events = [new Event("Titre", "Description de l'évenement pour que les gens comprenne de quoi il s'agit et vienne à ce super event de la mort qui tue tout. Mais bon, là c'est surtout une description loongue comme la mort pour permettre de verifier l'affichage", "Bureau des Élèves", new Date('05/02/2019 15:20'), null, "", "")];
    }

    eventOf(date: Date): Event[] {
        const startOfDay = date.getTime() - (date.getTime() % this.DAY_TIME);
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

    nextWeek() {
        let newDays: Date[] = [];
        for (let i = 7; i < this.days.length; ++i) { //init with next weeks
            newDays.push(this.days[i]);
        }
        for (let i = 0; i < 7; ++i) {
            newDays.push(new Date(newDays[newDays.length - 1].getTime() + this.DAY_TIME))
        }
        this.days = newDays;
    }

    previousWeek() {
        let newDays: Date[] = [];

        for (let i = 7; i > 0; --i) {
            newDays.push(new Date(this.days[0].getTime() - i * this.DAY_TIME))
        }
        for (let i = 0; i < this.days.length - 7; ++i) { //init with next weeks
            newDays.push(this.days[i]);
        }
        this.days = newDays;
    }

    previousMonth() {
        let newDays: Date[] = [];
        for (let i = this.days.length - 1; i >= 0; --i) {
            newDays.push(new Date(this.days[0].getTime() - this.DAY_TIME - i * this.DAY_TIME))
        }
        this.days = newDays;
    }

    nextMonth() {
        let newDays: Date[] = [];
        for (let i = 0; i < this.days.length; ++i) {
            newDays.push(new Date(this.days[this.days.length - 1].getTime() + this.DAY_TIME + i * this.DAY_TIME))
        }
        this.days = newDays;
    }

    /**
     * Used to get the date from index for mobile display
     * @param index of the day in days array corresponding to days displayed on desktop
     */
    day(index: number): Date {
        return this.days[index];
    }

}
