import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../../../../components/services/master.service';

@Component({
  selector: 'app-edit-holiday-modal',
  templateUrl: './edit-holiday-modal.component.html',
  styleUrls: ['./edit-holiday-modal.component.css']
})
export class EditHolidayModalComponent implements OnInit {
  @Input() holiday: any; // Input holiday data for editing

  selectedDate: string = ''; // Ensure this property exists
  occasion: string = ''; // Ensure this property exists
  locationId: number | undefined; // Ensure this property exists
  isOptional: boolean = false; // Ensure this property exists
  locations: any[] = [];
  userId: number = 17; // Simulating a logged-in user with ID 17

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private masterService: MasterService) { }

  ngOnInit(): void {
    // Load holiday data into the form fields
    if (this.holiday) {
      this.selectedDate = this.holiday.occasion_date.split('T')[0]; // Ensure proper date format
      this.occasion = this.holiday.occasion;
      this.locationId = this.holiday.location_id;
      this.isOptional = this.holiday.is_optional;
    }
    
    // Load locations
    this.loadLocations();
  }

  loadLocations(): void {
    this.masterService.getAllLocations().subscribe(
      locations => {
        this.locations = locations;
        console.log('Loaded locations:', this.locations);
      },
      error => {
        console.error('Error loading locations', error);
      }
    );
  }

  save(): void {
    // Your save logic here
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}
