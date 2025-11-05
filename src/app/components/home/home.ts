import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';

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

  constructor(private dbService: DbService, private router: Router) {
    this.loadFeaturedListing();
  }

  async loadFeaturedListing() {
    const posts = await this.dbService.getAllItems();
    console.log('Fetched posts from IndexedDB:', posts);
    if (posts && posts.length > 0) {
      // Ensure every post has a valid id
      this.featuredListings = posts.map((post, idx) => ({
        title: post.title || 'No Title',
        desc: post.description || 'No Description',
        image: post.image || '',
        fav: false,
        id: typeof post.id === 'number' ? post.id : idx + 1
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
    this.router.navigate(['/posts/preview', listing.id]);
  }
}
