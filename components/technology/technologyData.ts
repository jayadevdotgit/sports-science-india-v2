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
    title: "Force Plate",
    image: "/images/technology/force-plate.png",
    short: "Elite force and jump analysis.",
    description:
      "Measure explosive strength, landing mechanics and force production with laboratory-grade precision.",
    tag: "Force Analysis",
    stats: [
      { label: "Sample Rate", value: "1,000 Hz" },
      { label: "Accuracy", value: "±0.5%" },
      { label: "Protocols", value: "15+" },
    ],
    features: [
      "Jump Performance",
      "Landing Analysis",
      "Force Production",
    ],
  },

  {
    id: 3,
    title: "3D Motion Capture",
    image: "/images/technology/motion-capture.png",
    short: "Advanced movement analysis.",
    description:
      "Capture every movement in real time to optimize technique and reduce injury risk.",
    tag: "Biomechanics",
    stats: [
      { label: "Capture Rate", value: "240 fps" },
      { label: "Markers", value: "41-point" },
      { label: "Precision", value: "±0.1 mm" },
    ],
    features: [
      "Running Mechanics",
      "Movement Analysis",
      "Biomechanics",
    ],
  },

  {
    id: 4,
    title: "VO₂ Max Testing",
    image: "/images/technology/vo2max.png",
    short: "Measure endurance scientifically.",
    description:
      "Understand aerobic capacity and endurance using gold-standard metabolic testing.",
    tag: "Metabolic Testing",
    stats: [
      { label: "Protocol", value: "Ramp · Bruce" },
      { label: "Metrics", value: "25+" },
      { label: "Accuracy", value: "±1%" },
    ],
    features: [
      "Aerobic Capacity",
      "Performance Zones",
      "Endurance",
    ],
  },

  {
    id: 5,
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
    id: 6,
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

  {
    id: 7,
    title: "Speed Gates",
    image: "/images/technology/speed-gates.png",
    short: "Elite sprint timing.",
    description:
      "Accurately measure sprint speed, acceleration and reaction time.",
    tag: "Speed Testing",
    stats: [
      { label: "Timing", value: "0.001 s" },
      { label: "Gates", value: "8-lane" },
      { label: "Splits", value: "10m · 20m · 40m" },
    ],
    features: [
      "Sprint Timing",
      "Acceleration",
      "Agility",
    ],
  },
];
