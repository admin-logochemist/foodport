import * as React from 'react';
import "./DashboardTabs.css";
import { useHistory } from "react-router-dom";
import { Sidebars } from './Sidebars';
import LineChart from '../components/LineChart'
const DashboardTabs = () => {
  const history = useHistory();

  function handleClick() {
    history.push("/addResturant");
  }

  function handleClicked() {
    history.push("/addfoodcart");
  }

  return (
    <div>
      <div className="div">
        <div>
        <Sidebars />
        </div>
        <div style={{display:'flex',alignItems:'center' ,flexDirection:'column'}}>
     <div style={{display:'flex',alignItems:'center' ,flexDirection:'row',justifyContent:'space-between'}}>
     <div className="Ryan-Garry fontDashboard">
         <h1>Dashboard</h1>
         <h2>Welcome to Dashboard</h2>
       </div>
        <div >
         <button className="btn_dashboard fontDashboard" onClick={() => { handleClicked() }}>Add FoodCart</button>
         <button className="btn_dashboard font__Dashboard" onClick={() => { handleClick() }}>Add Restaurants</button>
       </div>
     </div>
     <div style={{display:'flex',width:630}}>
       <LineChart/>
       </div>
     </div>
      </div>
    </div>
//   <div>
//     <div className="div">
//       <div>
//         <Sidebars />
//       </div>
//       <div style={{dispay:'flex',flexDirection:'column'}}>
//       <div className="Ryan-Garry fontDashboard">
//         <h1>Dashboard</h1>
//         <h2>Welcome to Dashboard</h2>
//       </div>
//       <div>
//       <LineChart/>
// </div>
     
//       </div>

// <div className="btn-one">
//         <button className="btn_dashboard fontDashboard" onClick={() => { handleClicked() }}>Add FoodCart</button>
//         <button className="btn_dashboard font__Dashboard" onClick={() => { handleClick() }}>Add Restaurents</button>
    
//       </div>
//     </div>
//     </div>
  
  );
}

export default DashboardTabs