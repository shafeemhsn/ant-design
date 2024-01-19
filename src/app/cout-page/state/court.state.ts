import { createAction, props } from '@ngrx/store';
import { Slot } from '../slot-info';

export const toggleSlot = createAction(
  '[Court Page] Toggle Slot',
  props<{ slot: Slot }>()
);
