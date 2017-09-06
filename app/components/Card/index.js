/**
*
* Card
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import MCard, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Card extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { place } = this.props;
    return (
      <MCard>
        <CardMedia>
          <StyledImg
            alt="article-banner"
            src="http://via.placeholder.com/300x300"
          />
        </CardMedia>
        <CardContent style={{ padding: "0.25rem" }}>
          <Typography type="body2" component="h4">
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

const StyledImg = styled.img`
  width: 100%;
`

const { object } = PropTypes;

Card.propTypes = {
  place: object.isRequired,
};

export default Card;
