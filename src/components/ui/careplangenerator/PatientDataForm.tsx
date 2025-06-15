'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PatientInfo, Scenario, scenarios, getScenarioById, LabResult, VitalSigns } from '@/lib/scenario-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, Heart, Activity, TestTube2, PlusCircle, Trash2, 
  ChevronDown, ChevronUp, AlertCircle, Stethoscope, ClipboardList,
  Shield, UserCheck, FileText, Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PatientDataFormProps {
  onSubmit: (patientInfo: PatientInfo) => void;
  isLoading: boolean;
}

const initialPatientInfo: PatientInfo = {
  patient_full_name: 'SimPatient Omega',
  patient_age: '',
  patient_gender: 'Prefer not to specify',
  patient_mrn: 'SIM-CUSTOM-000',
  patient_dob: '',
  patient_insurance_plan: 'N/A',
  patient_policy_number: 'N/A',
  patient_primary_provider: 'N/A',
  patient_admission_date: new Date().toISOString().split('T')[0],
  allergies: [],
  vitalSigns: {
    vital_bp: '',
    vital_pulse: '',
    vital_resp_rate: '',
    vital_temp: '',
    vital_o2sat: '',
    vital_pain_score: '0/10',
  },
  nyha_class_description: 'N/A',
  primary_diagnosis_text: '',
  secondaryDiagnoses: [],
  labs: [],
};

const commonDiagnoses = [
  'Hypertension', 'Type 2 Diabetes Mellitus', 'Coronary Artery Disease', 'Asthma', 'COPD',
  'Atrial Fibrillation', 'Gastroesophageal Reflux Disease (GERD)', 'Anemia', 'Hypothyroidism',
  'Hyperlipidemia', 'Osteoarthritis', 'Chronic Kidney Disease', 'Depression', 'Anxiety Disorder',
];

const commonAllergies = [
  'Penicillin', 'Sulfa drugs', 'Aspirin', 'NSAIDs', 'Codeine',
  'Morphine', 'Latex', 'Iodine contrast', 'Shellfish', 'Peanuts'
];

const PatientDataForm: React.FC<PatientDataFormProps> = ({ onSubmit, isLoading }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('custom');
  const [formData, setFormData] = useState<PatientInfo>(initialPatientInfo);
  const [isCustomMode, setIsCustomMode] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['demographics']));

  useEffect(() => {
    if (selectedScenarioId === 'custom') {
      setIsCustomMode(true);
      setFormData(JSON.parse(JSON.stringify(initialPatientInfo)));
    } else {
      setIsCustomMode(false);
      const scenario = getScenarioById(selectedScenarioId);
      if (scenario) {
        setFormData(JSON.parse(JSON.stringify(scenario.patientInfo)));
      }
    }
  }, [selectedScenarioId]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleFormChange = useCallback(<K extends keyof PatientInfo>(
    field: K,
    value: PatientInfo[K]
  ) => {
    if (!isCustomMode) return;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, [isCustomMode]);

  const handleVitalSignChange = useCallback((
    field: keyof VitalSigns,
    value: string
  ) => {
    if (!isCustomMode) return;
    setFormData(prev => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [field]: value,
      },
    }));
  }, [isCustomMode]);

  const handleListChange = (field: 'allergies' | 'secondaryDiagnoses', item: string, checked: boolean) => {
    if (!isCustomMode) return;
    setFormData(prev => {
      const list = prev[field] as string[];
      if (checked) {
        return { ...prev, [field]: [...list, item] };
      } else {
        return { ...prev, [field]: list.filter(i => i !== item) };
      }
    });
  };

  const handleLabChange = (index: number, field: keyof LabResult, value: string) => {
    if (!isCustomMode) return;
    setFormData(prev => {
      const newLabs = [...prev.labs];
      newLabs[index] = { ...newLabs[index], [field]: value };
      return { ...prev, labs: newLabs };
    });
  };

  const addLab = () => {
    if (!isCustomMode) return;
    setFormData(prev => ({
      ...prev,
      labs: [...prev.labs, { lab_n_name: '', lab_n_value: '', lab_n_flag: '', lab_n_trend: '' }],
    }));
  };

  const removeLab = (index: number) => {
    if (!isCustomMode) return;
    setFormData(prev => ({
      ...prev,
      labs: prev.labs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const SectionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    description?: string; 
    icon: React.ElementType; 
    sectionKey: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <Card className="border-border/50 shadow-elegant hover:shadow-elegant-md transition-shadow duration-200">
        <CardHeader 
          className="cursor-pointer select-none"
          onClick={() => toggleSection(sectionKey)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {description && (
                  <CardDescription className="text-sm mt-1">{description}</CardDescription>
                )}
              </div>
            </div>
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </CardHeader>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0 pb-6">
                {children}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    );
  };

  const genderOptions: PatientInfo['patient_gender'][] = ['Male', 'Female', 'Other', 'Prefer not to specify'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Scenario Selection */}
      <Card className="border-primary/20 bg-gradient-elegant shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Scenario Selection
          </CardTitle>
          <CardDescription>
            Choose a pre-configured scenario or create a custom patient profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedScenarioId} onValueChange={setSelectedScenarioId}>
            <SelectTrigger className="w-full input-elegant">
              <SelectValue placeholder="Select a scenario" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="custom" className="font-medium">
                Custom Scenario
              </SelectItem>
              {scenarios.map(scenario => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  <div>
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-sm text-muted-foreground">{scenario.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Form Sections */}
      <div className="space-y-4">
        {/* Demographics Section */}
        <SectionCard
          title="Patient Demographics"
          description="Basic patient information and identifiers"
          icon={User}
          sectionKey="demographics"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Full Name</Label>
              <Input
                value={formData.patient_full_name}
                onChange={(e) => handleFormChange('patient_full_name', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Age</Label>
              <Input
                type="number"
                value={formData.patient_age}
                onChange={(e) => handleFormChange('patient_age', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="Years"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Gender</Label>
              <Select 
                value={formData.patient_gender} 
                onValueChange={(value) => handleFormChange('patient_gender', value as PatientInfo['patient_gender'])}
                disabled={!isCustomMode}
              >
                <SelectTrigger className="input-elegant">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">MRN</Label>
              <Input
                value={formData.patient_mrn}
                onChange={(e) => handleFormChange('patient_mrn', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="Medical Record Number"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Date of Birth</Label>
              <Input
                type="date"
                value={formData.patient_dob}
                onChange={(e) => handleFormChange('patient_dob', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Admission Date</Label>
              <Input
                type="date"
                value={formData.patient_admission_date}
                onChange={(e) => handleFormChange('patient_admission_date', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
              />
            </div>
          </div>
        </SectionCard>

        {/* Clinical Information */}
        <SectionCard
          title="Clinical Information"
          description="Primary diagnosis and clinical details"
          icon={Stethoscope}
          sectionKey="clinical"
        >
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Primary Diagnosis</Label>
              <Textarea
                value={formData.primary_diagnosis_text}
                onChange={(e) => handleFormChange('primary_diagnosis_text', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant min-h-[80px]"
                placeholder="Enter primary diagnosis"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-3 block">Secondary Diagnoses</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonDiagnoses.map(diagnosis => (
                  <div key={diagnosis} className="flex items-center space-x-2">
                    <Checkbox
                      id={`diag-${diagnosis}`}
                      checked={formData.secondaryDiagnoses.includes(diagnosis)}
                      onCheckedChange={(checked) => handleListChange('secondaryDiagnoses', diagnosis, checked as boolean)}
                      disabled={!isCustomMode}
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`diag-${diagnosis}`}
                      className="text-sm font-normal cursor-pointer select-none"
                    >
                      {diagnosis}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Vital Signs */}
        <SectionCard
          title="Vital Signs"
          description="Current vital sign measurements"
          icon={Activity}
          sectionKey="vitals"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Blood Pressure</Label>
              <Input
                value={formData.vitalSigns.vital_bp}
                onChange={(e) => handleVitalSignChange('vital_bp', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 120/80 mmHg"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Pulse</Label>
              <Input
                value={formData.vitalSigns.vital_pulse}
                onChange={(e) => handleVitalSignChange('vital_pulse', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 72 bpm"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Respiratory Rate</Label>
              <Input
                value={formData.vitalSigns.vital_resp_rate}
                onChange={(e) => handleVitalSignChange('vital_resp_rate', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 16 breaths/min"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Temperature</Label>
              <Input
                value={formData.vitalSigns.vital_temp}
                onChange={(e) => handleVitalSignChange('vital_temp', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 98.6°F"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">O2 Saturation</Label>
              <Input
                value={formData.vitalSigns.vital_o2sat}
                onChange={(e) => handleVitalSignChange('vital_o2sat', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 98%"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Pain Score</Label>
              <Input
                value={formData.vitalSigns.vital_pain_score}
                onChange={(e) => handleVitalSignChange('vital_pain_score', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., 3/10"
              />
            </div>
          </div>
        </SectionCard>

        {/* Allergies */}
        <SectionCard
          title="Allergies"
          description="Known allergies and reactions"
          icon={AlertCircle}
          sectionKey="allergies"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonAllergies.map(allergy => (
              <div key={allergy} className="flex items-center space-x-2">
                <Checkbox
                  id={`allergy-${allergy}`}
                  checked={formData.allergies.includes(allergy)}
                  onCheckedChange={(checked) => handleListChange('allergies', allergy, checked as boolean)}
                  disabled={!isCustomMode}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`allergy-${allergy}`}
                  className="text-sm font-normal cursor-pointer select-none"
                >
                  {allergy}
                </label>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Laboratory Results */}
        <SectionCard
          title="Laboratory Results"
          description="Recent lab values and trends"
          icon={TestTube2}
          sectionKey="labs"
        >
          <div className="space-y-4">
            {formData.labs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No laboratory results added yet
              </p>
            )}
            {formData.labs.map((lab, index) => (
              <Card key={index} className="p-4 border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <div className="md:col-span-1">
                    <Label className="text-xs font-medium mb-1 block">Test Name</Label>
                    <Input
                      value={lab.lab_n_name}
                      onChange={(e) => handleLabChange(index, 'lab_n_name', e.target.value)}
                      disabled={!isCustomMode}
                      className="input-elegant text-sm"
                      placeholder="e.g., BNP"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">Value</Label>
                    <Input
                      value={lab.lab_n_value}
                      onChange={(e) => handleLabChange(index, 'lab_n_value', e.target.value)}
                      disabled={!isCustomMode}
                      className="input-elegant text-sm"
                      placeholder="e.g., 1200 pg/mL"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1 block">Flag</Label>
                    <Select
                      value={lab.lab_n_flag}
                      onValueChange={(value) => handleLabChange(index, 'lab_n_flag', value as LabResult['lab_n_flag'])}
                      disabled={!isCustomMode}
                    >
                      <SelectTrigger className="input-elegant text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Normal</SelectItem>
                        <SelectItem value="L">Low</SelectItem>
                        <SelectItem value="H">High</SelectItem>
                        <SelectItem value="C">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end gap-2">
                    <Select
                      value={lab.lab_n_trend}
                      onValueChange={(value) => handleLabChange(index, 'lab_n_trend', value as LabResult['lab_n_trend'])}
                      disabled={!isCustomMode}
                    >
                      <SelectTrigger className="input-elegant text-sm">
                        <SelectValue placeholder="Trend" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No trend</SelectItem>
                        <SelectItem value="Improving">Improving</SelectItem>
                        <SelectItem value="Worsening">Worsening</SelectItem>
                        <SelectItem value="Stable">Stable</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLab(index)}
                      disabled={!isCustomMode}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {isCustomMode && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLab}
                className="w-full border-dashed"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Laboratory Result
              </Button>
            )}
          </div>
        </SectionCard>

        {/* Insurance Information */}
        <SectionCard
          title="Insurance Information"
          description="Coverage and policy details"
          icon={Shield}
          sectionKey="insurance"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Insurance Plan</Label>
              <Input
                value={formData.patient_insurance_plan}
                onChange={(e) => handleFormChange('patient_insurance_plan', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="e.g., Medicare Advantage"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Policy Number</Label>
              <Input
                value={formData.patient_policy_number}
                onChange={(e) => handleFormChange('patient_policy_number', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="Policy/Member ID"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Primary Provider</Label>
              <Input
                value={formData.patient_primary_provider}
                onChange={(e) => handleFormChange('patient_primary_provider', e.target.value)}
                disabled={!isCustomMode}
                className="input-elegant"
                placeholder="Provider name"
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="btn-primary-elegant min-w-[200px] gap-2"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
              Generating Care Plan...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate Care Plan
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

PatientDataForm.displayName = 'PatientDataForm';

export default PatientDataForm;