import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path:'registration', component: RegistrationComponent },
    { path: '', redirectTo: '/registration', pathMatch: 'full' }

]
