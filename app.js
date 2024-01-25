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
    `https://api.unsplash.com/search/photos?page=1&query=${queryParam}&client_id=_yyXBx_Z41nrX0ItYX2TcUQUYVDo_6Lv4gT0hwxwhTI`
  );

  let data = await response.json();
  console.log(data);

  let imgArray = data.results;

  createImages(imgArray);
  createThumbs(imgArray);
}

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
  });
}
