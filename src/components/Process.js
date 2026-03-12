import { assets } from '../assets.js';

const cards = [
  { num: '01', title: 'Best Coffee Flavour', img: assets.process1 },
  { num: '02', title: 'Place to get lost', img: assets.process2 },
  { num: '03', title: 'Proper roasting', img: assets.process3 },
];

class CoffeeProcess extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="process" id="about">
        <div class="container process__grid">
          ${cards
            .map(
              (card) => `
            <article class="process__card">
              <span class="process__num">${card.num}</span>
              <h2 class="process__title">${card.title}</h2>
              <div class="process__img">
                <img src="${card.img}" alt="" />
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-process', CoffeeProcess);
