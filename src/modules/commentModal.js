const commentModal = (show) =>{
    // modal container
    const modalContainer = document.getElementById('modal-container');

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
    commentModalImg.src = show.image.medium;
    commentModalImg.setAttribute('alt',"moview-image");
    imgDiv.appendChild(commentModalImg);

    // child of modal
    const title = document.createElement('h3');
    title.textContent = show.name;
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

    // child of modal
    const commentsHeading = document.createElement('h5');
    commentsHeading.textContent = 'Comments (2)';
    commentsHeading.className = 'comments-heading';

    // child of modal
    const commentForm = document.createElement('form');
    commentForm.className = 'form-group comment-form';

    const nameInput = document.createElement('input');
    nameInput.type ='text';
    nameInput.className='form-control custom-inputs';
    nameInput.placeholder = 'Your Name';
    commentForm.appendChild(nameInput);

    const insightInput = document.createElement('input');
    insightInput.type ='text';
    insightInput.className='form-control custom-inputs';
    insightInput.placeholder = 'Your Insights';
    commentForm.appendChild(insightInput);

    const commentBtn = document.createElement('button');
    commentBtn.className = 'btn btn-success btn-md';
    commentBtn.textContent = 'Comment';
    commentForm.appendChild(commentBtn);

    // modal appending its children
    modal.appendChild(imgDiv);
    modal.appendChild(title);
    modal.appendChild(details);
    modal.appendChild(cross);
    modal.appendChild(commentsHeading);
    modal.appendChild(commentForm);

    // backshadow appending modal
    backshadow.appendChild(modal);

    // modal container appending backshadow
    modalContainer.appendChild(backshadow);
}

export default commentModal;