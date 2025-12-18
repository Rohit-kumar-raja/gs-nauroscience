import { Appointment } from '../types';

const APPOINTMENTS_KEY = 'gs_neuro_appointments';

export const appointmentService = {
  getAll: (): Appointment[] => {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  create: async (appt: Appointment): Promise<Appointment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = appointmentService.getAll();
        const updated = [...appointments, appt];
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
        resolve(appt);
      }, 800);
    });
  },

  updateStatus: async (id: string, status: Appointment['status'], notes?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = appointmentService.getAll();
        const updated = appointments.map(a => 
          a.id === id ? { ...a, status, notes: notes || a.notes } : a
        );
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
        resolve(true);
      }, 500);
    });
  },

  delete: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = appointmentService.getAll();
        const updated = appointments.filter(a => a.id !== id);
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
        resolve(true);
      }, 500);
    });
  }
};