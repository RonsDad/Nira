import { useState, useEffect } from "react";
import { Monitor, Play, Pause, RotateCcw, ExternalLink, Hand, Eye, Star, MapPin, Clock, Calendar, User, CheckCircle, Loader2, Phone, Mail, GraduationCap, Award, Building, Shield, CreditCard, Timer, ChevronRight, X } from "lucide-react";

interface BrowserViewPanelProps {
  isActive: boolean;
  currentUrl?: string;
  isAutomating?: boolean;
  onTakeControl?: () => void;
  onReleaseControl?: () => void;
  hasUserControl?: boolean;
  onConfirmAppointment?: () => void;
  onClose?: () => void;
}

type BookingStep = "initial" | "profile" | "schedule" | "selected" | "confirming" | "processing" | "confirmed";

export function BrowserViewPanel({ 
  isActive, 
  currentUrl = "healthgrades.com", 
  isAutomating = false,
  onTakeControl,
  onReleaseControl,
  hasUserControl = false,
  onConfirmAppointment,
  onClose
}: BrowserViewPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [bookingStep, setBookingStep] = useState<BookingStep>("initial");
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (!isActive) return null;

  const availableTimes = [
    { 
      date: "Jan 9", 
      fullDate: "Tuesday, January 9th, 2025",
      day: "Tuesday", 
      times: [
        { time: "10:00 AM", available: true, type: "routine" },
        { time: "2:30 PM", available: true, type: "routine" },
        { time: "4:15 PM", available: true, type: "routine" }
      ]
    },
    { 
      date: "Jan 10", 
      fullDate: "Wednesday, January 10th, 2025",
      day: "Wednesday", 
      times: [
        { time: "9:30 AM", available: true, type: "routine" },
        { time: "1:00 PM", available: true, type: "consultation" },
        { time: "3:45 PM", available: true, type: "routine" }
      ]
    },
    { 
      date: "Jan 11", 
      fullDate: "Thursday, January 11th, 2025",
      day: "Thursday", 
      times: [
        { time: "11:00 AM", available: true, type: "consultation" },
        { time: "2:00 PM", available: true, type: "routine" }
      ]
    }
  ];

  const handleViewProfile = () => {
    setBookingStep("profile");
  };

  const handleScheduleAppointment = () => {
    setBookingStep("schedule");
  };

  const handleSelectTime = (date: string, time: string, fullDate: string) => {
    setSelectedTime(`${fullDate}, ${time}`);
    setBookingStep("selected");
  };

  const handleConfirmBooking = async () => {
    // Step 1: Show "Appointment Confirmed" for 2 seconds
    setBookingStep("confirming");
    
    setTimeout(() => {
      // Step 2: Show "Please Wait..." for 2 seconds
      setBookingStep("processing");
      
      setTimeout(() => {
        // Step 3: Complete and trigger preview panel
        setBookingStep("confirmed");
        if (onConfirmAppointment) {
          onConfirmAppointment();
        }
      }, 2000);
    }, 2000);
  };

  const renderContent = () => {
    switch (bookingStep) {
      case "initial":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div 
                className="w-16 h-16 rounded-xl ice-glass flex items-center justify-center mx-auto"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--color-ice-highlight) 0%, 
                    var(--color-ice-crystalline) 100%)`
                }}
              >
                <Monitor 
                  size={28} 
                  style={{ color: 'var(--color-accent-blue)' }}
                />
              </div>
              <div>
                <p 
                  className="font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Ready to Browse
                </p>
                <p 
                  className="text-sm opacity-70 mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Click to view Dr. Michael Lee's comprehensive profile
                </p>
                <button
                  onClick={handleViewProfile}
                  className="glass-accent px-6 py-3 rounded-lg interactive-scale transition-all duration-300"
                >
                  <span 
                    className="font-medium flex items-center gap-2"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    View Profile
                    <ChevronRight size={16} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Provider Header */}
              <div className="ice-glass-elevated p-6 rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-20 h-20 rounded-xl ice-glass flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, 
                        var(--color-ice-highlight) 0%, 
                        var(--color-ice-crystalline) 100%)`
                    }}
                  >
                    <User 
                      size={32} 
                      style={{ color: 'var(--color-accent-blue)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="text-xl font-medium mb-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Dr. Michael Lee, MD
                    </h4>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Board-Certified General & Pediatric Dermatology
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star 
                          size={14} 
                          style={{ color: 'var(--color-accent-blue)' }}
                          fill="var(--color-accent-blue)"
                        />
                        <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>4.8</span>
                        <span style={{ color: 'var(--color-text-tertiary)' }}>(89 reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin 
                          size={14} 
                          style={{ color: 'var(--color-accent-blue)' }}
                        />
                        <span style={{ color: 'var(--color-text-tertiary)' }}>3.1 miles away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield 
                          size={14} 
                          style={{ color: 'var(--color-accent-blue)' }}
                        />
                        <span className="text-xs font-medium" style={{ color: 'var(--color-accent-blue)' }}>Aetna Accepted</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="ice-glass p-3 rounded-lg text-center">
                    <div className="font-medium text-lg" style={{ color: 'var(--color-accent-blue)' }}>15+</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Years Experience</div>
                  </div>
                  <div className="ice-glass p-3 rounded-lg text-center">
                    <div className="font-medium text-lg" style={{ color: 'var(--color-accent-blue)' }}>2,800+</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Patients Treated</div>
                  </div>
                  <div className="ice-glass p-3 rounded-lg text-center">
                    <div className="font-medium text-lg" style={{ color: 'var(--color-accent-blue)' }}>98%</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="ice-glass p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap 
                    size={16} 
                    style={{ color: 'var(--color-accent-blue)' }}
                  />
                  <h5 
                    className="font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Education & Credentials
                  </h5>
                </div>
                <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="flex items-start gap-2">
                    <Award size={12} className="mt-1" style={{ color: 'var(--color-accent-blue)' }} />
                    <div>
                      <p className="font-medium">MD - Harvard Medical School</p>
                      <p className="text-xs opacity-70">Magna Cum Laude, 2008</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award size={12} className="mt-1" style={{ color: 'var(--color-accent-blue)' }} />
                    <div>
                      <p className="font-medium">Dermatology Residency - Johns Hopkins</p>
                      <p className="text-xs opacity-70">Chief Resident, 2008-2012</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award size={12} className="mt-1" style={{ color: 'var(--color-accent-blue)' }} />
                    <div>
                      <p className="font-medium">Pediatric Dermatology Fellowship</p>
                      <p className="text-xs opacity-70">Children's Hospital of Philadelphia, 2012-2013</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Information */}
              <div className="ice-glass p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building 
                    size={16} 
                    style={{ color: 'var(--color-accent-blue)' }}
                  />
                  <h5 
                    className="font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Practice Information
                  </h5>
                </div>
                <div className="space-y-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Address</p>
                      <p>890 Health Center Blvd</p>
                      <p>Suite 200, San Francisco, CA 94110</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>Contact</p>
                      <div className="flex items-center gap-1 mb-1">
                        <Phone size={12} />
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={12} />
                        <span>office@drlee-derm.com</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Office Hours</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Mon-Wed: 8:00 AM - 6:00 PM</div>
                      <div>Thu-Fri: 9:00 AM - 5:00 PM</div>
                      <div>Saturday: 9:00 AM - 2:00 PM</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Insurance Accepted</p>
                    <div className="flex flex-wrap gap-2">
                      {["Aetna", "Blue Cross", "UnitedHealth", "Cigna", "Kaiser"].map((insurance) => (
                        <span key={insurance} className="ice-glass px-2 py-1 rounded text-xs">
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Languages</p>
                    <p>English, Korean, Mandarin</p>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="ice-glass p-4 rounded-lg">
                <h5 
                  className="font-medium mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Areas of Expertise
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {[
                    "Acne Treatment & Prevention",
                    "Skin Cancer Screening & Removal",
                    "Pediatric Dermatology",
                    "Eczema & Atopic Dermatitis",
                    "Psoriasis Management",
                    "Melanoma Detection",
                    "Cosmetic Dermatology",
                    "Dermatopathology"
                  ].map((specialty, i) => (
                    <div key={i} className="ice-glass p-2 rounded flex items-center gap-2">
                      <CheckCircle size={12} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="ice-glass p-4 rounded-lg">
                <h5 
                  className="font-medium mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Recent Patient Reviews
                </h5>
                <div className="space-y-3">
                  {[
                    {
                      name: "Sarah M.",
                      rating: 5,
                      review: "Dr. Lee was incredibly thorough with my daughter's eczema treatment. Very patient and explained everything clearly. Highly recommend!",
                      date: "2 weeks ago",
                      verified: true
                    },
                    {
                      name: "James R.",
                      rating: 5,
                      review: "Professional and knowledgeable. Solved my persistent skin issue that other doctors couldn't figure out. Worth the visit!",
                      date: "1 month ago",
                      verified: true
                    },
                    {
                      name: "Maria L.",
                      rating: 4,
                      review: "Great bedside manner and very clean office. The appointment was on time and Dr. Lee answered all my questions thoroughly.",
                      date: "6 weeks ago",
                      verified: true
                    }
                  ].map((review, i) => (
                    <div key={i} className="ice-glass p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                            {review.name}
                          </span>
                          {review.verified && (
                            <CheckCircle size={12} style={{ color: 'var(--color-accent-blue)' }} />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j}
                              size={10} 
                              fill={j < review.rating ? "var(--color-accent-blue)" : "transparent"}
                              style={{ color: j < review.rating ? 'var(--color-accent-blue)' : 'var(--color-text-tertiary)' }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        "{review.review}"
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule Button - Sticky */}
            <div className="flex-shrink-0 p-6 pt-4" style={{ 
              background: `linear-gradient(to top, var(--color-background-void) 0%, transparent 100%)` 
            }}>
              <button
                onClick={handleScheduleAppointment}
                className="w-full glass-accent px-6 py-4 rounded-lg interactive-scale transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.15) 0%, 
                    rgba(59, 130, 246, 0.08) 100%)`
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar size={20} style={{ color: 'var(--color-accent-blue)' }} />
                  <span 
                    className="font-medium text-lg"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    Schedule Appointment
                  </span>
                  <ChevronRight size={20} style={{ color: 'var(--color-accent-blue)' }} />
                </div>
              </button>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center mb-6">
                <h4 
                  className="text-lg font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Available Appointments
                </h4>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Select your preferred appointment time with Dr. Lee
                </p>
              </div>

              <div className="space-y-4">
                {availableTimes.map((day, dayIndex) => (
                  <div key={dayIndex} className="ice-glass-elevated p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar 
                        size={16} 
                        style={{ color: 'var(--color-accent-blue)' }}
                      />
                      <div>
                        <span 
                          className="font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {day.day}, {day.date}
                        </span>
                        <p className="text-xs opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
                          {day.fullDate}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {day.times.map((slot, timeIndex) => (
                        <button
                          key={timeIndex}
                          onClick={() => handleSelectTime(day.date, slot.time, day.fullDate)}
                          disabled={!slot.available}
                          className={`ice-glass p-3 rounded-lg interactive-scale transition-all duration-200 ${
                            slot.available ? 'hover:glass-accent cursor-pointer' : 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock 
                                size={14} 
                                style={{ color: 'var(--color-accent-blue)' }}
                              />
                              <span 
                                className="font-medium"
                                style={{ color: 'var(--color-text-primary)' }}
                              >
                                {slot.time}
                              </span>
                              <span 
                                className="text-xs px-2 py-1 rounded ice-glass"
                                style={{ color: 'var(--color-text-tertiary)' }}
                              >
                                {slot.type === "consultation" ? "Consultation" : "30 min"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {slot.available ? (
                                <>
                                  <CheckCircle size={12} style={{ color: 'var(--color-accent-blue)' }} />
                                  <span className="text-xs" style={{ color: 'var(--color-accent-blue)' }}>Available</span>
                                </>
                              ) : (
                                <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Booked</span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Appointment Types Info */}
              <div className="ice-glass p-4 rounded-lg">
                <h5 
                  className="font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Appointment Information
                </h5>
                <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="flex items-start gap-2">
                    <Timer size={12} className="mt-1" style={{ color: 'var(--color-accent-blue)' }} />
                    <div>
                      <p className="font-medium">Standard Appointment: 30 minutes</p>
                      <p className="text-xs opacity-70">General consultation, follow-ups, routine screenings</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Timer size={12} className="mt-1" style={{ color: 'var(--color-accent-blue)' }} />
                    <div>
                      <p className="font-medium">Consultation: 45 minutes</p>
                      <p className="text-xs opacity-70">Complex conditions, new patient comprehensive exam</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "selected":
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center mb-6">
                <h4 
                  className="text-lg font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Confirm Your Appointment
                </h4>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Please review your appointment details below
                </p>
              </div>

              {/* Selected Appointment */}
              <div className="ice-glass-elevated p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle 
                    size={20} 
                    style={{ color: 'var(--color-accent-blue)' }}
                  />
                  <span 
                    className="font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Appointment Selected
                  </span>
                </div>
                <div className="space-y-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>Dr. Michael Lee, MD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>890 Health Center Blvd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>30 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>$40 copay (Aetna)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} style={{ color: 'var(--color-accent-blue)' }} />
                      <span>(555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="ice-glass p-4 rounded-lg">
                <h5 
                  className="font-medium mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Patient Information
                </h5>
                <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>Name:</strong> John Smith</p>
                    <p><strong>DOB:</strong> January 15, 1985</p>
                    <p><strong>Insurance:</strong> Aetna PPO</p>
                    <p><strong>Member ID:</strong> AET123456789</p>
                  </div>
                  <div className="mt-3">
                    <p><strong>Reason for Visit:</strong></p>
                    <p className="mt-1">Routine skin examination and mole check</p>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="ice-glass p-4 rounded-lg">
                <h5 
                  className="font-medium mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Important Reminders
                </h5>
                <div className="space-y-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="flex items-start gap-2">
                    <Clock size={12} className="mt-0.5" style={{ color: 'var(--color-accent-blue)' }} />
                    <p>Please arrive 15 minutes early for check-in and paperwork</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CreditCard size={12} className="mt-0.5" style={{ color: 'var(--color-accent-blue)' }} />
                    <p>Bring your insurance card and a valid photo ID</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield size={12} className="mt-0.5" style={{ color: 'var(--color-accent-blue)' }} />
                    <p>Your $40 copay will be collected at the time of service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button - Sticky */}
            <div className="flex-shrink-0 p-6 pt-4" style={{ 
              background: `linear-gradient(to top, var(--color-background-void) 0%, transparent 100%)` 
            }}>
              <button
                onClick={handleConfirmBooking}
                className="w-full glass-accent px-6 py-4 rounded-lg interactive-scale transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.2) 0%, 
                    rgba(59, 130, 246, 0.1) 100%)`,
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={20} style={{ color: 'var(--color-accent-blue)' }} />
                  <span 
                    className="font-medium text-lg"
                    style={{ color: 'var(--color-accent-blue)' }}
                  >
                    Confirm Appointment
                  </span>
                </div>
              </button>
            </div>
          </div>
        );

      case "confirming":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 animate-scale-in">
              <div 
                className="w-24 h-24 rounded-xl ice-glass flex items-center justify-center mx-auto animate-pulse-gentle"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.3) 0%, 
                    rgba(59, 130, 246, 0.15) 100%)`
                }}
              >
                <CheckCircle 
                  size={40} 
                  style={{ color: 'var(--color-accent-blue)' }}
                  className="animate-pulse-gentle"
                />
              </div>
              <div>
                <h4 
                  className="text-2xl font-medium mb-3 text-gradient"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Appointment Confirmed!
                </h4>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Your booking has been successfully processed
                </p>
                <p 
                  className="text-xs mt-2 opacity-60"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Generating confirmation details...
                </p>
              </div>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 animate-fade-in">
              <div 
                className="w-24 h-24 rounded-xl ice-glass flex items-center justify-center mx-auto"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--color-ice-highlight) 0%, 
                    var(--color-ice-crystalline) 100%)`
                }}
              >
                <Loader2 
                  size={40} 
                  style={{ color: 'var(--color-accent-blue)' }}
                  className="animate-spin"
                />
              </div>
              <div>
                <h4 
                  className="text-2xl font-medium mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Please Wait
                </h4>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  We're confirming your appointment details...
                </p>
                <p 
                  className="text-xs mt-2 opacity-60"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Processing with Dr. Lee's office
                </p>
              </div>
            </div>
          </div>
        );

      case "confirmed":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4 animate-fade-in">
              <div 
                className="w-20 h-20 rounded-xl ice-glass flex items-center justify-center mx-auto"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.2) 0%, 
                    rgba(59, 130, 246, 0.1) 100%)`
                }}
              >
                <CheckCircle 
                  size={32} 
                  style={{ color: 'var(--color-accent-blue)' }}
                />
              </div>
              <div>
                <p 
                  className="font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  All Set!
                </p>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Confirmation details generated in preview panel
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="ice-glass-elevated rounded-xl overflow-hidden animate-slide-up h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-ice-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-lg ice-glass flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--color-ice-highlight) 0%, 
                    var(--color-ice-crystalline) 100%)`
                }}
              >
                <Monitor 
                  size={16} 
                  style={{ color: 'var(--color-accent-blue)' }}
                />
              </div>
              {bookingStep !== "initial" && (
                <div 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse-gentle"
                  style={{ 
                    backgroundColor: bookingStep === "confirmed" ? 'var(--color-accent-blue)' : 
                                   bookingStep === "confirming" || bookingStep === "processing" ? 'var(--color-accent-blue-bright)' :
                                   'var(--color-accent-blue)' 
                  }}
                />
              )}
            </div>
            <div>
              <h3 
                className="font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Browser View
              </h3>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {currentUrl}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 ice-glass px-3 py-1.5 rounded-lg">
              {bookingStep === "confirmed" ? (
                <>
                  <CheckCircle size={12} style={{ color: 'var(--color-accent-blue)' }} />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Complete
                  </span>
                </>
              ) : bookingStep === "confirming" || bookingStep === "processing" ? (
                <>
                  <Loader2 size={12} style={{ color: 'var(--color-accent-blue-bright)' }} className="animate-spin" />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Processing
                  </span>
                </>
              ) : bookingStep !== "initial" ? (
                <>
                  <Eye size={12} style={{ color: 'var(--color-accent-blue)' }} />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Active
                  </span>
                </>
              ) : (
                <>
                  <Pause size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Ready
                  </span>
                </>
              )}
            </div>
            
            {/* Expand/Collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ice-glass p-2 rounded-lg interactive-scale transition-all duration-200"
            >
              <RotateCcw 
                size={14} 
                style={{ color: 'var(--color-text-secondary)' }}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="ice-glass p-2 rounded-lg interactive-scale transition-all duration-200 hover:bg-red-500/10"
              >
                <X 
                  size={14} 
                  style={{ color: 'var(--color-text-secondary)' }}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Browser Viewport */}
      {isExpanded && (
        <div className="relative flex-1 flex flex-col min-h-0">
          {/* Mock Browser UI */}
          <div className="p-3 border-b flex-shrink-0" style={{ borderColor: 'var(--color-ice-border)' }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EF4444' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue-bright)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-blue)' }} />
              </div>
              <div 
                className="flex-1 ice-glass px-3 py-1.5 rounded-lg text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                https://{currentUrl}/dr-michael-lee
              </div>
              <button className="ice-glass p-1.5 rounded-lg interactive-scale">
                <ExternalLink size={12} style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            </div>
          </div>

          {/* Viewport Content */}
          <div className="relative overflow-hidden flex-1 flex flex-col min-h-0">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
}