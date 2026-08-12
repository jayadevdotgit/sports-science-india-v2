"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import {
  Stethoscope,
  Syringe,
  Bone,
  ShieldPlus,
  Microscope,
  HeartPulse,
  Activity,
  ClipboardCheck,
  Dumbbell,
  Trophy,
  Calendar as CalendarIcon,
  Clock,
  Check,
  CheckCircle2,
  User,
  Mail,
  Phone,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Service options matching SSI core offerings
const AVAILABLE_SERVICES = [
  {
    id: "sports-medicine",
    title: "Sports Medicine",
    description: "Medical consultation, injury prevention, and pain management.",
    icon: Stethoscope,
  },
  {
    id: "sports-surgery",
    title: "Sports Surgery",
    description: "Minimally invasive surgery for sports injuries and rapid recovery.",
    icon: Syringe,
  },
  {
    id: "ligament-surgery",
    title: "Ligament Surgery",
    description: "ACL and ligament reconstruction to restore joint stability.",
    icon: Bone,
  },
  {
    id: "joint-preservation",
    title: "Joint Preservation",
    description: "Treatments to delay or avoid joint replacement.",
    icon: ShieldPlus,
  },
  {
    id: "sports-science",
    title: "Sports Science",
    description: "Data-driven performance analysis and athletic profiling.",
    icon: Microscope,
  },
  {
    id: "musculoskeletal-rehab",
    title: "Musculoskeletal Rehab",
    description: "Targeted rehab for muscles, joints, and soft tissue.",
    icon: Activity,
  },
  {
    id: "sports-rehabilitation",
    title: "Sports Rehabilitation",
    description: "Structured rehab programs for a safe return to sport.",
    icon: HeartPulse,
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    description: "Manual therapy and exercise-based recovery.",
    icon: Activity,
  },
  {
    id: "assessments",
    title: "Assessments",
    description: "Comprehensive physical and performance assessments.",
    icon: ClipboardCheck,
  },
  {
    id: "strength-conditioning",
    title: "Strength & Conditioning",
    description: "Science-based power, speed, agility, and endurance building.",
    icon: Dumbbell,
  },
  {
    id: "return-to-sports",
    title: "Return to Sports",
    description: "Guided return-to-play planning after injury.",
    icon: Trophy,
  },
  {
    id: "pre-post-natal",
    title: "Pre & Post Natal Rehab",
    description: "Safe exercise and recovery during and after pregnancy.",
    icon: HeartPulse,
    requiresNisha: true,
  },
  {
    id: "obgyn",
    title: "Obstetrics & Gynaecology Consultation",
    description: "Available with Dr. Nisha Kaushik Patnaik.",
    icon: Stethoscope,
    requiresNisha: true,
  },
];

// 15-Minute Time Slot Options (10:00 AM to 08:00 PM)
const TIME_SLOTS = [
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
const DOCTORS = [
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

// Format a "YYYY-MM-DD" string without UTC timezone shifting.
function formatDateDisplay(iso: string, opts: Intl.DateTimeFormatOptions) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", opts);
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // Date selection
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:00 AM");

  // Patient details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sport: "",
    notes: "",
  });

  // Selected doctor for the appointment
  const [selectedDoctor, setSelectedDoctor] = useState<string>(DOCTORS[0].name);

  // Doctors who can handle at least one selected service (any doctor if none selected)
  const eligibleDoctors = useMemo(() => {
    if (selectedServices.length === 0) return DOCTORS;
    return DOCTORS.filter((doc) =>
      selectedServices.some((svc) => doc.services.includes(svc))
    );
  }, [selectedServices]);

  const currentDoctor =
    DOCTORS.find((d) => d.name === selectedDoctor) ?? DOCTORS[0];

  // Evening-only doctors can only take 4 PM+ slots
  const availableTimeSlots = useMemo(
    () =>
      currentDoctor.eveningOnly
        ? TIME_SLOTS.filter((g) => g.group.startsWith("Evening"))
        : TIME_SLOTS,
    [currentDoctor]
  );

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    bookingCode: string;
    doctor: string;
    name: string;
    email: string;
    phone: string;
    services: string[];
    date: string;
    timeSlot: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Next 7 available dates calculation (local timezone)
  const nextDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const toLocalISO = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = toLocalISO(d);
      const label = d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      dates.push({ iso, label, isSunday: d.getDay() === 0 });
    }
    return dates;
  }, []);

  // Exclude Sundays (holiday)
  const availableDates = useMemo(
    () => nextDates.filter((d) => !d.isSunday),
    [nextDates]
  );

  // Already-booked slots: { date, timeSlot } pairs
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string }[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/bookings/slots")
      .then((r) => r.json())
      .then((data) => {
        if (active && Array.isArray(data?.slots)) setBookedSlots(data.slots);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const isSlotBooked = (slot: string) =>
    bookedSlots.some((b) => b.date === selectedDate && b.timeSlot === slot);

  // O&G and Pre/Post Natal services require Dr. Nisha
  const nishaOnlySelected =
    selectedServices.includes("Obstetrics & Gynaecology Consultation") ||
    selectedServices.includes("Pre & Post Natal Rehab");
  const ogDoctorMismatch = nishaOnlySelected && !selectedDoctor.includes("Nisha");

  // Default date selection to the first available (non-Sunday) date
  if (!selectedDate && availableDates.length > 0) {
    setSelectedDate(availableDates[0].iso);
  }

  function toggleService(serviceTitle: string) {
    setSelectedServices((prev) => {
      const next = prev.includes(serviceTitle)
        ? prev.length > 1
          ? prev.filter((s) => s !== serviceTitle)
          : prev // keep at least 1 selected
        : [...prev, serviceTitle];

      // If the currently selected doctor can't handle any of the new set, switch to the first eligible one
      const eligible = next.length === 0
        ? DOCTORS
        : DOCTORS.filter((doc) => next.some((svc) => doc.services.includes(svc)));
      if (eligible.length > 0 && !eligible.some((d) => d.name === selectedDoctor)) {
        setSelectedDoctor(eligible[0].name);
      }
      return next;
    });
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please complete all contact details (Name, Email, Phone).");
      return;
    }

    if (ogDoctorMismatch) {
      setErrorMessage("Pre & Post Natal Rehab and Obstetrics & Gynaecology Consultation are only available with Dr. Nisha Kaushik Patnaik.");
      return;
    }

    if (isSlotBooked(selectedTimeSlot)) {
      setErrorMessage("Sorry, that time slot has already been booked. Please choose another.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          sport: formData.sport,
          notes: formData.notes,
          services: selectedServices,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          doctor: selectedDoctor,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking.");
      }

      setSubmittedData({
        bookingCode: data.data?.bookingCode || "",
        doctor: selectedDoctor,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        services: selectedServices,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });
      setCurrentStep(4);
    } catch (err: unknown) {
      console.error("Booking submission error:", err);
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setSubmittedData(null);
    setCurrentStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      sport: "",
      notes: "",
    });
    setSelectedServices([]);
    setSelectedDoctor(DOCTORS[0].name);
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-[#050505] py-14 text-white scroll-mt-32">
      {/* Glow Backdrops */}
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            BOOK ASSESSMENT
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Schedule Your <span className="text-orange-500">Performance</span> Evaluation
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-400">
            Choose your desired sports science services, pick your preferred appointment time, and receive an instant confirmation email.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-orange-500/20 bg-black/70 backdrop-blur-xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          {/* Step Progress Bar */}
          {currentStep < 4 && (
            <div className="mb-10">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span className={currentStep === 1 ? "text-orange-400" : ""}>1. Services</span>
                <span className={currentStep === 2 ? "text-orange-400" : ""}>2. Timing</span>
                <span className={currentStep === 3 ? "text-orange-400" : ""}>3. Your Details</span>
              </div>
              <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ease-out"
                  style={{
                    width:
                      currentStep === 1
                        ? "33%"
                        : currentStep === 2
                        ? "66%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: SERVICE SELECTION */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Select Required Services</h3>
                  <p className="text-sm text-gray-400 mt-1">You can select one or multiple specialized assessments.</p>
                </div>
                <span className="rounded-full bg-orange-500/20 text-orange-400 text-xs px-3 py-1 font-semibold border border-orange-500/30">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
                {AVAILABLE_SERVICES.filter((s) => s.title !== "Obstetrics & Gynaecology Consultation").map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedServices.includes(service.title);

                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.title)}
                      className={`
                        group relative flex flex-col justify-between rounded-xl border p-2.5 sm:p-3 cursor-pointer transition-all duration-300
                        ${
                          isSelected
                            ? "border-orange-500 bg-orange-500/10 shadow-[0_0_25px_rgba(249,115,22,0.25)]"
                            : "border-orange-500/20 bg-[#0e0e12] hover:border-orange-500/60 hover:bg-[#14141a]"
                        }
                      `}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <div
                            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] ${
                              isSelected
                                ? "border-orange-500/40 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                                : "border-orange-500/20 bg-orange-500/10 text-orange-400 group-hover:scale-110 group-hover:rotate-6"
                            }`}
                          >
                            <Icon size={15} className="sm:hidden" />
                            <Icon size={17} className="hidden sm:block" />
                          </div>

                          <div
                            className={`flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border transition-all ${
                              isSelected
                                ? "border-orange-500 bg-orange-500 text-black"
                                : "border-gray-700 bg-gray-900 text-transparent"
                            }`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </div>
                        </div>

                        <h4 className="font-bold text-white text-xs sm:text-sm leading-tight">
                          {service.title}
                        </h4>
                        {service.requiresNisha && (
                          <span className="mt-1 inline-block rounded-full border border-pink-400/30 bg-pink-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-pink-300 sm:text-[10px]">
                            Dr. Nisha only
                          </span>
                        )}
                        <p className="hidden sm:block text-[11px] text-gray-400 mt-1 leading-snug">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Obstetrics & Gynaecology featured card (centered in the last row) */}
                {(() => {
                  const feature = AVAILABLE_SERVICES.find((s) => s.title === "Obstetrics & Gynaecology Consultation");
                  if (!feature) return null;
                  const Icon = feature.icon;
                  const isSelected = selectedServices.includes(feature.title);
                  return (
                    <>
                      <div aria-hidden="true" />
                      <div
                        onClick={() => toggleService(feature.title)}
                        className={`
                          group relative flex flex-col justify-between rounded-xl border p-2.5 sm:p-3 cursor-pointer transition-all duration-300
                          ${
                            isSelected
                              ? "border-orange-500 bg-orange-500/10 shadow-[0_0_25px_rgba(249,115,22,0.25)]"
                              : "border-orange-500/20 bg-[#0e0e12] hover:border-orange-500/60 hover:bg-[#14141a]"
                          }
                        `}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <div
                              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] ${
                                isSelected
                                  ? "border-orange-500/40 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                                  : "border-orange-500/20 bg-orange-500/10 text-orange-400 group-hover:scale-110 group-hover:rotate-6"
                              }`}
                            >
                              <Icon size={15} className="sm:hidden" />
                              <Icon size={17} className="hidden sm:block" />
                            </div>

                            <div
                              className={`flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border transition-all ${
                                isSelected
                                  ? "border-orange-500 bg-orange-500 text-black"
                                  : "border-gray-700 bg-gray-900 text-transparent"
                              }`}
                            >
                              <Check size={12} strokeWidth={3} />
                            </div>
                          </div>

                          <h4 className="font-bold text-white text-xs sm:text-sm leading-tight">
                            {feature.title}
                          </h4>
                          <span className="mt-1 inline-block rounded-full border border-pink-400/30 bg-pink-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-pink-300 sm:text-[10px]">
                            Dr. Nisha only
                          </span>
                          <p className="hidden sm:block text-[11px] text-gray-400 mt-1 leading-snug">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div aria-hidden="true" />
                    </>
                  );
                })()}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 group"
                >
                  <span>Continue to Date & Time</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Choose Appointment Schedule</h3>
                  <p className="text-sm text-gray-400 mt-1">Select your preferred date and available time slot.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition"
                >
                  <ArrowLeft size={14} /> Back to Services
                </button>
              </div>

              {/* Select Doctor */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex">
                  <span className="flex items-center gap-2">
                    <User size={14} className="text-orange-400" />
                    Select Doctor
                  </span>
                </label>

                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value);
                    const doc = DOCTORS.find((d) => d.name === e.target.value);
                    if (doc?.eveningOnly) {
                      setSelectedTimeSlot("04:00 PM");
                    }
                  }}
                  className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] px-3 py-3 text-sm text-white outline-none transition focus:border-orange-500 disabled:opacity-50"
                  disabled={eligibleDoctors.length === 0}
                >
                  {eligibleDoctors.map((doc) => (
                    <option key={doc.name} value={doc.name}>
                      {doc.name}
                    </option>
                  ))}
                </select>
                {eligibleDoctors.length === 0 ? (
                  <p className="mt-2 text-[11px] text-red-400">
                    No doctor is available for the selected services. Please adjust your selection.
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-gray-500">
                    {selectedServices.length > 1
                      ? "Choose the doctor for this appointment from those who handle your selected services."
                      : currentDoctor.eveningOnly
                        ? `${currentDoctor.name.split(" ")[1]} is available from 4:00 PM (evening appointments only).`
                        : "Available all day."}
                  </p>
                )}
                {ogDoctorMismatch && (
                  <p className="mt-2 text-[11px] text-red-400">
                    Obstetrics & Gynaecology Consultation is only available with Dr. Nisha Kaushik Patnaik.
                  </p>
                )}
              </div>

              {/* Date Selection Dropdown */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CalendarIcon size={14} className="text-orange-400" />
                  Select Date
                </label>

                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] px-3 py-3 text-sm text-white outline-none transition focus:border-orange-500"
                >
                  {availableDates.map((dateObj) => (
                    <option key={dateObj.iso} value={dateObj.iso}>
                      {dateObj.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[11px] text-gray-500">
                  Sundays are holidays.
                </p>

                {/* Custom Date Input Fallback */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Or choose specific date:</span>
                  <input
                    type="date"
                    min={availableDates[0]?.iso}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="rounded-lg border border-gray-800 bg-[#0e0e12] px-3 py-1.5 text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Time Slot Selection Dropdown */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-orange-400" />
                  Select Time Slot
                </label>

                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] px-3 py-3 text-sm text-white outline-none transition focus:border-orange-500"
                >
                  {availableTimeSlots.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.slots.map((slot) => {
                        const booked = isSlotBooked(slot);
                        return (
                          <option
                            key={slot}
                            value={slot}
                            disabled={booked}
                            className={booked ? "text-gray-600 line-through" : ""}
                          >
                            {booked ? `${slot} (Booked)` : slot}
                          </option>
                        );
                      })}
                    </optgroup>
                  ))}
                </select>
                <p className="mt-2 text-[11px] text-gray-500">
                  Greyed-out slots are already booked.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-gray-400 hover:text-white transition"
                >
                  ← Back
                </button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 group"
                >
                  <span>Continue to Your Details</span>
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: ATHLETE DETAILS & SUBMIT */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Your Details & Confirmation</h3>
                  <p className="text-sm text-gray-400 mt-1">Provide your contact info to finalize your booking.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition"
                >
                  <ArrowLeft size={14} /> Back to Schedule
                </button>
              </div>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <User size={14} className="text-orange-400" />
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3.5 text-sm text-white outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Mail size={14} className="text-orange-400" />
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3.5 text-sm text-white outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Phone size={14} className="text-orange-400" />
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3.5 text-sm text-white outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Trophy size={14} className="text-orange-400" />
                    Sport / Activity <span className="font-normal normal-case text-gray-500">(optional)</span>
                  </label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3.5 text-sm text-white outline-none transition focus:border-orange-500"
                  >
                    <option value="">None / Not an athlete</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Running">Running / Marathon</option>
                    <option value="Athletics">Track & Field / Athletics</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Other">Other Sport / Fitness</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Goals, Medical History or Specific Concerns
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about your concerns, symptoms, goals, or any past injuries..."
                  className="w-full rounded-xl border border-gray-800 bg-[#0e0e12] p-3.5 text-sm text-white outline-none transition focus:border-orange-500"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="mb-8 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">
                  Summary Review
                </h4>
                <div className="grid gap-2 text-xs text-gray-300 sm:grid-cols-2">
                  <div>
                    <span className="text-gray-500">Selected Services:</span>{" "}
                    <span className="font-semibold text-white">
                      {selectedServices.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Appointment Date:</span>{" "}
                    <span className="font-semibold text-white">
                      {formatDateDisplay(selectedDate, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Doctor:</span>{" "}
                    <span className="font-semibold text-white">
                      {selectedDoctor}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Time Slot:</span>{" "}
                    <span className="font-semibold text-orange-400">
                      {selectedTimeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>{" "}
                    <span className="font-semibold text-white">
                      Sports Science India Clinic
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-gray-400 hover:text-white transition"
                >
                  ← Back
                </button>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Processing Booking...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Confirm & Send Confirmation Email</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {currentStep === 4 && submittedData && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/20 text-orange-400 mb-6 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
                <CheckCircle2 size={44} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Booking Request Submitted!
              </h3>

              <p className="mt-3 text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{submittedData.name}</strong>! A confirmation email has been dispatched to <strong className="text-orange-400">{submittedData.email}</strong>, and our sports science team has received your request.
              </p>

              <div className="mt-8 mx-auto max-w-md rounded-2xl border border-gray-800 bg-[#0e0e12] p-5 text-left text-xs space-y-2.5">
                {submittedData.bookingCode && (
                  <div className="rounded-xl border border-dashed border-orange-500/40 bg-orange-500/10 p-3 text-center mb-2">
                    <p className="text-gray-400">Your Booking Code</p>
                    <p className="mt-1 text-lg font-extrabold tracking-widest text-orange-400">
                      {submittedData.bookingCode}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500">Keep this code for reference.</p>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-800/80 pb-2">
                  <span className="text-gray-400">Services:</span>
                  <span className="font-semibold text-white">{submittedData.services.join(", ")}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/80 pb-2">
                  <span className="text-gray-400">Date:</span>
                  <span className="font-semibold text-white">
                    {formatDateDisplay(submittedData.date, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-800/80 pb-2">
                  <span className="text-gray-400">Doctor:</span>
                  <span className="font-semibold text-white">{submittedData.doctor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/80 pb-2">
                  <span className="text-gray-400">Time Slot:</span>
                  <span className="font-semibold text-orange-400">{submittedData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-semibold text-white">{submittedData.phone}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button onClick={resetForm} variant="outline" className="text-xs">
                  Book Another Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
