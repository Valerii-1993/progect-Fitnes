// //////////////////////////////////////BURGER FUNCTION///////////////////////////////////////////////////////////////

(() => {
  document.querySelector(".burger").addEventListener("click", function () {
    document.querySelector(".header__nav-list").classList.toggle("active-menu");
  });
})();

////////////////////////////////////////SCROLL FUNCTION///////////////////////////////////////////////////////////////

(() => {
  const navLink = document.querySelector(".header__nav-list");
  const anchors = navLink.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
})();

////////////////////////////////////////PROGRESS-BAR FUNCTION///////////////////////////////////////////////////////////////

(() => {
  ////change % in html, "data-percent", strokes: 243, 257, 271//
  function progressView() {
    let diagramBox = document.querySelectorAll(".diagram.progress");
    diagramBox.forEach((box) => {
      let deg = (360 * box.dataset.percent) / 100 + 180;

      if (box.dataset.percent >= 50) {
        box.classList.add("over_50");
      } else {
        box.classList.remove("over_50");
      }
      box.querySelector(".piece.right").style.transform =
        "rotate(" + deg + "deg)";
    });
  }
  progressView();
})();

////////////////////////////////////////REVIEWS FUNCTION///////////////////////////////////////////////////////////////

(() => {
  let status = function (response) {
    if (response.status !== 200) {
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
  };
  let json = function (response) {
    return response.json();
  };

  fetch("/js/data.json")
    .then(status)
    .then(json)
    .then(function (data) {
      document.getElementById("reviews__block").innerHTML = data
        .map(
          (n) => `
      <div class="reviews__item">
      <div class="reviews__container">
        <img class="reviews__img" src="${n.photo}">
        <p class="reviews__name">${n.name}</p>
        </div>          
        <p class="reviews__text">${n.text}</p>
        </div> 
    `
        )
        .join("");
    })
    .catch(function (error) {
      console.log("error", error);
    });
})();
