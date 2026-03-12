import { assets } from '../assets.js';

class CoffeeHistory extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="history">
        <div class="container history__inner">
          <div class="history__gallery">
            <div class="history__img history__img--1">
              <img src="${assets.history1}" alt="" />
            </div>
            <div class="history__img history__img--2">
              <img src="${assets.history2}" alt="" />
            </div>
            <div class="history__img history__img--3">
              <img src="${assets.history3}" alt="" />
            </div>
          </div>
          <div class="history__content">
            <span class="history__label">Our history</span>
            <h2 class="history__title">Create a<br />new story with us</h2>
            <p class="history__text">Mauris rhoncus in imperdiet placerat. Vestibulum nisl suscipit ligula volutpat, a feugiat urn maximus. Cras massa nibh tincidunt. Donec et nibh maximus, est eu mattis nunc. Praesent ut quam quis quam venenatis fringilla. Morbi vestibulum id tellus modo mattis. Aliquam erat volutpat.</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-history', CoffeeHistory);
