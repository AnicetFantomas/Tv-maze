const commentModal = async(show) =>{

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
    commentModalImg.src = show.image;
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
    console.log(show);
    genre.textContent = show.genre[0];

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
    // fetching involvment API
    let commentsContainer;
    let commentsHeading;
    const request = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bPjiahSZ0zVQqd4kdfjM/comments?item_id=${show.id}`);
    const response = await request.json();
    if(response.length > 0){
        response.forEach((data)=>{
        commentsContainer = document.createElement('div');
        commentsContainer.className = 'comments-container';
        const comment = document.createElement('p');
        comment.className = 'comment';
        comment.textContent = `${data.creation_date} ${data.username} ${data.comment}`
        commentsContainer.appendChild(comment);
      })
      commentsHeading = document.createElement('h5');
      commentsHeading.className = 'comments-heading';
      commentsHeading.textContent = `Comments (${response.length})`;
    }
    else{
      console.log('no response');
      commentsContainer = document.createElement('div');
      commentsContainer.className = 'comments-container';
      commentsContainer.textContent = 'No comments found';
      commentsHeading = document.createElement('h5');
      commentsHeading.className = 'comments-heading';
      commentsHeading.textContent = 'Comments (0)';
    }

    // child of modal
    const commentForm = document.createElement('form');
    commentForm.className = 'form-group comment-form';

    commentForm.addEventListener('submit',(e)=>{
      e.preventDefault();
    })

    const nameInput = document.createElement('input');
    nameInput.type ='text';
    nameInput.className='form-control custom-inputs';
    nameInput.placeholder = 'Your Name';
    commentForm.appendChild(nameInput);

    const insightInput = document.createElement('textarea');
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
    modal.appendChild(commentsContainer);
    modal.appendChild(commentForm);

    // backshadow appending modal
    backshadow.appendChild(modal);

    // modal container appending backshadow
    modalContainer.appendChild(backshadow);

}

export default commentModal;