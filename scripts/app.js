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

const currentURL = window.location.href;
if (currentURL.includes("index")) {
    localStorage.clear();
    localStorage.setItem("roundsNum", bestofArray[numofRounds]);
};
let vsCPU = localStorage.getItem("vsCPU");

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

function iniBattle() {
    const RockWin = ["Scissors", "Lizard"];
    const PaperWin = ["Rock", "Spock"];
    const ScissorsWin = ["Paper", "Lizard"];
    const LizardWin = ["Spock", "Paper"];
    const SpockWin = ["Rock", "Scissors"];

    let p1Choice;
    let p2Choice;
    let totalChoices = 0;
    let p1Points = 0;
    let p2Points = 0;

    let roundNum = localStorage.getItem("roundsNum");
    roundsNum.textContent = roundNum;

    let ptWin = Math.ceil(roundNum / 2);

    if (vsCPU) {
        vsType.style.display = "block";
        vsType.textContent = "vs CPU";
    }
    else if (!vsCPU) {
        vsType.style.display = "block";
        vsType.textContent = "vs Human";
    }

    async function ApiCall() {
        let response = await fetch("https://rpslsapi.azurewebsites.net/RPSLS");
        let output = await response.text();
        p2Choice = output;
    }

    async function onClickCPU(choice) {
        await ApiCall();
        p1Choice = `${choice}`;
        pushChoices();
        winCheck();
    }

    async function onClickHum(choice) {
        totalChoices == 0 ? (p1Choice = `${choice}`, totalChoices++) : (p2Choice = `${choice}`, pushChoices(), winCheck(), totalChoices--)
    }

    rock.addEventListener('click', async () => {
        vsCPU ? onClickCPU("Rock") : onClickHum("Rock")
    })

    paper.addEventListener('click', async () => {
        vsCPU ? onClickCPU("Paper") : onClickHum("Paper");
    })

    scissors.addEventListener('click', async () => {
        vsCPU ? onClickCPU("Scissors") : onClickHum("Scissors");
    })

    lizard.addEventListener('click', async () => {
        vsCPU ? onClickCPU("Lizard") : onClickHum("Lizard");
    })

    spock.addEventListener('click', async () => {
        vsCPU ? onClickCPU("Spcok") : onClickHum("Spock");

    })

    function pushChoices() {
        choice1.style.display = "block";
        choice2.style.display = "block";
        choice1.src = `/assets/images/${p1Choice.toLowerCase()}Icon.png`
        choice2.src = `/assets/images/${p2Choice.toLowerCase()}Icon.png`
    };

    function winCheck() {
        if (p1Choice == 'Rock') {
            if (RockWin.includes(p2Choice)) {
                p1Points++;
            }
            else if (!RockWin.includes(p2Choice) && p1Choice !== p2Choice) {
                p2Points++;
            }
        }

        if (p1Choice == 'Paper') {
            if (PaperWin.includes(p2Choice)) {
                p1Points++;
            }
            else if (!PaperWin.includes(p2Choice) && p1Choice !== p2Choice) {
                p2Points++;
            }
        }

        if (p1Choice == 'Scissors') {
            if (ScissorsWin.includes(p2Choice)) {
                p1Points++;
            }
            else if (!ScissorsWin.includes(p2Choice) && p1Choice !== p2Choice) {
                p2Points++;
            }
        }

        if (p1Choice == 'Lizard') {
            if (LizardWin.includes(p2Choice)) {
                p1Points++;
            }
            else if (!LizardWin.includes(p2Choice) && p1Choice !== p2Choice) {
                p2Points++;
            }
        }

        if (p1Choice == 'Spock') {
            if (SpockWin.includes(p2Choice)) {
                p1Points++;
            }
            else if (!SpockWin.includes(p2Choice) && p1Choice !== p2Choice) {
                p2Points++;
            }
        }

        onePoints.innerText = `${p1Points} Point(s)`;
        twoPoints.innerHTML = `${p2Points} Point(s)`;
        onePoints.style.display = 'block';
        twoPoints.style.display = 'block';

        if (p1Points >= ptWin) {
            onePoints.innerHTML = 'Player One Wins';
            twoPoints.style.display = 'none';
        }
        else if (p2Points >= ptWin) {
            twoPoints.innerHTML = 'Player Two Wins';
            onePoints.style.display = 'none';
        }
        if(p1Points >= ptWin || p2Points >= ptWin){
            rock.style.display = 'none';
            paper.style.display = 'none';
            scissors.style.display = 'none';
            lizard.style.display = 'none';
            spock.style.display = 'none';
        }
        console.log(p1Choice);
        console.log(p2Choice)
    }
}