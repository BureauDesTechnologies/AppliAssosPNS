import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {Article} from "../../../models/article";
import {EventService} from "../../../services/event.service";
import {Event} from "src/app/models/event";

@Component({
    selector: 'app-add-article',
    templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss']
})
/**
 * Use to supply an article to add later
 */
export class AddArticleComponent implements OnInit {
    /**
     * Article to supply, passed by the parent component, that will add this article later
     */
    @Input()
    article: Article;
    /**
     * Only used to verify that user can publish
     */
    @Input()
    user: User;
    imageToDisplay: string;

    events: Event[];

    constructor(private eventService: EventService) {
        this.imageToDisplay = '';
        this.article =
            new Article(null, "", "", "", "", [], [], null);
    }

    async ngOnInit() {
        if (this.user.canPublishAs.length === 1) {
            this.article.category = this.user.canPublishAs[0];
        }
        this.events = await this.eventService.getAll();
    }
}
