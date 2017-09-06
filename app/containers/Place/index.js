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
import { fetchPlace } from './actions';
import { getPlace, getIsLoaded } from './selectors';
import { sentence } from 'change-case';

export class Place extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const id = this.props.router.getCurrentLocation().pathname.match(/\/{1}\d+/)[0].substring(1);
    this.props.updatePlace(parseInt(id));
  }
  componentWillReceiveProps(nextProps) {
    const { isLoaded, place } = nextProps;
    if (isLoaded && !place) {
      return this.props.router.push('/not_found');
    }
  }
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
          router, <ChevronLeftIcon />
          <FormattedMessage {...messages.back} />
        </StyledBackTypography>
      </StyledBackButton>
    );
  }
  renderHeaderInfo = () => {
    const { name, district } = this.props.place;
    return (
      <section>
        <Typography type="title" component="h1">
          {name}
        </Typography>
        <Typography type="subheading" component="h2">
          {district}
        </Typography>
      </section>
    );
  }
  renderControls = () => {
    const { author, coordinates: { lat, lng } } = this.props.place;
    const shareURL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    return (
      <Controls>
        <Typography type="body2" component="h3">
          <Chip
            avatar={<Avatar alt={author} src="http://via.placeholder.com/20x20" />}
            label={author}
          />
        </Typography>
        <div>
          <Button dense href={shareURL}><OpenInNewIcon />maps</Button>
          <Button dense><ShareIcon />share</Button>
        </div>
      </Controls>
    );
  }
  renderDescription = () => {
    return (
      <Description>
        <Typography type="body1" component="p">
          {this.props.place.description}
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
            {this.props.place.tips.map(tip => {
              return (
                <Typography key={tip} type="body1" component="p">
                  - {tip}
                </Typography>
              );
            })}
          </TipRow>
        </TipsList>
      </TipsListWrapper>
    );
  }
  renderInfoList = () => {
    return (
      <InfoList>
          {this.props.place.info.map(info => {
            return (
              <InfoItem key={Object.keys(info)[0]}>
                <Typography type="body2" component="h5">
                  {sentence(Object.keys(info)[0])}
                </Typography>
                <Typography type="body1" component="p">
                  {sentence(Object.values(info)[0])}
                </Typography>
              </InfoItem>
            );
          })}
      </InfoList>
    );
  }
  renderHashTags = () => {
    const tags = this.props.place.hash_tags.map(tag => {
      return (
        <StyledChip key={tag} label={`#${tag}`} />
      );
    });
    return (
      <HashTagsWrapper>
        {tags}
      </HashTagsWrapper>
    );
  }
  renderPlace = () => {
    const place = this.props.place;
    return (
      <div>
        <Helmet
          title={place.name}
          meta={[
            { name: 'description', content: place.name },
          ]}
        />
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
  render() {
    const { place } = this.props;
    return (
      <div>
        {place && this.renderPlace()}
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
  margin-left: -0.75rem;
`

const StyledBackTypography = styled(Typography)`
  display: flex !important;
`

const { } = PropTypes;

Place.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  place: getPlace,
  isLoaded: getIsLoaded,
});

function mapDispatchToProps(dispatch) {
  return {
    updatePlace: (id) => dispatch(fetchPlace(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
