import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {

featuredListings = [
      { id: 1, title: 'Luxury Apartment in City Center', desc: 'Spacious 3BHK with modern amenities.', fav: false, image: '/assets/apt1.jpg' },
      { id: 2, title: 'Cozy Studio Apartment', desc: 'Perfect for working professionals.', fav: false, image: '/assets/apt2.jpg' }
];

  listings = [
    { id: 1, title: 'Apartment 1', desc: 'Lorem ipsum dolor sit amet.', fav: false, image: '/assets/apt3.jpg' },
    { id: 2, title: 'Apartment 2', desc: 'Lorem ipsum dolor sit amet.', fav: false, image: '/assets/apt4.jpg' },
    { id: 3, title: 'Apartment 3', desc: 'Lorem ipsum dolor sit amet.', fav: false, image: '/assets/apt5.jpg' },
  ];

  toggleFav(listing: any) {
    listing.fav = !listing.fav;
  }

  viewDetails(listing: any) {
    alert(`Viewing details for: ${listing.title}`);
  }
}
