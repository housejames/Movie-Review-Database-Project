
rating = document.querySelectorAll('.rating')
let average = 0;
// let average = parseInt(average)
for(let i = 0; i < rating.length; i++ ){
    // Replaces the rating for each review with accurante star count and color
    reviewrating = rating[i].id
    reviewrating = parseInt(reviewrating)
    average = average + reviewrating
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

// Adds the average to the top of the page
average = average / rating.length
let averageText = document.querySelector('.average-rating')
if(average === 5){
    averageText.textContent = `Average Rating: ☆ ☆ ☆ ☆ ☆`
    averageText.style.color = "#7951AC"
}else if (average >= 4){
    averageText.textContent = `Average Rating: ☆ ☆ ☆ ☆`
    averageText.style.color = "#22885E"
}else if (average >= 3){
    averageText.textContent = `Average Rating: ☆ ☆ ☆`
    averageText.style.color = "#9F7E18"
}else if (average >= 2){
    averageText.textContent = `Average Rating: ☆ ☆`
    averageText.style.color = "#99542D"
}else if (average >= 1) {
    averageText.textContent = `Average Rating: ☆`
    averageText.style.color = `#A23C3C`
}else {
    averageText.textContent = `No reviews yet`
}