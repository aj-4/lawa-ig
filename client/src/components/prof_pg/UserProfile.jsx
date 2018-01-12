import React from 'react';
import ProfilePanel from './ProfilePanel.jsx';
import PictureGrid from './PictureGrid.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    var isFollowing = this.props.loggedInUser.followers.map(e => e.user_id).includes(this.props.user.user_id);
    this.state = {
      following: isFollowing
    };
  }

  followUser(e) {
    //POST this.props.user.username to FOLLOWED table
    this.setState({following: !this.state.following});
  }

  render() {
    return (
      <div>
        <ProfilePanel user={this.props.user} 
          followUser={e => this.followUser(e)} 
          loggedInUser={this.props.loggedInUser} 
          isFollowed={this.state.following}
          changeFollowersLive={this.props.changeFollowersLive} 
        />
        <PictureGrid user={this.props.user} loggedInUser={this.props.loggedInUser} />
      </div>
    );
  }
} 
  
export default UserProfile;