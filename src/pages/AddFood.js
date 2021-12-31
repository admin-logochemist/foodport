
import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import "./AddFoodCart.css";
import { useHistory } from "react-router-dom";
import { db, projectStorage } from "../firebase";
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice'
// import emailpic from '../email.png'
import logo from './logo1.png'
import back from './backgrouds.jpg'
// import lock from './password.png'
// import phones from './phone.png'
import 'bootstrap/dist/css/bootstrap.min.css';
// import signin from './signin.png'
function AddFood() {
  const user = useSelector(selectUser);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [remail, setRemail] = useState("");
  const [url, setURL] = useState("");
  const history = useHistory()
  let params = useParams()
  let location = useLocation()


  const addImagetoPost = function (e) {
    setFile(e.target.files[0]);

  };
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(file)
    db.collection("food").add(
      {
        category: category,
        type: type,
        title: title,
        price: parseInt(price),
        description: description,
        _id: location.state?._id,
        remail:user?.email
      }
    ).then(doc => {
      const uploadTask = projectStorage.ref(`/imaged/${file.name}`).put(file)
      uploadTask.on("state_changed", console.log, console.error, () => {
        projectStorage
          .ref("imaged")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
            db.collection("food").doc(doc.id).set({
              postImage: url
            }, { merge: true })
          })
      })
      history.push('/dashboard')
      // { file && <ProgressBar file={file} setFile={setFile} /> }
    }
    )
  }
  return (
    <div className="form_img add_food" style={{backgroundImage: `url(${back})`}}>
    <div class="main_from form form_secd">
           <div class="upper_div"></div>    
       </div>
       <form>
       <center className="center_img">
   
     <img src={logo} alt='hj'/>
   
     </center>
     <div className="row justify-content-center form_rows form_secd">
     <div className="col-lg-10">
     <h3 className="text-center">Add Food</h3>

     <div class="icons_group icons_groups">
     {/* <img src={signin} alt='asd' className='as' /> */}
     <input className="form-control" value={category} type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
     </div>
     <br/>
            <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            {/* disabled selected */}
             <option >Select Food Type</option>
             <option value="dinner">Dinner</option>
             <option value="lunch">Lunch</option>
             <option value="breakfast">Breakfast</option>
           </select>
     <div className="icons_group icons_groups">
     {/* <img src={phones} alt='as' className='df'/> */}
     <input className="form-control" value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
     </div>
     <br/>
     <div className="icons_group icons_groups">
     {/* <img src={emailpic} alt='a' className='gh'/> */}
     <input className="form-control" value={price} type="number" placeholder="Price" onChange={(e) => (setPrice(e.target.value))}/>    
     </div>
     <br/>
     <div className="icons_group icons_groups descrip">
     {/* <img src={lock} alt='asdf' className='jk' /> */}
     <textarea value={description} type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
     </div>
     {/* <label for="file">Food Picture</label> */}
       <input onChange={addImagetoPost} type="file" id="file" name="datafile" style={{border: 'none'}}/>
     
     {/* <select name="UserType" className="form-control" id="usertype" value={select} onChange={handleCapacity}>
                              <option disabled selected>User Type</option>
                              <option value="user"> User</option>
                              <option value="business"> Business</option>
                          </select>
                          */}
                           <br/>
                           <br/>
                           <button class="form_btns"onClick={handleSubmit}>ADD FOOD</button> 
                          
                           </div>
                           </div>
       </form>
           </div>
  )
}

export default AddFood
