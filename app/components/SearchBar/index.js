/**
*
* SearchBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import generateTags from 'data/generateTags';

const generateOptions = (cityId) => generateTags(cityId).map(tag => {
  return {
    label: `#${tag}`,
    value: tag,
  }
});

class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: [],
    };
  }
  handleSelectChanged = (value) => {
    this.setState({ searchQuery: value });
  }
  render() {
    return (
      <Container>
        <StyledSelect
          multi
          placeholder="Try '#blue' or '#graffiti'"
          options={generateOptions(JSON.stringify(this.props.selectedCityId))}
          value={this.state.searchQuery}
          onChange={this.handleSelectChanged}
        />
        <StyledSearchButton
          raised
          dense
          color="primary"
          style={{ padding: 0 }}
          onClick={() => this.props.onSearchButtonClicked(this.state.searchQuery.map(v => v.value))}
        >
          <SearchIcon />
        </StyledSearchButton>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
`

const StyledSelect = styled(Select)`
  width: 100%;
  margin-right: 0.25rem;
  font-size: 16px;
`

const StyledSearchButton = styled(Button)`
  height: 35px;
`

const {  } = PropTypes;

SearchBar.propTypes = {

};

export default SearchBar;
