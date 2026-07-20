export interface CreateBookingRequestDto {
  startDate: string;
  endDate: string;
  numberOfParticipant: number;
  roomId: string;
  workerId: string;
}
