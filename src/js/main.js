//scroll animation
var elements = document.getElementsByClassName("js-scroll");
document.addEventListener("scroll", scrollAnimate);
function inView(item) {
  var elementHeight = item.clientHeight;
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY || window.pageYOffset;
  var scrollPosition = scrollY + windowHeight;
  var elementPosition =
    item.getBoundingClientRect().top + scrollY + elementHeight / 2;
  if (
    scrollPosition > elementPosition &&
    scrollPosition < elementPosition + windowHeight
  ) {
    return true;
  }
  return false;
}
function scrollAnimate() {
  Array.prototype.forEach.call(elements, function (element) {
    if (element.classList.contains("js-scroll")) {
      if (inView(element)) {
        element.classList.add("viewed");
        element.classList.add("inview");
      } else {
        element.classList.remove("inview");
        if (element.classList.contains("viewed")) {
          element.classList.add("viewed--out");
        }
      }
    }
  });
}
//scroll animation end

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


// vertical tab script Start
// document.addEventListener('DOMContentLoaded', function () {
//   const tabs = document.querySelectorAll('.tab-button');
//   const tabPanes = document.querySelectorAll('.tab-pane');
//   let currentTab = 0;
//   let autoplayInterval;
//   const autoplayDuration = 5000; // 5 seconds for each tab
//   let timerBar;

//   function showTab(index) {
//     tabPanes.forEach((pane, i) => {
//       if (i === index) {
//         pane.classList.add('active');
//       } else {
//         pane.classList.remove('active');
//       }
//     });
//     resetTimerBar(index);
//   }

//   function startAutoplay() {
//     autoplayInterval = setInterval(() => {
//       currentTab = (currentTab + 1) % tabs.length;
//       showTab(currentTab);
//     }, autoplayDuration);
//   }

//   function resetTimerBar(index) {
//     if (timerBar) {
//       timerBar.remove();
//     }
//     const activeTab = tabs[index];
//     timerBar = document.createElement('div');
//     timerBar.classList.add('timer-bar');
//     activeTab.appendChild(timerBar);

//     timerBar.style.transition = 'none';
//     timerBar.style.width = '0';
//     setTimeout(() => {
//       timerBar.style.transition = `width ${autoplayDuration}ms linear`;
//       timerBar.style.width = '100%';
//     }, 50); // Slight delay to allow transition to reset
//   }

//   tabs.forEach((tab, index) => {
//     tab.addEventListener('click', () => {
//       clearInterval(autoplayInterval);
//       currentTab = index;
//       showTab(currentTab);
//       startAutoplay(); // Restart autoplay after manual selection
//     });
//   });

//   // Initialize the first tab and start autoplay
//   showTab(currentTab);
//   startAutoplay();
// });
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  let currentTab = 0;
  let autoplayInterval;
  const autoplayDuration = 5000; // 5 seconds for each tab
  let timerBar;

  function showTab(index) {
    tabPanes.forEach((pane, i) => {
      if (i === index) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    resetTimerBar(index);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentTab = (currentTab + 1) % tabs.length;
      showTab(currentTab);
    }, autoplayDuration);
  }

  function resetTimerBar(index) {
    if (timerBar) {
      timerBar.remove();
    }
    const activeTab = tabs[index];
    timerBar = document.createElement('div');
    timerBar.classList.add('timer-bar');
    activeTab.appendChild(timerBar);

    timerBar.style.transition = 'none';
    timerBar.style.width = '0';
    setTimeout(() => {
      timerBar.style.transition = `width ${autoplayDuration}ms linear`;
      timerBar.style.width = '100%';
    }, 50); // Slight delay to allow transition to reset
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      currentTab = index;
      showTab(currentTab);
      startAutoplay(); // Restart autoplay after manual selection
    });
  });

  // Initialize the first tab and start autoplay
  showTab(currentTab);
  startAutoplay();
});

// vertical tab script End