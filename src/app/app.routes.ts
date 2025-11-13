import { Routes } from '@angular/router';
import {MarriageComponent} from "./pages/marriage/marriage/marriage.component";

export const routes: Routes = [
  {
    path:'invitacion/:slug',
    component: MarriageComponent
  },
  { path: '**', redirectTo: 'invitacion/jean-mili', pathMatch: 'full' },
];
