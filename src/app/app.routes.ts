import { Routes } from '@angular/router';
import {MarriageComponent} from "./pages/marriage/marriage/marriage.component";
import {NavidadComponent} from "./pages/navidad/navidad.component";

export const routes: Routes = [
  {
    path:'invitacion/:slug',
    component: MarriageComponent
  },
  {
    path:'christmas-party',
    component: NavidadComponent
  },
  { path: '**', redirectTo: 'christmas-party', pathMatch: 'full' },
];
