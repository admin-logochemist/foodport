import React,{useState,useRef} from 'react'
import { Button } from '@material-ui/core'
import "./AddResturant.css";
import { useHistory } from 'react-router';
import { db, projectStorage} from "../firebase";
import {useSelector} from 'react-redux';
import { selectUser } from '../features/UserSlice';
function AddResturant() {
    const [email, setEmail] = useState("");
    const [ address,setAddress ] = useState("");
    const [resName, setResName] = useState("");
    const [phone, setPhone] = useState("");
    const [cusine, setCusine] = useState("");
    const [file, setFile] = useState("");
    const [url, setURL] = useState("");
    const [type, setType] = useState("");
   const user = useSelector(selectUser)
  const useremail=user.email;
    const filePickerRef = useRef(null);
    const history = useHistory();
    const addImagetoPost = function (e) {
        setFile(e.target.files[0]);
    
      };
      const handleSubmit = (e) => {

        e.preventDefault();
        console.log(file)
    
    
        db.collection("resturant").add(
          {
            user:useremail,
            resName: resName,
            phone: phone,
            email: email,
            cusine: cusine,
            address:address,
            type:type
          }
        ).then(doc => {
          const uploadTask = projectStorage.ref('imaged/' + file.name).put(file)
          uploadTask.on("state_changed", console.log, console.error, () => {
            projectStorage
              .ref("imaged")
              .child(file.name)
              .getDownloadURL()
              .then((url) => {
                console.log(url)
                setFile(null);
                setURL(url);
                db.collection("resturant").doc(doc.id).set({
                  postImage: url
                }, { merge: true })
              })
    
          })
         
          
          // { file && <ProgressBar file={file} setFile={setFile} /> }
        }
        
        )
       
    
    history.push('/dashboard')
      }
    
    
    return (
        <div className="AddResturant">
            <div className="resturant__container">
            <h1>Add Resturant</h1>
            <form>

<input value={resName} type="text" placeholder="Restaurant Name" onChange={(e)=>setResName(e.target.value)}/>
<input value={phone} type="text" placeholder="Phone"onChange={(e)=>setPhone(e.target.value)}/>
<input value={email} type="email" placeholder="Email"onChange={(e)=>setEmail(e.target.value)}/>
<input value={address} type="text" placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
<input value={cusine} type="text" placeholder="Cusine" onChange={(e)=>setCusine(e.target.value)}/>
<select value={type} onChange={(e)=>setType(e.target.value)}>
<option value="">Select Resturant</option>
  <option value="Local Resturant">Local Resturant</option>
  <option value="Big Chain Resturant">Big Chain Resturant</option>

</select>
<label for="file">CoverImage</label>
<input onChange={addImagetoPost} type="file" id="file" name="datafile"/>
 


<Button onClick={handleSubmit}>Add Restaurent</Button>


</form>
</div>
        </div>
    )
}

export default AddResturant
