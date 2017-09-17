/**
*
* Nav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { invert } from 'lodash';

import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import ExploreIcon from 'material-ui-icons/Explore';
import StarsIcon from 'material-ui-icons/Stars';
import LocationOnIcon from 'material-ui-icons/LocationOn';

import messages from './messages';

const StyledNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const PATH_HASH = {
  '/': 0,
  '/nearby': 1,
  '/influencer': 2,
};

class Nav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { router } = nextProps;
    const path = router.getCurrentLocation().pathname;
    if (path !== this.props.router.getCurrentLocation().pathname) {
      this.setState({
        value: PATH_HASH[path] || 0,
      });
    }
  }
  handleChange = (e, value) => {
    this.setState({ value });
    this.props.router.push(invert(PATH_HASH)[value]);
  }
  render() {
    return (
      <div>
        <StyledNav
          showLabels
          onChange={this.handleChange}
          value={this.state.value}
        >
          <BottomNavigationButton label={<FormattedMessage {...messages.discover} />} icon={<ExploreIcon />} />
          <BottomNavigationButton label={<FormattedMessage {...messages.nearby} />} icon={<LocationOnIcon />} />
          <BottomNavigationButton label={<FormattedMessage {...messages.influencer} />} icon={<StarsIcon />} />
        </StyledNav>
      </div>
    );
  }
}

const { shape, func } = PropTypes;

Nav.propTypes = {
  router: shape({
    push: func.isRequired,
  }),
};

export default Nav;
