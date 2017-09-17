/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/Nav';
import styled from 'styled-components';

import withProgressBar from 'components/ProgressBar';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node,
    router: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Container>
          {React.Children.toArray(this.props.children)}
        </Container>
        <Nav router={this.props.router} />
      </div>
    );
  }
}

const Container = styled.div`
  padding: 0.5rem 0.5rem 5rem 0.5rem;
`;

export default withProgressBar(App);
