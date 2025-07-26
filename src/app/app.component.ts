import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { WebSocketService } from './PlanificationConseil/web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'conseil';
  private wsService?: WebSocketService;

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    // Add event listeners for browser close/refresh
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    window.addEventListener('unload', this.handleUnload.bind(this));
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private handleBeforeUnload(event: BeforeUnloadEvent): void {
    this.cleanup();
  }

  private handleUnload(event: Event): void {
    this.cleanup();
  }

  private cleanup(): void {
    try {
      if (!this.wsService) {
        this.wsService = this.injector.get(WebSocketService);
      }
      this.wsService.disconnect();
    } catch (error) {
      // Service might not be available, ignore
    }
  }
}
