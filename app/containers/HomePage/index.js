/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { partial } from 'lodash';

import SearchBar from 'components/SearchBar';
import CardsList from 'components/CardsList';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import EmailIcon from 'material-ui-icons/Email';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import Typography from 'material-ui/Typography';

import Modal from 'components/Modal';
import messages from './messages';
import { getCities, getCitiesById } from 'entities/cities/selectors';
import { getPlaces } from 'entities/places/selectors';
import { getSelectedCityId, getIsSelectCityModalOpen } from './selectors';
import {
  changeSelectedCity,
  closeSelectCityModal,
  openSelectCityModal,
} from './actions';
import { fetchPlaces } from 'entities/places/actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { updatePlaces, citiesById, selectedCityId } = this.props;
    updatePlaces(JSON.stringify(selectedCityId), '');
  }
  componentWillReceiveProps(nextProps) {
    const { updatePlaces, citiesById, selectedCityId } = this.props;
    if (nextProps.selectedCityId !== selectedCityId) {
      updatePlaces(JSON.stringify(nextProps.selectedCityId), '');
    }
  }
  renderLocationModal = () => {
    const {
      citiesList,
      selectedCityId,
      handleChangeSelectedCity,
      isSelectCityModalOpen,
      handleCloseSelectCityModal,
    } = this.props;
    const onImageButtonClicked = (id) => {
      if (id !== selectedCityId) {
        handleChangeSelectedCity(id);
      }
      handleCloseSelectCityModal();
    }
    const images = citiesList.map((city) => {
      const name = city.get('name');
      const id = city.get('id');
      return (
        <ImageButton
          key={id}
          isSelected={id === selectedCityId}
          onClick={() => onImageButtonClicked(id)}
        >
          <CityName>
            {name}
          </CityName>
          <img alt={name} src="http://via.placeholder.com/280x200" />
        </ImageButton>
      );
    })
    return (
      <Modal
        isOpen={isSelectCityModalOpen}
        onCloseModal={handleCloseSelectCityModal}
      >
        <ImageButtonsWrapper>
          {images}
        </ImageButtonsWrapper>
      </Modal>
    );
  }
  renderSelectCityButton = () => {
    const city = this.props.citiesById.get(JSON.stringify(this.props.selectedCityId));
    return (
      <SelectCityButtonWrapper>
        <FormattedMessage {...messages.in} />
        <SelectCityButton onClick={this.props.handleOpenSelectCityModal}>
          {city.get('name')}<ArrowDropDownIcon />
        </SelectCityButton>
      </SelectCityButtonWrapper>
    );
  }
  render() {
    return (
      <div>
        <Helmet
          title="Aesthie"
          meta={[
            { name: 'Aesthie', content: 'Discover adventures near you' },
          ]}
        />
        <Location>
          <Typography type="subheading" component="h1">
            <FormattedMessage {...messages.intro} />
            {this.renderSelectCityButton()}
          </Typography>
        </Location>
        <SearchBarWrapper>
          <SearchBar
            selectedCityId={this.props.selectedCityId}
            onSearchButtonClicked={partial(this.props.updatePlaces, JSON.stringify(this.props.selectedCityId))}
          />
        </SearchBarWrapper>
        <CardsWrapper>
          <CardsList onCardClicked={this.props.router.push} places={this.props.placesList} />
        </CardsWrapper>
        {this.renderLocationModal()}
      </div>
    );
  }
}

const CardsWrapper = styled.section`
  margin-top: 1.5rem;
`

const Location = styled.section`
  text-align: center;
`

const SelectCityButton = styled.button`
  border-bottom: 2px solid black;
  padding: 0;
  margin-left: 0.5rem;
`

const SearchBarWrapper = styled.section`
  margin-top: 1rem;
`

const ImageButtonsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  align-items: center;
`

const ImageButton = styled.button`
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  opacity: ${props => props.isSelected ? 1 : 0.5}
`

const CityName = styled.div`
  position: absolute;
`

const SelectCityButtonWrapper = styled.div`
  text-align: center;
`

const { } = PropTypes;

HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
