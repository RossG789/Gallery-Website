const form = document.getElementById("form");
const imgcontainer = document.getElementById("img-container");
const thumbDis = document.getElementById("thumbs");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //   console.log(e);
  let query = e.target.input.value;

  search(query);
});

async function search(queryParam) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?page=5&query=${queryParam}&client_id=_yyXBx_Z41nrX0ItYX2TcUQUYVDo_6Lv4gT0hwxwhTI`
  );

  let data = await response.json();
  console.log(data);

  let imgArray = data.results;

  createImages(imgArray);
  createThumbs(imgArray);
}

// Surely can be made shorter?
function createImages(arrayImages) {
  imgcontainer.innerHTML = "";
  arrayImages.forEach((img) => {
    let imgTag = document.createElement("img");
    imgTag.src = img.urls.regular;
    imgcontainer.appendChild(imgTag);
  });
}

function createThumbs(arrayImages) {
  thumbDis.innerHTML = "";
  arrayImages.forEach((img) => {
    let imgTag = document.createElement("img");
    imgTag.src = img.urls.thumb;
    thumbDis.appendChild(imgTag);
    // Event Listener + alt description// 'click', function (imgTag.src)...?
    // imgTag.addEventListener("click", () =>
    //   imgcontainer.appendChild(img.urls.regular)
    // );
  });
}

function displayThumb(img) {
  createImages(img);
}

// Need to add event listeners to thumbs to diplay thumb image below
// Add outline to thumb image to shpw which image is selected
// Need to format images correctly
// Need to add 'key-down' event listeners on arrows
