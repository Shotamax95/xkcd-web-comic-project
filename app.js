// display (title, date, img)
const titles = document.getElementById('titleApi');
const imgs = document.getElementById('imgApi');
const dates = document.getElementById('dateApi');
//button
const randomBtn = document.getElementById('randomBtn');
const searchBtn = document.getElementById('searchBtn');
// input
const textNum = document.getElementById('searchNum');

var request = false;
var data;

// request
function getRequestObject() {
    try {
       request = new XMLHttpRequest();
    }
    catch (requestError) {
       return false;
    }
    return request;
}

// result
function getResults(comicId) {
    const url = 'https://the-ultimate-api-challenge.herokuapp.com/https://xkcd.com';
    comicId = comicId ? '/' + comicId : '' ;
    const format = 'info.0.json';
    const requestUrl = `${url}${comicId}/${format}`;

    if (!request) {
       request = getRequestObject();
    }
    request.abort();
    request.open("get",requestUrl , true);
    request.send();
    request.onreadystatechange = displaySuggestions;
}

// display
function displaySuggestions() {
    
    if(request.readyState === 4 && request.status === 200) {
        data = JSON.parse(request.responseText);

        // title
        titles.innerHTML = `Title:  ${data.title}`;
        // date
        dates.innerHTML = `Created: ${data.month}/${data.day}/${data.year}`;
        // img
        imgs.src = data.img;
        imgs.alt = data.alt;

        //// for make sure    
        console.log(data.num);
        console.log(data);
    }
}


const previousBtn = document.getElementById('previousBtn')
const nextBtn = document.getElementById('nextBtn')

// previous img
function backImg(){
    const minus = data.num - 1;
    if(minus <= 1){
        alert("Minimum Number!")
    }
    return getResults(minus);
}
// next img
function nextImg(){
    const plus = data.num +1;
    console.log(plus);
    if(plus >= 2530){
        alert("Maximum Number!")
    }
    
    return getResults(plus);
}
previousBtn.addEventListener("click", backImg);
nextBtn.addEventListener("click", nextImg);

// set max(current) number
// function maxNum(){
//     const currentNum = getResults().data.num;
//     return currentNum;
// }
// range of random number
function rangeOfRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// random number generator
function generateRandomNum(){
    const randomNum = rangeOfRandomNum(1, 2530);
    const getRandom = getResults(randomNum);
    return getRandom;
}

// search
function searchNum(e){
    e.preventDefault();
    const numberValue = parseInt(textNum.value);
    const setNum = getResults(numberValue);
    console.log(numberValue, typeof numberValue);
    if(numberValue >= 2531 || numberValue <= 0){
        alert("The comic id does not exist! Please try again.")
    }
    textNum.value = '';
    return setNum;
}

// event
searchBtn.addEventListener("click", searchNum);
randomBtn.addEventListener("click", generateRandomNum);
window.addEventListener("load",getResults(), false);