export interface Slot {
  name: any;
  status: string;
}

export interface CourtSchedule {
  court: string;
  date: string | Date;
  slots: { [key: string]: number };
}
