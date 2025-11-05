import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DbService } from '../../services/db.service';

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
  image?: string;
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
  description: '',
  image: ''
  };

  submitted = false;

  constructor(private router: Router, private dbService: DbService) {}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.model.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;

    // Add post to IndexedDB
    try {
      await this.dbService.addItem(this.model);
    } catch (e) {
      console.warn('Could not save post to IndexedDB', e);
    }

    // Save model to sessionStorage for preview step and navigate
    try {
      sessionStorage.setItem('postPreview', JSON.stringify(this.model));
    } catch (e) {
      console.warn('Could not persist preview data', e);
    }

    this.router.navigateByUrl('/posts/preview');
  }
}