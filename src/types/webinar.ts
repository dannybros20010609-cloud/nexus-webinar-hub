export interface Webinar {
  id: string;
  title: string;
  description: string;
  host: {
    id: string;
    name: string;
    company?: string;
    avatar?: string;
  };
  guestSpeakers?: {
    id: string;
    name: string;
    company?: string;
    avatar?: string;
  }[];
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  thumbnail?: string;
  promoVideo?: string;
  registrations: number;
  maxAttendees?: number;
  isRecorded: boolean;
  recordingUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WebinarRegistration {
  id: string;
  webinarId: string;
  userId: string;
  registeredAt: string;
  attended?: boolean;
  joinedAt?: string;
  leftAt?: string;
  watchTime?: number; // in minutes
}

export interface WebinarStats {
  webinarId: string;
  registrations: number;
  attendees: number;
  avgWatchTime: number;
  chatMessages: number;
  handRaises: number;
  ctaClicks: number;
  surveyResponses: number;
  emailOpens: number;
  smsDelivered: number;
}