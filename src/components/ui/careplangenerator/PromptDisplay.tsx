"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareText } from 'lucide-react'; // Using a new icon

interface PromptDisplayProps {
  patientName?: string;
  patientAge?: string | number;
  primaryDiagnosis?: string;
  isVisible: boolean;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({
  patientName,
  patientAge,
  primaryDiagnosis,
  isVisible,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const simplifiedPrompt = patientName && primaryDiagnosis
    ? `Ron AI, please generate a comprehensive ADPIE nursing care plan for ${patientName}, a ${patientAge}-year-old patient. Key focus should be on their primary diagnosis of "${primaryDiagnosis}". Ensure the plan is evidence-based and tailored to their specific needs, considering all provided clinical data.`
    : "Preparing your request for Ron AI...";

  useEffect(() => {
    if (isVisible && simplifiedPrompt) {
      setDisplayedText(""); // Reset before typing
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < simplifiedPrompt.length) {
          setDisplayedText((prev) => prev + simplifiedPrompt.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setShowCursor(false); // Hide cursor when typing is done
        }
      }, 30); // Adjust typing speed here

      return () => {
        clearInterval(typingInterval);
        setShowCursor(true); // Reset cursor state
      };
    } else if (!isVisible) {
      setDisplayedText(""); // Clear text if not visible
      setShowCursor(true); // Reset cursor
    }
  }, [isVisible, simplifiedPrompt]);

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="mb-6 shadow-lg border-blue-700 bg-gradient-to-br from-blue-700 to-blue-900 text-white animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MessageSquareText size={24} className="mr-3" />
          Sending Request to Ron AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed font-mono min-h-[100px]"> {/* Increased font size, leading, and min height */}
          {displayedText}
          {showCursor && <span className="animate-ping">|</span>}
        </p>
        <p className="text-xs text-blue-200 mt-4 italic">
          (This is a simplified representation of the detailed instructions being sent to the AI.)
        </p>
      </CardContent>
    </Card>
  );
};

export default PromptDisplay;
