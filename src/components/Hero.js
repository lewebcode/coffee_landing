import { assets } from '../assets.js';

const PAUSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;

class CoffeeHero extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="hero__bg">
          <img src="${assets.heroBg}" alt="" class="hero__bg-img" />
          <video
            class="hero__video"
            src="${assets.heroVideo}"
            muted
            loop
            playsinline
            preload="metadata"
            aria-label="Background video"
          ></video>
          <div class="hero__overlay"></div>
        </div>
        <div class="container hero__content">
          <h1 class="hero__title">Enjoy Your<br />Morning Coffee.</h1>
          <p class="hero__text">The coffee is brewed by first roasting the green coffee beans over hot coals in a brazier. Given to opportunity.</p>
          <a href="#test-coffee" class="btn btn--primary" data-open-modal>Test Coffee</a>
        </div>
        <div class="hero__play">
          <button type="button" class="hero__play-btn" aria-label="Play video" title="Play video">
            <img src="${assets.heroPlayCircle}" alt="" class="hero__play-circle" />
            <span class="hero__play-icon hero__play-icon--play">
              <img src="${assets.heroPlayIcon}" alt="" />
            </span>
            <span class="hero__play-icon hero__play-icon--pause" hidden>${PAUSE_ICON}</span>
          </button>
          <span class="hero__play-label">Play video</span>
        </div>
      </section>
    `;

    this._video = this.querySelector('.hero__video');
    this._btn = this.querySelector('.hero__play-btn');
    this._label = this.querySelector('.hero__play-label');
    this._iconPlay = this.querySelector('.hero__play-icon--play');
    this._iconPause = this.querySelector('.hero__play-icon--pause');

    this._btn?.addEventListener('click', this._onPlayClick.bind(this));
    this._video?.addEventListener('ended', this._onVideoEnded.bind(this));

    this.querySelector('[data-open-modal]')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('coffee-modal')?.open();
    });
  }

  _onPlayClick(e) {
    e.preventDefault();
    if (!this._video) return;

    if (this._video.paused) {
      this._video.play().catch(() => {});
      this._setPlaying(true);
    } else {
      this._video.pause();
      this._setPlaying(false);
    }
  }

  _onVideoEnded() {
    this._setPlaying(false);
  }

  _setPlaying(playing) {
    this._video?.classList.toggle('is-playing', playing);
    this._btn?.classList.toggle('hero__play-btn--playing', playing);
    this._btn?.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    if (this._label) this._label.textContent = playing ? 'Pause video' : 'Play video';
    if (this._iconPlay) this._iconPlay.hidden = playing;
    if (this._iconPause) this._iconPause.hidden = !playing;
  }

  disconnectedCallback() {
    this._btn?.removeEventListener('click', this._onPlayClick);
    this._video?.removeEventListener('ended', this._onVideoEnded);
    this._video?.pause();
  }
}

customElements.define('coffee-hero', CoffeeHero);
