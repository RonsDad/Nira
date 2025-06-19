"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onSuccess?: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  reasonForOutreach: "",
  anythingElse: "",
  newsletter: false,
};

type State = typeof initialState;

export const ContactUsForm: React.FC<Props> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<State>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus("idle");
    
    try {
      // Collect additional data
      const additionalData = {
        ...formData,
        // Timestamp
        submittedAt: new Date().toISOString(),
        
        // Browser information
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        platform: window.navigator.platform,
        
        // Screen information
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        screenColorDepth: window.screen.colorDepth,
        
        // Viewport information
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        
        // Referrer
        referrer: document.referrer || 'Direct',
        
        // Current page URL
        pageUrl: window.location.href,
        
        // Time zone
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        
        // Connection type (if available)
        connectionType: (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType ?? 'unknown',
      };
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(additionalData),
      });
      
      if (!res.ok) throw new Error("Failed");
      
      // Clear form
      setFormData(initialState);
      setStatus("success");
      
      // Call optional onSuccess callback
      onSuccess?.();
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 500);
      
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid w-full max-w-xl gap-6 rounded-2xl border border-blue-600/20 bg-gradient-to-b from-blue-50/90 to-white/90 p-8 shadow-[0_12px_40px_rgba(0,0,255,0.1)] backdrop-blur-lg"
    >
      {/* Name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName" className="text-xs font-medium text-blue-700">
            First Name *
          </Label>
          <Input
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            placeholder="Jane"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-xs font-medium text-blue-700">
            Last Name *
          </Label>
          <Input
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="email" className="text-xs font-medium text-blue-700">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-xs font-medium text-blue-700">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <Label htmlFor="company" className="text-xs font-medium text-blue-700">
          Company
        </Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
          placeholder="Acme Health"
        />
      </div>

      {/* Reason */}
      <div>
        <Label htmlFor="reason" className="text-xs font-medium text-blue-700">
          Reason for Outreach *
        </Label>
        <Select
          value={formData.reasonForOutreach}
          onValueChange={(val) => setFormData((p) => ({ ...p, reasonForOutreach: val }))}
        >
          <SelectTrigger className="h-10 rounded-md border-blue-400/50 bg-white/70 text-sm focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600" id="reason">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {[
              "Early Access List",
              "Product Focus Group List",
              "I want to invest",
              "I'm Interested in your Products",
              "I have feedback",
            ].map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Anything else */}
      <div>
        <Label htmlFor="anythingElse" className="text-xs font-medium text-blue-700">
          Anything Else?
        </Label>
        <Textarea
          id="anythingElse"
          name="anythingElse"
          rows={4}
          value={formData.anythingElse}
          onChange={handleChange}
          placeholder="Tell us more about your interest in Nira..."
          className="rounded-md border-blue-400/50 bg-white/70 text-sm placeholder:text-blue-400/60 focus:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </div>

      {/* Newsletter */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) =>
            setFormData((p) => ({ ...p, newsletter: !!checked }))
          }
        />
        <Label htmlFor="newsletter" className="text-sm font-medium text-blue-800">
          I want to hear more about Nira
        </Label>
      </div>

      {/* Status message */}
      {status === "success" && (
        <p className="rounded-md bg-green-100 px-4 py-2 text-sm text-green-700">
          Thanks! We'll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          Something went wrong, please try again.
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-br from-blue-700 to-blue-800 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {loading ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
};
