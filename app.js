
let movies = []
const API = '4a44fb13307675726b6448a7ff9f494a'

value.addEventListener('DOMContentLoaded', async () => {
   getArrayPopularMovies(150)
})

const getArrayPopularMovies = async pages => {
   for (let i = 1; i <= pages; i++) {
      let a = await popularMoviesPage(i).catch(err => console.log(err.message))
      a = a.filter(movie => movie.backdrop_path !== null)
      console.log(a)
      movies = movies.concat(a)
      console.log(movies)
   }
}

const popularMoviesPage = async (page) => {
   const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=en-US&page=${page}`)
   if (res.status !== 200) {
      throw new Error('cannot fetch the data');
   }
   const data = await res.json()
   return data.results
}

const headerTitle = document.querySelector('.header--title')
const titleLoader = document.querySelector('.loader')
const howToPlayScreen = document.querySelector('.how-to-play')

const gameScreen = document.querySelector('.game-screen')
const imagesDiv = document.querySelector('.images')
const imgDiv1 = document.querySelector('.img-div1')
const imgDiv2 = document.querySelector('.img-div2')

const movieTitle = document.querySelector('.movie-title')

let score = 0;
const scoreSpan = document.querySelector('#score')

const loseScreen = document.querySelector('.lose-screen')


// play button 

const playButton = document.querySelector('.play-btn')

playButton.addEventListener('click', async () => {
   howToPlayScreen.classList.add('opac-out')
   headerTitle.classList.add('opac-out')
   setTimeout(() => {
      howToPlayScreen.classList.add('hide')
      headerTitle.classList.add('hide')
      howToPlayScreen.classList.remove('opac-out')
      headerTitle.classList.remove('opac-out')
      titleLoader.classList.remove('hide')
   }, 300)

   setTimeout(() => {
      titleLoader.classList.add('hide')
      displayImagesAndTitle()
   }, 5300)
})


const displayImagesAndTitle = () => {
   randomImageAndTitle(movies)
   setTimeout(() => {
      headerTitle.classList.remove('hide')
      gameScreen.classList.remove('hide')
   }, 200)
}

let correctId;

const randomImageAndTitle = movies => {

   randomMovie = movies.splice(Math.floor(Math.random() * movies.length), 1)[0]

   genreId = randomMovie.genre_ids[0]
   genreMovies = movies.filter(movie => movie.genre_ids[0] === genreId)
   randomMovie2 = genreMovies[Math.floor(Math.random() * genreMovies.length)]

   console.log(randomMovie)

   let img = document.createElement("IMG")
   img.src = `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
   img.id = randomMovie.id

   let img2 = document.createElement("IMG")
   img2.src = `https://image.tmdb.org/t/p/original/${randomMovie2.backdrop_path}`
   img2.id = randomMovie2.id

   const previousImg1 = imgDiv1.querySelector('img')
   const previousImg2 = imgDiv2.querySelector('img')

   if (previousImg1 !== null) imgDiv1.removeChild(previousImg1)
   if (previousImg1 !== null) imgDiv2.removeChild(previousImg2)
   imgDiv1.appendChild(img)
   imgDiv2.appendChild(img2)

   if (Math.random() >= 0.5) {
      correctId = randomMovie2.id
      movieTitle.innerHTML = `"${randomMovie2.title}"`
   } else {
      correctId = randomMovie.id
      movieTitle.innerHTML = `"${randomMovie.title}"`
   }
}



imagesDiv.addEventListener('click', e => {
   console.log(e.target.nodeName)
   if (e.target.nodeName === 'IMG') {
      e.target.classList.add('img-clicked')
      result(parseInt(e.target.id), e.target.parentNode)
   }
})

function result(id, parent) {
   if (id === correctId) {
      parent.querySelector('.svg-right').classList.remove('hide')
      score++

      setTimeout(() => {
         opacOutAndHideGameScreen()
      }, 900)
      setTimeout(() => {
         scoreSpan.innerHTML = score;
         parent.querySelector('.svg-right').classList.add('hide')
         displayImagesAndTitle()
      }, 1400)

   } else {
      parent.querySelector('.svg-wrong').classList.remove('hide')
      loseScreen.querySelector('.lose-screen--score').innerHTML = score;
      score = 0;

      setTimeout(() => {
         opacOutAndHideGameScreen()
      }, 900)

      setTimeout(() => {
         parent.querySelector('.svg-wrong').classList.add('hide')
         scoreSpan.innerHTML = 0;
         loseScreen.classList.remove('hide')
      }, 1300)
   }
}

const playAgainBtn = loseScreen.querySelector('.play-again-btn')

playAgainBtn.addEventListener('click', () => {
   loseScreen.classList.add('opac-out')
   setTimeout(() => {
      loseScreen.classList.add('hide')
      howToPlayScreen.classList.remove('opac-out')
   }, 300)

   setTimeout(() => {
      displayImagesAndTitle()
   }, 300)
})


const opacOutAndHideGameScreen = () => {
   gameScreen.classList.add('opac-out')
   setTimeout(() => {
      gameScreen.classList.add('hide')
      gameScreen.classList.remove('opac-out')
   }, 300)
}
