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
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import Typography from 'material-ui/Typography';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';

import { getCities, getCitiesById } from 'entities/cities/selectors';
import { getPlaces } from 'entities/places/selectors';
import { fetchPlaces } from 'entities/places/actions';
import { getSelectedCityId } from 'root/selectors';
import { changeSelectedCity } from 'root/actions';

import SelectCityModal from 'components/SelectCityModal';
import Map from './components/Map';

import { getIsSelectCityModalOpen } from './selectors';
import { closeSelectCityModal, openSelectCityModal } from './actions';
// import messages from './messages';

export class Nearby extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { placesList, updatePlaces, selectedCityId } = this.props;
    placesList.isEmpty() && updatePlaces(JSON.stringify(selectedCityId), '');
  }
  componentWillReceiveProps(nextProps) {
    const { updatePlaces, selectedCityId } = this.props;
    if (nextProps.selectedCityId !== selectedCityId) {
      updatePlaces(JSON.stringify(nextProps.selectedCityId), '');
    }
  }
  renderMap = () => {
    const { router, citiesById, selectedCityId, placesList } = this.props;
    const city = citiesById.get(JSON.stringify(selectedCityId));
    return (
      <Map
        router={router}
        center={city.get('coordinates').toJS()}
        markers={placesList}
        containerElement={
          <div style={{ height: 'calc(100vh - 112px)' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
      />
    );
  }
  renderLocationModal = () => {
    const {
      citiesList,
      selectedCityId,
      handleChangeSelectedCity,
      isSelectCityModalOpen,
      handleCloseSelectCityModal,
    } = this.props;
    return (
      <SelectCityModal
        citiesList={citiesList}
        selectedCityId={selectedCityId}
        handleChangeSelectedCity={handleChangeSelectedCity}
        isSelectCityModalOpen={isSelectCityModalOpen}
        handleCloseSelectCityModal={handleCloseSelectCityModal}
      />
    );
  }
  renderSelectCityButton = () => {
    const city = this.props.citiesById.get(JSON.stringify(this.props.selectedCityId));
    return (
      <SelectCityButton onClick={this.props.handleOpenSelectCityModal}>
        <Typography type="subheading" component="h2">
          {city.get('name')}<ArrowDropDownIcon />
        </Typography>
      </SelectCityButton>
    );
  }
  render() {
    return (
      <div>
        <Helmet
          title="Nearby"
          meta={[
            { name: 'description', content: 'Description of Nearby' },
          ]}
        />
        {this.renderLocationModal()}
        <SelectCityButtonWrapper>
          {this.renderSelectCityButton()}
        </SelectCityButtonWrapper>
        <MapContainer>
          {this.renderMap()}
        </MapContainer>
      </div>
    );
  }
}

const MapContainer = styled.section`
  margin: -0.5rem;
`;

const SelectCityButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0 1.25rem 0;
`;

const SelectCityButton = styled.button`
  border-bottom: 2px solid black;
  padding: 0;
`;

const { object, number, func, bool } = PropTypes;

Nearby.propTypes = {
  citiesList: object,
  placesList: object,
  updatePlaces: func.isRequired,
  citiesById: object,
  selectedCityId: number,
  router: object,
  isSelectCityModalOpen: bool,
  handleOpenSelectCityModal: func.isRequired,
  handleChangeSelectedCity: func.isRequired,
  handleCloseSelectCityModal: func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // UI
  selectedCityId: getSelectedCityId,
  isSelectCityModalOpen: getIsSelectCityModalOpen,
  // Entities
  citiesList: getCities,
  citiesById: getCitiesById,
  placesList: getPlaces,
});

function mapDispatchToProps(dispatch) {
  return {
    handleChangeSelectedCity: (params) => dispatch(changeSelectedCity(params)),
    handleCloseSelectCityModal: () => dispatch(closeSelectCityModal()),
    handleOpenSelectCityModal: () => dispatch(openSelectCityModal()),
    updatePlaces: (cityId, params) => dispatch(fetchPlaces(cityId, params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
