import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../core/services/room.service';
import { RoomResponseDto } from '../../../core/models/room-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-room-create',
  imports: [ReactiveFormsModule],
  templateUrl: './room-create.html',
  styleUrl: './room-create.css',
})
export class RoomCreate {
  private readonly fb = inject(FormBuilder);
  private readonly roomService = inject(RoomService);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly isLoading = signal<true | false>(false)

  protected readonly roomForm: FormGroup = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(2)]],
    maxCapacity: ['', [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  protected onSubmit(): void {
    if (this.roomForm.invalid) {
      return;
    }

    this.isLoading.set(true);

    this.roomService.createRoom(this.roomForm.value).subscribe({
      next: (response: RoomResponseDto) => {
        this.successMessage.set(`La salle "${response.name}" a bien été créée`);
        this.roomForm.reset();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message ?? 'une erreur est survenue.');
        this.isLoading.set(false);
      }
    });
  }
}
