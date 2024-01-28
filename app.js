// Variables
const form = document.getElementById("form");
const imgcontainer = document.getElementById("img-container");
const thumbDis = document.getElementById("thumbs");
// const goBackBtn = document.getElementById("btn-back");
// const goFwdBtn = document.getElementById("btn-fwd");
const body = document.querySelector("body");
const clientId = "_yyXBx_Z41nrX0ItYX2TcUQUYVDo_6Lv4gT0hwxwhTI";
// good practice when using API's that require keys. Allows for easier manipulation of fetch requests
let imgArray = [];
let currentIndex = 0;
// Allows storage of index when background image chnages

const announcer = document.getElementById("announcer");
// Functions
getRandomImg();

async function getRandomImg() {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?count=10&client_id=${clientId}`
  );

  let data = await response.json();

  imgArray = data;
  console.log(data);

  createThumbs(imgArray);
  createImage(0);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchValue = e.target.input.value;

  // Trim used to ensure no blank spaces
  if (searchValue.trim() !== "") {
    getSearchImg(searchValue);
  }
});

async function getSearchImg(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?per_page=10&query=${queryParam}&client_id=${clientId}`
  );

  let data = await response.json();
  // console.log(data);

  imgArray = data.results;

  createImage(0);
  createThumbs(imgArray);
}

function createImage(index) {
  // To create limits of index
  if (index >= 0 && index < imgArray.length) {
    imgcontainer.innerHTML = "";
    heroImage = imgArray[index];
    let imgTag = document.createElement("img");
    imgTag.src = heroImage.urls.regular;
    imgTag.alt = heroImage.alt_description;
    imgcontainer.appendChild(imgTag);
    ariaAnnounce(heroImage.alt_description);
    currentIndex = index;
  }
}

function ariaAnnounce(altText) {
  announcer.textContent = `Image changed to ${altText}`;
}

function createThumbs(arrayImages) {
  thumbDis.innerHTML = "";
  let i = 0;
  arrayImages.forEach((img) => {
    let imgTag = document.createElement("img");

    imgTag.src = img.urls.thumb;
    imgTag.alt = img.alt_description;
    imgTag.id = i;
    thumbDis.appendChild(imgTag);
    // Event Listener + alt description// 'click', function (imgTag.src)...?
    imgTag.addEventListener("click", () => createImage(imgTag.id));
    i++;
  });
}

// Arrow button event listeners (Would it not just add/minus from the index to move through?)

body.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    createImage(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    createImage(currentIndex + 1);
  }
});
