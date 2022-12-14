const test = document.getElementsByClassName("rating");

for (let i = 0; i < test.length; i++) {

    let text = test[i].textContent;
    test[i].textContent = "";

    for (let j = 0; j < text[0]; j++) {
        const leaf = document.createElement("i");
        leaf.className = "fa-solid fa-leaf";
        leaf.style.color = "green";
        test[i].append(leaf);
    }

    for (let j = 0; j < text[2] - text[0]; j++) {
        const leaf = document.createElement("i");
        leaf.className = "fa-solid fa-leaf";
        leaf.style.color = "grey";
        test[i].append(leaf);
    }

    let btn = document.createElement("button");
    let ic = document.createElement("i");
    ic.className = "fa-solid fa-caret-down";
    ic.style.color = "darkolivegreen";
    btn.appendChild(ic);
    btn.id = "drpdwn";
    btn.addEventListener("click", click);
    test[i].append(btn);
}


function click() {
    let li = this.parentElement.parentElement;
    let p = li.childNodes[4];

    if (p.style.scale == 0) {
        p.style.scale = 1;
        li.style.height = "fit-content";
    } else {
        p.style.scale = 0;
        li.style.height = "20px";
    }

}




