import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor() { }

  isOpened = false;
  ngOnInit(): void {
  }

  open() {
    this.isOpened = !this.isOpened;
  }

  close() {
    this.isOpened = false;
  }
}
