import { Component, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  featuredListings: any[] = [];
  listings: any[] = [];

  constructor(private dbService: DbService, private router: Router, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
  await this.dbService.seedDefaultPosts();
  await this.loadFeaturedListing();
  }

  async loadFeaturedListing() {
    const posts = await this.dbService.getAllItems();
    console.log('Fetched posts from IndexedDB:', posts);
    console.log('posts.length:', posts.length);
    if (posts && posts.length > 0) {
      // Ensure every post has a valid id
      this.featuredListings = posts.map((post, idx) => ({
        title: post.title || post.apartmentName || 'No Title',
        desc: post.description || post.location || 'No Description',
        image: post.image ? post.image : '/assets/default.png',
        fav: false,
        id: typeof post.id === 'number' ? post.id : idx + 1
      }));
  this.listings = this.featuredListings;
  console.log('Mapped featured listings:', this.featuredListings);
  this.cdr.detectChanges();
      console.log('Mapped listings:', this.listings);
    } else {
      this.featuredListings = [];
      this.listings = [];
    }
  }

  viewDetails(listing: any, event?: Event) {
    console.log('View Details clicked for:', listing);
  // prevent Bootstrap carousel click propagation
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  console.log('Navigating to details:', listing.id);
  this.router.navigate(['/posts/preview', listing.id]);
}

toggleFav(listing: any, event?: Event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  listing.fav = !listing.fav;
}

}
