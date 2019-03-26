import {NativeDateAdapter} from "@angular/material";

/**
 * Code found on https://stackoverflow.com/questions/44452966/angular-2-material-2-datepicker-date-format
 */
export class AppDateAdapter extends NativeDateAdapter {


    getMonthNames(style: "long" | "short" | "narrow"): string[] {
        switch (style) {
            case 'long':
                return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout',
                    'Septembre', 'Octobre', 'Novembre', 'Décembre',];
            case 'short':
                return ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Déc',];
            case 'narrow':
            default:
                return ['Ja', 'F', 'Mar', 'A', 'Mai', 'Juin', 'Juil', 'A', 'S', 'O', 'N', 'D',];
        }
    }

    getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
        switch (style) {
            case 'long':
                return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
            case 'short':
                return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
            case 'narrow':
            default:
                return ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D'];
        }
    }

    format(date: Date, displayFormat: Object): string {

        if (displayFormat === 'input') {

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }

        return date.toDateString();
    }
}

export const APP_DATE_FORMATS =
    {
        parse: {
            dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
        },
        display: {
            dateInput: 'input',
            monthYearLabel: {year: 'numeric', month: 'numeric'},
            dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
            monthYearA11yLabel: {year: 'numeric', month: 'long'},
        }
    };
