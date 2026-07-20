import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateBookingRequestDto } from '../models/create-booking-request.model';
import { Observable } from 'rxjs';
import { BookingResponseDto } from '../models/booking-response.model';




@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7076/api/booking';

  createBooking(dto: CreateBookingRequestDto): Observable<BookingResponseDto> {
    return this.http.post<BookingResponseDto>(this.apiUrl, dto);
  }
}
