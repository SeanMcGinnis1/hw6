// First, sign up for an account at https://themoviedb.org
// Once verified and signed-in, go to Settings and create a new
// API key; in the form, indicate that you'll be using this API
// key for educational or personal use, and you should receive
// your new key right away.

// For this exercise, we'll be using the "now playing" API endpoint
// https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US

// Note: image data returned by the API will only give you the filename;
// prepend with `https://image.tmdb.org/t/p/w500/` to get the 
// complete image URL

window.addEventListener('DOMContentLoaded', async function(event) {
  // Step 1: Construct a URL to get movies playing now from TMDB, fetch
  // data and put the Array of movie Objects in a variable called
  // movies. Write the contents of this array to the JavaScript
  // console to ensure you've got good data
  // ⬇️ ⬇️ ⬇️
    let apiKey = `23a3109b4d61d65c03ba0b27129626dd`
    response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US`)
    json = await response.json()
    console.log(json)
    let db = firebase.firestore()
  // ⬆️ ⬆️ ⬆️ 
  // End Step 1
  
  // Step 2: 
  // - Loop through the Array called movies and insert HTML
  //   into the existing DOM element with the class name .movies
  // - Include a "watched" button to click for each movie
  // - Give each "movie" a unique class name based on its numeric
  //   ID field.
  // Some HTML that would look pretty good... replace with real values :)
  // <div class="w-1/5 p-4 movie-abcdefg1234567">
  //   <img src="https://image.tmdb.org/t/p/w500/moviePosterPath.jpg" class="w-full">
  //   <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  // </div>
  // ⬇️ ⬇️ ⬇️
  let movie = document.querySelector('.movies')
  let querySnapshot = await db.collection('items').get()
  let movies = querySnapshot.docs
  // for (let i=0; i<movies.length; i++) {
  //   let movie = movies[i].data()
  //   console.log(movie.id)
  // }


  for (let i=0; i<json.results.length; i++) {
    movie.insertAdjacentHTML('beforeend',`
  
  <div class="w-1/5 p-4 movie-${json.results[i].id}">
     <img src="https://image.tmdb.org/t/p/w500/${json.results[i].backdrop_path}" class="w-full">
     <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
  </div>
  `)
    for (j=0; j < querySnapshot.size; j++) {
      console.log(movies[j].id)
      console.log(json.results[i].id)
      let movie = movies[j].data()
      console.log(movie.id)
      if (movie.id == json.results[i].id) {
        document.querySelector(`.movie-${json.results[i].id}`).classList.add('opacity-20')
      }
    }
  }


 

  

  // ⬆️ ⬆️ ⬆️ 
  // End Step 2

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️

  for (let i=0; i<json.results.length;i++) {
    document.querySelector(`.movie-${json.results[i].id} .watched-button`).addEventListener('click', async function(event) {
      event.preventDefault()
      console.log(json.results[i].original_title)
      document.querySelector(`.movie-${json.results[i].id}`).classList.add('opacity-20')

      let docRef = await db.collection('items').add({
        id: `${json.results[i].id}`
      })
  })}

  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.
})