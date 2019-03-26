import {Component, Input, OnInit} from "@angular/core";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-asso-presentation',
    templateUrl: './asso-presentation.component.html',
    styleUrls: ['./asso-presentation.component.css']
})
export class AssoPresentationComponent implements OnInit {
    @Input()
    name: string;
    /**
     * Default : doesn't align but justify text
     */
    @Input()
    align: 'left' | 'right' | 'justify';
    @Input()
    descriptions: string[];
    @Input()
    mail: string;
    /**
     * Default '', doesn't display if not supplied
     */
    @Input()
    logo: string;
    @Input()
    facebookName: string;
    @Input()
    facebookUrl: string;
    @Input()
    twitterName: string;
    @Input()
    twitterUrl: string;
    @Input()
    linkedinName: string;
    @Input()
    linkedinUrl: string;

    constructor(private icons: MatIconRegistry, private domSanitizer: DomSanitizer) {
        icons.addSvgIcon('facebook',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/logoSocialNetwork/facebook.svg"));
        icons.addSvgIcon('twitter',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/logoSocialNetwork/twitter.svg"));
        icons.addSvgIcon('linkedin',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/logoSocialNetwork/linkedin.svg"));
        icons.addSvgIcon('mail',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/logoSocialNetwork/mail.svg"));
        this.name = '';
        this.descriptions = [];
        this.mail = '';
        this.facebookName = '';
        this.facebookUrl = '';
        this.twitterName = '';
        this.twitterUrl = '';
        this.linkedinName = '';
        this.linkedinUrl = '';
        this.logo = '';
        this.align = 'justify';
    }

    ngOnInit() {
    }

}
