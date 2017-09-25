/**
*
* CardsList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Typography from 'material-ui/Typography';

import Card from 'components/Card';

import messages from './messages';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class CardsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleCardClicked = (id) => {
    this.props.goToLocation(`/places/${id}`);
  }
  renderCards = () => this.props.places.map((place) => (
    <CardWrapper key={place.id} onClick={() => this.handleCardClicked(place.id)}>
      <Card place={place} />
    </CardWrapper>
      ))
  renderNoCards = () => {
    return (
      <NoCardsWrapper>
        <Typography
          type="body2"
          component="h4"
          onClick={() => this.props.goToLocation(`/influencer`)}
        >
          <FormattedMessage {...messages.noPlaces} />
        </Typography>
      </NoCardsWrapper>
    );
  }
  render() {
    return (
      <Container>
        {this.props.places.isEmpty() ? this.renderNoCards() : this.renderCards()}
      </Container>
    );
  }
}

const NoCardsWrapper = styled.div`
  margin: 3rem 1rem;
  text-align: center;
`

const CardWrapper = styled.div`
  width: 50%;
  padding: 0 0.2rem;
  margin-top: 0.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const { object, func } = PropTypes;

CardsList.propTypes = {
  places: object.isRequired,
  goToLocation: func.isRequired,
};

export default CardsList;
