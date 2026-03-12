const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class CoffeeModal extends HTMLElement {
  connectedCallback() {
    this.hidden = true;
    this.setAttribute('aria-hidden', 'true');
    this.innerHTML = `
      <div class="modal__backdrop" aria-hidden="true"></div>
      <div class="modal__box" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <button type="button" class="modal__close" aria-label="Close">&times;</button>
        <h2 id="modal-title" class="modal__title">Test Coffee</h2>
        <p class="modal__subtitle">Leave your contacts and we’ll invite you for a tasting.</p>
        <form class="modal__form" novalidate>
          <div class="modal__field">
            <label for="modal-name" class="modal__label">Name <span class="modal__required">*</span></label>
            <input type="text" id="modal-name" name="name" class="modal__input" autocomplete="name" required />
            <span class="modal__error" data-error="name" aria-live="polite"></span>
          </div>
          <div class="modal__field">
            <label for="modal-email" class="modal__label">Email <span class="modal__required">*</span></label>
            <input type="email" id="modal-email" name="email" class="modal__input" autocomplete="email" required />
            <span class="modal__error" data-error="email" aria-live="polite"></span>
          </div>
          <div class="modal__field">
            <label for="modal-phone" class="modal__label">Phone</label>
            <input type="tel" id="modal-phone" name="phone" class="modal__input" autocomplete="tel" />
            <span class="modal__error" data-error="phone" aria-live="polite"></span>
          </div>
          <div class="modal__field">
            <label for="modal-date" class="modal__label">Preferred date</label>
            <input type="date" id="modal-date" name="date" class="modal__input" />
          </div>
          <div class="modal__field">
            <label for="modal-message" class="modal__label">Message</label>
            <textarea id="modal-message" name="message" class="modal__input modal__textarea" rows="3"></textarea>
          </div>
          <div class="modal__actions">
            <button type="submit" class="btn btn--primary">Send request</button>
            <button type="button" class="btn modal__btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    `;

    this._backdrop = this.querySelector('.modal__backdrop');
    this._box = this.querySelector('.modal__box');
    this._form = this.querySelector('.modal__form');
    this._closeBtn = this.querySelector('.modal__close');
    this._cancelBtn = this.querySelector('.modal__btn-cancel');

    this._close = this._close.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onKeydown = this._onKeydown.bind(this);

    this._backdrop?.addEventListener('click', this._close);
    this._closeBtn?.addEventListener('click', this._close);
    this._cancelBtn?.addEventListener('click', this._close);
    this._form?.addEventListener('submit', this._onSubmit);
    document.addEventListener('keydown', this._onKeydown);

    this._focusable = () => this._box?.querySelectorAll('button, [href], input, select, textarea') || [];
  }

  _onKeydown(e) {
    if (e.key !== 'Escape' || this.hidden) return;
    this._close();
  }

  _close() {
    this.hidden = true;
    this.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this._clearErrors();
  }

  open() {
    this.hidden = false;
    this.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    this._form?.reset();
    this._clearErrors();
    requestAnimationFrame(() => this._closeBtn?.focus());
  }

  _clearErrors() {
    this.querySelectorAll('.modal__error').forEach((el) => { el.textContent = ''; });
    this.querySelectorAll('.modal__input.is-error').forEach((el) => el.classList.remove('is-error'));
  }

  _setError(name, message) {
    const input = this._form?.querySelector(`[name="${name}"]`);
    const errEl = this.querySelector(`[data-error="${name}"]`);
    if (input) input.classList.add('is-error');
    if (errEl) errEl.textContent = message || '';
  }

  _validate() {
    const form = this._form;
    if (!form) return false;
    const name = (form.name?.value || '').trim();
    const email = (form.email?.value || '').trim();
    const phone = (form.phone?.value || '').trim();
    let valid = true;

    this._clearErrors();

    if (!name) {
      this._setError('name', 'Enter your name');
      valid = false;
    }

    if (!email) {
      this._setError('email', 'Enter your email');
      valid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      this._setError('email', 'Enter a valid email address');
      valid = false;
    }

    if (phone && !/^[\d\s+\-()]{10,}$/.test(phone)) {
      this._setError('phone', 'Enter a valid phone number');
      valid = false;
    }

    return valid;
  }

  _onSubmit(e) {
    e.preventDefault();
    if (!this._validate()) return;
    // Here you could send data to server
    this._close();
  }

  disconnectedCallback() {
    this._backdrop?.removeEventListener('click', this._close);
    this._closeBtn?.removeEventListener('click', this._close);
    this._cancelBtn?.removeEventListener('click', this._close);
    this._form?.removeEventListener('submit', this._onSubmit);
    document.removeEventListener('keydown', this._onKeydown);
    document.body.style.overflow = '';
  }
}

customElements.define('coffee-modal', CoffeeModal);
