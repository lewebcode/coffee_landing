import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const testimonials = [
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'John Smith', role: 'Product Designer' },
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'Brett Lee', role: 'User Experience Designer' },
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'Sarah Wilson', role: 'UX Researcher' },
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'Mike Johnson', role: 'Frontend Developer' },
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'Anna Brown', role: 'Content Strategist' },
  { quote: 'Education WP is a special build for effective education & Learning Management System site. Education WP is the next generation & one of the best education WordPress themes which all the strength of eLearning WP.', name: 'David Clark', role: 'Design Lead' },
];

class CoffeeTestimonial extends HTMLElement {
  connectedCallback() {
    const total = testimonials.length;
    this.innerHTML = `
      <section class="testimonial">
        <div class="container">
          <span class="section-label">Testimonial</span>
          <h2 class="section-title">Says our customers</h2>
          <div class="testimonial__slider">
            <div class="swiper testimonial-swiper">
              <div class="swiper-wrapper">
                ${testimonials
                  .map(
                    (t) => `
                  <div class="swiper-slide">
                    <article class="testimonial__card">
                      <div class="testimonial__avatar"></div>
                      <p class="testimonial__quote">${t.quote}</p>
                      <div class="testimonial__author">
                        <strong>${t.name}</strong>
                        <span>${t.role}</span>
                      </div>
                    </article>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
            <div class="testimonial__nav">
              <span class="testimonial__counter"><span class="testimonial__current">1</span>/${total} People</span>
              <div class="testimonial__progress">
                <div class="testimonial__progress-fill" style="width: ${(100 / total).toFixed(1)}%"></div>
              </div>
              <div class="testimonial__arrows">
                <button type="button" class="testimonial__arrow testimonial__arrow--prev" aria-label="Previous">←</button>
                <button type="button" class="testimonial__arrow testimonial__arrow--next" aria-label="Next">→</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this._initSwiper(total);
  }

  _initSwiper(total) {
    const container = this.querySelector('.testimonial-swiper');
    const prevBtn = this.querySelector('.testimonial__arrow--prev');
    const nextBtn = this.querySelector('.testimonial__arrow--next');
    const counterEl = this.querySelector('.testimonial__current');
    const progressFill = this.querySelector('.testimonial__progress-fill');

    if (!container) return;

    this.swiper = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      on: {
        init(s) {
          _updateCounter(s, counterEl, progressFill, total);
        },
        slideChange(s) {
          _updateCounter(s, counterEl, progressFill, total);
        },
      },
    });
  }

  disconnectedCallback() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

function _updateCounter(swiper, counterEl, progressFill, total) {
  const realIndex = swiper.realIndex + 1;
  if (counterEl) counterEl.textContent = realIndex;
  if (progressFill) {
    const pct = (realIndex / total) * 100;
    progressFill.style.width = `${pct}%`;
  }
}

customElements.define('coffee-testimonial', CoffeeTestimonial);
