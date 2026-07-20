import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoomRequestDto } from '../models/create-room-request.model';
import { Observable } from 'rxjs';
import { RoomResponseDto } from '../models/room-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://localhost:7076/api/room';

  createRoom(dto: CreateRoomRequestDto): Observable<RoomResponseDto>{
    return this.http.post<RoomResponseDto>(this.apiUrl, dto);
  }
}
