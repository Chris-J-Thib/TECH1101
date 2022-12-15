const listServ = document.getElementsByClassName("serv");


const sizeHours = {
    "sml": 14.5,
    "med": 25,
    "lg": 32.5,
    "xlg": 45
}

let t;




for (let i = 0; i < listServ.length; i++) {
    for (let j = 1; j < listServ[i].childNodes.length; j += 2) {
        let div = document.createElement("div");
        if (i == 0) div = timeBased(div);
        if (i == 1) div = sizeBased(j);
        if (i == 2) div = sizeTimeBased(div);
        if (i == 3) div = timeMatBased(div);
        listServ[i].childNodes[j].appendChild(div);
    }
}

function timeBased(div, c = 2) {
    switch (c) {
        case 2:
            t = " day"
            let selw = options(7, "weekly");
            div.appendChild(selw);

        case 1:
            t = " week";
            let selm = options(4, "monthly");
            div.appendChild(selm);


        default:
            t = " month";
            let sely = options(12, "yearly");
            div.appendChild(sely);

    }
    div.id = "timeDiv";
    return div;
}

function sizeBased(j) {
    //tree count
    if (j < 4) {
        let inpt = inputBox("Tree(s)", "text", "50");
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

function options(cnt, name) {
    let div = document.createElement("div");
    let sel = document.createElement("select");
    let lbl = document.createElement("label");
    for (let i = 0; i <= cnt; i++) {
        let opt = document.createElement("option");
        lbl.id = "smLabel"
        lbl.innerText = name;
        opt.value = i;
        if (i == 0) opt.textContent = " - ";
        else if (i == 1) opt.textContent = i + t;
        else opt.textContent = i + t + "s";
        sel.appendChild(opt);
        div.appendChild(sel);
        div.appendChild(lbl);
    }

    return div;
}

function getCostArray() {
    let cost = [];
    let i = 0;
    for (let i = 0; i < listServ.length; i++) {
        for (let j = 0; j < listServ[i].children.length; j++) {
            let temp = [];
            let a = 1;
            let b = 0;
            let val;

            if (listServ[i].children[j].value / 100 >= 1) {
                val = listServ[i].children[j].value / 100000;
            } else {
                val = listServ[i].children[j].value;
            }


            let sels = listServ[i].children[j].getElementsByTagName("select");
            let inpts = listServ[i].children[j].getElementsByTagName("input");

            if (inpts) {
                for (let k = 0; k < inpts.length; k++) {
                    temp.push(inpts[k].value);
                }
                if (sels) {
                    for (let k = 0; k < sels.length; k++) {
                        //console.log(sels[k]);
                        temp.push(sels[k].value);
                    }
                }
                temp.push(val);
                cost.push(temp);
            }
        }
    }
    return cost;
}

function calc() {
    const cost = getCostArray();
    const day = 8;
    let total = 0;
    let subTot = 0;
    //console.log(cost);

    for (let serv = 0; serv < cost.length; serv++) {
        //console.log(cost[serv]);
        //Time Based
        if (serv < 3) {
            subTot = cost[serv][0] * Math.max(cost[serv][1], 1) * Math.max(cost[serv][2], 1) * cost[serv][3] * day;
            total = Math.round((total + subTot) * 100) / 100;
            // console.log(subTot);
            // console.log(total);
        }

        //Size Based
        if (serv >= 3 && serv < 8) {
            subTot = cost[serv][0] * cost[serv][1];
            total = Math.round((total + subTot) * 100) / 100;
            // console.log(subTot);
            // console.log(total);
        }

        //Size & Time Based
        if (serv >= 8 && serv < 12) {
            subTot = cost[serv][0] * Math.max(cost[serv][1], 1) * Math.max(cost[serv][2], 1) * cost[serv][3];
            total = Math.round((total + subTot) * 100) / 100;
            // console.log(subTot);
            // console.log(total);
        }

        //Time & Mat Based
        if (serv >= 12) {
            if (cost[serv][1] == 0) break;
            subTot = parseInt(cost[serv][0]) + (cost[serv][1] * cost[serv][2]);
            total = Math.round((total + subTot) * 100) / 100;
            // console.log(subTot);
            // // console.log(total);
        }
    }


    let totDiv = document.getElementById("total");
    totDiv.innerText = (total).toLocaleString('en-US', {
        style: 'currency',
        currency: 'CAD',
    });
}