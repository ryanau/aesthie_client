/**
*
* SearchBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select/dist/react-select';
import { FormattedMessage } from 'react-intl';

import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';

import generateTags from 'data/generateTags';
import messages from './messages';

const generateOptions = (cityId) => generateTags(cityId).map((tag) => ({
  label: `#${tag}`,
  value: tag,
}));

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
          placeholder={<FormattedMessage {...messages.placeholder} />}
          options={generateOptions(JSON.stringify(this.props.selectedCityId))}
          value={this.state.searchQuery}
          onChange={this.handleSelectChanged}
        />
        <StyledSearchButton
          raised
          dense
          color="primary"
          style={{ padding: 0 }}
          onClick={() => this.props.onSearchButtonClicked(this.state.searchQuery.map((v) => v.value))}
        >
          <SearchIcon />
        </StyledSearchButton>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-right: 0.25rem;
  font-size: 16px;
`;

const StyledSearchButton = styled(Button)`
  height: 35px;
`;

const { number, func } = PropTypes;

SearchBar.propTypes = {
  selectedCityId: number.isRequired,
  onSearchButtonClicked: func.isRequired,
};

export default SearchBar;
