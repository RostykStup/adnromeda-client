import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor() { }
  userRole: string | null = '';

  isOpened = false;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('andro_user_role');
  }

  open(): void {
    this.userRole = localStorage.getItem('andro_user_role');
    this.isOpened = !this.isOpened;
  }

  close(): void {
    this.isOpened = false;
  }
}
