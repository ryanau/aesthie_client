/**
*
* SelectCityModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';

import Typography from 'material-ui/Typography';

import Modal from 'components/Modal';
// import messages from './messages';

class SelectCityModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
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
    };
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
            <Typography type="headline" component="h1">
              {name}
            </Typography>
          </CityName>
          <img alt={name} src="https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=280" />
        </ImageButton>
      );
    });
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
}

const CityName = styled.div`
  position: absolute;
  color: white;
`;

const ImageButtonsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  align-items: center;
`;

const ImageButton = styled.button`
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  opacity: ${(props) => props.isSelected ? 1 : 0.3}
`;

const { object, number, bool, func } = PropTypes;

SelectCityModal.propTypes = {
  citiesList: object,
  selectedCityId: number,
  handleChangeSelectedCity: func,
  isSelectCityModalOpen: bool,
  handleCloseSelectCityModal: func,
};

export default SelectCityModal;
