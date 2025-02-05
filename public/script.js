tl = document.querySelector("#tasks");
ntn = document.getElementById("newtaskname");
function gettasks() {
    fetch("http://localhost:3000/mytasks")
        .then(tasks => tasks.json())
        .then(function (data) {
            tasks = data;
            for (i = 0; i < tasks.length; i++) {

                contain = document.createElement("div");
                ntd = document.createElement("div");
                nt = document.createElement("div");

                contain.classList.add("containt");
                ntd.classList.add("done");
                nt.classList.add("task");

                contain.id = `c${i}`;
                ntd.id = `d${i}`;
                nt.id = `t${i}`;

                nt.innerHTML = tasks[i].name;
                ntd.addEventListener("click", function () {
                    fetch(`http://localhost:3000/mytasks/${this.nextSibling.innerHTML}`, {
                        method: "DELETE",
                    });
                    console.log(i + " deleted");
                    this.parentElement.classList.add("none");
                    setTimeout(() => {
                        document.querySelectorAll(".containt").forEach((e)=>{
                            e.remove();});
                        gettasks();
                    },
                        800);
                })

                tl.appendChild(contain);
                contain.appendChild(ntd);
                contain.appendChild(nt);
            }
        });
}

newt = document.querySelector("#new");
newp = document.querySelector("#newtask");
newt.addEventListener("click", function () {
    if (newp.classList.contains("disablen")) {
        newp.classList.add("ablen");
        newp.classList.remove("disablen")
        ntn.focus();
    }
})

document.addEventListener("click", function (event) {
    if (!newp.contains(event.target) && !newt.contains(event.target)) {
        newp.classList.remove("ablen");
        newp.classList.add("disablen");
    }
});

function newdone() {
    if (ntn.value.length < 20 && ntn.value != null) {
        newp.classList.remove("ablen");
        newp.classList.add("disablen");
        setTimeout(() => {
            document.querySelectorAll(".containt").forEach((e)=>{
                e.remove();});
            gettasks();
        },
            200);
    }
}

gettasks();