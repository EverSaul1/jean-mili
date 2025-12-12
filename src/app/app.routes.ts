import { Routes } from '@angular/router';
import {MarriageComponent} from "./pages/marriage/marriage/marriage.component";
import {NavidadComponent} from "./pages/navidad/navidad.component";

export const routes: Routes = [
  {
    path:'invitacion/:slug',
    component: MarriageComponent
  },
  {
    path:'fiesta-navideña',
    component: NavidadComponent
  },
  { path: '**', redirectTo: 'fiesta-navideña', pathMatch: 'full' },
];
