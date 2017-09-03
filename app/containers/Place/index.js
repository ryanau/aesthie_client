/*
 *
 * Place
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPlace from './selectors';
import messages from './messages';
import Slider from 'react-slick';
import Button from 'material-ui/Button';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ShareIcon from 'material-ui-icons/Share';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

export class Place extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderImagesSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 2000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <StyledSlider {...settings}>
        <img
          alt="article-banner"
          src="http://via.placeholder.com/180x180"
        />
        <img
          alt="article-banner"
          src="http://via.placeholder.com/180x180"
        />
        <img
          alt="article-banner"
          src="http://via.placeholder.com/180x180"
        />
        <img
          alt="article-banner"
          src="http://via.placeholder.com/180x180"
        />
        <img
          alt="article-banner"
          src="http://via.placeholder.com/180x180"
        />
      </StyledSlider>
    );
  }
  renderBackButton = () => {
    return (
      <StyledBackButton onClick={() => {this.props.router.push('/')}}>
        <StyledBackTypography type="subheading" component="h3">
          <ChevronLeftIcon />
          <FormattedMessage {...messages.back} />
        </StyledBackTypography>
      </StyledBackButton>
    );
  }
  renderHeaderInfo = () => {
    return (
      <section>
        <Typography type="title" component="h1">
          Pink Wall
        </Typography>
        <Typography type="subheading" component="h2">
          Mission
        </Typography>
      </section>
    );
  }
  renderControls = () => {
    return (
      <Controls>
        <Typography type="body2" component="h3">
          <Chip
            avatar={<Avatar alt="name" src="http://via.placeholder.com/20x20" />}
            label="Ryan Au"
          />
        </Typography>
        <div>
          <Button dense href="https://www.google.com/maps/@37.7841393,-122.3957547,15z"><OpenInNewIcon />maps</Button>
          <Button dense><ShareIcon />share</Button>
        </div>
      </Controls>
    );
  }
  renderDescription = () => {
    return (
      <Description>
        <Typography type="body1" component="p">
          Chicken venison turducken cupim, sausage filet mignon andouille strip steak kielbasa fatback biltong pork belly. Pork strip steak leberkas fatback ball tip. Ham rump pork loin tri-tip cow biltong, tail drumstick frankfurter beef ribs. Drumstick spare ribs pork loin pork belly jerky salami beef, ball tip shank meatloaf corned beef pancetta porchetta hamburger filet mignon. Shank filet mignon ribeye ham hock salami.
        </Typography>
      </Description>
    );
  }
  renderTipsList = () => {
    return (
      <TipsListWrapper>
        <Typography type="subheading" component="h4">
          Tips
        </Typography>
        <TipsList>
          <TipRow>
            <Typography type="body1" component="p">
              - Chicken venison turducken cupim, sausage filet mignon
            </Typography>
            <Typography type="body1" component="p">
              - Chicken venison turducken cupim, sausage filet mignon
            </Typography>
          </TipRow>
        </TipsList>
      </TipsListWrapper>
    );
  }
  renderInfoList = () => {
    return (
      <InfoList>
        <InfoItem>
          <Typography type="body2" component="h5">
            Parking
          </Typography>
          <Typography type="body1" component="p">
            Street
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography type="body2" component="h5">
            Neighborhood
          </Typography>
          <Typography type="body1" component="p">
            Clean
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography type="body2" component="h5">
            Popularity
          </Typography>
          <Typography type="body1" component="p">
            Iconoic
          </Typography>
        </InfoItem>
        <InfoItem>
          <Typography type="body2" component="h5">
            Temporary
          </Typography>
          <Typography type="body1" component="p">
            No
          </Typography>
        </InfoItem>
      </InfoList>
    );
  }
  renderHashTags = () => {
    return (
      <HashTagsWrapper>
        <StyledChip label="#pink" />
        <StyledChip label="#wallsize" />
        <StyledChip label="#mission" />
        <StyledChip label="#pinkwall" />
      </HashTagsWrapper>
    );
  }
  render() {
    return (
      <div>
        <Helmet
          title="Place"
          meta={[
            { name: 'description', content: 'Description of Place' },
          ]}
        />
        {this.renderBackButton()}
        {this.renderImagesSlider()}
        {this.renderHeaderInfo()}
        {this.renderControls()}
        <Divider light />
        {this.renderTipsList()}
        <Divider light />
        {this.renderDescription()}
        <Divider light />
        {this.renderInfoList()}
        <Divider light />
        {this.renderHashTags()}
      </div>
    );
  }
}

const StyledSlider = styled(Slider)`
  margin-bottom: 2.25rem;
`

const Controls = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Description = styled.section`
  margin: 1rem 0;
`

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const TipRow = styled.li`
  margin-top: 0.25rem;
`

const TipsListWrapper = styled.section`
  margin: 1rem 0;
`

const InfoList = styled.section`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const InfoItem = styled.div`
  width: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HashTagsWrapper = styled.section`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`

const StyledChip = styled(Chip)`
  margin: 0 0.25rem 0.25rem 0.25rem;
`

const StyledBackButton = styled.button`
  margin-left: -10px;
`

const StyledBackTypography = styled(Typography)`
  display: flex !important;
`

const { } = PropTypes;

Place.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Place: makeSelectPlace(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
