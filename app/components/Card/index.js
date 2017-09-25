/**
*
* Card
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import MCard, { CardContent, CardMedia } from 'material-ui/Card';

// import messages from './messages';

class Card extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleAuthorClicked = (e) => {
    const { place: { images } } = this.props;
    const author = Object.keys(images[0])[0];
    e.stopPropagation();
    window.location.href = `https://instagram.com/${author}`;
  }
  render() {
    const { place, place: { images } } = this.props;
    const url = Object.values(images[0])[0];
    const author = Object.keys(images[0])[0];
    return (
      <MCard>
        <CardMedia>
          <ImageWrapper>
            <StyledImg
              alt="article-banner"
              src={url}
            />
            <AuthorWrapper>
              <Typography
                type="body2"
                component="h5"
                style={{ fontSize: '12px' }}
                onClick={(e) => this.handleAuthorClicked(e)}
              >
                @{author}
              </Typography>
            </AuthorWrapper>
          </ImageWrapper>
        </CardMedia>
        <CardContent style={{ padding: '0.25rem' }}>
          <Typography type="body2" component="h4" noWrap>
            {place.name}
          </Typography>
          <Typography noWrap type="body1" component="p" color="secondary">
            {place.district}
          </Typography>
        </CardContent>
      </MCard>
    );
  }
}

const AuthorWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  color: white;
  right: 0;
  background-color: white;
  padding: 0.1rem 0.8rem;
`

const ImageWrapper = styled.div`
  position: relative;
`

const StyledImg = styled.img`
  height: calc(50vw - 0.9rem);
  width: calc(50vw - 0.9rem);
  object-fit: cover;
`;

const { shape, string } = PropTypes;

Card.propTypes = {
  place: shape({
    name: string,
    distrct: string,
  }),
};

export default Card;
