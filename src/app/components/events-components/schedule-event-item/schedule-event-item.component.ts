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

    getAssoLogo(): string {
        switch (this.event.category) {
            case 'Bureau des Élèves':
                return "assets/logoAssos/logoBDE.png";
            case 'Bureau des Arts':
                return "assets/logoAssos/logoBDA.png";
            case 'Bureau des Jeux':
                return "assets/logoAssos/logoBDJ.png";
            case 'Humanitaire et Environnement':
                return "assets/logoAssos/logoBDHE.png";
            case 'Polytech Nice Conseil':
                return "assets/logoAssos/logoPNC.png";
            case 'BREI':
                return "assets/logoAssos/logoBREI.png";
            case 'Bureau du Sport':
                return "assets/logoAssos/logoBDS.png";
            case 'Bureau du Code':
                return "assets/logoAssos/logoBDC.png";
            default:
                return "";
        }
    }

    shorten(text: string, length: number): string {
        if (text.length < length) {
            return text;
        }
        let res = "";
        let endRes = length;
        while (this.event.content[endRes] !== ' ') {
            --endRes;
        }
        if ((this.event.content !== null && this.event.content !== undefined)) {
            res = this.event.content.substr(0, endRes);
        }
        //Add ... if the desc has been shorten
        return res + (res.length < this.event.content.length ? ' ...' : '');
    }
}
