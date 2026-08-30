"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
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
import { DOCTORS, TIME_SLOTS, type DoctorConfig } from "@/lib/booking-config";

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

// Format a "YYYY-MM-DD" string without UTC timezone shifting.
function formatDateDisplay(iso: string, opts: Intl.DateTimeFormatOptions) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", opts);
}

// Convert a "HH:MM AM/PM" slot into minutes since midnight. Returns NaN for unparseable input.
function slotToMinutes(slot: string): number {
  const match = slot?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return NaN;
  let h = Number(match[1]);
  const m = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return h * 60 + m;
}

// Returns slot minutes, or 0 when unparseable (caller treats 0 as "no window").
function safeSlotMinutes(slot: string | undefined): number {
  const m = slotToMinutes(slot || "");
  return Number.isNaN(m) ? 0 : m;
}

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // Date selection
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    DOCTORS[0].eveningOnly ? "04:00 PM" : "10:00 AM"
  );

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

  // Doctor availability config from admin (Google Sheet Config tab)
  const [doctorConfigs, setDoctorConfigs] = useState<Record<string, DoctorConfig>>({});

  useEffect(() => {
    let active = true;
    fetch("/api/booking/config")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const map: Record<string, DoctorConfig> = {};
        if (Array.isArray(data?.config)) {
          for (const c of data.config as DoctorConfig[]) {
            if (c?.name) map[c.name] = c;
          }
        }
        setDoctorConfigs(map);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const configFor = useCallback(
    (name: string): DoctorConfig | undefined => doctorConfigs[name],
    [doctorConfigs]
  );

  // Doctors who can handle at least one selected service (any doctor if none selected),
  // limited to those the admin has marked available.
  const eligibleDoctors = useMemo(() => {
    const base =
      selectedServices.length === 0
        ? DOCTORS
        : DOCTORS.filter((doc) =>
            selectedServices.some((svc) => doc.services.includes(svc))
          );
    return base.filter((doc) => configFor(doc.name)?.available !== false);
  }, [selectedServices, configFor]);

  const currentDoctor =
    DOCTORS.find((d) => d.name === selectedDoctor) ?? DOCTORS[0];

  // Doctors take slots inside their admin-configured time window (default: full day).
  const availableTimeSlots = useMemo(() => {
    const cfg = configFor(currentDoctor.name);
    const defaultStart = 10 * 60; // 10:00 AM
    const defaultEnd = 20 * 60; // 08:00 PM
    let start = cfg?.start ? safeSlotMinutes(cfg.start) : defaultStart;
    let end = cfg?.end ? safeSlotMinutes(cfg.end) : defaultEnd;
    // Guard: unparseable or invalid window → full day.
    if (!start || !end || end <= start) {
      start = defaultStart;
      end = defaultEnd;
    }
    return TIME_SLOTS.map((group) => ({
      ...group,
      slots: group.slots.filter((s) => {
        const m = slotToMinutes(s);
        return m >= start && m <= end;
      }),
    })).filter((g) => g.slots.length > 0);
  }, [currentDoctor, configFor]);

  // If the currently selected doctor becomes unavailable, switch to an eligible one.
  if (configFor(selectedDoctor)?.available === false && eligibleDoctors.length > 0) {
    const next = eligibleDoctors[0].name;
    if (next !== selectedDoctor) {
      const cfg = configFor(next);
      const start = cfg?.start && !Number.isNaN(slotToMinutes(cfg.start)) ? cfg.start : "";
      if (start) setSelectedTimeSlot(start);
      setSelectedDoctor(next);
    }
  }

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

  // Already-booked slots: { date, timeSlot, doctor }
  const [bookedSlots, setBookedSlots] = useState<{ date: string; timeSlot: string; doctor?: string }[]>([]);

  const refreshBookedSlots = useCallback(() => {
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

  useEffect(refreshBookedSlots, [refreshBookedSlots]);

  const normalizeDoc = (doc?: string) =>
    (doc || "").trim().toLowerCase().replace(/^dr\.?\s*/i, "").replace(/\s+/g, " ");

  const isSlotBooked = (slot: string, docName: string = selectedDoctor) => {
    const targetDoc = normalizeDoc(docName);
    return bookedSlots.some(
      (b) =>
        b.date === selectedDate &&
        b.timeSlot === slot &&
        (!b.doctor || !targetDoc || normalizeDoc(b.doctor) === targetDoc)
    );
  };

  // Slots that have already passed on today's date
  const isSlotInPast = (slot: string) => {
    if (!selectedDate) return false;
    const now = new Date();
    const toLocalISO = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    if (selectedDate !== toLocalISO(now)) return false;
    return slotToMinutes(slot) <= now.getHours() * 60 + now.getMinutes();
  };

  // Auto-switch to first available slot if currently selected is booked or past
  useEffect(() => {
    if (!selectedDate || !selectedTimeSlot) return;
    if (isSlotBooked(selectedTimeSlot) || isSlotInPast(selectedTimeSlot)) {
      const allSlots = availableTimeSlots.flatMap((g) => g.slots);
      const firstFree = allSlots.find((s) => !isSlotBooked(s) && !isSlotInPast(s));
      if (firstFree && firstFree !== selectedTimeSlot) {
        setSelectedTimeSlot(firstFree);
      }
    }
  }, [selectedDoctor, selectedDate, bookedSlots, availableTimeSlots]);

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
        const newDoc = eligible[0];
        setSelectedDoctor(newDoc.name);
        const cfg = configFor(newDoc.name);
        const start = cfg?.start && !Number.isNaN(slotToMinutes(cfg.start)) ? cfg.start : "";
        if (start) setSelectedTimeSlot(start);
        else if (newDoc.eveningOnly) setSelectedTimeSlot("04:00 PM");
      }
      return next;
    });
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    let validatedValue = value;

    if (name === "name") {
      validatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "phone") {
      validatedValue = value.replace(/[^0-9+\-\s()]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: validatedValue }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please complete all contact details (Name, Email, Phone).");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      setErrorMessage("Full Name can only contain letters and spaces.");
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (ogDoctorMismatch) {
      setErrorMessage("Pre & Post Natal Rehab and Obstetrics & Gynaecology Consultation are only available with Dr. Nisha Kaushik Patnaik.");
      return;
    }

    if (isSlotBooked(selectedTimeSlot, selectedDoctor)) {
      setErrorMessage(`Sorry, ${selectedTimeSlot} has already been booked for ${selectedDoctor}. Please choose another time slot or doctor.`);
      return;
    }

    if (isSlotInPast(selectedTimeSlot)) {
      setErrorMessage("Sorry, that time slot has already passed for today. Please choose a later time.");
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
      refreshBookedSlots();
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
        <SectionHeading
          as="h1"
          eyebrow="Book Assessment"
          title={<>Schedule Your <span className="text-orange-500">Performance</span> Evaluation</>}
          description="Choose your desired sports science services, pick your preferred appointment time, and receive an instant confirmation email."
        />

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
                      <div aria-hidden="true" className="hidden lg:block" />
                      <div
                        onClick={() => toggleService(feature.title)}
                        className={`
                          group relative col-span-2 lg:col-span-1 flex flex-col items-center justify-center rounded-xl border p-2.5 sm:p-3 cursor-pointer transition-all duration-300
                          ${
                            isSelected
                              ? "border-orange-500 bg-orange-500/10 shadow-[0_0_25px_rgba(249,115,22,0.25)]"
                              : "border-orange-500/20 bg-[#0e0e12] hover:border-orange-500/60 hover:bg-[#14141a]"
                          }
                        `}
                      >
                        <div
                          className={`absolute top-2.5 right-2.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? "border-orange-500 bg-orange-500 text-black"
                              : "border-gray-700 bg-gray-900 text-transparent"
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>

                        <div className="flex flex-col items-center text-center">
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

                          <h4 className="mt-2 font-bold text-white text-xs sm:text-sm leading-tight">
                            {feature.title}
                          </h4>
                          <span className="mt-1.5 inline-block rounded-full border border-pink-400/30 bg-pink-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-pink-300 sm:text-[10px]">
                            Dr. Nisha only
                          </span>
                          <p className="text-[11px] text-gray-400 mt-1.5 leading-snug">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <div aria-hidden="true" className="hidden lg:block" />
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
                  onClick={() => {
                    setErrorMessage("");
                    setCurrentStep(1);
                  }}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition"
                >
                  <ArrowLeft size={14} /> Back to Services
                </button>
              </div>

              {errorMessage && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                    const nextDoctor = e.target.value;
                    setSelectedDoctor(nextDoctor);
                    const doc = DOCTORS.find((d) => d.name === nextDoctor);
                    const cfg = configFor(nextDoctor);
                    const start = cfg?.start && !Number.isNaN(slotToMinutes(cfg.start)) ? cfg.start : "";
                    if (start) setSelectedTimeSlot(start);
                    else if (doc?.eveningOnly) setSelectedTimeSlot("04:00 PM");
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
                  (() => {
                    // Are there doctors for these services at all, just not marked available today?
                    const anyMatching =
                      selectedServices.length === 0
                        ? DOCTORS.length > 0
                        : DOCTORS.some((doc) =>
                            selectedServices.some((svc) => doc.services.includes(svc))
                          );
                    return (
                      <p className="mt-2 text-[11px] text-red-400">
                        {anyMatching
                          ? "The doctor for your selected services is not available today. Please pick another date or adjust your selection."
                          : "No doctor is available for the selected services. Please adjust your selection."}
                      </p>
                    );
                  })()
                ) : (
                  <p className="mt-2 text-[11px] text-gray-500">
                    {selectedServices.length > 1
                      ? "Choose the doctor for this appointment from those who handle your selected services."
                      : (() => {
                          const cfg = configFor(currentDoctor.name);
                          let start = cfg?.start || (currentDoctor.eveningOnly ? "04:00 PM" : "10:00 AM");
                          let end = cfg?.end || "08:00 PM";
                          // Guard: unparseable/invalid window → show all-day fallback.
                          const sMin = slotToMinutes(start);
                          const eMin = slotToMinutes(end);
                          if (Number.isNaN(sMin) || Number.isNaN(eMin) || eMin <= sMin) {
                            start = "10:00 AM";
                            end = "08:00 PM";
                          }
                          if (start === "10:00 AM" && end === "08:00 PM") return "Available all day.";
                          return `${currentDoctor.name.split(" ")[1]} is available from ${start} to ${end}.`;
                        })()}
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
                  <span className="text-xs text-gray-500">or choose specific date:</span>
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
                        const past = isSlotInPast(slot);
                        const disabled = booked || past;
                        return (
                          <option
                            key={slot}
                            value={slot}
                            disabled={disabled}
                            className={disabled ? "text-gray-600 line-through" : ""}
                          >
                            {booked ? `${slot} (Booked)` : past ? `${slot} (Past)` : slot}
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
                  onClick={() => {
                    if (isSlotBooked(selectedTimeSlot, selectedDoctor)) {
                      setErrorMessage(
                        `Sorry, ${selectedTimeSlot} is already booked for ${selectedDoctor}. Please choose another time slot or doctor.`
                      );
                      return;
                    }
                    if (isSlotInPast(selectedTimeSlot)) {
                      setErrorMessage(
                        "Sorry, that time slot has already passed for today. Please choose a later time."
                      );
                      return;
                    }
                    if (ogDoctorMismatch) {
                      setErrorMessage(
                        "Pre & Post Natal Rehab and Obstetrics & Gynaecology Consultation are only available with Dr. Nisha Kaushik Patnaik."
                      );
                      return;
                    }
                    setErrorMessage("");
                    setCurrentStep(3);
                  }}
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
                    pattern="[A-Za-z\s]+"
                    title="Only letters and spaces allowed"
                    inputMode="text"
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                    inputMode="email"
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
                    pattern="[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}"
                    title="Please enter a valid phone number"
                    inputMode="tel"
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
