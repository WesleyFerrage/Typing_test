const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// variavel global, capturar os minutos / segundos / centésimos / milésimos
timer = [0,0,0,0];
var interval;
var timerRunning = false;

function leadingZero(time) {
    if(time <= 9 ){
        time = "0" + time;
    }
    return time;
}

// Executa o timer para minuto / segundo / centésimos 
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Faz a comparação com o texto digitado se é o mesmo da página.
function speliCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered == originText) {
        timerRunning = true;
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890"; // Se completar a digitaçaõ do texto a borda vai ficar verde.
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3"; // Se a string correponder a borda ficara azul.
        } else {
            testWrapper.style.borderColor = "#E95D0F"; // Se tiver um erro de digitação a vorda fica laranja.
        }
    }
}

// Começa a contagem no cronometro 
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}
  
// Recomeça
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0]; // Voltando o valor do Array em 0
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00"; // Retornando ao padrão
    testWrapper.style.boderColor = "grey";
}

// Eventos e o botão de recomeçar
testArea.addEventListener("keypress", start, false); // Quando a primeira tecla ser precionada.
testArea.addEventListener("keyup", speliCheck, false); // Quando termina de precionar a tecla.
resetButton.addEventListener("click", reset, false); // Apos clicar no botão