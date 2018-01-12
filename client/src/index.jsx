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
      onPageForUser: fakeProfileTableData[0], //is replaced by a real user on render
      //****************************************************************************/
      currentPg: 'user_profile' //<=CHANGE THIS VALUE TO RENDER AND WORK ON YOUR PAGE
      //****************************************************************************/
    };
  }

  componentDidMount() {
    //setup search component
    this.getAllUserNames();
    //render current user's page w fetch
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
    //get a specific user's profile - triggered by navbar search
    var bodyObj = {username: userId};
    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };
    fetch('/profile', postConfig)
      .then(data => data.json())
      .then(userDataObj => this.setState({onPageForUser: userDataObj}));
  }

  pageRouter(currentPg) {
    if (currentPg === 'user_profile') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} changeUser={e => this.changeUser(e)}/> {/* Albert */}
          <UserProfile loggedInUser={this.state.loggedInUser} user={this.state.onPageForUser} />
        </div>
      );
    } else if (currentPg === 'login_page') {
      return (
        <LogIn /> //(WILL)
      );
    } else if (currentPg === 'feed') {
      return (
        <div>
          <NavBar allUsers={this.state.allUsernames} changeUser={e => this.changeUser(e)}/> {/* Albert */}
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
