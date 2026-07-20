import { RoomSummaryDto } from './room-summary.model';
import { WorkerSummaryDto } from './worker-summary.model';

export interface BookingResponseDto {
  id: string;
  startDate: string;
  endDate: string;
  numberOfParticipant: number;
  room: RoomSummaryDto;
  worker: WorkerSummaryDto;
}
