import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'create-room', pathMatch: 'full' },
  {
    path: 'create-room',
    loadComponent: () => import('./features/rooms/room-create/room-create').then((m) => m.RoomCreate),
  },
];
