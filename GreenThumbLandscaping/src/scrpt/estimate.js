const list = document.getElementsByClassName("serv");
const sizeHours = {
    "sml": 14.5,
    "med": 25,
    "lg": 32.5,
    "xlg": 45
}

let t;

console.log(list);


for (let i = 0; i < list.length; i++) {
    for (let j = 1; j < list[i].childNodes.length; j += 2) {
        let div = document.createElement("div");
        if (i == 0) div = timeBased(div);
        if (i == 1) div = sizeBased(div, j);
        if (i == 2) div = sizeTimeBased(div);
        if (i == 3) div = timeMatBased(div);
        list[i].childNodes[j].appendChild(div);
    }
}


function timeBased(div, c = 2) {
    switch (c) {
        case 2:
            t = " day"
            let selw = options(7);
            let chw = inputBox("weekly");
            chw.insertBefore(selw, chw.firstChild);
            div.appendChild(chw);

        case 1:
            t = " week";
            let selm = options(4);
            let chm = inputBox("monthly");
            chm.insertBefore(selm, chm.firstChild);
            div.appendChild(chm);


        default:
            t = " month";
            let sely = options(12);
            let chy = inputBox("yearly");
            chy.insertBefore(sely, chy.firstChild);
            div.appendChild(chy);

    }
    div.id = "timeDiv";
    return div;
}

function sizeBased(div, j) {
    //tree count
    if (j < 4) {
        let inpt = inputBox("Tree(s)", "text", "5");
        return inpt;
        //sq 
    } else if (j > 4 && j < 8) {
        let inpt = inputBox("sq. ft", "text");
        return inpt;

        //job size
    } else {
        let jbSz = jobSizeSel();
        return jbSz;
    }
}

function sizeTimeBased(div) {

    let inpt = inputBox("sq. ft", "text");
    div.appendChild(inpt);
    let freq = document.createElement("div");
    div.appendChild(timeBased(freq, 1));
    div.id = "outerDiv";
    return div;
}

function timeMatBased(div) {
    let sel = jobSizeSel();
    div.appendChild(sel);
    let inpt = inputBox("Material Cost", "text", "$5,000");
    div.appendChild(inpt);
    div.id = "matDiv";
    return div;
}


function inputBox(name, type = "checkbox", plchdr = "10000") {
    let div = document.createElement("div");
    let inpt = document.createElement("input");
    let lbl = document.createElement("label");
    lbl.innerText = name;
    lbl.id = "smLabel";
    inpt.type = type;
    if (type != "text") inpt.value = name;
    if (type == "text") inpt.placeholder = plchdr;
    div.appendChild(inpt);
    div.appendChild(lbl);
    div.id = "inptDiv";
    return div;

}

function jobSizeSel() {
    let div = document.createElement("div");
    let lbl = document.createElement("label");
    let sel = document.createElement("select");
    let opt = document.createElement("option");
    lbl.innerText = "Job Size";
    lbl.id = "smLabel";
    opt.value = 0;
    opt.textContent = " - ";
    sel.appendChild(opt);

    for (var size in sizeHours) {
        let opt = document.createElement("option");
        opt.value = sizeHours[size];
        opt.textContent = size + " - " + sizeHours[size] + "hrs";
        sel.appendChild(opt);
    }
    div.appendChild(sel);
    div.appendChild(lbl);
    div.id = "jobDiv";
    return div;
}

function options(cnt) {
    let sel = document.createElement("select");
    for (let i = 0; i <= cnt; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        if (i == 0) opt.textContent = " - ";
        else if (i == 1) opt.textContent = i + t;
        else opt.textContent = i + t + "s";
        sel.appendChild(opt);
    }
    return sel;
}