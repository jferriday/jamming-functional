const clientId = 'f50a7e9616b14871b79ae9e1062dad26'
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

        // use URLSearchParams to return the token parameter from the returned URL
        // details of method https://reactgo.com/javascript-get-query-parameters/
        // https://www.w3schools.com/jsref/prop_loc_search.asp
        // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get

        // search through the redirected URL for token and timeout values
        const params = new URLSearchParams(window.location.search)
        accessToken = params.get("access_token");
        timeOutSeconds = parseInt(params.get("expires_in"));
        

        // Check for an access token and timeout - if so, clear the access token after timeout
        // timeout is provided by the Spotify API 
        if (accessToken !== null && timeOutSeconds !== null){
            setTimeout(() => accessToken = null, timeOutSeconds * 1000);
            return accessToken;
        }else{
            // get a new token if the previous one has expired or was null
        const endpoint = 'https://accounts.spotify.com/authorize';
        const authUrl = endpoint + '?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri;
        // redirect the user to the Spotify authorisation page
        window.location.replace(authUrl);
        }       
        

    },

    async search(term) {
        // use the Spotify search API to return an array of tracks from a search term
        const endpoint = 'https://api.spotify.com/v1/search';
        console.log('Access token used: ' + accessToken);
    
        console.log('searching')
        await fetch(endpoint + 'q=' + term,
        {method: 'GET',
        headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then((response) => {
            if(response.ok){
                return response.json();
            }else{
                throw new console.error('Network Error');
            }
        })
        // hook up to app to test
        .then((jsonResponse) => {
            console.log(jsonResponse)
        })


    }

}