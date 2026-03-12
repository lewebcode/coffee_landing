const posts = Array(3).fill({
  author: 'By: rasaline',
  date: '23.01.2021',
  title: 'Ideal cocktails from barmen….',
});

class CoffeeBlog extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="blog">
        <div class="container">
          <span class="section-label">Testimonial</span>
          <h2 class="section-title">Our latest news</h2>
          <div class="blog__grid">
            ${posts
              .map(
                (post) => `
              <article class="blog-card">
                <div class="blog-card__img"></div>
                <div class="blog-card__body">
                  <div class="blog-card__meta">
                    <span>${post.author}</span>
                    <span>${post.date}</span>
                  </div>
                  <h3 class="blog-card__title">${post.title}</h3>
                  <a href="#" class="blog-card__link">Read More →</a>
                </div>
              </article>
            `
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-blog', CoffeeBlog);
