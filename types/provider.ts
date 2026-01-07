export type AvailabilityStatus = 'today' | 'this-week' | 'unavailable';
export type TrustBadgeType = 'new' | 'recommended' | 'verified' | 'top-local' | null;

export interface ScheduleDay {
  open: string; // '08:00'
  close: string; // '18:00'
  available: boolean;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  zone: string;
  rating: number;
  reviewCount: number;
  availability: AvailabilityStatus;
  badge: TrustBadgeType;
  whatsapp: string;
  phone: string;
  description: string;
  services: string[];
  schedule: {
    monday: ScheduleDay;
    tuesday: ScheduleDay;
    wednesday: ScheduleDay;
    thursday: ScheduleDay;
    friday: ScheduleDay;
    saturday: ScheduleDay;
    sunday: ScheduleDay;
  };
  coverageZones: string[];
  imageUrl?: string;
  verified: boolean;
  joinedDate: string; // ISO date
  location?: {
    lat: number;
    lng: number;
  };
}

