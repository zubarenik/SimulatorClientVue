import axios from 'axios';
const headers = {
     'X-App-Name': window.location.hostname
}
if (localStorage.getItem("token")){
    headers.Authorization = `Token ${localStorage.getItem("token")}`;
}

export default
    axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',

        // headers: {'X-App-Name': window.location.hostname}
        headers: headers
        
    });
    // headers: {'X-App-Name': window.location.hostname}
    
