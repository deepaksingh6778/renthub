import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, RouterModule, NavbarComponent, FormsModule],
  templateUrl: './preview-post.html',
  styleUrls: ['./preview-post.scss']
})
  export class PreviewPost implements OnInit {
    data: PostPreview | null = null;
    id: number | null = null;

    comments: Array<{ user: string; text: string }> = [];
    newComment: string = '';

    get amenitiesKeys(): string[] {
      if (!this.data || !this.data.amenities) return [];
      return Object.keys(this.data!.amenities!).filter(k => !!this.data!.amenities![k]);
    }

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private dbService: DbService,
      private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
      this.route.paramMap.subscribe(async params => {
        const idParam = params.get('id');
        this.id = idParam ? +idParam : null;
        if (this.id !== null) {
          this.data = await this.dbService.getItem(this.id);
          await this.loadComments();
          this.cdr.detectChanges();
        } else {
          this.data = null;
          this.comments = [];
          this.cdr.detectChanges();
        }
      });
    }

    async loadComments() {
      if (this.id === null) {
        this.comments = [];
        return;
      }
      this.comments = await this.dbService.getComments(this.id);
    }

    async addComment() {
      if (!this.newComment || this.id === null) return;
      let user = localStorage.getItem('userName') || 'Anonymous';
      this.comments.push({ user, text: this.newComment });
      await this.dbService.saveComments(this.id, this.comments);
      this.newComment = '';
    }

    edit() {
      this.router.navigateByUrl('/posts/create');
    }

    confirm() {
      console.log('Confirmed post:', this.data);
      sessionStorage.removeItem('postPreview');
      this.router.navigateByUrl('/');
    }
  }
