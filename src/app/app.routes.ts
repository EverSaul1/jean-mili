import { Routes } from '@angular/router';
import {MarriageComponent} from "./pages/marriage/marriage/marriage.component";
import {CarnavalesComponent} from "./pages/carnavales/carnavales.component";

export const routes: Routes = [
  {
    path:'invitacion/:slug',
    component: MarriageComponent
  },
  {
    path:'invitacion-chiuchico',
    component: CarnavalesComponent
  },
  { path: '**', redirectTo: 'invitacion-chiuchico', pathMatch: 'full' },
];
