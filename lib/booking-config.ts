export type DoctorConfig = {
  name: string;
  available: boolean;
  start: string;
  end: string;
};

export type DoctorDefaults = {
  name: string;
  eveningOnly: boolean;
  services: string[];
};

// 15-Minute Time Slot Options (10:00 AM to 08:00 PM)
export const TIME_SLOTS = [
  {
    group: "Morning (10:00 AM - 12:00 PM)",
    slots: [
      "10:00 AM",
      "10:15 AM",
      "10:30 AM",
      "10:45 AM",
      "11:00 AM",
      "11:15 AM",
      "11:30 AM",
      "11:45 AM",
    ],
  },
  {
    group: "Afternoon (12:00 PM - 04:00 PM)",
    slots: [
      "12:00 PM",
      "12:15 PM",
      "12:30 PM",
      "12:45 PM",
      "01:00 PM",
      "01:15 PM",
      "01:30 PM",
      "01:45 PM",
      "02:00 PM",
      "02:15 PM",
      "02:30 PM",
      "02:45 PM",
      "03:00 PM",
      "03:15 PM",
      "03:30 PM",
      "03:45 PM",
    ],
  },
  {
    group: "Evening (04:00 PM - 08:00 PM)",
    slots: [
      "04:00 PM",
      "04:15 PM",
      "04:30 PM",
      "04:45 PM",
      "05:00 PM",
      "05:15 PM",
      "05:30 PM",
      "05:45 PM",
      "06:00 PM",
      "06:15 PM",
      "06:30 PM",
      "06:45 PM",
      "07:00 PM",
      "07:15 PM",
      "07:30 PM",
      "07:45 PM",
    ],
  },
];

// Doctors available for booking; eveningOnly doctors can only take 4 PM+ slots.
// services lists which booking services each doctor handles.
export const DOCTORS: DoctorDefaults[] = [
  {
    name: "Dr. Sarthak Patnaik",
    eveningOnly: true,
    services: [
      "Sports Medicine",
      "Sports Surgery",
      "Ligament Surgery",
      "Joint Preservation",
    ],
  },
  {
    name: "Dr. Nisha Kaushik Patnaik",
    eveningOnly: true,
    services: ["Pre & Post Natal Rehab", "Obstetrics & Gynaecology Consultation"],
  },
  {
    name: "Dr. Dibyaprakash Kar",
    eveningOnly: false,
    services: [
      "Sports Science",
      "Musculoskeletal Rehab",
      "Sports Rehabilitation",
      "Physiotherapy",
      "Assessments",
      "Strength & Conditioning",
      "Return to Sports",
    ],
  },
  {
    name: "Dr. Gayatri Upasana Acharya",
    eveningOnly: false,
    services: [
      "Sports Science",
      "Musculoskeletal Rehab",
      "Sports Rehabilitation",
      "Physiotherapy",
      "Assessments",
      "Strength & Conditioning",
      "Return to Sports",
    ],
  },
  {
    name: "Dr. Pooja Mehta",
    eveningOnly: false,
    services: [
      "Sports Science",
      "Musculoskeletal Rehab",
      "Sports Rehabilitation",
      "Physiotherapy",
      "Assessments",
      "Strength & Conditioning",
      "Return to Sports",
    ],
  },
  {
    name: "Dr. Dawa Sherpa",
    eveningOnly: false,
    services: [
      "Sports Science",
      "Musculoskeletal Rehab",
      "Sports Rehabilitation",
      "Physiotherapy",
      "Assessments",
      "Strength & Conditioning",
      "Return to Sports",
    ],
  },
];

// Fallback config used before / when no Config tab data exists.
export function defaultDoctorConfigs(): DoctorConfig[] {
  return DOCTORS.map((d) => ({
    name: d.name,
    available: true,
    start: d.eveningOnly ? "04:00 PM" : "10:00 AM",
    end: "08:00 PM",
  }));
}
