import React from 'react';
import CommentsField from './CommentsField.jsx';
import { Input, Rating, Comment, Container, Divider, Button, Header, Image, Modal } from 'semantic-ui-react';

class PicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      postLikes: this.props.post.like_count
    };
    this.checkIfLike();
  }

  liveUpdateLike() {
    var likes = this.state.postLikes;
    console.log(likes);
    if (this.state.liked) {
      this.setState({postLikes: likes - 1});
    } else {
      this.setState({postLikes: likes + 1});
    }
  }

  checkIfLike() {
    var bodyObj = {userId: this.props.loggedInUser.user_id, postId: this.props.post.post_id};

    console.log('user id is ', bodyObj.userId);
    console.log('post id is ', bodyObj.postId);

    bodyObj.status = 'checkLike';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/like', postConfig)
      .then(data => data.json())
      .then(jsonData => {
        if (jsonData.rows && jsonData.rows.length) {
          this.setState({liked: true});
        }
      });
  }

  toggleLike() {
    //PUSH picture data into logged in user's liked photos
    var bodyObj = {userId: this.props.loggedInUser.user_id, postId: this.props.post.post_id};

    bodyObj.status = this.state.liked ? 'rmLike' : 'addLike';

    var postConfig = {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyObj)
    };

    fetch('/like', postConfig);
    this.liveUpdateLike();
    this.setState({liked: !this.state.liked});

  }

  render() {
    return (
      <Modal size='large' trigger={
        <Image src={this.props.img}/>
      }>
        <Modal.Content image className='pic-modal'>
          <Image className='modal-img' src={this.props.img} />
          <Modal.Description className='modal-description-field'>
            <Container className='modal-header-contain'>
              <Image avatar size='mini' inline src={this.props.user.prof_pic} floated='left' />
              <Header className='uname-modal' size='small' floated='left'>{this.props.user.name}</Header>
            </Container>
            <Divider className='top-div-modal'/>
      
            <CommentsField user={this.props.user} 
              likeCount={this.state.postLikes} 
              post={this.props.post} 
              toggleLike={e => this.toggleLike(e)} 
              isLiked={this.state.liked}
              checkIfLike={this.checkIfLike.bind(this)}/>
      
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

} 

export default PicModal;