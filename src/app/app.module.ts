import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PopupService} from "./services/popup.service";
import {PopupComponent} from "./components/popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule
} from "@angular/material";
import {AssoPresentationComponent} from "./components/assos-components/asso-presentation/asso-presentation.component";
import {AssosOverviewComponent} from "./components/assos-components/assos-overview/assos-overview.component";
import {PncComponent} from "./components/assos-components/assos-pages/pnc/pnc.component";
import {BdaComponent} from "./components/assos-components/assos-pages/bda/bda.component";
import {BdhComponent} from "./components/assos-components/assos-pages/bdh/bdh.component";
import {BdjComponent} from "./components/assos-components/assos-pages/bdj/bdj.component";
import {BdsComponent} from "./components/assos-components/assos-pages/bds/bds.component";
import {BdeComponent} from "./components/assos-components/assos-pages/bde/bde.component";
import {BdcComponent} from "./components/assos-components/assos-pages/bdc/bdc.component";
import {AngularFireStorageModule} from "angularfire2/storage";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {HomeComponent} from "./components/articles-components/home/home.component";
import {
    ArticleViewComponent,
    DialogConfirmDeleteComponent
} from "./components/articles-components/article-view/article-view.component";
import {AddArticleComponent} from "./components/articles-components/add-article/add-article.component";
import {AddEventComponent} from "./components/articles-components/add-event/add-event.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {FileSizePipe} from "./components/utilities/pipes/file-size";
import {FileUploadComponent} from "./components/utilities/file-upload/file-upload.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {DropZoneDirective} from "./directives/drop-zone.directive";
import {CommentComponent} from "./components/articles-components/comment/comment.component";
import {CguComponent} from "./components/utilities/cgu/cgu.component";
import {UsersListComponent} from "./components/user-components/users-list/users-list.component";
import {
    DialogGiveRightsComponent,
    GiveRightsComponent
} from "./components/user-components/give-rights/give-rights.component";
import {SubscribeToComponent} from "./components/user-components/subscribe-to/subscribe-to.component";
import {PublishComponent} from "./components/articles-components/publish/publish.component";
import {ArticleService} from "./services/article.service";
import {UserService} from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {NotificationService} from './services/notification.service';
import {NotificationComponent} from './components/articles-components/notification/notification.component';
import {EventService} from "./services/event.service";
import {APP_DATE_FORMATS, AppDateAdapter} from "./utils/AppDateAdapter";
import {ScheduleComponent} from './components/events-components/schedule/schedule.component';
import {ScheduleEventItemComponent} from './components/events-components/schedule-event-item/schedule-event-item.component';

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        DropZoneDirective,
        FileUploadComponent,
        FileSizePipe,
        LoginComponent,
        ProfileComponent,
        HomeComponent,
        ArticleViewComponent,
        AddArticleComponent,
        AddEventComponent,
        BdcComponent,
        BdeComponent,
        BdsComponent,
        BdjComponent,
        BdhComponent,
        BdaComponent,
        PncComponent,
        AssosOverviewComponent,
        AssoPresentationComponent,
        CommentComponent,
        CguComponent,
        GiveRightsComponent,
        UsersListComponent,
        DialogGiveRightsComponent,
        PopupComponent,
        DialogConfirmDeleteComponent,
        SubscribeToComponent,
        PublishComponent,
        ScheduleComponent,
        ScheduleEventItemComponent,
        PublishComponent,
        NotificationComponent
    ],
    entryComponents: [
        DialogGiveRightsComponent,
        PopupComponent,
        DialogConfirmDeleteComponent
    ],
    imports: [BrowserModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatNativeDateModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,

        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [
        StatusBar,
        PopupService,
        SplashScreen,
        AngularFireAuth,
        UserService,
        ArticleService,
        EventService,
        PopupService,
        NotificationService,
        AngularFireAuth,
        MatIconRegistry,
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
