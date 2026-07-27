import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'create-room', pathMatch: 'full' },
  {
    path: 'create-room',
    loadComponent: () =>
      import('./features/rooms/room-create/room-create').then((m) => m.RoomCreate),
  },
  {
    path: 'create-worker',
    loadComponent: () =>
      import('./features/rooms/worker-create/worker-create').then((m) => m.WorkerCreate),
  },
  {
    path: 'create-booking',
    loadComponent: () =>
      import('./features/bookings/booking-create/booking-create').then((m) => m.BookingCreate),
  },
];
