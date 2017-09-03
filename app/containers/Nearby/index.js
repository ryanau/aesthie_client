/*
 *
 * Nearby
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { GoogleMap, Marker } from "react-google-maps";
import makeSelectNearby from './selectors';
import messages from './messages';

import Map from './components/Map';

export class Nearby extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderMap = () => {
    return (
      <Map
        containerElement={
          <div style={{ height: `calc(100vh - 57px)` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
  render() {
    return (
      <StyledContainer>
        <Helmet
          title="Nearby"
          meta={[
            { name: 'description', content: 'Description of Nearby' },
          ]}
        />
        {this.renderMap()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  margin: -0.5rem;
`

const { } = PropTypes;

Nearby.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
