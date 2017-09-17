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
import styled from 'styled-components';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import HeartIcon from 'material-ui-icons/Favorite';

import makeSelectInfluencer from './selectors';
import messages from './messages';

export class Influencer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      instagram: '@',
      phone: '',
    };
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value,
    });
  }
  render() {
    return (
      <Container>
        <Helmet
          title="Influencer"
          meta={[
            { name: 'description', content: 'Description of Influencer' },
          ]}
        />
        <DescriptionWrapper>
          <What>
            <Typography type="headline" component="h2">
              <FormattedMessage {...messages.what} />
            </Typography>
          </What>
          <Description>
            <Typography type="body1" component="h2">
              <FormattedMessage {...messages.description} />
            </Typography>
          </Description>
          <SignOff>
            <Typography type="body1" component="h2">
              <FormattedMessage {...messages.signOff} /><StyledHeartIcon />
            </Typography>
          </SignOff>
        </DescriptionWrapper>
        <FormGroup>
          <TextField
            id="phone"
            label={<FormattedMessage {...messages.phone} />}
            value={this.state.phone}
            onChange={(e) => this.handleChange('phone', e)}
            margin="normal"
            type="number"
            fullWidth
          />
          <TextField
            id="email"
            label={<FormattedMessage {...messages.email} />}
            value={this.state.email}
            onChange={(e) => this.handleChange('email', e)}
            margin="normal"
            type="email"
            helperText={<FormattedMessage {...messages.required} />}
            fullWidth
            required
          />
          <TextField
            id="instagram"
            label={<FormattedMessage {...messages.instagram} />}
            value={this.state.instagram}
            onChange={(e) => this.handleChange('instagram', e)}
            margin="normal"
            helperText={<FormattedMessage {...messages.required} />}
            fullWidth
            required
          />
          <StyledSignUpButton raised color="primary">
            <FormattedMessage {...messages.signUp} />
          </StyledSignUpButton>
        </FormGroup>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 1rem;
`

const DescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`

const What = styled.div`
  margin-bottom: 1rem;
`
const Description = styled.div`
  margin-bottom: 1rem;
`

const SignOff = styled.div`
  align-self: flex-end;
`

const StyledSignUpButton = styled(Button)`
  margin-top: 1rem;
`

const StyledHeartIcon = styled(HeartIcon)`
  color: purple;
  font-size: 12px;
`

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
