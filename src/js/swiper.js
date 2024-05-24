var swiper = new Swiper(".testimonials", {
    spaceBetween: 200,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    // effect: "fade",
    // crossFade: 'true',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
