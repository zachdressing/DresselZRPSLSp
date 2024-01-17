const apiURL = "https://rpslsapi.azurewebsites.net/RPSLS";

async function APICall(){
    const promise = await fetch(apiURL);
    const data = await promise.text();
    console.log(data);
}

