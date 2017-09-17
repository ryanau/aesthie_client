/*
 *
 * Influencer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectInfluencer from './selectors';
import messages from './messages';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

export class Influencer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      instagram: '',
      youtube: '',
    };
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <Helmet
          title="Influencer"
          meta={[
            { name: 'description', content: 'Description of Influencer' },
          ]}
        />
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          onChange={(e) => this.handleChange('email', e)}
          margin="normal"
          type="email"
        />
        <TextField
          id="instagram"
          label="Instagram"
          value={this.state.instagram}
          onChange={(e) => this.handleChange('instagram', e)}
          margin="normal"
        />
        <TextField
          id="youtube"
          label="Youtube"
          value={this.state.youtube}
          onChange={(e) => this.handleChange('youtube', e)}
          margin="normal"
        />
      </div>
    );
  }
}

const { } = PropTypes;

Influencer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Influencer: makeSelectInfluencer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Influencer);
