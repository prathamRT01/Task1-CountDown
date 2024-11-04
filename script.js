const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const datetimeInput = document.getElementById("datetime");

window.onload = function() {
    const savedDate = getCookie("targetDateTime");
    if (savedDate) {
        const targetDate = new Date(parseInt(savedDate));
        if (targetDate.getTime() > new Date().getTime()) {
            startCountdown(targetDate.getTime());
        } else {
            messageElement.innerHTML = "Time’s up!";
        }
    }
};
// Testing data fetching

console.log(countdownElement);
console.log(messageElement);
console.log(startBtn);
console.log(datetimeInput);

// COOKIE FUNCTIONALITY // 

function setCookie(name, value , days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name){
    let cookieArr = document.cookie.split(";");
    for(let i=0;i<cookieArr.length;i++){
        let cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim()){
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function startCountdown(targetDate){
    const timer = setInterval(()=>{
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "      Time left: ";
            messageElement.innerHTML = "    Time’s up!";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // countdownElement.innerHTML = ;
            let formatter = new Intl.NumberFormat('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            let days1 = formatter.format(days);
            let hours1 = formatter.format(hours);
            let minutes1 = formatter.format(minutes);
            let seconds1 = formatter.format(seconds);
            // console.log(seconds);
            messageElement.innerHTML = `${days1}d ${hours1}h ${minutes1}m ${seconds1}s`;
        }
    },1000);
} 


//  STARTING FUNCTIONALITY //

startBtn.addEventListener("click",()=>{
    const selectedDateTime = new Date(datetimeInput.value).getTime();
    if (isNaN(selectedDateTime)) {
        alert("Please select a valid date and time.");
        return;
    }
    
    closeButton();
    setCookie("targetDateTime", selectedDateTime);
    startCountdown(selectedDateTime);
})







//MODAL FUNCTIONALITY//



const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");

const closeBtn = document.getElementsByClassName("close")[0];

openModalBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    closeButton();
}
function closeButton() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside the modal, close it
// window.onclick = function(event) {
//     if (event.target === modal) {
//         modal.style.display = "none";
//     }
// }
