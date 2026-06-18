"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Mail, Briefcase, CheckCircle2, Loader2, Zap, Coffee, Code2, MessageSquare } from "lucide-react";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM", "09:00 PM"
];

const meetingTypes = [
  { id: "coffee", label: "Coffee Chat", icon: <Coffee className="w-4 h-4" />, duration: "30 min", color: "#f59e0b", description: "Casual conversation, get to know each other" },
  { id: "project", label: "Project Discussion", icon: <Briefcase className="w-4 h-4" />, duration: "45 min", color: "#06b6d4", description: "Discuss potential collaboration or project ideas" },
  { id: "mentorship", label: "Tech Mentorship", icon: <Code2 className="w-4 h-4" />, duration: "60 min", color: "#a855f7", description: "Career advice, coding help, or tech guidance" },
  { id: "startup", label: "Startup Talk", icon: <Zap className="w-4 h-4" />, duration: "60 min", color: "#22c55e", description: "Startup ideas, entrepreneurship, business strategy" },
];

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const selectedMeetingType = meetingTypes.find(t => t.id === selectedType);

  const canProceedStep1 = !!selectedType;
  const canProceedStep2 = !!selectedDate && !!selectedTime;
  const canProceedStep3 = formData.name.trim() && formData.email.trim();

  return (
    <section id="appointment" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Calendar className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Schedule a Meet
              </span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got an idea, project, or just want to chat? Book a slot and let&apos;s connect!
          </p>
          <motion.div
            className="h-0.5 w-32 mx-auto mt-4 bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                    step >= s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border"
                  }`}
                  animate={step === s ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: step === s ? Infinity : 0, repeatDelay: 2 }}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-16 md:w-24 h-0.5 transition-all duration-500 ${step > s ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Choose a meeting type"}
              {step === 2 && "Pick a date & time"}
              {step === 3 && "Tell me about yourself"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1 — Meeting Type */}
            {step === 1 && !submitted && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {meetingTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-5 rounded-xl text-left border-2 transition-all duration-300 relative overflow-hidden hud-corners ${
                        selectedType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${type.color}20`, color: type.color }}
                        >
                          {type.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm">{type.label}</h3>
                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                              {type.duration}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                      {selectedType === type.id && (
                        <motion.div
                          className="absolute top-3 right-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => canProceedStep1 && setStep(2)}
                  disabled={!canProceedStep1}
                  className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canProceedStep1
                      ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_24px_rgba(0,229,255,0.3)]"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  whileHover={canProceedStep1 ? { scale: 1.02 } : {}}
                  whileTap={canProceedStep1 ? { scale: 0.98 } : {}}
                >
                  Continue →
                </motion.button>
              </motion.div>
            )}

            {/* Step 2 — Date & Time */}
            {step === 2 && !submitted && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Selected type reminder */}
                {selectedMeetingType && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{ borderColor: `${selectedMeetingType.color}40`, backgroundColor: `${selectedMeetingType.color}10` }}
                  >
                    <div style={{ color: selectedMeetingType.color }}>{selectedMeetingType.icon}</div>
                    <div>
                      <p className="font-medium text-sm">{selectedMeetingType.label}</p>
                      <p className="text-xs text-muted-foreground">{selectedMeetingType.duration}</p>
                    </div>
                  </div>
                )}

                {/* Date picker */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={formatDate(minDate)}
                    max={formatDate(maxDate)}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:outline-none transition-all"
                  />
                </div>

                {/* Time slots */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    Select Time (IST)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <motion.button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                          selectedTime === slot
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border hover:border-primary/40 text-foreground"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl font-semibold border border-border bg-card text-foreground hover:bg-card/80 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    onClick={() => canProceedStep2 && setStep(3)}
                    disabled={!canProceedStep2}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canProceedStep2
                        ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_24px_rgba(0,229,255,0.3)]"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    whileHover={canProceedStep2 ? { scale: 1.02 } : {}}
                    whileTap={canProceedStep2 ? { scale: 0.98 } : {}}
                  >
                    Continue →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Your Info */}
            {step === 3 && !submitted && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* Booking summary */}
                <div className="p-4 rounded-xl bg-card border border-border mb-6 space-y-2">
                  <h4 className="font-semibold text-sm text-primary mb-3">Booking Summary</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 rounded-lg bg-primary/10">
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium text-foreground mt-0.5">{selectedMeetingType?.label}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-primary/10">
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground mt-0.5">{selectedDate}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-primary/10">
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground mt-0.5">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <User className="w-4 h-4 text-primary" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="What should I call you?"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="I'll send you the meeting link here"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      What do you want to discuss?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share a brief agenda or topic so I can prepare..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 rounded-xl font-semibold border border-border bg-card text-foreground hover:bg-card/80 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ← Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={!canProceedStep3 || isSubmitting}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        canProceedStep3 && !isSubmitting
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_0_24px_rgba(0,229,255,0.3)]"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                      whileHover={canProceedStep3 ? { scale: 1.02 } : {}}
                      whileTap={canProceedStep3 ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Confirm Booking →"
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Success state */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center py-12"
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Meeting Requested!</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-2">
                  Thanks <span className="text-primary font-medium">{formData.name}</span>! I&apos;ll review your request and send a calendar invite to{" "}
                  <span className="text-primary font-medium">{formData.email}</span>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Looking forward to our{" "}
                  <span className="font-medium">{selectedMeetingType?.label}</span> on{" "}
                  <span className="font-medium">{selectedDate}</span> at{" "}
                  <span className="font-medium">{selectedTime} IST</span>.
                </p>
                <motion.button
                  onClick={() => { setSubmitted(false); setStep(1); setSelectedType(null); setSelectedDate(""); setSelectedTime(null); setFormData({ name: "", email: "", message: "" }); }}
                  className="mt-8 px-6 py-2 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-all font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Another Meeting
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
