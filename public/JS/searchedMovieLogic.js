
rating = document.querySelectorAll('.rating')
let average = 0;
// let average = parseInt(average)
console.log(typeof average)
for(let i = 0; i < rating.length; i++ ){
    reviewrating = rating[i].id
    reviewrating = parseInt(reviewrating)
    console.log(typeof reviewrating)
    average = average + reviewrating
    console.log(rating[i])
    if(reviewrating === 5){
        rating[i].textContent = `☆ ☆ ☆ ☆ ☆`
        rating[i].style.color = "#7951AC"
    }else if (reviewrating === 4){
        rating[i].textContent = `☆ ☆ ☆ ☆`
        rating[i].style.color = "#22885E"
    }else if (reviewrating === 3){
        rating[i].textContent = `☆ ☆ ☆`
        rating[i].style.color = "#9F7E18"
    }else if (reviewrating === 2){
        rating[i].textContent = `☆ ☆`
        rating[i].style.color = "#99542D"
    }else {
        rating[i].textContent = `☆`
        rating[i].style.color = "#A23C3C"
    }
}
average = average / rating.length
document

let averageText = document.querySelector('.average-rating')
if(average === 5){
    averageText.textContent = `User Average: ☆ ☆ ☆ ☆ ☆`
    averageText.style.color = "#7951AC"
}else if (average >= 4){
    averageText.textContent = `User Average: ☆ ☆ ☆ ☆`
    averageText.style.color = "#22885E"
}else if (average >= 3){
    averageText.textContent = `User Average: ☆ ☆ ☆`
    averageText.style.color = "#9F7E18"
}else if (average = 2){
    averageText.textContent = `User Average: ☆ ☆`
    averageText.style.color = "#99542D"
}else {
    averageText.textContent = `User Average: ☆`
    averageText.style.color = `#A23C3C`
}

// let userStarts = document.querySelector('.rating')
// if(average === 5){
//     averageText.textContent = `User Average: ⭐⭐⭐⭐⭐`
// }else if (average === 4){
//     averageText.textContent = `User Average: ⭐⭐⭐⭐`
// }else if (average === 3){
//     averageText.textContent = `User Average: ⭐⭐⭐`
// }else if (average === 2){
//     averageText.textContent = `User Average: ⭐⭐`
// }else {
//     averageText.textContent = `User Average: ⭐`
// }

console.log(average)