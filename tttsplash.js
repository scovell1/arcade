function main(){
    chooseP = document.querySelector("#person");
    chooseP.addEventListener('click', function(){localStorage["cOrP"] = "person";});
    chooseC = document.querySelector("#computer");
    chooseC.addEventListener('click', (e)=>{e.stopPropagation();showIt()},false);
    chooseC.addEventListener('mouseout', hideIt(),false);
    chooseModeB = document.querySelector("#beginner");
    chooseModeB.addEventListener('click', function(){localStorage["cOrP"] = "computer";localStorage["mode"] = "beginner";});
    chooseModeI = document.querySelector("#intermediate");
    chooseModeI.addEventListener('click', function(){localStorage["cOrP"] = "computer";localStorage["mode"] = "intermediate";});
    chooseModeE = document.querySelector("#expert");
    chooseModeE.addEventListener('click', function(){localStorage["cOrP"] = "computer";localStorage["mode"] = "expert";});
}
function showIt(){
    modeList = document.querySelectorAll(".modeHide");
    for (mode of modeList){
        mode.classList.add("modeShow");
        mode.classList.remove("modeHide");
    }
}
function hideIt(){
    modeList = document.querySelectorAll(".modeShow");
    for (mode of modeList){
        mode.classList.add("modeHide");
        mode.classList.remove("modeShow");
    }
}
main();
    
    