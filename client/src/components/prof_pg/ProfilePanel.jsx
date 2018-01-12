import React from 'react';
import PictureGrid from './PictureGrid.jsx';
import { Button, Header, List, Image, Divider, Grid, Modal } from 'semantic-ui-react';

class ProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followed: this.props.isFollowed,
    };
  }

  toggleFollow() {
    //PUSH picture data into logged in user's liked photos
    var bodyObj = {followerId: this.props.loggedInUser.user_id, followedId: this.props.user.user_id};
    bodyObj.status = this.props.isFollowed ? 'rmFollow' : 'addFollow';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/follow', postConfig);
    this.props.followUser();

  }

  render() {
    return (
      <div className='prof-panel-container'>
        <Grid centered>
          <Grid.Column width={4}>
            <Image circular className='prof-avatar' src={this.props.user.prof_pic} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Grid.Row className="first-panel-row">
              <Header className='profile-name-title'>{this.props.user.name}</Header> 
              {
                (this.props.isFollowed === true) 
                  ? <Button onClick={this.props.followUser} className='follow-button' onClick={e => this.toggleFollow(e)} basic>Following</Button>
                  : <Button onClick={this.props.followUser} className='follow-button' onClick={e => this.toggleFollow(e)} primary>Follow</Button> 
              }
            </Grid.Row>
            <Grid.Row >
              <span className='profile-sub-data'>
                <span className='profile-sub-data-num'>{this.props.user.posts.length}</span> posts </span>
              <span className='profile-sub-data'>
                <Modal size="mini" trigger={<span><span className='profile-sub-data-num'>{this.props.user.followers.length} </span>followers</span>}>
                  <Modal.Header>Followers</Modal.Header>
                  <Modal.Content scrolling><List divided verticalAlign='middle'>{this.props.user.followers.map((follower) => {
                    return <List.Item><Image avatar src={follower.prof_pic} /><List.Content className="follow">{follower.name}</List.Content><List.Content className="small-button" floated="right"><Button color="blue" size="mini">Following</Button></List.Content></List.Item>;
                  })}</List></Modal.Content>
                </Modal></span>
              <span className='profile-sub-data'>
                <Modal size="mini" trigger={<span><span className='profile-sub-data-num'>{this.props.user.following.length} </span>following</span>}>
                  <Modal.Header>Following</Modal.Header>
                  <Modal.Content scrolling><List divided verticalAlign='middle'>{this.props.user.following.map((following) => {
                    return <List.Item><Image avatar src={following.prof_pic} /><List.Content className="follow">{following.name}</List.Content><List.Content className="small-button" floated="right"><Button color="blue" size="mini">Following</Button></List.Content></List.Item>;
                  })}</List></Modal.Content>
                </Modal></span>
            </Grid.Row>
            <Grid.Row>
              <div className='header-caption'>
                <span > {this.props.user.description} </span>            
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
    
  }
}
  
export default ProfilePanel;