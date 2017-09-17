/**
*
* Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class Modal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { isOpen, onCloseModal, children } = this.props;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onRequestClose={onCloseModal}
      >
        <CloseIconWrapper>
          <Button dense><CloseIcon onClick={onCloseModal} /></Button>
        </CloseIconWrapper>
        {children}
      </Dialog>
    );
  }
}

const CloseIconWrapper = styled.div`
  position: absolute;
  right: -5px;
  margin-top: 0.5rem;
  z-index: 10;
`;

const { bool, func, element } = PropTypes;

Modal.propTypes = {
  isOpen: bool.isRequired,
  onCloseModal: func.isRequired,
  children: element.isRequired,
};

export default Modal;
