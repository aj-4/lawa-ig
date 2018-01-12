import React from 'react';
import CommentsField from './CommentsField.jsx';
import { Input, Rating, Comment, Container, Divider, Button, Header, Image, Modal } from 'semantic-ui-react';

class PicModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
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

    fetch('/like', postConfig)
      .then(data => data.json())
      .then(userDataObj => this.setState({liked: !this.state.liked}));

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
      
            <CommentsField user={this.props.user} post={this.props.post} toggleLike={e => this.toggleLike(e)} isLiked={this.state.liked}/>
      
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

} 

export default PicModal;