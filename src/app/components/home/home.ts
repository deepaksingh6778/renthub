import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  featuredListings: any[] = [];
  listings: any[] = [];

  constructor(private dbService: DbService) {
    this.loadFeaturedListing();
  }

  async loadFeaturedListing() {
    const posts = await this.dbService.getAllItems();
    console.log('Fetched posts from IndexedDB:', posts);
    if (posts && posts.length > 0) {
      // Map all posts for carousel and listings
      this.featuredListings = posts.map(post => ({
        title: post.title || 'No Title',
        desc: post.description || 'No Description',
        image: post.image || '',
        fav: false,
        id: post.id || 1
      }));
      this.listings = this.featuredListings;
    } else {
      this.featuredListings = [];
      this.listings = [];
    }
  }

  toggleFav(listing: any) {
    listing.fav = !listing.fav;
  }

  viewDetails(listing: any) {
    alert(`Viewing details for: ${listing.title}`);
  }
}
