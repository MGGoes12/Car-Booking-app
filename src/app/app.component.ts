import { Component, HostListener, OnInit } from '@angular/core';
import { SupabaseService, UserProfile } from './supabase.service';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Cotton Car Booking';
  installAvailable = false;
  deferredPrompt: BeforeInstallPromptEvent | null = null;
  user: UserProfile | null = null;

  constructor(public supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.authUser$.subscribe(user => {
      this.user = user;
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    event.preventDefault();
    this.deferredPrompt = event as BeforeInstallPromptEvent;
    this.installAvailable = true;
  }

  async installApp() {
    if (!this.deferredPrompt) {
      return;
    }
    await this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      this.installAvailable = false;
    }
    this.deferredPrompt = null;
  }

  logout() {
    this.supabase.signOut();
  }
}
