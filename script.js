

var input = document.querySelector(".input");
var addbtn = document.querySelector(".fa-plus");
var task_section = document.querySelector(".task_section");

const getblock = () => {
    console.log("work");
    return JSON.parse(localStorage.getItem("localstoragedata"));
};

let localdata = getblock() || [];

const showdynamic = (ele) => {
    const divElement = document.createElement("div");
    divElement.classList.add("block");
    divElement.innerHTML = `<div class="to-do">${ele}</div><button class="check-btn"><i class="fa-solid fa-check"></i></button><button class="delete-btn"><i class="fa-solid fa-trash"></i></button>`;
    task_section.append(divElement);
};

const setblock = () => {
    console.log("check");
    const inputdata = input.value.trim();
    input.value = "";
    if (inputdata !== "" && !localdata.includes(inputdata)) {
        localdata.push(inputdata);
        localdata = [...new Set(localdata)];
        console.log(localdata);
        localStorage.setItem("localstoragedata", JSON.stringify(localdata));
        showdynamic(inputdata);
    }
};

const showdatablock = () => {
    console.log(localdata);
    localdata.forEach((ele) => {
        showdynamic(ele);
    });
};

showdatablock();

const removeblock = (e) => {
    if (e.target.classList.contains("fa-trash")) {
        const removed = e.target.closest(".block");
        if (removed) {
            let blockcontent = removed.querySelector(".to-do");
            console.log(blockcontent.textContent);
            localdata = localdata.filter(item => item !== blockcontent.textContent);
            localStorage.setItem("localstoragedata", JSON.stringify(localdata));
            removed.remove();
        }
    }
};

task_section.addEventListener("click", (e) => {
    removeblock(e);
});



const toggleComplete = (e) => {
    if (e.target.classList.contains("fa-check")) {
        const block = e.target.closest(".block");
        if (block) {
            let blockcontent = block.querySelector(".to-do");
            blockcontent.style.textDecoration = blockcontent.style.textDecoration === "line-through" ? "none" : "line-through";
            blockcontent.style.color = blockcontent.style.color === "red" ? "white" : "red";
        }
    }
};


task_section.addEventListener("click", (e) => {
    removeblock(e);
    toggleComplete(e);
});


addbtn.addEventListener("click", () => {
    setblock();
});
