import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  headerScroll: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll')
  onScroll() {
    if (this.document.documentElement.scrollTop > 0) {
      this.headerScroll = true;
      this.collapseMenu();
    } else {
      this.headerScroll = false;
    }
  }

  collapseMenu() {
    const navbarCollapse = this.document.querySelector('.navbar-collapse');
    const navbarToggler = this.document.querySelector('.navbar-toggler');

    if (navbarCollapse && navbarToggler) {
      navbarCollapse.classList.remove('show');
      navbarToggler.setAttribute('aria-expanded', 'false');
    }
  }
}
