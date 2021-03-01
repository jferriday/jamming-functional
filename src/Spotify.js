const clientId = process.env.REACT_APP_API_KEY;
const redirectUri = 'http://localhost:3000'
let accessToken;
let timeOutSeconds;


export const Spotify = {

    // add scope to the authorisation url
    getToken(){
        // Check if user already has an access token, return it if they do
        if (accessToken) {
            return accessToken;
        }

      
        
        
        
        // Check for an access token and timeout - if so, clear the access token after timeout
        // timeout is provided by the Spotify API 
        // search through the redirected URL for token and timeout values
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        if(accessTokenMatch){

        accessToken = accessTokenMatch[1];
        }
        const timeOutMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (timeOutMatch){
        timeOutSeconds = timeOutMatch[1];
        }
        

        if (accessToken !== null && timeOutSeconds !== null){
            window.setTimeout(() => accessToken = null, timeOutSeconds * 1000);
            return accessToken;
        }else{
            // get a new token if the previous one has expired or was null
            const endpoint = 'https://accounts.spotify.com/authorize';
            const scopes = '&scope=user-read-private%20playlist-modify-public%20playlist-modify-private'
            const authUrl = endpoint + '?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri + scopes;
            // redirect the user to the Spotify authorisation page
            window.location.replace(authUrl);
            
        }       
        
        
    },

    logToken(){
        console.log(accessToken);
    },

    async search(term) {
        accessToken = this.getToken();
        // use the Spotify search API to return an array of tracks from a search term
        const endpoint = 'https://api.spotify.com/v1/search?type=track&';
    
        const response = await fetch(endpoint + 'q=' + term,
        {method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Network Error');
            }
        })
        // hook up to app to test
        .then((jsonResponse) => {
            return jsonResponse;
        }).catch((e) => console.log(e));

        return response
    },

    async savePlaylist(playlistName, trackList){
        accessToken = this.getToken();
        // get user ID - one request for this
        let userId;
        await fetch('https://api.spotify.com/v1/me', 
        {method: 'GET',
        headers: {Authorization: 'Bearer ' + accessToken}})
        .then((response) => {return response.json()})
        .then((jsonResponse) => {
            userId = jsonResponse.id;
        }).catch((e) => console.log(e));

        
        // create a new playlist using POST request
        let playlistId;
        await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: playlistName})
        })
        .then(response => {return response.json()})
        .then((jsonResponse) => playlistId = jsonResponse.id)
        .catch((e) => console.log(e));

        // then add items to the playlist using POST
        // add track URIs to an array to be sent to Spotify
        const trackUris = [];
        trackList.map((track) => trackUris.push(track.id));
        // send those bad boys to the spotify API using POST:
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {method: 'POST',
        headers:{
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uris: trackUris})
        })
        .then((response) => {console.log(response)})
        .catch((e) => {console.log(e)});







    }

}