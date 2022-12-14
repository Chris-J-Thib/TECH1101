const bg_img = [
    "src/imgs/backyard_fireplace.jpg",
    "src/imgs/nice_backyard.jpg",
    "src/imgs/nice_backyard_2.jpg",
    "src/imgs/nice_backyard_4.jpg",
    "src/imgs/wet.jpg"
]


for (let index = 0; index < bg_img.length; index++) {
    const img = document.createElement("img");
    img.src = bg_img[index];
    img.id = "bg" + index;
    document.body.appendChild(img);
}

let i = 0;
const imgEl1 = document.getElementById("bg" + i);
imgEl1.style.opacity = .75;
setInterval(ChangeBG, 10000);

function ChangeBG() {
    const imgEl1 = document.getElementById("bg" + i);
    imgEl1.style.opacity = 0;
    i = (i + 1) % bg_img.length;
    const imgEl2 = document.getElementById("bg" + i);
    imgEl2.style.opacity = .75;

}


