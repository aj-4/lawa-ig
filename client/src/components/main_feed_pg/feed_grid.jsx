import React from 'react';
import { Grid } from 'semantic-ui-react';
import OneFeed from './feed.jsx';

//sets up the grid on /feed page
const FeedGrid = (props) => (

  <div className="feed-grid-container">
    <Grid centered columns={1}>
      {
        props.userFeeds.map((feed, index) => {
            return <OneFeed loggedInUser={props.loggedInUser} name={feed.name} pic={feed.prof_pic} post={feed.post_id} img={feed.img} likes={feed.like_count} caption={feed.caption} date={feed.created_at} key={index} clickToSwitchUser={props.clickToSwitchUser} userid={feed.user_id}/>;
        })
      }
    </Grid>
  </div>
    
);

export default FeedGrid;