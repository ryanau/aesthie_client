/**
*
* Map
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';

import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const DEFAULT_OPTIONS = {
  mapTypeControl: false,
  zoomControl: true,
  streetViewControl: false,
  draggableCursor: 'default',
  draggingCursor: 'move',
  fullscreenControl: false,
}

class MapComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    };
  }
  componentWillReceiveProps
  renderMarkers = () => {
    return this.state.markers.map((marker) => {
      return (
        <Marker
          {...marker}
        />
      );
    });
  }
  render() {
    const { center } = this.props;
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={center}
        defaultOptions={DEFAULT_OPTIONS}
        center={center}
      >
        {this.renderMarkers()}
      </GoogleMap>
    );
  }
}

const { object } = PropTypes;

MapComponent.propTypes = {
};

const Map = withGoogleMap(MapComponent);

export default Map;

