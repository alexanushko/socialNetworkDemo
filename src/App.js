import React, {lazy} from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import { Preloader } from './components/common/Preloader/Preloader';
import { withSuspense } from "./hoc/withSuspense";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
const DialogsContainer = lazy(() => import ('./components/Dialogs/DialogsContainer'));
const UsersContainer = lazy(() => import ('./components/Users/UsersContainer'));



class App extends React.Component {

catchAllUnhandledErrors = (reason,promise) => {
    alert(reason)
}

componentDidMount(){
  this.props.initializeApp();
  window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors );
}
componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors );
}

    render(){
  if(!this.props.initialized){
    return <Preloader />
  }
  return (
    <div className="app-wrapper">
      <HeaderContainer/>
      <Navbar/>
      <div className='app-wrapper-content'>
          <Switch>
              <Route exact path='/' render={() => <Redirect to='/profile'/>} />
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
              <Route path='/users' render={withSuspense(UsersContainer)} />
              <Route path='/login' render={() => <Login />} />
              <Route path='*' render={() => <div>404 Page Not Found</div>} />
          </Switch>
      </div>
    </div>
  );
}}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

