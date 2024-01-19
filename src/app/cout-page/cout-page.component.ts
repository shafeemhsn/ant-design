import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CourtSchedule, Slot } from './slot-info';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CourtState } from './state/court-state';
import { toggleSlot } from './state/court.actions';

@Component({
  selector: 'app-cout-page',
  templateUrl: './cout-page.component.html',
  styleUrls: ['./cout-page.component.scss'],
})
export class CoutPageComponent implements OnInit {
  slots: any = [];

  size: NzButtonSize = 'large';
  inputObject = [
    {
      court: '2',
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
    },
  ];

  constructor(private store: Store<{ court: CourtState }>) {}

  ngOnInit(): void {
    this.slots = this.convertToSlots(this.inputObject);
  }

  convertToSlots = (input: CourtSchedule[]): Slot[] => {
    const output: Slot[] = [];
    const slotKeys = Object.keys(input[0].slots);

    const dateValue = new Date(input[0].date);

    for (const key of slotKeys) {
      const slotIndex = parseInt(key.replace('slot', ''), 10);

      const updatedDateValue = new Date(dateValue);
      updatedDateValue.setMinutes(dateValue.getMinutes() + slotIndex * 30);

      const time = updatedDateValue;

      const status = input[0].slots[key];

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

      output.push({ name: time, status: statusText });
    }

    return output;
  };

  // toggleSlots(slot: any) {
  //   console.log(slot);
  //   this.store.dispatch(toggleSlot({ slot }));
  // }

  toggleSlots(slot: any) {
    console.log('click: ' + JSON.stringify(slot));

    const selectedIndex = this.slots.findIndex((s: any) => s === slot);

    if (slot.status === 'available') {
      // Mark the clicked slot as 'selected'
      slot.status = 'selected';

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

      // Re-enable all previous slots

      // this.slots.slice(0, selectedIndex).forEach((s: any) => {
      //   if (s.status !== 'selected') {
      //     s.status = 'available';
      //   }
      // });
    }
  }
}

// toggleSlots(slot: any) {
//   if (slot.status === 'available') {
//     // Mark the clicked slot as 'selected'
//     slot.status = 'selected';

//     // Disable all previous slots
//     const selectedIndex = this.slots.findIndex((s: any) => s === slot);
//     this.slots.slice(0, selectedIndex).forEach((s: any) => {
//       if (s.status !== 'selected') {
//         s.status = 'unavailable';
//       }
//       console.log(selectedIndex);
//     });
//   } else if (slot.status === 'selected') {
//     // Deselect the clicked slot
//     slot.status = 'available';

//     // Re-enable all previous slots
//     const selectedIndex = this.slots.findIndex((s: any) => s === slot);
//     this.slots.slice(0, selectedIndex).forEach((s: any) => {
//       if (s.status === 'unavailable') {
//         s.status = 'available';
//       }
//     });
//   }
// }

// toggleSlots(slot: any) {
//   const selectedIndex = this.slots.findIndex((s: any) => s === slot);

//   // Deselect the clicked slot
//   if (slot.status === 'selected') {
//     slot.status = 'available';

//     // Re-enable all previous slots, including reserved ones
//     this.slots.slice(0, selectedIndex).forEach((s: any) => {
//       if (s.status !== 'selected') {
//         s.status = 'available';
//       }
//     });
//   } else if (slot.status === 'available') {
//     // Mark the clicked slot as 'selected'
//     slot.status = 'selected';

//     // Disable all previous slots
//     this.slots.slice(0, selectedIndex).forEach((s: any) => {
//       if (s.status !== 'selected') {
//         s.status = 'unavailable';
//       }
//     });
//   }
// }
