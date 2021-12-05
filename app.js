let dob = document.querySelector('#dob');
let btnCheck = document.querySelector('#btn-check');
let isPalindromeMsg = document.querySelector('#is-palindrome-msg');
let notPalindromeMsg = document.querySelector('#not-palindrome-msg');
let invalidInput = document.querySelector('#invalid-input');


let isPalindrome = (word) => {
    if(word.length === 0 || word.length === 1){
        return true;
    }
    let i =0;
    let j = word.length - 1;

    while(i<j){
        if(word[i] !== word[j]){
            return false;
        }
        i += 1;
        j -= 1;
    }
    return true;
}

let convertDateToStr = (date) => {
    let dateStr = {day:'',month:'',year:''}

    if(date.day<10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    if(date.month<10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

let getAllDateFormats = (date) =>{
    dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy =  dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    let allDates = [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
    return allDates;

}

let anyPalindromeFound = (date) => {
    let allDates = getAllDateFormats(date);
    for(date of allDates){
        if(isPalindrome(date)){
            console.log(date);
            return true;
        }
    }
    return false;
}


let isPalindromeOutput = () => {
    let correctedDateArr = [null,null,null]
    let k = 2;
    dob.value.split('-').map(num => {
        correctedDateArr[k] = num;
        k-=1;
    });
    correctedDob = '';
    correctedDateArr.forEach( num =>{
        correctedDob += num;
    });
    dobString = correctedDob;
    if(dob.value === ''){
        invalidInput.style.display = 'block';
        return
    }

    invalidInput.style.display = 'none';
    if(isPalindrome(dobString)){
        notPalindromeMsg.style.display = 'none';
        isPalindromeMsg.style.display = 'block';
    }else{
        isPalindromeMsg.style.display = 'none';
        notPalindromeMsg.style.display = 'block';
    }
}

let isLeapYear = (year) =>{
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

let getNextDate = (date) => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month += 1;
            }
        }else{
            if(day>28){
                day = 1;
                month += 1;
            }
        }
    }
    else{
        if(day>daysInMonth[month - 1]){
            day = 1
            month += 1;
        }
    }

    if(month>12){
        month = 1;
        year += 1;
    }

    return {
        day: day,
        month: month,
        year : year
    };
}

let getNextPalindrome = (date) => {
   let daysToPalindrome = 0;
    
   while(true){
    daysToPalindrome+=1
    date = getNextDate(date);
    if(anyPalindromeFound(date)){
        return [daysToPalindrome,date]
    }
   }
}

let finalOutput = ()=>{
    let dateStr = dob.value.split('-'); 
    if(dob.value === '' || dob.value === null){
        invalidInput.style.display = 'block';
        return
    }
    let date = {
    day: Number(dateStr[2]),
    month: Number(dateStr[1]),
    year: Number(dateStr[0])
    };

    if(anyPalindromeFound(date)){
        invalidInput.style.display = 'none';
        notPalindromeMsg.style.display = 'none';
        isPalindromeMsg.style.display = 'block';

    }else{
        let results = getNextPalindrome(date);
        let nextPalindromeDateStr = convertDateToStr(results[1]);
        let nextPalindromeDate = `${nextPalindromeDateStr.day}-${nextPalindromeDateStr.month}-${nextPalindromeDateStr.year}`
        console.log('----');
        console.log(date);
        console.log(results);
        console.log('----');
        invalidInput.style.display = 'none';
        isPalindromeMsg.style.display = 'none';
        let numDays = results[0] === 1 ? 'day' : 'days'
        let notPalindromeMsgText = `Your Birthdate is not a palindrome. The next palindrome is on ${nextPalindromeDate} after ${results[0]} ${numDays}.`
        notPalindromeMsg.style.display = 'block';
        notPalindromeMsg.innerText = notPalindromeMsgText;
    }
}

btnCheck.addEventListener('click',finalOutput);