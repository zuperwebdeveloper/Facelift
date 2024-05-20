


/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu')
    toggle.classList.toggle('show-icon')
    // console.log("asd")
  })
}

showMenu('nav-toggle', 'nav-menu')



/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')
const toggleItem = (item) => {
  const dropdownContainer = item.querySelector('.dropdown__container')
  if (item.classList.contains('show-dropdown')) {
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else {
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector('.dropdown__button')
  dropdownButton.addEventListener('click', () => {
    const showDropdown = document.querySelector('.show-dropdown')
    toggleItem(item)
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown)
    }
  })
})
const mediaQuery = matchMedia('(min-width: 1118px)'),
  dropdownContainer = document.querySelectorAll('.dropdown__container')
const removeStyle = () => {
  if (mediaQuery.matches) {
    dropdownContainer.forEach((e) => {
      e.removeAttribute('style')
    })
    dropdownItems.forEach((e) => {
      e.classList.remove('show-dropdown')
    })
  }
}

addEventListener('resize', removeStyle)

jQuery(document).ready(function ($) {
  var alterClass = function () {
    var ww = document.body.clientWidth;
    if (ww < 1118) {
      $('.nav__list').addClass('container');
    } else {
      $('.nav__list').removeClass('container');
    }
  };
  $(window).resize(function () {
    alterClass();
  });
  alterClass();





});



var prevScrollpos = window.scrollY;
jQuery(window).scroll(function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos)
    jQuery(".header").removeClass("hide");
  else
    jQuery(".header").addClass("hide");
  prevScrollpos = currentScrollPos;
});



$('.tabs').click(function () {
  var tabID = $(this).attr('data-tab');
  // console.log(tabID);
  $(this).addClass('active').siblings().removeClass('active');
  $("#" + tabID).addClass('active').siblings().removeClass('active');
});




$(document).ready(function () {
  function moveHighlight() {
    const highlight = $('.highlight');
    const activeItem = $('.nalink.active');
    // console.log(activeItem.length);
    if (activeItem.length) {
      const position = activeItem.position();
      const width = activeItem.outerWidth();

      highlight.css({
        left: position.left,
        width: width
      });
    }
  }
  moveHighlight();
  $('#nav-menu .nalink').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).find('.megamenu').addClass('current_dropdown');
    $('.megamenu').not($(this).find('.megamenu')).removeClass('current_dropdown');
    $('.highlight').css("visibility", "visible");
    moveHighlight();
    $('.bg-overlay').addClass('active');
    $('body').css("overflow", "hidden");
    $('.bg-overlay').click(function () {
      $('.nalink').removeClass('active');
      $('.megamenu').removeClass('current_dropdown');
      $('.bg-overlay').removeClass('active');
      $('.highlight').css("visibility", "hidden");
      $('body').css("overflow", "auto");
    });

  });



});


var swiper = new Swiper(".testimonials", {
  spaceBetween: 200,
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

});