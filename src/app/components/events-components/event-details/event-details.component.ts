import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event";

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    event: Event;

    constructor(private route: ActivatedRoute, private eventService: EventService) {
    }

    async ngOnInit() {
        let eventId = this.route.snapshot.paramMap.get("id");
        console.log(eventId);
        this.event = await this.eventService.getEventFromId(eventId);
    }

}
