import { Component, Input, OnInit } from '@angular/core';
import { NavModel } from './nav.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  titlelink: string;

  @Input()
  navlinks: NavModel[] = [];

  constructor() {
    this.title = "";
    this.titlelink = "";
  }

  ngOnInit(): void {
  }
}
