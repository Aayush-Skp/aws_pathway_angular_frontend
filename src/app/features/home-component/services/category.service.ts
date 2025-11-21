import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export interface DirectoryItem {
  name: string;
  path: string;
  is_directory: boolean;
  isExpanded?: boolean;
  children?: DirectoryItem[];
  isLoading?: boolean;
  content?: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = environment.apiUrl || 'http://127.0.0.1:8000';
  categories = signal<DirectoryItem[]>([]);
  constructor(private http: HttpClient) {}
  loadCategories() {
    const url = `${this.baseUrl}/v1/directory/learning-tracks`;

    this.http.get<DirectoryItem[]>(url).subscribe({
      next: (data) => {
        const transformed = data
          .filter((item) => item.is_directory)
          .map((item) => ({
            ...item,
            isExpanded: false,
            children: [],
            isLoading: false,
          }));
        this.categories.set(transformed);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }
}
