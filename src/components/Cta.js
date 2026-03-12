import { assets } from '../assets.js';

class CoffeeCta extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="cta">
        <div class="container cta__inner">
          <div class="cta__image">
            <img src="${assets.ctaMachine}" alt="Coffee machine" />
          </div>
          <div class="cta__content">
            <h2 class="cta__title">Coffee<br />machine, buy for home</h2>
            <p class="cta__text">Mauris rhoncus in imperdiet placerat. Vestibulum nisl suscipit ligula volutpat, a feugiat urn maximus. Cras massa nibh tincidunt. Donec et nib maximus, est eu mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus modo mattis. Aliquam erat volutpat.</p>
            <a href="#discover" class="btn btn--primary">Discover now</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-cta', CoffeeCta);
