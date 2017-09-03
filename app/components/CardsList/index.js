/**
*
* CardsList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { range } from 'lodash';
import Card from 'components/Card';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class CardsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  handleCardClicked = (id) => {
    this.props.onCardClicked('/places/' + id);
  }
  renderCards = () => {
    return this.props.places.map((place) => {
      return (
        <CardWrapper key={place.id} onClick={() => this.handleCardClicked(place.id)}>
          <Card place={place}/>
        </CardWrapper>
      );
    });
  }
  render() {
    return (
      <Container>
        {this.renderCards()}
      </Container>
    );
  }
}

const CardWrapper = styled.div`
  width: 50%;
  padding: 0 0.2rem;
  margin-top: 0.5rem;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const { object } = PropTypes;

CardsList.propTypes = {
  places: object.isRequired,
};

export default CardsList;
