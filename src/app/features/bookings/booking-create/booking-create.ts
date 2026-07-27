import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkerService } from '../../../core/services/worker.service';
import { WorkerSummaryDto } from '../../../core/models/worker-summary.model';
import { RoomService } from '../../../core/services/room.service';
import { RoomSummaryDto } from '../../../core/models/room-summary.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { CreateBookingRequestDto } from '../../../core/models/create-booking-request.model';
import { BookingResponseDto } from '../../../core/models/booking-response.model';

@Component({
  selector: 'app-booking-create',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-create.html',
  styleUrl: './booking-create.css',
})
export class BookingCreate implements OnInit {
  private readonly workerService = inject(WorkerService);
  private readonly roomService = inject(RoomService);
  private readonly bookingService = inject(BookingService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly workers = signal<WorkerSummaryDto[]>([]);
  protected readonly availableRooms = signal<RoomSummaryDto[]>([]);
  protected readonly searchForm: FormGroup = this.formBuilder.group({
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    minCapacity: [1, [Validators.required, Validators.min(1)]],
  });
  protected readonly bookingForm: FormGroup = this.formBuilder.group({
    roomId: ['', [Validators.required]],
    workerId: ['', [Validators.required]],
    numberOfParticipant: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.workerService.getAllWorkers().subscribe({
      next: (response: WorkerSummaryDto[]) => {
        this.workers.set(response);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue.');
      },
    });
  }

  protected onSearchRoom(): void {
    if (this.searchForm.invalid) {
      return;
    }
    const { startDate, endDate, minCapacity } = this.searchForm.value;

    this.roomService.getAvailableRooms(startDate, endDate, minCapacity).subscribe({
      next: (response: RoomSummaryDto[]) => {
        this.availableRooms.set(response);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue.');
      },
    });
  }

  protected onCreateBooking(): void {
    if (this.bookingForm.invalid) {
      return;
    }
    const { startDate, endDate } = this.searchForm.value;
    const { roomId, workerId, numberOfParticipant } = this.bookingForm.value;

    const dto: CreateBookingRequestDto = {
      startDate,
      endDate,
      roomId,
      workerId,
      numberOfParticipant,
    };

    this.bookingService.createBooking(dto).subscribe({
      next: (response: BookingResponseDto) => {
        this.successMessage.set(
          `Votre réservation pour la salle : "${response.room.name}" a été créé avec succes. Date de début : ${response.startDate}`,
        );
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue.');
      },
    });
  }
}
