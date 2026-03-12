import { assets } from '../assets.js';

const products = [
  { img: assets.process1, name: 'Brazil coffee gred', price: 'Price — $320.00 / $358', featured: false },
  { img: assets.process2, name: 'Brazil coffee gred', featured: true },
  { img: assets.process3, name: 'Brazil coffee gred', price: 'Price — $320.00 / $358', featured: false },
];

class CoffeeProducts extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="products" id="shop">
        <div class="container">
          <span class="section-label">Popular Product</span>
          <h2 class="section-title">Coffee popular Product</h2>
          <div class="products__grid">
            ${products
              .map(
                (p) => `
              <article class="product-card ${p.featured ? 'product-card--featured' : ''}">
                <div class="product-card__img">
                  <img src="${p.img}" alt="Brazil coffee" />
                </div>
                ${!p.featured ? '<div class="product-card__meta"><span class="product-card__category">Coffee</span><div class="product-card__stars">★★★★★</div></div>' : ''}
                <h3 class="product-card__name">${p.name}</h3>
                ${p.featured ? '<div class="product-card__meta"><span class="product-card__category">Coffee</span><div class="product-card__stars">★★★★★</div></div><button type="button" class="btn btn--cart">Add to cart</button>' : `<p class="product-card__price">${p.price}</p>`}
              </article>
            `
              )
              .join('')}
          </div>
          <div class="products__action">
            <a href="#all-products" class="btn btn--primary">View all product</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-products', CoffeeProducts);
