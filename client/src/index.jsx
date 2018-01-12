import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import LogIn from './components/LogIn.jsx';
import UserProfile from './components/prof_pg/UserProfile.jsx';
import AllFeeds from './components/main_feed_pg/all_feed.jsx';
import fakeProfileTableData from '../../database/fakeProfileTableData';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false, 
      allUsernames: [], //for dynamic search
      loggedInUser: fakeProfileTableData[0], //waiting for login profile name
      onPageForUser: null, //is replaced by a real user on render
      //****************************************************************************/
      currentPg: 'user_profile' //<=CHANGE THIS VALUE TO RENDER AND WORK ON YOUR PAGE
      //****************************************************************************/
    };
  }

  componentDidMount() {
    //setup search component
    this.getAllUserNames();
    //render current user's page w fetch
    this.loginUser(1);
    this.changeUser(1);
    //TODO//////////////render logged in user's profile here
    
  }

  getAllUserNames() {
    fetch('/profile')
      .then(data => data.json())
      .then(jsondata => this.setState({allUsernames: jsondata}))
      .catch(err => console.log('error fetching allprofiles'));
  }

  changeUser(userId) {
    this.mountUser(userId, 'change');
  }

  loginUser(userId) {
    this.mountUser(userId, 'login');
  }

  mountUser(userId, changeOrLogin) {
    //get a specific user's profile - triggered by navbar search
    var bodyObj = {username: userId};
    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    if (changeOrLogin === 'login') {
      fetch('/profile', postConfig)
        .then(data => data.json())
        .then(userDataObj => this.setState({loggedInUser: userDataObj}));
    } else {
      fetch('/profile', postConfig)
        .then(data => data.json())
        .then(userDataObj => this.setState({onPageForUser: userDataObj}));
    }
  }

  changePage(toPage) {
    if (toPage === 'home') {
      this.setState({currentPg: 'feed'});
    } else if (toPage === 'profile') {
      this.setState({currentPg: 'user_profile'});
    }
    
  }

  logOut() {
    // this.setState({loggedInUser: })
  }

  pageRouter(currentPg) {
    if (currentPg === 'user_profile') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} changeUser={e => this.changeUser(e)} changePage={e => this.changePage(e)}/> {/* Albert */}
          {this.state.onPageForUser &&
            <UserProfile loggedInUser={this.state.loggedInUser} user={this.state.onPageForUser} />
          }
        </div>
      );
    } else if (currentPg === 'login_page') {
      return (
        <LogIn /> //(WILL)
      );
    } else if (currentPg === 'feed') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} changeUser={e => this.changeUser(e)} changePage={e => this.changePage(e)}/> {/* Albert */}
          <AllFeeds data={this.state.onPageForUser} /> {/*Larry*/}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.pageRouter(this.state.currentPg)
        }
      </div>
    );
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));
