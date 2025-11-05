import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface PostForm {
  apartmentName: string;
  buildingName: string;
  isShared: boolean;
  location: string;
  squareFeet: number;
  stayType: 'long' | 'short' | 'both';
  expectedRent: number;
  rentMode: 'month' | 'included';
  isNegotiable: boolean;
  isFurnished: boolean;
  amenities: {
    gym: boolean;
    carPark: boolean;
    visitorParking: boolean;
    powerBackup: boolean;
    garbageDisposal: boolean;
    privateLawn: boolean;
    waterHeater: boolean;
    plantSecurity: boolean;
    laundry: boolean;
    elevator: boolean;
    clubHouse: boolean;
  };
  title: string;
  description: string;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss']
})
export class CreatePost {
  model: PostForm = {
    apartmentName: '',
    buildingName: '',
    isShared: false,
    location: '',
    squareFeet: 0,
    stayType: 'both',
    expectedRent: 0,
    rentMode: 'month',
    isNegotiable: false,
    isFurnished: false,
    amenities: {
      gym: false,
      carPark: false,
      visitorParking: false,
      powerBackup: false,
      garbageDisposal: false,
      privateLawn: false,
      waterHeater: false,
      plantSecurity: false,
      laundry: false,
      elevator: false,
      clubHouse: false
    },
    title: '',
    description: ''
  };

  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;
    
    // TODO: Handle form submission
    console.log('Form submitted:', this.model);
  }
}