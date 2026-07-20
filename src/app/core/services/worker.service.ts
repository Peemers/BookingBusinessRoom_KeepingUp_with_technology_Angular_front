import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateWorkerRequestDto } from '../models/create-worker-request.model';
import { Observable } from 'rxjs';
import { WorkerResponseDto } from '../models/worker-response.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7076/api/worker';

  createWorker(dto: CreateWorkerRequestDto): Observable<WorkerResponseDto> {
    return this.http.post<WorkerResponseDto>(this.apiUrl, dto);
  }
}
