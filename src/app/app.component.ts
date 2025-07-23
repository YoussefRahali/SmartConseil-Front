import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'conseil';
  showStatusIndicator = true;
  userServiceStatus = false;
  rectificationServiceStatus = false;
  reportServiceStatus = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Temporarily disable health checks to avoid console errors
    // this.checkBackendServices();
  }

  checkBackendServices(): void {
    // Check User Service
    this.http.get('http://localhost:8088/actuator/health', { responseType: 'text' })
      .subscribe({
        next: () => this.userServiceStatus = true,
        error: () => this.userServiceStatus = false
      });

    // Check Rectification Service
    this.http.get('http://localhost:8089/actuator/health', { responseType: 'text' })
      .subscribe({
        next: () => this.rectificationServiceStatus = true,
        error: () => this.rectificationServiceStatus = false
      });

    // Check Report Service
    this.http.get('http://localhost:8087/actuator/health', { responseType: 'text' })
      .subscribe({
        next: () => this.reportServiceStatus = true,
        error: () => this.reportServiceStatus = false
      });
  }

  toggleStatusIndicator(): void {
    this.showStatusIndicator = !this.showStatusIndicator;
  }
}
