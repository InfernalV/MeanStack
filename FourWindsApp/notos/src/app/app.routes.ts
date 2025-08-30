import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'Messages',
    loadComponent: () => {
      return import('./messages-view/messages-view').then((m) => m.MessagesComponent);
    },
  },
];