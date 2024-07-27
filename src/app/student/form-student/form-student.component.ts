import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.sass']
})
export class FormStudentComponent implements OnInit {

  // **** State ****
  studentForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isPreviewVisible: boolean = false;
  isSubmitting: boolean = false;
  fileSelected: boolean = false;
  fileTouched: boolean = false;



  /**
   * Constructor for FormStudentComponent.
   * @param {FormBuilder} fb - FormBuilder instance for creating the form.
   * @param {StudentService} studentService - Service for handling student-related operations.
   */
  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      schoolName: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  ngOnInit(): void {}


  /**
   * Handles the change event of the file input.
   * @param {Event} event - The event object.
   */
  onFileChange(event: Event): void {
    // Get the input element from the event
    const input = event.target as HTMLInputElement;

    this.fileTouched = true;
    // Check if the input has files and the first file is available
    if (input.files && input.files[0]) {
      // Set the selected file
      this.selectedFile = input.files[0];
      this.fileSelected = true;

      // Create a new FileReader instance
      const reader = new FileReader();

      // Define the onload event handler for the FileReader
      reader.onload = (e) => {
        // Check if the result of the FileReader is available
        if (e.target?.result) {
          // Set the preview URL and make the preview visible
          this.previewUrl = e.target.result;
          this.isPreviewVisible = true;
        } else {
          this.fileSelected = false;
        }
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(input.files[0]);
    }
  }


  /**
   * Removes the preview of the selected file.
   */
  removePreview(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.isPreviewVisible = false;
    this.fileSelected = false;
    this.fileTouched = false;
  }


  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    if (!this.fileSelected) {
      this.fileTouched = true;
      // Handle file validation error
      console.log('File is required');
    } else {
      // Proceed with form submission logic
      console.log('Form submitted successfully');
    }
    // Check if the form is invalid
    if (this.studentForm.invalid) {
      // Mark all form controls as touched to show validation errors
      this.studentForm.markAllAsTouched();
      return;
    }

    // Set the submitting state to true
    this.isSubmitting = true;

    // Create a new FormData object to hold the form data
    const formData = {
      fullName: this.studentForm.get('fullName')?.value,
      firstName: this.studentForm.get('firstName')?.value,
      lastName: this.studentForm.get('lastName')?.value,
      birthdate: this.studentForm.get('birthdate')?.value,
      gender: this.studentForm.get('gender')?.value,
      schoolName: this.studentForm.get('schoolName')?.value,
    }

    // Call the createChildStudent method of the StudentService to submit the form data
    this.studentService.createChildStudent(this.selectedFile, formData).subscribe({
      next: response => {
        // Show a success alert and log the response
        alert('Form submitted successfully!');
        console.log('Form submitted successfully!', response);
        // Reset the form and remove the file preview
        this.studentForm.reset();
        this.removePreview();
      },
      error: error => {
        // Show an error alert and log the error
        alert('Form submission failed!');
        this.isSubmitting = false;
        console.error('Form submission failed!', error);
      },
      complete: () => {
        // Set the submitting state to false
        this.isSubmitting = false;
      }
    });
  }

}
