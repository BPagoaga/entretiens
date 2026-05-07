import { Booking, BookingCompressed, RecurrenceDto } from '../model';
import { JxtEventColorsEnum } from '@jooxter/utils';

export const isBooking = (obj: Booking | BookingCompressed): obj is Booking => {
  return 'attendees' in obj;
};

export const isBookingCompressed = (obj: Booking | BookingCompressed): obj is BookingCompressed => {
  return !('attendees' in obj);
};

export const isRecurrenceDto = (obj: Booking | BookingCompressed | RecurrenceDto): obj is RecurrenceDto => {
  return 'violations' in obj || 'occurrences' in obj;
};

export const isJxtEventColorsEnum = (color: string): color is JxtEventColorsEnum =>
  Object.values<unknown>(JxtEventColorsEnum).includes(color);
