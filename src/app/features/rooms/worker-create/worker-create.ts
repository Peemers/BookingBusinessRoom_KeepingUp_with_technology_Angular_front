import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkerService } from '../../../core/services/worker.service';
import { WorkerResponseDto } from '../../../core/models/worker-response.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-worker-create',
  imports: [ReactiveFormsModule],
  templateUrl: './worker-create.html',
  styleUrl: './worker-create.css',
})
export class WorkerCreate {
  private readonly fb = inject(FormBuilder);
  private readonly workerService = inject(WorkerService);

  protected readonly errorMessage = signal<string | null>(null)
  protected readonly successMessage = signal<string | null>(null)
  protected readonly isLoading = signal<true | false>(false)

  protected readonly workerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.pattern(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/), Validators.required]],
  });

  protected onSubmit(): void {
    if (this.workerForm.invalid) {
      return;
    }
    this.isLoading.set(true);

    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.workerService.createWorker(this.workerForm.value).subscribe({
      next: (response: WorkerResponseDto) => {
        this.successMessage.set(`Travailleur : "${response.firstName} ${response.lastName}" a été créé avec succes.`);
        this.workerForm.reset();
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error?.message ?? 'une erreur est survenue.');
        this.isLoading.set(false);
      },
    });
  }
}
