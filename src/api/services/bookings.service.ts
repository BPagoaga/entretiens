import { axiosInstanceV4 } from '../config';
import {
  Booking,
  BookingCompressed,
} from '../model';
import { JxtBookingStatusEnum } from '../types';

export interface ISearchBookingsParameters {
  from?: Date;
  to?: Date;
  participantId?: number;
  organizerId?: number;
  resourceTypeId?: number[];
  resourceId?: number[];
  floorId?: number[];
  status?: JxtBookingStatusEnum[];
  size?: number;
  page?: string;
  nbApiRequests?: number;
}

export const BookingService = {
  path: 'bookings',

  search(options: Partial<ISearchBookingsParameters>): Promise<{
    data: BookingCompressed[];
    nextPage: string;
  }> {
    const params = this.createSearchBookingsParams(options);

    const url = `${this.path}`;

    return axiosInstanceV4.get(url, { params });
  },

  getById(id: number): Promise<Booking> {
    const url = `${this.path}/${id}`;

    return axiosInstanceV4
      .get(url)
      .then((res) => res.data);
  },

  createSearchBookingsParams(options: Partial<ISearchBookingsParameters>): URLSearchParams {
    const params = new URLSearchParams();

    if (options.from && options.to) {
      params.append('from', options.from.toISOString());
      params.append('to', options.to.toISOString());
    }

    if (options.participantId) {
      params.append('participantId', options.participantId.toString());
    }

    if (options.organizerId) {
      params.append('organizerId', options.organizerId.toString());
    }

    if (options.resourceTypeId) {
      params.append('resourceTypeId', options.resourceTypeId.toString());
    }

    if (options.resourceId) {
      params.append('resourceId', options.resourceId.toString());
    }

    if (options.floorId) {
      params.append('floorId', options.floorId.toString());
    }

    if (options.status && options.status?.length > 0) {
      params.append('status', options.status.join(','));
    }

    if (options.size) {
      params.append('size', options.size.toString());
    }

    if (options.page) {
      params.append('page', options.page);
    }

    return params;
  },
};
