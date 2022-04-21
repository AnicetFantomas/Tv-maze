export default class TVMazeAPI {
    
  constructor(){
    this.baseUrl = "https://api.tvmaze.com";
    this.involvementAPIBaseUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";
  }

  async getShows(page = 1){
    const response = await fetch(`${this.baseUrl}/shows?page=${page}`, {
        method: 'GET',
    });

    const result = await response.json();
    return result;
  }

  async getAllLikes(appId){
      const response = await fetch(`${this.involvementAPIBaseUrl}/apps/${appId}/likes`, {
          method: 'GET'
      });

      const result = await response.json();
      return result;
  }

  async getLikes(appId, showId){
    const response = await fetch(`${this.involvementAPIBaseUrl}/apps/${appId}/likes`, {
        method: 'GET'
    });

    const result = await response.json();
    const myResult = result.find(like => like.item_id === showId) || {likes: 0, item_id: showId};

    return myResult.likes;
  }

  async postLike(appId, showId){
    const response = await fetch(`${this.involvementAPIBaseUrl}/apps/${appId}/likes`, {
        method: 'POST',
        body: JSON.stringify({
            item_id: showId
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });
    
    const mylikes = await this.getLikes(appId, showId);
    
    return mylikes;
  }

  async getComments(appId, showId){
    const commentsResponse = await fetch(`${this.involvementAPIBaseUrl}/apps/${appId}/comments?item_id=${showId}`, {
        method: 'POST',
        body: JSON.stringify({
            item_id: showId
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const comments = await commentsResponse.json();
    return comments;
  }
}