import { assets } from '../assets.js';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#reservation', label: 'Reservation' },
  { href: '#pages', label: 'Pages' },
  { href: '#shop', label: 'Shop' },
  { href: '#blog', label: 'Blogs' },
];

class CoffeeFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__top">
          <a href="#" class="footer__logo">
            <img src="${assets.logo}" alt="Coffee Shop" />
          </a>
          <nav class="footer__nav">
            ${navLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join('\n            ')}
          </nav>
          <form class="footer__subscribe">
            <input type="email" class="footer__input" placeholder="Enter your email" />
            <button type="submit" class="footer__submit" aria-label="Subscribe">→</button>
          </form>
        </div>
        <div class="footer__bottom">
          <div class="container">
            <p class="footer__copy">© 2021. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('coffee-footer', CoffeeFooter);
