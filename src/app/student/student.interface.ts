// Define the interface for the form data
export interface StudentFormData {
  fullName: string;
  firstName: string;
  lastName: string;
  birthdate: string; // Format: "YYYY-MM-DD"
  gender: 'wanita' | 'pria';
  schoolName: string;
}
