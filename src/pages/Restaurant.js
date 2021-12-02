import React,{useState,useEffect} from 'react'
import { Sidebars } from './Sidebars';
import "./DashboardTabs.css";
import BoxSx from './RestaurentsDetails'
import { useSelector } from 'react-redux';
import { db } from "../firebase"
import { selectUser } from '../features/UserSlice';
const Restaurant = () => {

  const user = useSelector(selectUser)
  const [users, setUsers] = useState("")
  const [resturant, setResturants] = useState([]);
  const getResturantss = () => {
    db.collection('resturant').onSnapshot(snapshot => (
      setResturants(snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }
      )))
    ))
  };
  const getResturants = () => {
    db.collection('resturant').where('user', '==', user?.email).onSnapshot(snapshot => (
      setResturants(snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }
      )))
    ))
  };
  useEffect(() => {
    if (user?.email) {
      getResturants()
    }
    else {
      getResturantss()
    }
  }, [user])
  const renderResturants = () => {
    if (resturant && resturant?.length) {
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return resturant.map((item, index) => {
        return <BoxSx
          obj={item}
        />


      })
    }
  };
    return (
        <div className="div">
            <div>
            <Sidebars/>
            </div>
           <div>
           <div classname="Dashboard-box">
              
                <h2 style={{ fontWeight: 'bold' }}>Your Restaurants</h2>
              </div>
              <div className="btn-one">
              {renderResturants()}
                {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
              </div>
            </div>
            <div style={{ backgroundColor: '#f8f8f8',display: 'flex', justifyContent: 'space-evenly' }}>
         
            </div>
            <br/>
            <br/>
            
            {/* <TableCell/> */}
          </div>
    )
}

export default Restaurant
