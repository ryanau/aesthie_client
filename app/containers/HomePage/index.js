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
import SelectCityModal from 'components/SelectCityModal';

import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import Typography from 'material-ui/Typography';

import { getCities, getCitiesById } from 'entities/cities/selectors';
import { getPlaces } from 'entities/places/selectors';
import { getSelectedCityId } from 'root/selectors';
import { changeSelectedCity } from 'root/actions';
import { fetchPlaces } from 'entities/places/actions';
import messages from './messages';
import { getIsSelectCityModalOpen } from './selectors';
import { closeSelectCityModal, openSelectCityModal } from './actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
`;

const Location = styled.section`
  text-align: center;
`;

const SelectCityButton = styled.button`
  border-bottom: 2px solid black;
  padding: 0;
  margin-left: 0.5rem;
`;

const SearchBarWrapper = styled.section`
  margin-top: 1rem;
`;

const SelectCityButtonWrapper = styled.div`
  text-align: center;
`;

const { object, number, func, bool, shape } = PropTypes;

HomePage.propTypes = {
  citiesList: object,
  selectedCityId: number,
  handleChangeSelectedCity: func,
  isSelectCityModalOpen: bool,
  handleCloseSelectCityModal: func,
  placesList: object,
  updatePlaces: func,
  citiesById: object,
  handleOpenSelectCityModal: func,
  router: shape({
    push: func.isRequired,
  }),
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
