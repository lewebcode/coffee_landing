import { assets } from '../assets.js';

class CoffeeHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="header__bg"></div>
        <nav class="header__nav header__nav--left">
          <a href="#home" class="header__link header__link--active">Home</a>
          <a href="#about" class="header__link">About</a>
          <a href="#menu" class="header__link">Menu</a>
          <a href="#reservation" class="header__link">Reservation</a>
        </nav>
        <a href="#" class="header__logo" aria-label="Coffee Shop">
          <img src="${assets.logo}" alt="Coffee Shop" />
        </a>
        <nav class="header__nav header__nav--right">
          <a href="#pages" class="header__link">Pages</a>
          <a href="#shop" class="header__link">Shop</a>
          <a href="#contact" class="header__link">Contact</a>
          <button type="button" class="header__icon" aria-label="Search">
            <img src="${assets.searchIcon}" alt="" />
          </button>
          <button type="button" class="header__icon" aria-label="Cart">
            <img src="${assets.cartIcon}" alt="" />
          </button>
        </nav>
      </header>
    `;
  }
}

customElements.define('coffee-header', CoffeeHeader);
