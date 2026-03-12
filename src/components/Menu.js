const menuItems = Array(8).fill({
  name: 'Americano roasted gred',
  price: '$12:00',
});

class CoffeeMenu extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="menu" id="menu">
        <div class="container">
          <span class="section-label">Menu</span>
          <h2 class="section-title">Coffee popular menu</h2>
          <ul class="menu__list">
            ${menuItems
              .map(
                (item) => `
              <li class="menu__item">
                <div class="menu__item-img"></div>
                <div class="menu__item-info">
                  <h3 class="menu__item-name">${item.name}</h3>
                  <span class="menu__item-price">${item.price}</span>
                </div>
              </li>
            `
              )
              .join('')}
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-menu', CoffeeMenu);
