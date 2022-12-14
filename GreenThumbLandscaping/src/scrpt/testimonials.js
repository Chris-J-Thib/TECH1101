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
}





