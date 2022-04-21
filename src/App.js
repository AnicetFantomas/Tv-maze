import TVMazeAPI from "./api_module.js";
import Renderer from "./renderer.js";
import Show from "./show.js";
export default class TVShowApp {
   tvMazeApi = null;
   static uuid = "bPjiahSZ0zVQqd4kdfjM";
   static allLikes = [];
  
  static async initialize() {
    this.tvMazeApi = new TVMazeAPI();
    let shows = await this.tvMazeApi.getShows(1);
    this.allLikes = await TVShowApp.getAllLikes(this.uuid);
    
    shows = shows.map((show) => {
        const showlikes = this.allLikes.find(like => like.item_id === show.id) || {likes: 0, item_id: show.id};
        const myShow = new Show(show.id, show.name, show.image.medium, show.summary, showlikes.likes);
        return myShow;
    });

    Renderer.displayShows(shows);
    
  }

  static async getAllLikes(appId) {
    return await this.tvMazeApi.getAllLikes(appId);
  }

  static async like(showId){

    const currentLikes = await this.tvMazeApi.postLike(this.uuid, showId);

    Renderer.updateLike(showId, currentLikes);
  }

  static async getComments(showId){
      const comments = await this.tvMazeApi.getComments(this.uuid, showId);
      return comments;
  }

  
}