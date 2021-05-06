import {Component, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';
import {NavigationService} from '../../../../../common/navigation.service';

@Component({
  selector: 'app-user-left-panel',
  templateUrl: './user-left-panel.component.html',
  styleUrls: ['./user-left-panel.component.scss']
})
export class UserLeftPanelComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  opened = false;

  ngOnInit(): void {
  }

  open(): void {
    this.opened = true;
    this.document.body.classList.toggle('opened-left-bar');
    const element = document.getElementById('user-left-panel-container');
    // @ts-ignore
    element.classList.toggle('left-panel-animate-open');


    const bg = document.getElementById('user-left-panel-full-page-bg');
    // @ts-ignore
    bg.classList.toggle('left-panel-bg-open');
  }

  closeLeftPanel(): void {
    const element = document.getElementById('user-left-panel-container');
    // @ts-ignore
    element.classList.toggle('left-panel-animate-open');
    // @ts-ignore
    element.classList.toggle('left-panel-animate-close');

    const bg = document.getElementById('user-left-panel-full-page-bg');
    // @ts-ignore
    bg.classList.toggle('left-panel-bg-open');
    // @ts-ignore
    bg.classList.toggle('left-panel-bg-close');

    setTimeout(() => {
      this.opened = false;
      this.document.body.classList.toggle('opened-left-bar');
      // @ts-ignore
      element.classList.toggle('left-panel-animate-close');
      // @ts-ignore
      bg.classList.toggle('left-panel-bg-close');
    }, 120);
  }

  getFAQUrl(): string {
    return '';
  }

  getUserSettingsUrl(): string {
    return NavigationService.getUserSettingsUrl();
  }

  getOrdersUrl(): string {
    return NavigationService.getUserOrdersUrl();
  }

  getCartUrl(): string {
    return NavigationService.getUserCartUrl();
  }


  getSavedUrl(): string {
    return NavigationService.getUserSavedAdvertisementsUrl();
  }

  getViewedUrl(): string {
    return NavigationService.getUserViewsUrl();
  }

  getAddressUrl(): string {
    return NavigationService.getUserAddressesUrl();
  }

  getNotificationUrl(): string {
    return NavigationService.getUserNotificationsUrl();
  }

  getProfileUrl(): string {
    return NavigationService.getUserProfileUrl();
  }
}
