export class Notification {
    title: string;
    body: string;
    sendBy: string;

    constructor(title: string, body: string, sendBy: string) {
        this.title = title;
        this.body = body;
        this.sendBy = sendBy;
    }
}
