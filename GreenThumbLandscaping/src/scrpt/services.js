const serv_imgs = [
    "src/imgs/laying_sod.jpg",
    "src/imgs/laying_tiles.jpg",
    "src/imgs/laying_tiles_2.jpg",
    "src/imgs/mowing_lawn_2.jpg",
    "src/imgs/how_to_prune_trees.jpg",
    "src/imgs/planting_trees.jpg",
    "src/imgs/pruning_trees.jpg",
    "src/imgs/planting_plants.jpg"
]

const div = document.getElementById("serv_imgs");

for (let index = 0; index < serv_imgs.length; index++) {
    const img = document.createElement("img");
    img.src = serv_imgs[index];
    img.style.display = "none";
    img.id = serv_imgs[index].slice(9, -4);
    div.appendChild(img);
}


let ind = 0;


document.getElementById(serv_imgs[ind].slice(9, -4)).style.display = "block";
document.getElementById("serv_label").innerText = serv_imgs[ind].slice(9, -4)
    .replace(/_/g, " ").replace("2", "").toUpperCase();

document.getElementById("next").addEventListener("click", next);
document.getElementById("prev").addEventListener("click", prev);



function next() {
    document.getElementById(serv_imgs[ind].slice(9, -4)).style.display = "none";
    ind++;
    ind %= serv_imgs.length;
    document.getElementById(serv_imgs[ind].slice(9, -4)).style.display = "block";
    console.log("next pressed");
    document.getElementById("serv_label").innerText = serv_imgs[ind].slice(9, -4)
        .replace(/_/g, " ").replace("2", "").toUpperCase();
}

function prev() {
    document.getElementById(serv_imgs[ind].slice(9, -4)).style.display = "none";
    ind--;
    if (ind == -1) ind = serv_imgs.length - 1; //this is stupid, using modulo here doesnt work...
    document.getElementById(serv_imgs[ind].slice(9, -4)).style.display = "block";
    console.log("prev pressed");
    document.getElementById("serv_label").innerText = serv_imgs[ind].slice(9, -4)
        .replace(/_/g, " ").replace("2", "").toUpperCase();
}
