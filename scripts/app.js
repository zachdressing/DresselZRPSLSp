const apiURL = "https://rpslsapi.azurewebsites.net/RPSLS";
let instructButt = document.getElementById('instructionsButton');
let instructImg = document.getElementById('instructionImg');
let bestOf = document.getElementById('bestOf');
let roundsNum = document.getElementById('roundsNum');
let cpuCheck = document.getElementById('vsCPU');
let humCheck = document.getElementById('vsHuman');
let vsType = document.getElementById('vsType');
let onePoints = document.getElementById('onePoints');
let twoPoints = document.getElementById('twoPoints');
let choice1 = document.getElementById('choice1');
let choice2 = document.getElementById('choice2');
let rock = document.getElementById('rock');
let paper = document.getElementById('paper');
let scissors = document.getElementById('scissors');
let lizard = document.getElementById('lizard');
let spock = document.getElementById('spock');

let numofRounds = 0;
const bestofArray = [1, 5, 7, "Tug of War"];
let choices = [];
let totalChoices = 0;

//do my localstorage settings for the type of match
const currentURL = window.location.href;
if (currentURL.includes("index")) {
    localStorage.clear();
    localStorage.setItem("roundsNum", bestofArray[numofRounds]);
};
let vsCPU = localStorage.getItem("vsCPU");

async function ApiCall() {
    fetch("https://rpslsapi.azurewebsites.net/RPSLS")
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            choices.push(data);
            console.log(choices);
        })
}

async function homePage() {
    instructButt.addEventListener('click', e => {
        if (instructImg.src.includes("InstructionText")) { instructImg.src = "./assets/images/Instructions.png" }
        else { instructImg.src = "./assets/images/InstructionText.png" }
    });

    bestOf.addEventListener('click', e => {
        if (numofRounds < bestofArray.length - 1) {
            numofRounds++;
        }
        else if (numofRounds == bestofArray.length - 1) {
            numofRounds = 0;
        }
        roundsNum.textContent = bestofArray[numofRounds];
        localStorage.setItem("roundsNum", bestofArray[numofRounds]);
    })
    cpuCheck.addEventListener('click', e => localStorage.setItem("vsCPU", true));
};



async function iniBattle() {
    totalChoices = 0;
    if (vsCPU) {
        vsType.style.display = "block";
        vsType.textContent = "vs CPU";
    }
    else if (!vsCPU) {
        vsType.style.display = "block";
        vsType.textContent = "vs Human";
    }
    else { console.log("something is wrong") }

    let roundNum = localStorage.getItem("roundsNum");
    roundsNum.textContent = roundNum;

    let ptWin = Math.ceil(roundNum / 2);

    rock.addEventListener('click', e => { if (vsCPU) { ApiCall() }; totalChoices++; choices.push("Rock"); pushChoices(choices); })

    async function pushChoices(choices) {
        choice1.style.display = "block";
        choice2.style.display = "block";
        choice1.src = `../assets/images/${choices[0]}Icon.png`
        console.log(choice1.src);
        console.log(choices[1]);
        choice2.src = `./assets/images/${choices[1]}Icon.png`
        console.log(choice2.src);
    };

    //async function winCheck(ptWin) {
    //    if (onePoints >= ptWin) { }
    //    else if (twoPoints >= ptWin) { }
    //    else { }
    //}
}


//Currently looking at putting all the possible outcomes as hard-coded if statements because of using string values in the choices array.We would need to hard-code it




//Check to see if CPU or Human, Then grab user choice, then if CPU grab API call and then set secondplayer choice as Api output, if human wait for another choice.

//So on click of any of the choices, run a function that saves that choice, then check for CPU. If its CPU then call API and then set choices as images in the middle. Add Points through if statement,
//and then run winCheck.
// If Human, wait for it to be the second choice picked and then set the choices as p1 and p2 choices then add score and wincheck. 