import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../models/event";
import {Article} from "../../../models/article";

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

    event: Event;
    articles: Article[];

    constructor(private route: ActivatedRoute, private eventService: EventService) {
        this.articles = [];
    }

    async ngOnInit() {
        let eventId = this.route.snapshot.paramMap.get("id");
        this.event = await this.eventService.getEventFromId(eventId);
        this.articles = await this.eventService.getAllArticlesOfEvent(this.event);
    }

}
