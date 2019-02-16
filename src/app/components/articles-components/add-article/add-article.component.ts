import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../../models/user";
import {Article} from "../../../models/article";

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
    article;
    /**
     * Only used to verify that user can publish
     */
    @Input()
    user: User;
    imageToDisplay: string;

    constructor() {
        this.imageToDisplay = '';
        this.article =
            new Article(null, "", "", "", "", [], [], null);
    }

    ngOnInit() {
        if (this.user.canPublishAs.length === 1) {
            this.article.category = this.user.canPublishAs[0];
        }
    }
}
