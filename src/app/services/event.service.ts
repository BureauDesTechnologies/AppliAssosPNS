import {Injectable} from "@angular/core";
import {AngularFireStorage} from "angularfire2/storage";
import {Event} from "../models/event";
import * as firebase from "firebase";
import {firestore} from "firebase";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class EventService {

    constructor(private st: AngularFireStorage) {
    }


    /**
     * Retrieve the link of the main image of an event
     * @param event with imageUrl supplied
     * @throws Error if event.imageUrl is null, undefined or equals ''
     */
    async getDownloadImageUrl(event: Event): Promise<string> {
        if (event.imageUrl === '' || (event.imageUrl === null || event.imageUrl === undefined)) {
            throw Error("You should not try to load download url on a article without imageUrl");
        } else {
            return this.st.ref(event.imageUrl).getDownloadURL().toPromise();
        }
    }

    /**
     * Retrieve the link of the header image of an event
     * @param event with imageHeaderUrl supplied
     * @throws Error if event.imageHeaderUrl is null, undefined or equals ''
     */
    async getDownloadImageHeaderUrl(event: Event): Promise<string> {
        if (event.imageHeaderUrl === '' || (event.imageHeaderUrl === null || event.imageHeaderUrl === undefined)) {
            throw Error("You should not try to load download url on a article without imageUrl");
        } else {
            return this.st.ref(event.imageHeaderUrl).getDownloadURL().toPromise();
        }
    }

    addEvent(event: Event) {
        return firestore().collection('Events').add({
            title: event.title,
            content: event.content,
            category: event.category,
            imageUrl: event.imageUrl,
            imageHeaderUrl: event.imageHeaderUrl,
            startDate: event.startDate,
            endDate: event.endDate,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    async getAll(): Promise<Event[]> {
        const events: Event[] = [];
        const res = (await firestore().collection('Events').get()).docs;
        for (let doc of res) {
            const event: Event = Event.fromDB(doc);
            if ((event.imageUrl !== null && event.imageUrl !== undefined)) {
                event.downloadableImageUrl = await this.getDownloadImageUrl(event);
            }
            if ((event.imageHeaderUrl !== null && event.imageHeaderUrl !== undefined)) {
                event.downloadableImageHeaderUrl = await this.getDownloadImageHeaderUrl(event);
            }
            events.push(event)
        }
        return events;
    }

    async getAllOf(category: string): Promise<Event[]> {
        const events: Event[] = [];
        const res = (await firestore().collection('Events').where('category', '==', category).get()).docs;
        for (let doc of res) {
            const event: Event = Event.fromDB(doc);
            if ((event.imageUrl !== null && event.imageUrl !== undefined)) {
                event.downloadableImageUrl = await this.getDownloadImageUrl(event);
            }
            if ((event.imageHeaderUrl !== null && event.imageHeaderUrl !== undefined)) {
                event.downloadableImageHeaderUrl = await this.getDownloadImageHeaderUrl(event);
            }
            events.push(event)
        }
        return events;
    }
}
