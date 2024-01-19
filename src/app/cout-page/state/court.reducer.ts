// court.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { toggleSlot } from './court.actions';
import { CourtState } from './court-state';

export const initialState: CourtState = {
  slots: [],
};

export const courtReducer = createReducer(
  initialState,
  on(toggleSlot, (state, { slot }) => ({
    ...state,
    slots: state.slots.map((s) =>
      s.name === slot.name ? { ...s, status: toggleStatus(s.status) } : s
    ),
  }))
);

function toggleStatus(currentStatus: string): string {
  switch (currentStatus) {
    case 'available':
      return 'selected';
    case 'selected':
      return 'available';
    case 'unavailable':
    case 'reserved':
      // Add cases for other statuses if needed
      return currentStatus;
    default:
      return currentStatus;
  }
}
