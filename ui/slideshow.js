var Slideshow = function(slides) {
  this.slides = slides;
  this.slideIndex = slides.length - 1;
  this.startDisplay();
}

Slideshow.prototype.slideClass = 'slide';

Slideshow.prototype.currentSlide = function() {
  return this.slides[this.slideIndex];
}

Slideshow.prototype.nextSlideIndex = function() {
  var nextIndex = this.slideIndex - 1;
  return nextIndex >= 0  ? nextIndex : this.slides.length - 1;
}

Slideshow.prototype.nextSlide = function() {
  return this.slides[this.nextSlideIndex()];
}

Slideshow.prototype.toggleSlide = function(slide) {
  slide.classList.toggle(this.slideClass);
}

Slideshow.prototype.toggleSlides = function() {
  slides = Array.prototype.slice.call(arguments);
  slides.forEach(this.toggleSlide.bind(this));
}

Slideshow.prototype.transitionSlide = function() {
  var currentSlide = this.currentSlide();
  var nextSlide = this.nextSlide();
  this.toggleSlides(currentSlide, nextSlide);
  this.slideIndex = this.nextSlideIndex();
}

Slideshow.prototype.startDisplay = function() {
  this.toggleSlide(this.currentSlide());
  setInterval(this.transitionSlide.bind(this), 5000);
}

Slideshow.loadEvent = 'DOMContentLoaded';

Slideshow.buildAfterDomLoaded = function() {
  document.addEventListener(this.loadEvent, this.build);
}

Slideshow.build = function() {
  var slides = document.getElementsByClassName('media-item');
  return new Slideshow(slides);
}

Slideshow.buildAfterDomLoaded();
