import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

//장바구니
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    hideBasket();
  } else {
    showBasket();
  }
});
basketEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
window.addEventListener("click", function () {
  basketEl.classList.remove("show");
});

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

//검색
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]; //전개 연산자 이용한 얕은복사
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")];

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}
function playScroll() {
  document.documentElement.classList.remove("fixed");
}
function stopScroll() {
  document.documentElement.classList.add("fixed");
}

//헤더 메뉴 토글
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

//헤더 검색
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelerEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelerEl.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

const navEl = document.querySelector("nav");
const menuToggleEl = navEl.querySelector(".menu-toggler");
const navMenuShadowEl = navEl.querySelector(".shadow");
menuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});
navEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
navMenuShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
}
//요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".controller--play");
const pausBtn = document.querySelector(".controller--pause");
playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pausBtn.classList.remove("hide");
});
pausBtn.addEventListener("click", function () {
  video.pause();
  playBtn.classList.remove("hide");
  pausBtn.classList.add("hide");
});

const items = document.querySelector("section.compare .items");

ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");
  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
      <div class="thumbnail">
        <img src="${ipad.thumbnail}" alt="${ipad.name}" />
      </div>
      <ul class="colors">
        ${colorList}
      </ul>
      <h3 class="name">${ipad.name}</h3>
      <p class="tagline">${ipad.tagline}</p>
      <p class="price">₩${ipad.price.toLocaleString("en-US")}</p>
      <button class="btn">구입하기</button>
      <a href="${ipad.link}" class="link">더 알아보기</a>
  `;
  items.append(itemEl);
});

const navigationsEls = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
        <li>
          <a href="${map.url}">${map.name}</a>
        </li>`;
  });
  mapEl.innerHTML = /* html */ `
        <h3>
          <span class="text">${nav.title}</span>
          <span class="icon">+</span>
        </h3>
        <ul>
          ${mapList}
        </ul>
    `;
  navigationsEls.append(mapEl);
});
const mapEls = navigationsEls.querySelectorAll(".map");

mapEls.forEach(function (el) {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", function () {
    el.classList.toggle("active");
  });
});

const thisYearEl = document.querySelector("span.this-year");
thisYearEl.textContent = new Date().getFullYear();
