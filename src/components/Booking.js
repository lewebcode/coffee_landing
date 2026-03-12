const PERSON_OPTIONS = [2, 3, 4, 5, 6, 8, 10];

class CoffeeBooking extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="booking" id="reservation">
        <div class="container booking__inner">
          <div class="booking__form-wrap">
            <span class="section-label">Reservation</span>
            <h2 class="booking__title">Booking a table</h2>
            <form class="booking__form">
              <div class="booking__field">
                <select class="booking__input booking__select" name="persons" aria-label="Number of persons">
                  ${PERSON_OPTIONS.map(
                    (n) => `<option value="${n}" ${n === 4 ? 'selected' : ''}>${n} person${n > 1 ? 's' : ''}</option>`
                  ).join('')}
                </select>
              </div>
              <div class="booking__field">
                <input type="text" class="booking__input" placeholder="12.25, 2020" />
              </div>
              <div class="booking__field">
                <input type="text" class="booking__input" placeholder="11:00 AM" />
              </div>
              <button type="submit" class="btn btn--primary btn--block">Book a table</button>
            </form>
          </div>
          <div class="booking__image"></div>
        </div>
      </section>
    `;
  }
}

customElements.define('coffee-booking', CoffeeBooking);
