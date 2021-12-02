import React from 'react'
import VerticalTabs from './pages/DashboardTabs'
import { useHistory } from 'react-router-dom'
import "./Dashboard.css"
import { login, logout } from './features/UserSlice'
import { useDispatch } from 'react-redux';

import { auth } from './firebase';
function Dashboard() {
    const dispatch = useDispatch();
    const history = useHistory();
    function handleClicked() {
        dispatch(logout);
    }
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout())
            history.push('/SignIn')
        })

    }
    return (

        <div>
            
            <VerticalTabs />
        </div>
    )
}

export default Dashboard
