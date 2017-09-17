/**
*
* Map
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const DEFAULT_OPTIONS = {
  mapTypeControl: false,
  zoomControl: true,
  streetViewControl: false,
  draggableCursor: 'default',
  draggingCursor: 'move',
  fullscreenControl: false,
};

class MapComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: null,
      selectedMarkerId: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.center !== this.props.center) {
      this.resetToDefaultState();
    }
  }
  resetToDefaultState = () => {
    this.setState({
      selectedMarker: null,
      selectedMarkerId: null,
    });
  }
  handleMarkerClicked = (marker) => {
    this.setState({
      selectedMarker: marker,
      selectedMarkerId: marker.id,
    });
  }
  renderMarkers = () => {
    const markers = this.props.markers.map((marker) => ({
      position: {
        lat: marker.coordinates.lat,
        lng: marker.coordinates.lng,
      },
      key: marker.name,
      opacity: this.state.selectedMarkerId === marker.id ? 1 : 0.75,
      defaultAnimation: 2,
      ...marker,
    }));
    return markers.map((marker) => (
      <Marker
        {...marker}
        onClick={() => this.handleMarkerClicked(marker)}
      />
      ));
  }
  renderCard = () => {
    const marker = this.state.selectedMarker;
    return (
      <StyledCard>
        <StyledCardContent>
          <section>
            <Typography type="body2" component="h1">
              {marker.name}
            </Typography>
            <Typography noWrap type="body1" component="h2" color="secondary">
              {marker.district}
            </Typography>
          </section>
          <StyledLinkButton onClick={() => this.props.router.push(`places/${marker.id}`)}>
            <Typography type="body2">
              Details
              <ChevronRightIcon />
            </Typography>
          </StyledLinkButton>
        </StyledCardContent>
        <CardMedia>
          <StyledImg
            alt="article-banner"
            src={marker.images[0]}
          />
        </CardMedia>
      </StyledCard>
    );
  }
  render() {
    const { center } = this.props;
    return (
      <div>
        <GoogleMap
          defaultZoom={11}
          defaultCenter={center}
          defaultOptions={DEFAULT_OPTIONS}
          center={center}
          onClick={this.resetToDefaultState}
        >
          {this.renderMarkers()}
          {this.state.selectedMarker && this.renderCard()}
        </GoogleMap>
      </div>
    );
  }
}

const StyledLinkButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  display: flex;
  position: absolute;
  z-index: 1;
  bottom: 65px;
  justify-content: space-between;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 180px;
  height: 180px;
`;

const { object, shape, func } = PropTypes;

MapComponent.propTypes = {
  center: object,
  markers: shape(object),
  router: shape({
    push: func.isRequired,
  }),
};

const Map = withGoogleMap(MapComponent);

export default Map;

