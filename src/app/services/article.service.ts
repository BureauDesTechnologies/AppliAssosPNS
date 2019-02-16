import {Injectable} from "@angular/core";
import {AngularFireStorage} from "angularfire2/storage";
import * as firebase from "firebase";
import {firestore} from "firebase";
import {Article} from "../models/article";
import {User} from "../models/user";
import {ArticleComment} from "../models/article-comment";

/**
 * This class contains all functions used to manage users
 */
@Injectable()
export class ArticleService {

    constructor(private st: AngularFireStorage) {
    }

    /**
     * Retrieve the link of the image on a article
     * @param article with imageUrl supplied
     * @throws Error if article.imageUrl is null, undefined or equals ''
     */
    async getDownloadImageUrl(article: Article): Promise<string> {
        if (article.imageUrl === '' || (article.imageUrl === null || article.imageUrl === undefined)) {
            throw Error("You should not try to load download url on a article without imageUrl");
        } else {
            return this.st.ref(article.imageUrl).getDownloadURL().toPromise();
        }
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Add article in the database
     * @param article with title, content, category, imageUrl
     */
    addArticle(article: Article) {
        return firestore().collection('Articles').add({
            title: article.title,
            content: article.content,
            category: article.category,
            imageUrl: article.imageUrl,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Remove article
     * @param article with id supplied
     */
    deleteArticle(article: Article) {
        return firestore().collection('Articles').doc(article.id).delete();
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Add a fav on the article, add the user.id in the article fav collection
     * @param article with id supplied
     * @param user with id supplied
     */
    favArticle(article: Article, user: User) {
        article.favorite.add(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            favorite: [...Array.from(article.favorite.keys())],
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Add a clap on the article, add the user.id in the article clap collection
     * @param article with id supplied
     * @param user with id supplied
     */
    clapArticle(article: Article, user: User) {
        article.clap.add(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            clap: [...Array.from(article.clap.keys())],
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Remove a fav in the article list, use with caution, can cause a unsynchronous call that override a value
     * @param article with id supplied
     * @param user with id supplied
     */
    unfavArticle(article: Article, user: User) {
        article.favorite.delete(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            favorite: [...Array.from(article.favorite.keys())],
        });
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Remove a clap in the article list, use with caution, can cause a unsynchronous call that override a value
     * @param article with id supplied
     * @param user with id supplied
     */
    unclapArticle(article: Article, user: User) {
        article.clap.delete(user.userId);
        firestore().collection('Articles').doc(article.id).update({
            clap: [...Array.from(article.clap.keys())],
        });
    }

    /**
     * Post comment on an articlr
     * @param article
     * @param author
     * @param comment
     */
    async postComment(article: Article, author: User, comment: string): Promise<void> {
        // Load previous comments to avoid override
        await this.loadComments(article);

        const result = [];
        article.addComment(new ArticleComment(author, new Date(Date.now()), comment));
        // Convert to JSON objects
        article.getComments().forEach(commentC => {
            result.push({
                author: firestore().collection('Users').doc(commentC.author.userId),
                date: commentC.date.getTime(),
                content: commentC.content
            });
        });

        return firestore().collection('Articles').doc(article.id).set({
            comments: result,
        }, {merge: true});
    }

    /**
     * Load comments on a article, and supplies it
     * @param article
     */
    async loadComments(article: Article) {
        if ((article.comments === null || article.comments === undefined)) {
            article.comments = new Set();
        }
        const articleData = (await firestore().collection('Articles').doc(article.id).get()).data();
        if ((articleData.comments === null || articleData.comments === undefined)) {
            return;
        }
        const requests = [];
        articleData.comments.forEach(async comment => {
            const asyncR = comment.author.get();
            requests.push(asyncR);
            const user = User.fromDB(await asyncR);
            article.addComment(new ArticleComment(user, new Date(comment.date), comment.content));
        });
        return Promise.all(requests);
    }

    /**
     * Fetch all articles
     * No limit in data
     */
    async getAllArticles(): Promise<Article[]> {
        const articles = [];
        const docs = await firestore().collection('Articles').orderBy('creation', "desc").limit(10).get();
        docs.docs.forEach(async article => {
            const art: Article = Article.fromDB(article);
            if (art.imageUrl !== '' && (art.imageUrl !== null && art.imageUrl !== undefined)) {
                art.downloadableImageUrl = await this.getDownloadImageUrl(art);
            }
            articles.push(art);
        });
        return Promise.resolve(articles);
    }

    /**
     * Retrieve all articles with a specified category (asso)
     * @param category
     */
    async getAllArticlesOf(category: string): Promise<Article[]> {
        const articles = [];
        const docs = await firestore().collection('Articles')
            .where('category', '==', category)
            .orderBy('creation', "desc")
            .get();
        docs.docs.forEach(async article => {
            const art: Article = Article.fromDB(article);
            if (art.imageUrl !== '' && (art.imageUrl !== null && art.imageUrl !== undefined)) {
                art.downloadableImageUrl = await this.getDownloadImageUrl(art);
            }
            articles.push(art);
        });
        return Promise.resolve(articles);
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Use on the home view to retrieve articles when posted without refreshing the page
     * @param whatToDoWithArticles callback with the DocumentReference
     */
    streamLastArticles(whatToDoWithArticles) {
        return firestore().collection('Articles')
            .orderBy('creation', "desc").limit(10).onSnapshot(whatToDoWithArticles);
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Update an article
     * @param article to modify with id, title and content
     */
    updateArticle(article: Article): Promise<void> {
        return firestore().collection('Articles').doc(article.id).set({
            title: article.title,
            content: article.content,
        }, {merge: true});
    }
}
