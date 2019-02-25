export class Event {
    title: string;
    content: string;
    category: string;
    startDate: Date;
    endDate: Date;
    imageUrl: string;
    imageHeaderUrl: string;

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
}
