import axios from "axios";
const instance=axios.create({
    baseURL:'https://us-central1-foodport-87389.cloudfunctions.net/api'
 
})
export default instance;
//http://localhost:5001/foodport-87389/us-central1/api