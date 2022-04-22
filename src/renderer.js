import TVShowApp from './App.js';
import commentModal from './modules/commentModal.js';
import reservationModal from './modules/reservationModal.js';
export default class Renderer{
    static displayShows(shows) {
        const movieList = document.querySelector('.show-list');
        movieList.innerHTML = "";
        for(let i = 0;i < shows.length;i++) {

          const li = document.createElement("li");
          li.className = 'show-item';
          const figure = document.createElement('figure');

          const img = document.createElement('img');
          img.src = shows[i].image;
          const figCaption = document.createElement('figcaption');
          figCaption.textContent = shows[i].title;
          const figCaptionImg = document.createElement('img');
          figCaptionImg.src = 'https://img.icons8.com/ios-filled/50/000000/hearts.png';
          figCaptionImg.className = 'likebutton';
          figCaption.appendChild(figCaptionImg);

          const likespan = document.createElement('span');
          likespan.id = `likes_${shows[i].id}`
          likespan.textContent = `${shows[i].likes} likes`;
          figCaption.appendChild(likespan);

          const button = document.createElement('button');
          button.textContent = 'Comments';
          button.className = 'btn btn-primary btn-md card-comment-btn';
          const reservationBtn = document.createElement('button');
          reservationBtn.textContent = 'Reservations';
          reservationBtn.className = 'btn btn-primary btn-md card-comment-btn';

          button.onclick = () =>{
             commentModal(shows[i]);
          }

          figCaptionImg.onclick = () => {
            TVShowApp.like(shows[i].id);
          }

          reservationBtn.onclick = () => {
             reservationModal(shows[i])
          }

          figure.appendChild(img);
          figure.appendChild(figCaption);
          figure.appendChild(button);
          figure.appendChild(reservationBtn);
         
          li.appendChild(figure);
          movieList.appendChild(li);
        }
    }

    static updateLike(showId, currentLikes) {
        const likeSpan = document.querySelector(`#likes_${showId}`);
        likeSpan.textContent = `${currentLikes} likes`;
    }
}
