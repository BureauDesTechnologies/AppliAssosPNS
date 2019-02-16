import {Injectable} from "@angular/core";
import {PopupComponent} from "../components/popup/popup.component";
import {MatSnackBar} from "@angular/material";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class PopupService {
    private currentPopup: any = null;

    constructor(private snackbar: MatSnackBar) {
    }

    /**
     * Open popup for cookies informations
     */
    openCookiePopup() {
        this.currentPopup = this.snackbar.openFromComponent<PopupComponent>(PopupComponent, {
            duration: 600000,
            panelClass: 'popupSnackBar',
            horizontalPosition: 'right',
        });
        this.currentPopup.instance.text = "Nous utilisons des cookies pour améliorer votre navigation, " +
            "pour en savoir plus, consultez les conditions d'utilisation.";
        this.currentPopup.instance.validateLabel = "OK";
    }

    /**
     * Open custom popup
     * @param text to display
     * @param duration of the popup
     */
    open(text: string, duration: number) {
        this.currentPopup = this.snackbar.openFromComponent<PopupComponent>(PopupComponent, {
            duration: duration,
            panelClass: 'popupSnackBar',
            horizontalPosition: 'right',
        });
        this.currentPopup.instance.text = text;
    }

    /**
     * Close current popup
     */
    close() {
        if (this.currentPopup === null) {
            return;
        }
        this.currentPopup.close();
        this.currentPopup = null;
    }
}
