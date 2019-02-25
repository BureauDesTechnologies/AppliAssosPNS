import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/article";
import {Event} from "../../../models/event";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {EventService} from "../../../services/event.service";

@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.scss']
})
/**
 * Main publishing component, that containt the method to publish the article in the databse
 * Must use subcomponents to supply article info such as AddArticleComponent
 */
export class PublishComponent implements OnInit {

    user: User;
    canPublish;
    kindToAdd: string;

    articleToSupply: Article;
    eventToSupply: Event;

    constructor(private userService: UserService, private articleService: ArticleService,
                private eventService: EventService,
                private snackbar: MatSnackBar, private router: Router) {
        this.user = new User('', '', '', '', [], [], 'placeholder');
        this.kindToAdd = 'article';
    }

    async ngOnInit() {
        this.eventToSupply = new Event('', '', '', null, null, '', '');
        this.articleToSupply =
            new Article(null, "", "", "", "", [], [], null);
        this.user = await this.userService.getLoggedUser();
        this.canPublish = this.user.canPublishAs.length >= 1;
    }

    publish() {
        if (this.kindToAdd === 'article') {
            this.publishArticle()
        } else if (this.kindToAdd === 'event') {
            this.publishEvent();
        }
    }

    publishArticle() {
        if (this.articleToSupply.title !== '' && this.articleToSupply.content !== '' && this.articleToSupply.category !== '') {
            this.articleService.addArticle(this.articleToSupply).then(() => {
                this.snackbar.open('L\'article a été ajouté', null, {duration: 1500});
            });
            setTimeout(() => {
                this.router.navigate(['/']);
            }, 1500);
        } else {
            this.snackbar.open('Veuillez renseigner les champs obligatoires', null, {duration: 1500});
        }
    }

    publishEvent() {
        if (this.eventToSupply.title !== '' && this.eventToSupply.content !== '' && this.eventToSupply.category !== ''
            && this.eventToSupply.startDate !== null) {
            if (this.eventToSupply.startDate >= new Date(Date.now())) {
                this.eventService.addEvent(this.eventToSupply).then(() => {
                    this.snackbar.open('L\'événement a été ajouté', null, {duration: 1500});
                });
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1500);
            } else {
                this.snackbar.open('Vous ne pouvez pas antidater un événement', null, {duration: 1500});
            }
        } else {
            this.snackbar.open('Veuillez renseigner les champs obligatoires', null, {duration: 1500});
        }
    }
}
