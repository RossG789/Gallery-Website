// Variables
const form = document.getElementById("form");
const imgcontainer = document.getElementById("img-container");
const thumbDis = document.getElementById("thumbs");
const clientId = "_yyXBx_Z41nrX0ItYX2TcUQUYVDo_6Lv4gT0hwxwhTI";
let imgArray = [];

// Functions
getRandomImg();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //   console.log(e);
  let query = e.target.input.value;

  getSearchImg(query);
});

async function getSearchImg(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?per_page=10&query=${queryParam}&client_id=${clientId}`
  );

  let data = await response.json();
  console.log(data);

  imgArray = data.results;

  createImage(0);
  createThumbs(imgArray);
}

async function getRandomImg() {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?count=10&client_id=${clientId}`
  );

  let data = await response.json();

  imgArray = data;

  createThumbs(imgArray);
  createImage(0);
}

// Surely can be made shorter?
function createImage(index) {
  imgcontainer.innerHTML = "";
  heroImage = imgArray[index];
  let imgTag = document.createElement("img");
  imgTag.src = heroImage.urls.regular;
  imgcontainer.appendChild(imgTag);
}

function createThumbs(arrayImages) {
  thumbDis.innerHTML = "";
  let i = 0;
  arrayImages.forEach((img) => {
    let imgTag = document.createElement("img");

    imgTag.src = img.urls.thumb;
    imgTag.id = i;
    thumbDis.appendChild(imgTag);
    // Event Listener + alt description// 'click', function (imgTag.src)...?
    imgTag.addEventListener("click", () => createImage(imgTag.id));
    i++;
  });
}

// function displayThumb(img) {
//   createImages(img);
// }

// Need to add event listeners to thumbs to diplay thumb image below
// Add outline to thumb image to shpw which image is selected
// Need to format images correctly
// Need to add 'key-down' event listeners on arrows
