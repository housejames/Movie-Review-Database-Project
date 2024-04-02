async function newFormHandler(event) {
    event.preventDefault();
    const review_title = document.querySelector('#blogtitle').value;
    const review_content = document.querySelector('#blogcontent').value;
  
    // Send fetch request to add a new dish
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        review_title,
        review_content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        alert("Review Posted!")
        document.location.replace('/')
      } else {
        alert('Post Failed!');
      }
  }
  
  document
    .querySelector('.postform')
    .addEventListener('submit', newFormHandler);
  