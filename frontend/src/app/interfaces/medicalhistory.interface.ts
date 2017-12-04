export interface MedicalHistory{
  date: Date;
  reason: String;
  symptoms: Symptom[];
  medications: Medication[];
  prescriptions: Prescription[];
}

export interface Symptom{
  name: String;
  description: String;
}

export interface Medication{
  name: String;
}

export  interface Prescription{
  name: String;
  repeating: Boolean;
}
