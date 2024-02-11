import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

import { DateTime } from 'luxon';

import { AdminService } from '../admin-dashboard/admin.service';

export interface ReservationData {
  userId: number;
  courtId: number;
  startTime: Date;
  endTime: Date;
}

export interface CourtDetails {
  courtId: number;
  facilityName: string;
  courtType: string;
  activities: string[];
  facilityLocation: string;
  pricePerHr: number;
  courtImage: string[];
}

export interface CourtSchedule {
  courtId: string;
  date: string | Date | any;
  slots: { [key: string]: number };
}

export interface DataToGetSlots {
  courtId: number;
  date: string | null;
}

export interface Slot {
  timeSlot: Date;
  status?: string;
}

@Component({
  selector: 'app-cout-page',
  templateUrl: './cout-page.component.html',
  styleUrls: ['./cout-page.component.scss'],
})
export class CoutPageComponent implements OnInit {
  slots: Slot[] = [];

  dataForReservation!: ReservationData;

  errorMessage: any;

  dataToGetSlots: DataToGetSlots = {
    courtId: 3,
    date: '2023-11-15',
  };

  courtDetails!: CourtDetails;

  retrievedSlots: any;

  selectedStartTime!: Date | null;
  selectedEndTime!: Date | null;
  selectedHours!: number;

  courtId: number = 3;

  selectedSlot: Slot[] = [];

  size: NzButtonSize = 'large';
  inputObject = {
    courtId: '2',
    date: '2023-11-13 00:00:00',
    slots: {
      slot1: 2,
      slot2: 2,
      slot3: 2,
      slot4: 2,
      slot5: 2,
      slot6: 2,
      slot7: 2,
      slot8: 2,
      slot9: 2,
      slot10: 2,
      slot11: 2,
      slot12: 2,
      slot13: 2,
      slot14: 2,
      slot15: 2,
      slot16: 2,
      slot17: 0,
      slot18: 0,
      slot19: 0,
      slot20: 0,
      slot21: 0,
      slot22: 0,
      slot23: 0,
      slot24: 0,
      slot25: 3,
      slot26: 3,
      slot27: 0,
      slot28: 0,
      slot29: 0,
      slot30: 0,
      slot31: 1,
      slot32: 1,
      slot33: 0,
      slot34: 0,
      slot35: 0,
      slot36: 0,
      slot37: 0,
      slot38: 0,
      slot39: 0,
      slot40: 0,
      slot41: 0,
      slot42: 0,
      slot43: 0,
      slot44: 0,
      slot45: 0,
      slot46: 0,
      slot47: 0,
      slot48: 0,
    },
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getCourtPageById(this.courtId).subscribe({
      next: (court) => {
        this.courtDetails = court;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.adminService.getCourtAvailability(this.dataToGetSlots).subscribe({
      next: (slots) => {
        this.retrievedSlots = slots;
        console.log(this.retrievedSlots);

        this.slots = this.convertToSlots(this.retrievedSlots);
        console.log('this.slots' + JSON.stringify(this.slots));
      },
      error: (err) => (this.errorMessage = err),
    });

    // this.slots = this.convertToSlots(this.inputObject);
  }

  getCourtAvailability() {}

  searchSlots() {
    this.dataForReservation.userId = 9;
    this.dataForReservation.courtId = this.courtId;
    this.dataForReservation.startTime;
  }

  // for date search
  onChange(result: Date): void {
    if (result instanceof Date) {
      // Convert the Date object to Luxon DateTime
      const dateTime = DateTime.fromJSDate(result);
      // Format the date as "YYYY-MM-DD" string
      this.dataToGetSlots.date = dateTime.toISODate();
      console.log('Selected Time: ', this.dataToGetSlots.date);
    } else {
      // Handle null or unexpected values here
      console.error('Invalid date format');
    }
  }

  onOk(result: Date | Date[] | null): void {
    console.log('Selected Time: ', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
  }

  log(): void {
    console.log('click dropdown button');
  }

  convertToSlots = (input: CourtSchedule): Slot[] => {
    const output: Slot[] = [];
    const slotKeys = Object.keys(input.slots);
    const dateValue = DateTime.fromISO(input.date);

    // Set the initial time to 12:30 AM
    dateValue.set({ hour: 0, minute: 30, second: 0 });

    for (const key of slotKeys) {
      const slotIndex = parseInt(key.replace('slot', ''), 10);
      // Add 30 minutes to the current time for each slot
      const time = dateValue.plus({ minutes: (slotIndex - 1) * 30 }).toJSDate(); // Adjusted slotIndex
      const status = input.slots[key];

      let statusText = '';
      switch (status) {
        case 0:
          statusText = 'available';
          break;
        case 1:
        case 3:
          statusText = 'unavailable';
          break;
        case 2:
          statusText = 'reserved';
          break;
        default:
          break;
      }

      output.push({ timeSlot: time, status: statusText });
    }

    return output;
  };

  splitTimeSlot(slot: any) {
    // Convert the selected time slot string to a Luxon DateTime object
    const dateTime = new Date(slot.timeSlot);

    // Create a new DateTime object representing 30 minutes earlier than the selected time
    const earlierTime = new Date(dateTime.getTime() + 30 * 60000);

    this.selectedSlot.push({
      timeSlot: dateTime,
    });
    this.selectedSlot.push({
      timeSlot: earlierTime,
    });
  }

  toggleSlots(slot: any) {
    console.log('click: ' + JSON.stringify(slot));

    const selectedIndex = this.slots.findIndex((s: any) => s === slot);

    if (slot.status === 'available') {
      // Mark the clicked slot as 'selected'
      slot.status = 'selected';
      this.splitTimeSlot(slot);
      // this.selectedSlots.push(slot);
      // Find the last selected slot
      const lastSelectedIndex = this.slots
        .slice(0, selectedIndex)
        .reverse()
        .findIndex((s: any) => s.status === 'selected');
      console.log('lastSelectedIndex: ' + lastSelectedIndex);

      // Enable all slots between the last selected and the current selected
      if (lastSelectedIndex !== -1) {
        const start = selectedIndex - lastSelectedIndex;

        this.slots.slice(start, selectedIndex).forEach((s: any) => {
          if (s.status !== 'selected') {
            s.status = 'selected';
          }
        });
      }
    } else if (slot.status === 'selected') {
      // Deselect the clicked slot

      slot.status = 'available';
      this.selectedSlot.splice(selectedIndex, 2);
      console.log('unselected new slots:', this.selectedSlot);
    }

    // Update selected start and end times
    if (this.selectedSlot.length > 0) {
      this.selectedStartTime = this.selectedSlot[0].timeSlot;
      this.selectedEndTime =
        this.selectedSlot[this.selectedSlot.length - 1].timeSlot;
    } else {
      // If no slots are selected, reset start and end times
      this.selectedStartTime = null;
      this.selectedEndTime = null;
    }

    // Update selected hours
    if (this.selectedStartTime && this.selectedEndTime) {
      const startTime = DateTime.fromJSDate(this.selectedStartTime);
      const endTime = DateTime.fromJSDate(this.selectedEndTime);
      this.selectedHours = endTime.diff(startTime, 'hours').hours;
    } else {
      this.selectedHours = 0;
    }
  }
}
