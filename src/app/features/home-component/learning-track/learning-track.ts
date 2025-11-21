import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

interface DirectoryItem {
  name: string;
  path: string;
  is_directory: boolean;
  isExpanded?: boolean;
  children?: DirectoryItem[];
  isLoading?: boolean;
  content?: string;
}

@Component({
  selector: 'app-learning-track',
  imports: [CommonModule],
  templateUrl: './learning-track.html',
  styleUrl: './learning-track.scss',
})
export class LearningTrack implements OnInit {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl || 'http://127.0.0.1:8000';

  categories: DirectoryItem[] = [];
  selectedFile: DirectoryItem | null = null;
  fileContent: string = '';
  isLoadingContent: boolean = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const url = `${this.baseUrl}/v1/directory/learning-tracks`;

    this.http.get<DirectoryItem[]>(url).subscribe({
      next: (data) => {
        this.categories = data
          .filter((item) => item.is_directory)
          .map((item) => ({
            ...item,
            isExpanded: false,
            children: [],
            isLoading: false,
          }));
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  toggleItem(item: DirectoryItem, level: 'category' | 'chapter' | 'topic'): void {
    if (!item.is_directory) {
      this.loadFileContent(item);
      return;
    }

    item.isExpanded = !item.isExpanded;

    if (item.isExpanded && (!item.children || item.children.length === 0)) {
      this.loadChildren(item);
    }
  }

  loadChildren(item: DirectoryItem): void {
    item.isLoading = true;

    const encodedPath = encodeURIComponent(item.path.replace('/docs', ''));
    const url = `${this.baseUrl}/v1/directory${encodedPath}`;

    this.http.get<DirectoryItem[]>(url).subscribe({
      next: (data) => {
        item.children = data.map((child) => ({
          ...child,
          isExpanded: false,
          children: [],
          isLoading: false,
        }));
        item.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading children:', error);
        item.isLoading = false;
      },
    });
  }

  loadFileContent(file: DirectoryItem): void {
    this.selectedFile = file;
    this.isLoadingContent = true;
    const truncatedPath = file.path.replace(/^\/docs/, '');
    const encodedPath = encodeURIComponent(truncatedPath);
    const url = `${this.baseUrl}/v1/file${encodedPath}`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (content) => {
        const parsed = JSON.parse(content);
        this.fileContent = this.convertMarkdownToHtml(parsed.content);
        this.isLoadingContent = false;
      },
      error: (error) => {
        console.error('Error loading file content:', error);
        this.fileContent = '<p>Error loading content. Please try again.</p>';
        this.isLoadingContent = false;
      },
    });
  }

  convertMarkdownToHtml(markdown: string): string {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>');
    html = html.replace(/\n/gim, '<br>');

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<h') && !html.startsWith('<p')) {
      html = '<p>' + html + '</p>';
    }

    return html;
  }

  isFileSelected(item: DirectoryItem): boolean {
    return this.selectedFile?.path === item.path;
  }

  getItemName(item: DirectoryItem): string {
    let name = item.name.replace('.md', '');
    name = name.replace(/[-_]/g, ' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  trackByPath(index: number, item: DirectoryItem): string {
    return item.path;
  }
}
