export default class Show {
  constructor (showId, showTitle, image, summary, likes = 0, comments = [], reservations = []) {
    this.id = showId;
    this.title = showTitle;
    this.image = image;
    this.summary = summary;
    this.likes = likes;
    this.comments = comments;
    this.reservations = reservations;
  }

  getLikes(){

  }
}