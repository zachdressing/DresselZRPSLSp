const apiURL = "https://rpslsapi.azurewebsites.net/RPSLS";
let instructButt = document.getElementById('instructionsButton');
let instructImg = document.getElementById('instructionImg');
let bestOf = document.getElementById('bestOf');
let roundsNum = document.getElementById('roundsNum');
let cpuCheck = document.getElementById('vsCPU');
let humCheck = document.getElementById('vsHuman');
let vsType = document.getElementById('vsType');

let numofRounds = 0;

let vsCPU = false;

const bestofArray = [1, 5, 7];
const choices = [];

async function APICall() {
    const promise = await fetch(apiURL);
    const data = await promise.text();
    console.log(data);
}

instructButt.addEventListener('click', e => {
    if (instructImg.src.includes("InstructionText")) { instructImg.src = "./assets/images/Instructions.png" }
    else { instructImg.src = "./assets/images/InstructionText.png" }
});

bestOf.addEventListener('click', e =>{
    if(numofRounds < bestofArray.length-1){
        numofRounds++;
    }
    else if(numofRounds == 2){
        numofRounds = 0;
    }
    roundsNum.textContent = bestofArray[numofRounds];
})

cpuCheck.addEventListener('click', e => vsCPU = true, console.log(vsCPU));


function iniBattle(){
    if(vsCPU){
        vsType.style.display = "block";
        vsType.textContent = "vs CPU";
    }
    else if(!vsCPU){
        vsType.style.display = "block";
        vsType.textContent = "vs Human";
    }
    else{console.log("something is wrong")}
}