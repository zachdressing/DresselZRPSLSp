const apiURL = "https://rpslsapi.azurewebsites.net/RPSLS";
let instructButt = document.getElementById('instructionsButton');
let instructImg = document.getElementById('instructionImg');

const bestofArray = [1, 3, 7];

async function APICall() {
    const promise = await fetch(apiURL);
    const data = await promise.text();
    console.log(data);
}

instructButt.addEventListener('click', e => {
    console.log(instructImg.src)
    if (instructImg.src.includes("InstructionText")) { instructImg.src = "./assets/images/Instructions.png" }
    else { instructImg.src = "./assets/images/InstructionText.png" }
});
