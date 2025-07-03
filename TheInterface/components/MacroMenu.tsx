import { useState, useEffect } from "react";
import { 
  DollarSign, 
  Calendar, 
  FileText, 
  Phone, 
  MapPin, 
  Search, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Bot,
  Target
} from "lucide-react";

interface MacroItem {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  hasInput?: boolean;
  inputPlaceholder?: string;
  template: string;
}

interface MacroMenuProps {
  isVisible: boolean;
  onSelect: (prompt: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}

const macroData: MacroItem[] = [
  // Financial Assistance
  {
    id: "copay-assistance",
    label: "Co-Pay Assistance",
    description: "Find pharmaceutical co-pay assistance programs",
    category: "Financial",
    icon: <DollarSign size={16} />,
    hasInput: true,
    inputPlaceholder: "Enter medication name (e.g., Truvada)",
    template: `I need you to help me find co-pay assistance programs for [MEDICATION]. Please act as an expert browser automation agent and follow these detailed instructions:

**PRIMARY OBJECTIVE:**
Find comprehensive co-pay assistance, patient savings programs, and financial support options for [MEDICATION].

**SEARCH STRATEGY:**
1. Start with the manufacturer's official website ([MEDICATION] + "manufacturer" + "savings program")
2. Search pharmaceutical assistance databases (NeedyMeds, RxAssist, Partnership for Prescription Assistance)
3. Check insurance formulary coverage and tier placement
4. Look for generic alternatives and their assistance programs

**NAVIGATION GUIDELINES:**
- Scroll slowly and methodically through each page
- Look for keywords: "savings card", "patient assistance", "co-pay support", "financial aid"
- Check both header navigation and footer links for program information
- If you encounter forms, fill them with placeholder data first to see requirements

**PROBLEM-SOLVING APPROACH:**
- If a page won't load, try alternative URLs or search terms
- If you encounter CAPTCHAs or verification, describe what you see
- If forms require specific information, note what's needed and continue exploring
- Try different browser user agents if content seems restricted

**INFORMATION TO COLLECT:**
- Program eligibility requirements (income limits, insurance status)
- Application process and required documentation
- Savings amount or percentage discount
- Program duration and renewal requirements
- Contact information for program enrollment
- Any restrictions or limitations

**BEFORE ENDING THE SESSION:**
Always ask: "I found several co-pay assistance options for [MEDICATION]. Would you like me to:
1. Dive deeper into any specific program's requirements?
2. Search for additional manufacturer coupons or rebates?
3. Look for state-specific assistance programs?
4. Find generic alternatives with better pricing?
5. Help you understand the application process for any of these programs?"

**COMMUNICATION STYLE:**
- Provide clear, step-by-step summaries of what you find
- Explain any medical or insurance terminology you encounter
- Give specific dollar amounts or percentage savings when available
- Always verify information is current (check page dates and program expiration dates)

Remember: Patient access to medication is critical. Be thorough, persistent, and always offer to continue helping until we find the best financial solution.`
  },
  
  // Appointment Scheduling
  {
    id: "book-appointment",
    label: "Book Appointment",
    description: "Schedule medical appointments with providers",
    category: "Scheduling",
    icon: <Calendar size={16} />,
    hasInput: true,
    inputPlaceholder: "Enter specialty or provider name",
    template: `I need to schedule an appointment with [INPUT]. Please help me navigate the booking process efficiently:

**OBJECTIVE:**
Book an appointment with [INPUT] while finding the best available times and ensuring all requirements are met.

**SEARCH & NAVIGATION:**
1. Find the provider's official website or patient portal
2. Look for "Schedule Appointment", "Book Online", or "Patient Portal" links
3. If no online booking, find phone numbers and office hours
4. Check for new patient vs. existing patient requirements

**BOOKING PROCESS:**
- Navigate through any patient portal login or registration
- Look for earliest available appointments
- Note any pre-appointment requirements (insurance verification, forms, etc.)
- Check for cancellation policies and rescheduling options

**INFORMATION TO GATHER:**
- Available appointment times in the next 2-4 weeks
- Office location and parking information
- Insurance acceptance and verification requirements
- What to bring to the appointment
- Pre-appointment paperwork or preparation needed

**PROBLEM-SOLVING:**
- If online booking is unavailable, find alternative contact methods
- If appointments are far out, look for cancellation lists or urgent care options
- If insurance verification is needed, note the process and requirements

**BEFORE ENDING:**
Ask: "I've found appointment options with [INPUT]. Would you like me to:
1. Look for earlier availability at other locations?
2. Find information about what to expect at your appointment?
3. Help you understand the insurance verification process?
4. Look for patient reviews or additional information about this provider?"

Provide specific appointment times, locations, and next steps for booking.`
  },

  // Insurance Navigation
  {
    id: "insurance-coverage",
    label: "Insurance Coverage Check",
    description: "Verify coverage and benefits for treatments",
    category: "Insurance",
    icon: <FileText size={16} />,
    hasInput: true,
    inputPlaceholder: "Enter treatment, medication, or procedure",
    template: `Help me understand insurance coverage for [INPUT]. Navigate insurance resources systematically:

**COVERAGE INVESTIGATION:**
1. Check insurance provider's official website and member portal
2. Look up [INPUT] in the insurance formulary or covered services directory
3. Identify coverage tier, copay amounts, and any restrictions
4. Find prior authorization requirements if applicable

**NAVIGATION STRATEGY:**
- Use insurance website's search function for [INPUT]
- Check both generic and brand name variations
- Look for "Coverage Policies", "Medical Policies", or "Formulary" sections
- Navigate to member benefits summary if available

**KEY INFORMATION TO FIND:**
- Coverage percentage and out-of-pocket costs
- Deductible application and annual limits
- Network restrictions and preferred providers
- Prior authorization or step therapy requirements
- Appeal process if coverage is denied

**PROBLEM-SOLVING:**
- If information isn't clear, look for member services contact information
- Check for coverage decision tools or cost calculators
- Look for alternative covered options or generics
- Find information about exceptions or appeals processes

**BEFORE ENDING:**
Ask: "I've gathered coverage information for [INPUT]. Would you like me to:
1. Look for ways to reduce your out-of-pocket costs?
2. Find in-network providers for this treatment?
3. Research the prior authorization process if required?
4. Look for patient assistance programs that could supplement insurance?
5. Find information about appealing coverage decisions?"

Provide clear cost breakdowns and next steps for obtaining coverage.`
  },

  // Provider Search
  {
    id: "find-provider",
    label: "Find Specialists",
    description: "Search for healthcare providers and specialists",
    category: "Providers",
    icon: <Search size={16} />,
    hasInput: true,
    inputPlaceholder: "Enter specialty (e.g., dermatologist, cardiologist)",
    template: `Help me find qualified [INPUT] specialists in my area. Conduct a comprehensive provider search:

**SEARCH STRATEGY:**
1. Use insurance provider directory for in-network specialists
2. Check hospital system websites for affiliated providers
3. Search medical society directories for board-certified specialists
4. Review online platforms like Healthgrades, Zocdoc, and Vitals

**PROVIDER EVALUATION CRITERIA:**
- Board certification and credentials
- Patient reviews and ratings
- Hospital affiliations and quality ratings
- Appointment availability and wait times
- Location and accessibility
- Languages spoken and cultural competency

**INFORMATION TO COLLECT:**
- Provider names, specialties, and sub-specialties
- Office locations and contact information
- Insurance acceptance and network status
- Patient rating scores and review summaries
- Education, training, and years of experience
- Appointment booking process (online vs. phone)

**NAVIGATION TECHNIQUES:**
- Use filters for location, insurance, gender, and languages
- Sort results by ratings, distance, and availability
- Read recent patient reviews for insights
- Check multiple sources to verify information accuracy

**BEFORE ENDING:**
Ask: "I've found several [INPUT] specialists for you. Would you like me to:
1. Get more detailed information about any specific providers?
2. Check appointment availability for your top choices?
3. Look for patient reviews and ratings in more detail?
4. Find information about what to expect at your first appointment?
5. Help you prepare questions to ask during consultations?"

Provide a ranked list of top 3-5 providers with key details for comparison.`
  },

  // Emergency Information
  {
    id: "urgent-care",
    label: "Urgent Care Locator",
    description: "Find nearby urgent care and emergency services",
    category: "Emergency",
    icon: <MapPin size={16} />,
    template: `I need to find urgent care options near my location. Please help me locate immediate medical care:

**URGENT SEARCH PRIORITIES:**
1. Find nearest urgent care centers within 10 miles
2. Check emergency room locations and wait times if available
3. Look for walk-in clinics and retail health clinics
4. Identify 24-hour medical facilities

**CRITICAL INFORMATION TO GATHER:**
- Current operating hours and days open
- Services provided (X-rays, lab work, minor procedures)
- Insurance acceptance and payment options
- Current wait times if available online
- Phone numbers for calling ahead
- Directions and parking information

**NAVIGATION APPROACH:**
- Use Google Maps integration for real-time information
- Check facility websites for current hours and services
- Look for online check-in options to save time
- Verify insurance network participation

**ADDITIONAL RESOURCES:**
- Find telemedicine options for non-urgent consultations
- Locate pharmacy hours for prescription needs
- Check for urgent care apps with wait time tracking
- Find nurse hotlines for medical advice

**BEFORE ENDING:**
Ask: "I've found urgent care options near you. Would you like me to:
1. Get current wait times and availability?
2. Help you understand what conditions are best for urgent care vs. ER?
3. Find online check-in options to save time?
4. Look for telemedicine alternatives for your specific concern?
5. Find 24-hour pharmacies in case you need prescriptions?"

Provide immediate, actionable information for getting medical care quickly.`
  },

  // Health Records
  {
    id: "medical-records",
    label: "Access Medical Records",
    description: "Navigate patient portals and health record systems",
    category: "Records",
    icon: <FileText size={16} />,
    template: `Help me access and navigate my medical records through patient portals:

**PORTAL ACCESS STRATEGY:**
1. Find the healthcare system's patient portal login page
2. Locate account registration process for new users
3. Navigate portal sections: test results, visit summaries, medications, etc.
4. Find document download and sharing options

**NAVIGATION GUIDANCE:**
- Look for "Patient Portal", "MyChart", "MyHealth", or similar links
- Check for mobile app alternatives
- Find password reset and account recovery options
- Locate technical support contact information

**RECORD TYPES TO ACCESS:**
- Recent test results and lab values
- Visit summaries and provider notes
- Current medication lists and dosages
- Vaccination records and immunization history
- Imaging results and radiology reports
- Referrals and specialist communications

**PROBLEM-SOLVING APPROACH:**
- If login fails, look for alternative authentication methods
- Check for different portal systems if multiple providers
- Find paper record request processes if online access unavailable
- Look for health information exchange networks

**BEFORE ENDING:**
Ask: "I've helped you access your medical records. Would you like me to:
1. Help you understand any specific test results or medical terminology?
2. Find how to share records with other healthcare providers?
3. Set up appointment reminders and health notifications?
4. Look for how to request corrections or additions to your records?
5. Find how to download or print important documents for your files?"

Ensure you can access, understand, and manage your complete health information.`
  }
];

const categoryColors = {
  "Financial": "#10B981", // Emerald
  "Scheduling": "#3B82F6", // Blue
  "Insurance": "#8B5CF6", // Violet
  "Providers": "#F59E0B", // Amber
  "Emergency": "#EF4444", // Red
  "Records": "#6B7280"  // Gray
};

const categoryIcons = {
  "Financial": <DollarSign size={16} />,
  "Scheduling": <Calendar size={16} />,
  "Insurance": <FileText size={16} />,
  "Providers": <Search size={16} />,
  "Emergency": <MapPin size={16} />,
  "Records": <FileText size={16} />
};

export function MacroMenu({ isVisible, onSelect, onClose, position }: MacroMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMacro, setSelectedMacro] = useState<MacroItem | null>(null);
  const [inputValue, setInputValue] = useState("");

  const categories = Array.from(new Set(macroData.map(item => item.category)));
  const filteredItems = selectedCategory 
    ? macroData.filter(item => item.category === selectedCategory)
    : macroData;

  useEffect(() => {
    if (!isVisible) {
      setSelectedIndex(0);
      setSelectedCategory(null);
      setSelectedMacro(null);
      setInputValue("");
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (selectedMacro) return; // Don't navigate when in input mode
          if (selectedCategory) {
            setSelectedIndex(prev => (prev + 1) % filteredItems.length);
          } else {
            setSelectedIndex(prev => (prev + 1) % categories.length);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (selectedMacro) return; // Don't navigate when in input mode
          if (selectedCategory) {
            setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
          } else {
            setSelectedIndex(prev => (prev - 1 + categories.length) % categories.length);
          }
          break;
        case "ArrowRight":
        case "Enter":
          e.preventDefault();
          if (selectedMacro && selectedMacro.hasInput) {
            // Generate prompt with input
            const prompt = selectedMacro.template.replace(/\[INPUT\]/g, inputValue || selectedMacro.inputPlaceholder || "");
            const finalPrompt = selectedMacro.id === "copay-assistance" 
              ? prompt.replace(/\[MEDICATION\]/g, inputValue || "Truvada")
              : prompt;
            onSelect(finalPrompt);
          } else if (selectedCategory) {
            const macro = filteredItems[selectedIndex];
            if (macro.hasInput) {
              setSelectedMacro(macro);
            } else {
              onSelect(macro.template);
            }
          } else {
            setSelectedCategory(categories[selectedIndex]);
            setSelectedIndex(0);
          }
          break;
        case "ArrowLeft":
        case "Backspace":
          e.preventDefault();
          if (selectedMacro) {
            setSelectedMacro(null);
            setInputValue("");
          } else if (selectedCategory) {
            setSelectedCategory(null);
            setSelectedIndex(0);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, selectedIndex, selectedCategory, selectedMacro, filteredItems, categories, onSelect, onClose, inputValue]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Macro Menu */}
      <div
        className="fixed z-50 w-[480px] ice-glass-elevated rounded-2xl shadow-2xl animate-scale-in"
        style={{
          left: position.x,
          bottom: `calc(100vh - ${position.y}px + 12px)`,
          maxHeight: '500px'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--color-ice-border)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg ice-glass flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--color-ice-highlight) 0%, 
                    var(--color-ice-crystalline) 100%)`
                }}
              >
                {selectedMacro ? (
                  <Target size={16} style={{ color: 'var(--color-accent-blue)' }} />
                ) : (
                  <Bot size={16} style={{ color: 'var(--color-accent-blue)' }} />
                )}
              </div>
              <div>
                <h3 
                  className="font-semibold text-sm flex items-center gap-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {selectedMacro ? (
                    <>
                      <ArrowLeft size={14} className="opacity-60" />
                      {selectedMacro.label}
                    </>
                  ) : selectedCategory ? (
                    <>
                      <ArrowLeft size={14} className="opacity-60" />
                      {selectedCategory}
                    </>
                  ) : (
                    "Healthcare Assistant Prompts"
                  )}
                  <Sparkles size={12} className="animate-pulse-gentle" style={{ color: 'var(--color-accent-blue)' }} />
                </h3>
                <p 
                  className="text-xs opacity-70"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {selectedMacro 
                    ? "Enter details to generate perfect prompt" 
                    : selectedCategory 
                      ? "Select task to get expert assistance"
                      : "AI-powered healthcare automation"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-80 overflow-y-auto">
          {selectedMacro ? (
            // Input mode for macro with input
            <div className="p-4">
              <div className="mb-4">
                <div 
                  className="text-sm font-medium mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {selectedMacro.description}
                </div>
                <input
                  type="text"
                  placeholder={selectedMacro.inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--color-ice-base)',
                    border: '1px solid var(--color-ice-border)',
                    color: 'var(--color-text-primary)',
                    focusRingColor: 'var(--color-accent-blue)'
                  }}
                  autoFocus
                />
              </div>
              
              <button
                onClick={() => {
                  const prompt = selectedMacro.template.replace(/\[INPUT\]/g, inputValue || selectedMacro.inputPlaceholder || "");
                  const finalPrompt = selectedMacro.id === "copay-assistance" 
                    ? prompt.replace(/\[MEDICATION\]/g, inputValue || "Truvada")
                    : prompt;
                  onSelect(finalPrompt);
                }}
                className="w-full ice-glass-elevated rounded-xl p-3 text-sm font-medium transition-all duration-200 interactive-scale flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, 
                    var(--color-accent-blue) 0%, 
                    var(--color-accent-blue-bright) 100%)`,
                  color: 'white'
                }}
              >
                <Bot size={16} />
                Generate Expert Prompt
                <Sparkles size={14} className="animate-pulse-gentle" />
              </button>
            </div>
          ) : selectedCategory ? (
            // Show macros in selected category
            <div className="p-2">
              {filteredItems.map((macro, index) => (
                <button
                  key={macro.id}
                  onClick={() => {
                    if (macro.hasInput) {
                      setSelectedMacro(macro);
                    } else {
                      onSelect(macro.template);
                    }
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-start gap-3 group ${
                    index === selectedIndex ? 'ice-glass' : 'hover:ice-glass'
                  }`}
                  style={{
                    background: index === selectedIndex 
                      ? `linear-gradient(135deg, 
                          var(--color-ice-surface) 0%,
                          var(--color-ice-base) 100%)`
                      : 'transparent'
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl ice-glass flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ 
                      color: categoryColors[macro.category as keyof typeof categoryColors],
                      backgroundColor: `${categoryColors[macro.category as keyof typeof categoryColors]}15`
                    }}
                  >
                    {macro.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-medium text-sm mb-1 flex items-center gap-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {macro.label}
                      {macro.hasInput && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-lg ice-glass"
                          style={{ 
                            color: 'var(--color-accent-blue)',
                            fontSize: '10px'
                          }}
                        >
                          Interactive
                        </span>
                      )}
                    </div>
                    <div 
                      className="text-xs opacity-80 break-words leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {macro.description}
                    </div>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className="opacity-50 group-hover:opacity-80 transition-opacity flex-shrink-0 mt-2"
                    style={{ color: 'var(--color-text-secondary)' }}
                  />
                </button>
              ))}
            </div>
          ) : (
            // Show categories
            <div className="p-2">
              {categories.map((category, index) => {
                const categoryMacros = macroData.filter(item => item.category === category);
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedIndex(0);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center gap-3 group ${
                      index === selectedIndex ? 'ice-glass' : 'hover:ice-glass'
                    }`}
                    style={{
                      background: index === selectedIndex 
                        ? `linear-gradient(135deg, 
                            var(--color-ice-surface) 0%,
                            var(--color-ice-base) 100%)`
                        : 'transparent'
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl ice-glass flex items-center justify-center"
                      style={{ 
                        color: categoryColors[category as keyof typeof categoryColors],
                        backgroundColor: `${categoryColors[category as keyof typeof categoryColors]}15`
                      }}
                    >
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </div>
                    <div className="flex-1">
                      <div 
                        className="font-medium text-sm mb-1"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {category}
                      </div>
                      <div 
                        className="text-xs opacity-70"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {categoryMacros.length} expert prompts
                      </div>
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="opacity-50 group-hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="p-3 border-t text-center"
          style={{ borderColor: 'var(--color-ice-border)' }}
        >
          <p 
            className="text-xs opacity-60"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {selectedMacro 
              ? "Enter to generate • Backspace to go back • Esc to close"
              : selectedCategory 
                ? "← Backspace to go back • Enter to select • Esc to close" 
                : "Arrow keys to navigate • Enter to select • Esc to close"
            }
          </p>
        </div>
      </div>
    </>
  );
}