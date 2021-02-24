const clientId = 'f50a7e9616b14871b79ae9e1062dad26'
const redirectUri = 'http://localhost:3000'
let accessToken;


export const Spotify = {


    getToken(){
        // Check if user already has an access token, return it if they do
        if (accessToken) {
            return accessToken;
        }

        // use URLSearchParams to return the token parameter from the returned URL
        // details of method https://reactgo.com/javascript-get-query-parameters/
        // https://www.w3schools.com/jsref/prop_loc_search.asp
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get

        // use this method to find the expiry time
        const params = new URLSearchParams(window.location.search)
        accessToken = params.get("access_token");

        const endpoint = 'https://accounts.spotify.com/authorize';
        const authUrl = endpoint + '?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri;
        // redirect the user to the Spotify authorisation page
        window.location.replace(authUrl);
        
        

    }

}