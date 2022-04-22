import TVShowApp from './App.js';
import commentModal from './modules/commentModal.js';
import reservationModal from './modules/reservationModal.js';
export default class Renderer{

    static displayShows (shows) {
      const movieList = document.querySelector('.show-list');
      movieList.innerHTML = "";

      for(let i = 0;i < shows.length;i++) {
        movieList.innerHTML += `<li class='show-item'>
            <figure>
                <img src='${shows[i].image}'>
                <figcaption>${shows[i].title}
                  <img class='likebutton' src='https://img.icons8.com/ios-filled/50/000000/hearts.png'>
                  <span id='likes_${shows[i].id}'>${shows[i].likes} ${shows[i].likes <= 1 ? 'Like':'Likes'}</span>
                </figcaption>
                <button id='comment_${shows[i].id}' class='btn btn-primary btn-md card-comment-btn comments'>Comments</button>
                <button id='reservation_${shows[i].id}' class='btn btn-primary btn-md card-comment-btn reservations'>Reservations</button>
            </figure>
        </li>`
      }

      document.querySelector('.show-count').innerHTML = `Number of Shows: ${shows.length}`;
      document.querySelectorAll('.comments').forEach((commentBtn, i) => commentBtn.addEventListener('click', (ev) => {
        // commentModal(shows[ev.target.id.split('_')[1]])
        // console.log(ev.target.id.split('_')[1])
        commentModal(shows[i])
      }));

      document.querySelectorAll('.reservations').forEach((reservationBtn, i) => reservationBtn.addEventListener('click', (ev) => {
        //ev.target.id.split('_')[1]
        reservationModal(shows[i])
      }));

      document.querySelectorAll('.likebutton').forEach((likeBtn, i) => likeBtn.addEventListener('click', (ev) => {
        TVShowApp.like(shows[i].id);
      }));
    }

    static updateLike(showId, currentLikes) {
        const likeSpan = document.querySelector(`#likes_${showId}`);
        likeSpan.textContent = `${currentLikes} ${currentLikes <= 1?'Like':'Likes'}`;
    }
}
