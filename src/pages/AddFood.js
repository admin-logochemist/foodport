
import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import "./AddFoodCart.css";
import { useHistory } from "react-router-dom";
import { db, projectStorage } from "../firebase";
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice'

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
    <div className="AddCart">
      <div className="cart__container">
        <h1>Add Food</h1>
        <form>
          {console.log('params', params)}
          {console.log('location', location)}
          <input value={category} type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Food Type</option>
            <option value="dinner">Dinner</option>
            <option value="lunch">Lunch</option>
            <option value="breakfast">Breakfast</option>
          </select>
          <input value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input value={price} type="number" placeholder="Price" onChange={(e) => (setPrice(e.target.value))} />
          <textarea value={description} type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <label for="file">Food Picture</label>
          <input onChange={addImagetoPost} type="file" id="file" name="datafile" />
          <Button onClick={handleSubmit}>ADD FOOD</Button>
        </form>
      </div>
    </div>
  )
}

export default AddFood
