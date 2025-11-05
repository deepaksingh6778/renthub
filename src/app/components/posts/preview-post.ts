import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';

interface PostPreview {
  apartmentName?: string;
  buildingName?: string;
  isShared?: boolean;
  location?: string;
  squareFeet?: number;
  stayType?: string;
  expectedRent?: number;
  rentMode?: string;
  isNegotiable?: boolean;
  isFurnished?: boolean;
  amenities?: { [k: string]: boolean };
  title?: string;
  description?: string;
  image?: string;
}

@Component({
  selector: 'app-preview-post',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './preview-post.html',
  styleUrls: ['./preview-post.scss']
})
export class PreviewPost implements OnInit {
  data: PostPreview | null = null;
  id: number | null = null;

  get amenitiesKeys(): string[] {
    if (!this.data || !this.data.amenities) return [];
    return Object.keys(this.data.amenities).filter(k => !!this.data!.amenities![k]);
  }

  constructor(private router: Router, private route: ActivatedRoute, private dbService: DbService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : null;
      if (this.id !== null) {
        this.data = await this.dbService.getItem(this.id);
        console.log('Fetched post data:', this.data);
        this.cdr.detectChanges();
      } else {
        this.data = null;
        this.cdr.detectChanges();
      }
    });
  }

  edit() {
    this.router.navigateByUrl('/posts/create');
  }

  confirm() {
    // Here you would call your API to create the post. For now we'll just log and clear preview.
    console.log('Confirmed post:', this.data);
    sessionStorage.removeItem('postPreview');
    // Navigate to home or post list after confirm
    this.router.navigateByUrl('/');
  }
}
