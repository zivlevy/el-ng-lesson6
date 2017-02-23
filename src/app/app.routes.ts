import {RouterModule, Route} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from './guards/auth.guard';



const appRoutes :Route [] = [

    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
    {path: '', redirectTo: 'home',pathMatch:'full'},
    {path: '**', component: NotfoundpageComponent}


];

export const routesModule = RouterModule.forRoot(appRoutes);