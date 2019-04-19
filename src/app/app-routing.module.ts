import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PncComponent} from "./components/assos-components/assos-pages/pnc/pnc.component";
import {BdhComponent} from "./components/assos-components/assos-pages/bdh/bdh.component";
import {BdaComponent} from "./components/assos-components/assos-pages/bda/bda.component";
import {BdjComponent} from "./components/assos-components/assos-pages/bdj/bdj.component";
import {BdcComponent} from "./components/assos-components/assos-pages/bdc/bdc.component";
import {BdsComponent} from "./components/assos-components/assos-pages/bds/bds.component";
import {BdeComponent} from "./components/assos-components/assos-pages/bde/bde.component";
import {AssosOverviewComponent} from "./components/assos-components/assos-overview/assos-overview.component";
import {SubscribeToComponent} from "./components/user-components/subscribe-to/subscribe-to.component";
import {GiveRightsComponent} from "./components/user-components/give-rights/give-rights.component";
import {PublishComponent} from "./components/articles-components/publish/publish.component";
import {LoginComponent} from "./components/user-components/login/login.component";
import {RegistrationComponent} from "./components/user-components/registration/registration.component";
import {ProfileComponent} from "./components/user-components/profile/profile.component";
import {AddEventComponent} from "./components/articles-components/add-event/add-event.component";
import {EventDetailsComponent} from "./components/events-components/event-details/event-details.component";

const routes: Routes = [
    {path: '', component: AssosOverviewComponent},
    {path: "aboutAll", component: AssosOverviewComponent},
    {path: "bde", component: BdeComponent},
    {path: "bds", component: BdsComponent},
    {path: "bdc", component: BdcComponent},
    {path: "bdj", component: BdjComponent},
    {path: "bda", component: BdaComponent},
    {path: "bdh", component: BdhComponent},
    {path: "pnc", component: PncComponent},
    {path: 'event/:id', component: EventDetailsComponent},
    {path: "profile", component: ProfileComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "login", component: LoginComponent},
    {path: "publish", component: PublishComponent},
    {path: "publishEvent", component: AddEventComponent},
    {path: "giveRights", component: GiveRightsComponent},
    {path: "subscriptions", component: SubscribeToComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
