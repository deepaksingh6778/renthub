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
      // Map post fields for display
      const latest = posts[posts.length - 1];
      this.featuredListings = [{
        title: latest.title || 'No Title',
        desc: latest.description || 'No Description',
        image: latest.image || '',
        fav: false,
        id: latest.id || 1
      }];
      // Map all posts for listings
      this.listings = posts.map(post => ({
        title: post.title || 'No Title',
        desc: post.description || 'No Description',
        image: post.image || '',
        fav: false,
        id: post.id || 1
      }));
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
