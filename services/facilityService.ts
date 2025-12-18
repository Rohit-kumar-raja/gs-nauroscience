import { Facility } from '../types';

const SAVED_FACILITIES_KEY = 'gs_neuro_saved_facilities';

export const facilityService = {
  getSavedIds: (): string[] => {
    const data = localStorage.getItem(SAVED_FACILITIES_KEY);
    return data ? JSON.parse(data) : [];
  },

  toggleSave: (id: string): string[] => {
    const saved = facilityService.getSavedIds();
    let updated: string[];
    if (saved.includes(id)) {
      updated = saved.filter(fid => fid !== id);
    } else {
      updated = [...saved, id];
    }
    localStorage.setItem(SAVED_FACILITIES_KEY, JSON.stringify(updated));
    return updated;
  },

  bookFacility: async (facilityId: string, bookingData: any): Promise<boolean> => {
    // Mock API call for booking a facility service (lab test, etc.)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Booking facility ${facilityId}:`, bookingData);
        resolve(true);
      }, 1200);
    });
  }
};