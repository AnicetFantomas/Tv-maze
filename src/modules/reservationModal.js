import TVShowApp from "../App";

const reservationModal = async (show) => {
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
  commentModalImg.setAttribute('alt', "moview-image");
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

  cross.addEventListener('click', () => {
    backshadow.style.display = 'none';
  })


  // child of modal
  // fetching involvment API
  let reservationContainer;
  let reserveHeading;
  let response = await TVShowApp.getReservations(show.id);
  function printData() {
    console.log('function triggered');
    if (response.length > 0) {
      reservationContainer = document.createElement('div');
      reservationContainer.className = 'comments-container';
      response.forEach((reservation) => {
        const reserve = document.createElement('p');
        reserve.className = 'comment';
        reserve.textContent = `From: ${reservation.date_start} To: ${reservation.date_end} UserName: ${reservation.username}`;
        reservationContainer.appendChild(reserve);
      })
      reserveHeading = document.createElement('h5');
      reserveHeading.className = 'comments-heading';
      reserveHeading.textContent = `Reservations (${response.length})`;
    }
    else {
      reservationContainer = document.createElement('div');
      reservationContainer.className = 'comments-container';
      reservationContainer.textContent = 'No reservation found';
      reserveHeading = document.createElement('h5');
      reserveHeading.className = 'comments-heading';
      reserveHeading.textContent = 'Reservation (0)';
    }
  }
  printData();

  //-------------

  const reservationtForm = document.createElement('form');
  reservationtForm.className = 'form-group comment-form';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'form-control custom-inputs userName';
  nameInput.placeholder = 'Enter your name';
  reservationtForm.appendChild(nameInput);

  const startDateInput = document.createElement('input');
  startDateInput.type = 'date';
  startDateInput.className = 'form-control custom-inputs startDate';
  startDateInput.placeholder = 'Start date';
  reservationtForm.appendChild(startDateInput);

  const endDateInput = document.createElement('input');
  endDateInput.type = 'date';
  endDateInput.className = 'form-control custom-inputs endDate';
  endDateInput.placeholder = 'End date';
  reservationtForm.appendChild(endDateInput);

  const reservationtBtn = document.createElement('button');
  reservationtBtn.className = 'btn btn-success btn-md';
  reservationtBtn.textContent = 'Reserve';
  reservationtForm.appendChild(reservationtBtn);

  //---------- Display reservation---------

  reservationtForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const myUserName = document.querySelector('.userName');
    const myStartDate = document.querySelector('.startDate');
    const myEndDate = document.querySelector('.endDate');

    const ReserveResponse = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bPjiahSZ0zVQqd4kdfjM/reservations', {
      method: 'POST',
      body: JSON.stringify({
        item_id: show.id,
        username: myUserName.value,
        date_start: myStartDate.value,
        date_end: myEndDate.value
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

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
              reservationContainer = document.createElement('div');
              reservationContainer.className = 'comments-container';
              response.forEach((reservation) => {
                const reserve = document.createElement('p');
                reserve.className = 'comment';
                reserve.textContent = `From: ${reservation.date_start} To: ${reservation.date_end} UserName: ${reservation.username}`;
                reservationContainer.appendChild(reserve);
              })
              reserveHeading = document.createElement('h5');
              reserveHeading.className = 'comments-heading';
              reserveHeading.textContent = `Reservations (${response.length})`;
            }

            reserveHeading = document.createElement('h5');
            reserveHeading.textContent = `Reservations(${response.length})`;
            reserveHeading.className = 'comments-heading';

            modal.innerHTML = "";

            modal.appendChild(imgDiv);
            modal.appendChild(title);
            modal.appendChild(details);
            modal.appendChild(cross);
            modal.appendChild(reserveHeading);
            modal.appendChild(reservationContainer);
            modal.appendChild(reservationtForm);

          }
        };
        xhttp.open("GET", `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bPjiahSZ0zVQqd4kdfjM/reservations?item_id=${show.id}`, true);
        xhttp.send();
      })
  })

  // modal appending its children
  modal.appendChild(imgDiv);
  modal.appendChild(title);
  modal.appendChild(details);
  modal.appendChild(cross);
  modal.appendChild(reserveHeading);
  modal.appendChild(reservationContainer);
  modal.appendChild(reservationtForm);

  // backshadow appending modal
  backshadow.appendChild(modal);

  // modal container appending backshadow
  modalContainer.appendChild(backshadow);
}

export default reservationModal;