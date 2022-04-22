import TVShowApp from "../App";

const reservationModal = async (show) =>{
    // modal container
    const modalContainer = document.getElementById('reservation-popUp');

    // boxshadow child of modal container
    const backshadow = document.createElement('div');
    backshadow.className = 'backshadow';

    // modal child of backshadow
    const modal = document.createElement('div');
    modal.className = 'modal';

    // child of modal
    const imgDiv = document.createElement('div');
    imgDiv.className = 'img-div';

    // child of imgDiv
    const commentModalImg = document.createElement('img');
    commentModalImg.src = show.image;
    commentModalImg.setAttribute('alt',"moview-image");
    imgDiv.appendChild(commentModalImg);

    // child of modal
    const title = document.createElement('h3');
    title.textContent = show.title;
    title.className = 'movie-title';

    // child of modal
    const details = document.createElement('div');
    details.className = 'movie-details';

    // children of details
    const genre = document.createElement('span');
    genre.textContent = show.genres[0];

    const language = document.createElement('span');
    language.textContent = show.language;

    // details appending its children
    details.appendChild(genre);
    details.appendChild(language);

    // child of modal
    const cross = document.createElement('i');
    cross.className = 'fa-solid fa-xmark fa-xl cross';

    cross.addEventListener('click',()=>{
      backshadow.style.display = 'none';
    })


  //-------------

  const reservationtForm = document.createElement('form');
  reservationtForm.className = 'form-group comment-form';

  const nameInput = document.createElement('input');
  nameInput.type ='text';
  nameInput.className='form-control custom-inputs userName';
  nameInput.placeholder = 'Enter your name';
  reservationtForm.appendChild(nameInput);

  const startDateInput = document.createElement('input');
  startDateInput.type ='date';
  startDateInput.className='form-control custom-inputs startDate';
  startDateInput.placeholder = 'Start date';
  reservationtForm.appendChild(startDateInput);

  const endDateInput = document.createElement('input');
  endDateInput.type ='date';
  endDateInput.className='form-control custom-inputs endDate';
  endDateInput.placeholder = 'End date';
  reservationtForm.appendChild(endDateInput);

  const reservationtBtn = document.createElement('button');
  reservationtBtn.className = 'btn btn-success btn-md';
  reservationtBtn.textContent = 'Reserve';
  reservationtForm.appendChild(reservationtBtn);

  //---------- Display reservation

    const response = await TVShowApp.getReservations(show.id);
    const reservationList = document.createElement('ul');
    console.log(response);
    if (response.length > 0) {
      response.forEach(reservation => {
        const listItem = document.createElement('li');
        listItem.textContent = `From: ${reservation.date_start} To: ${reservation.date_end} UserName: ${reservation.username}`
        reservationList.appendChild(listItem);
      });
    }else{
      const listItem = document.createElement('li');
        listItem.textContent = `No Reservations exist for this show`
        reservationList.appendChild(listItem);
    }

    reservationtForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const myUserName = document.querySelector('.userName');
      const myStartDate = document.querySelector('.startDate');
      const myEndDate = document.querySelector('.endDate');
    
        const ReserveResponse =  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bPjiahSZ0zVQqd4kdfjM/reservations?item_id=${show.id}`, {
          method: 'POST',
          body: JSON.stringify({
            item_id : show.id,
            username : myUserName.value.trim(),
            date_start : myStartDate.value.trim(),
            date_end : myEndDate.value.trim()
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then(response => response)
      .then(() => {
        myUserName.value = '';
        myStartDate.value = '';
        myEndDate.value = '' 
      }) 
      })
    
    
    // child of modal
    const reservationHeading = document.createElement('h5');
    reservationHeading.textContent = `Reservations(${response.length})`;
    reservationHeading.className = 'comments-heading';

    // child of modal
    

    // modal appending its children
    modal.appendChild(imgDiv);
    modal.appendChild(title);
    modal.appendChild(details);
    modal.appendChild(cross);
    modal.appendChild(reservationHeading);
    modal.appendChild(reservationList);
    modal.appendChild(reservationtForm);

    // backshadow appending modal
    backshadow.appendChild(modal);

    // modal container appending backshadow
    modalContainer.appendChild(backshadow);
}

export default reservationModal;