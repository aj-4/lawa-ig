import React from 'react';
import PicModal from './PictureModal.jsx';
import { Grid } from 'semantic-ui-react';

const GridRow = (props) => {
  return (
    <Grid.Row>
      {
        props.rowPosts.map(post => {
          return (
            <Grid.Column key={post.img}>
              <PicModal className="grid-img" post={post} img={post.img} user={props.user} />
            </Grid.Column>
          );
        })
      }
    </Grid.Row>
  );
};

export default GridRow;