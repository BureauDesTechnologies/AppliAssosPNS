import * as firebase from "firebase";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class Event {
    id: string;
    title: string;
    content: string;
    category: string;
    startDate: Date;
    endDate: Date;
    imageUrl: string;
    imageHeaderUrl: string;
    downloadableImageUrl: string = null;
    downloadableImageHeaderUrl: string = null;

    constructor(title: string, content: string, category: string, startDate: Date,
                endDate: Date, imageUrl: string, imageHeaderUrl: string) {
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
        this.imageHeaderUrl = imageHeaderUrl;
        this.category = category;
    }

    static fromDB(doc: DocumentSnapshot): Event {
        const event = Event.fromJSON(doc.data());
        event.id = doc.id;
        return event;

    }

    static fromJSON(doc): Event {
        return new Event(doc.title, doc.content, doc.category, new Date(doc.startDate.seconds * 1000),
            doc.endDate !== null ? new Date(doc.endDate.seconds * 1000) : null,
            doc.imageUrl !== '' ? doc.imageUrl : null,
            doc.imageHeaderUrl !== '' ? doc.imageHeaderUrl : null);
    }
}
