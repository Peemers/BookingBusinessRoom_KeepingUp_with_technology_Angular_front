import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateRoomRequestDto } from '../models/create-room-request.model';
import { Observable } from 'rxjs';
import { RoomResponseDto } from '../models/room-response.model';
import { RoomSummaryDto } from '../models/room-summary.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7076/api/room';

  createRoom(dto: CreateRoomRequestDto): Observable<RoomResponseDto> {
    return this.http.post<RoomResponseDto>(this.apiUrl, dto);
  }
  getAvailableRooms(
    startDate: string,
    endDate: string,
    minCapacity: number,
  ): Observable<RoomSummaryDto[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('minCapacity', minCapacity);

    return this.http.get<RoomSummaryDto[]>(this.apiUrl, { params });
  }
}
