import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import SignUp from './pages/signup';
import SignIn from './pages/SignIn';
import AddResturant from './pages/AddResturant';
import AddFoodCart from './pages/AddFoodCart';
import AddFood from './pages/AddFood';
import Restaurantbox from './pages/restaurant-box';
import Dashboard from './Dashboard';
import Checkout from './pages/Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stripe from './pages/Stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Restaurant from './pages/Restaurant';
import FoodCart from './pages/FoodCart';
import TermsAndConditions from './pages/TermsAndConditions';
import VerticalTabs from './pages/VerticalTabs';
import Orderss from './pages/Orderss';
import FoodItem from './pages/FoodItem';
import MainLogin from './pages/MainLogin';
import USignIn from './pages/USignIn';
function App() {
    const promise = loadStripe('pk_test_51J5C8JLwMYFuVwcJpbQ11WOXgTvDiN8VHT0KkDG1R3OpRxGAZSmB072QxdrPVcKVeiebK9aOt10IHvOvfeUpfkoP00OqXNDT48')
    const public_URL = 'food.demoapp-lc.com'
    return (
        <Router basename={process.env.public_URL}>
          
            <Switch>
                <Route exact path='/' exact component={Home} />
                <Route exact path='/About' component={About} />
                <Route exact path='/Contact' component={Contact} />
                <Route exact path='/SignUp' component={SignUp} />
                <Route exact path='/SignIn' component={SignIn} />
                <Route exact path='/MainLogin' component={MainLogin} />
                <Route path='/addResturant' component={AddResturant} />
                <Route path='/addfoodcart/' component={AddFoodCart} />
                <Route path='/addfood' component={AddFood} />
                <Route exact path='/restaurantbox' component={Restaurantbox} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/orders' component={Orders} />
                <Route path='/profile' component={Profile} />
                <Route path='/restaurants' component={Restaurant} />
                <Route path='/foodcart' component={FoodCart} />
                <Route path='/about-us' component={About} />
                <Route path='/termsandconditions' component={TermsAndConditions} />
                <Route path='/vertical' component={VerticalTabs} />
                <Route path='/fooditem' component={FoodItem} />
                <Route path='/USignIn' component={USignIn} />
                <Route path='/Stripe'>
                    <Elements stripe={promise}>
                        <Stripe />
                    </Elements>
                </Route>
                <Route path='/orderss' component={Orderss} />
            </Switch>
        </Router>
    );
}

export default App;