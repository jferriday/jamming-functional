const clientId = 'f50a7e9616b14871b79ae9e1062dad26'
const redirectUri = 'http://localhost:3000'
let accessToken;
let timeOutSeconds;


export const Spotify = {

    // add scope to the authorisation url
    getToken(){
        // Check if user already has an access token, return it if they do
        if (accessToken) {
            console.log('Access token returned' , accessToken)
            return accessToken;
        }

      
        
        
        
        // Check for an access token and timeout - if so, clear the access token after timeout
        // timeout is provided by the Spotify API 
        // search through the redirected URL for token and timeout values
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        accessToken = accessTokenMatch[1];
        console.log('Access token matched: ', accessToken)
        const timeOutMatch = window.location.href.match(/expires_in=([^&]*)/);
        timeOutSeconds = timeOutMatch[1];

        

        console.log('Access token gained from URL:  ', accessToken)
        if (accessToken !== null && timeOutSeconds !== null){
            window.setTimeout(() => accessToken = null, timeOutSeconds * 1000);
            console.log('Access token returned after accessing timeout', accessToken)
            return accessToken;
        }else{
            // get a new token if the previous one has expired or was null
            const endpoint = 'https://accounts.spotify.com/authorize';
            const authUrl = endpoint + '?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirectUri;
            // redirect the user to the Spotify authorisation page
            window.location.replace(authUrl);
            
        }       
        
        
    },

    logToken(){
        console.log(accessToken);
    },

    async search(term) {
        
        console.log('Token:', accessToken);
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
                throw new Error('Network Error');
            }
        })
        // hook up to app to test
        .then((jsonResponse) => {
            console.log(jsonResponse)
        }).catch((e) => console.log(e));


    }

}