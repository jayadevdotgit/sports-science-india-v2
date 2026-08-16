export type TechStat = {
  label: string;
  value: string;
};

export type Technology = {
  id: number;
  title: string;
  image: string;
  short: string;
  description: string;
  features: string[];
  stats: TechStat[];
  tag: string;
};

export const technology: Technology[] = [
  {
    id: 1,
    title: "DynaMo",
    image: "/images/technology/dynamo.png",
    short: "Handheld strength and ROM.",
    description:
      "Measure strength and range of motion across every major joint with an intuitive all-in-one handheld dynamometer and inclinometer.",
    tag: "Handheld Assessment",
    stats: [
      { label: "Force Range", value: "600N" },
      { label: "Test Modes", value: "Push · Pull · Grip" },
      { label: "ROM Sensor", value: "9-axis IMU" },
    ],
    features: [
      "Push & Pull Force",
      "Grip Strength",
      "Range of Motion",
    ],
  },

  {
    id: 2,
    title: "Recovery Systems",
    image: "/images/technology/recovery.png",
    short: "Accelerate athlete recovery.",
    description:
      "Advanced recovery solutions that help athletes return stronger and faster.",
    tag: "Recovery",
    stats: [
      { label: "Cryo Temp", value: "-110°C" },
      { label: "Session", value: "10–15 min" },
      { label: "Modalities", value: "6+" },
    ],
    features: [
      "Recovery",
      "Circulation",
      "Muscle Repair",
    ],
  },

  {
    id: 3,
    title: "Body Composition",
    image: "/images/technology/body-composition.png",
    short: "Know your body better.",
    description:
      "Track muscle mass, fat percentage and body balance to guide training decisions.",
    tag: "Composition Analysis",
    stats: [
      { label: "Scan Time", value: "45 sec" },
      { label: "Metrics", value: "20+" },
      { label: "Segments", value: "7" },
    ],
    features: [
      "Muscle Mass",
      "Fat %",
      "Body Balance",
    ],
  },
];
