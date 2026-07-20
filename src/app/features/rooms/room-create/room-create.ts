import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../core/services/room.service';

@Component({
  selector: 'app-room-create',
  imports: [ReactiveFormsModule],
  templateUrl: './room-create.html',
  styleUrl: './room-create.css',
})
export class RoomCreate {
  private readonly fb = inject(FormBuilder);
  private readonly roomService = inject(RoomService);

  protected readonly roomForm: FormGroup = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(2)]],
    maxCapacity: ['', [Validators.required, Validators.min(1)]],
  });

  protected onSubmit(): void {
    if (this.roomForm.invalid) {
      return;
    }

    this.roomService.createRoom(this.roomForm.value).subscribe({
      next: (response) => console.log('Room créée', response),
      error: (error) => console.error('Erreur', error),
    });
  }
}
