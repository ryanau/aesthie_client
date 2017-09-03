/**
*
* Nav
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import ExploreIcon from 'material-ui-icons/Explore';
import StarsIcon from 'material-ui-icons/Stars';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import { invert } from 'lodash';

import { FormattedMessage } from 'react-intl';
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
  componentDidMount() {
    const { router } = this.props;
    const path = router.getCurrentLocation().pathname;
    this.setState({
      value: PATH_HASH[path] || 0,
    });
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
          <BottomNavigationButton label="Discover" icon={<ExploreIcon />} />
          <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
          <BottomNavigationButton label="Influencer" icon={<StarsIcon />} />
        </StyledNav>
      </div>
    );
  }
}

const {  } = PropTypes;

Nav.propTypes = {

};

export default Nav;
