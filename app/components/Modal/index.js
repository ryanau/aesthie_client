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

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Modal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.isOpen}
        onRequestClose={this.props.onCloseModal}
      >
        <CloseIconWrapper>
          <Button dense><CloseIcon onClick={this.props.onCloseModal} /></Button>
        </CloseIconWrapper>
        {this.props.children}
      </Dialog>
    );
  }
}

const CloseIconWrapper = styled.div`
  position: absolute;
  right: -5px;
  margin-top: 0.5rem;
  z-index: 10;
`

const { bool, func } = PropTypes;

Modal.propTypes = {
  isOpen: bool.isRequired,
  onCloseModal: func.isRequired,
};

export default Modal;
