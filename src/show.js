export default class Show {
  constructor (showId, showTitle, image, summary, genre, language, likes = 0, comments = [], reservations = []) {
    this.id = showId;
    this.title = showTitle;
    this.image = image;
    this.summary = summary;
    this.genre = genre;
    this.language = language;
    this.likes = likes;
    this.comments = comments;
    this.reservations = reservations;
  }

  getLikes(){

  }
}