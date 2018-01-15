import React from 'react';
import { Container } from 'semantic-ui-react';

//right side bar of /feed page
const FeedBar = (props) => (
  <div className="ui left aligned selection list">
    <div className="item" onClick={props.clickToSwitchUser.bind(null, props.loggedInUser.user_id)}>
      <img className="ui avatar image" src={props.loggedInUser.prof_pic}/>
      <div className="content">
        <div className="header">{props.loggedInUser.name}</div>
      </div>
    </div>
  </div>
)

export default FeedBar