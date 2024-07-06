import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../../../components/services/master.service';

interface Location {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface Company {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  addPersonForm: FormGroup;
  loggedInUserId: number | null = null;
  locations: Location[] = [];
  roles: Role[] = [];
  companies: Company[] = [];
  showCompanyField = false;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder
  ) {
    this.addPersonForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', Validators.required],
      country_code: ['', Validators.required],
      date_of_joining: ['', Validators.required],
      location: ['', Validators.required],
      role: ['', Validators.required],
      company: Number(['']), 
      is_active: [false]
    });
  }

  ngOnInit(): void {
    this.fetchLocations();
    this.fetchRoles();
    this.fetchCompony();
    this.loggedInUserId = this.masterService.getAdminId();
  }

  fetchLocations(): void {
    this.masterService.getAllLocations().subscribe(
      (data: Location[]) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  fetchRoles(): void {
    this.masterService.getAllRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onRoleChange(): void {
    const selectedRoleId = this.addPersonForm.get('role');
    alert(selectedRoleId?.value)
    // const selectedRole = this.roles.find(role => role.id === selectedRoleId);

    if (selectedRoleId?.value === 'Admin') {
      this.showCompanyField = true;
      alert(this.showCompanyField)
      // You may optionally load companies associated with the selected role here
      // Example: this.loadCompaniesForAdminRole(selectedRoleId);
    } else {
      this.showCompanyField = false;
      alert(this.showCompanyField)
      // Reset company field when the role changes to something other than Admin
      this.addPersonForm.patchValue({
        company: ''  // Reset to empty string
      });
    }
  }

  onSubmit(): void {
    if (this.addPersonForm.valid) {
      const formData = {
        ...this.addPersonForm.value,
        created_by: this.loggedInUserId,
        updated_by: this.loggedInUserId,
        created_at: new Date(),
        updated_at: new Date(),
      };

      this.masterService.addEmployee(formData).subscribe(
        (response) => {
          alert('User added successfully');
          this.addPersonForm.reset();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  fetchCompony(){
    this.masterService.getAllCompony().subscribe((reposnce:any[])=>{
      this.companies=reposnce;

    })

  }
}
