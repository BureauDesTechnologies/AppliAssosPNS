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
        const events = [];
        const res = (await firestore().collection('Events').get()).docs;
        for (let doc of res) {
            events.push(Event.fromDB(doc))
        }
        return events;
    }

    async getAllOf(category: string): Promise<Event[]> {
        const events = [];
        const res = (await firestore().collection('Events').where('category', '==', category).get()).docs;
        for (let doc of res) {
            events.push(Event.fromDB(doc))
        }
        return events;
    }
}
