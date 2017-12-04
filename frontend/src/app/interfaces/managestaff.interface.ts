export interface ManageStaff{
  email: String;
  medicalspecialities: MedicalSpeciality[];
  permission: String;
  position: String;
}

export interface MedicalSpeciality{
  name: String;
}
