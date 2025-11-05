import { Component, OnInit } from '@angular/core';
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
}

@Component({
  selector: 'app-preview-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(private router: Router, private route: ActivatedRoute, private dbService: DbService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : null;
      if (this.id !== null) {
        this.data = await this.dbService.getItem(this.id);
      } else {
        this.data = null;
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
