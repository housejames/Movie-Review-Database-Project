// Adds an event-listener to all review's edit button
let editReview = document.querySelectorAll('.titlebtn')
for (let i = 0; i < editReview.length; i++) {
  editReview[i].addEventListener('click', interactId)
}

// Function to grab the most recent interacted review id
function interactId(event) {
    let review_id = event.target.id
    let interactedId = review_id.slice(13)
  
    let interactedReviw = document.querySelector(`#interact${interactedId}`).textContent
  
    let star1 = document.querySelector(`#star1-${interactedId}`)
    let star2 = document.querySelector(`#star2-${interactedId}`)
    let star3 = document.querySelector(`#star3-${interactedId}`)
    let star4 = document.querySelector(`#star4-${interactedId}`)
    let star5 = document.querySelector(`#star5-${interactedId}`)
  
    if (interactedReviw == 5) {
      star1.checked = true
      star2.checked = true
      star3.checked = true
      star4.checked = true
      star5.checked = true
    } else if (interactedReviw == 4) {
      star1.checked = true
      star2.checked = true
      star3.checked = true
      star4.checked = true
    } else if (interactedReviw == 3) {
      star1.checked = true
      star2.checked = true
      star3.checked = true
    } else if (interactedReviw == 4) {
      star1.checked = true
      star2.checked = true
    } else {
      star1.checked = true
    }
  }