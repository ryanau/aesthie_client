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
import { sentence } from 'change-case';
import CopyToClipboard from 'react-copy-to-clipboard';
import Slider from 'react-slick';

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import OpenInNewIcon from 'material-ui-icons/OpenInNew';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';

import messages from './messages';
import { fetchPlace } from './actions';
import { getPlace, getIsLoaded } from './selectors';

export class Place extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isCopySnackBarOpen: false,
    };
  }
  componentDidMount() {
    const id = this.props.router.getCurrentLocation().pathname.match(/\/{1}\d+/)[0].substring(1);
    this.props.updatePlace(parseInt(id));
  }
  componentWillReceiveProps(nextProps) {
    const { isLoaded, place } = nextProps;
    if (isLoaded && !place) {
      return this.props.router.push('/not_found');
    }
    return null;
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
      slidesToScroll: 1,
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
  renderBackButton = () => (
    <StyledBackButton onClick={() => { this.props.router.push('/'); }}>
      <StyledBackTypography type="subheading" component="h3">
          router, <ChevronLeftIcon />
        <FormattedMessage {...messages.back} />
      </StyledBackTypography>
    </StyledBackButton>
    )
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
        <Author>
          <Typography type="body2" component="h3">
            <Chip
              avatar={<Avatar alt={author} src="http://via.placeholder.com/20x20" />}
              label={author}
            />
          </Typography>
        </Author>
        <ControlButtonWrapper>
          <Button dense href={shareURL}><OpenInNewIcon />maps</Button>
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => { this.setState({ isCopySnackBarOpen: true }); }}
          >
            <Button
              dense
            >
              <FormattedMessage {...messages.copyLink} />
            </Button>
          </CopyToClipboard>
          <Button
            dense
            color="primary"
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          >
            <FormattedMessage {...messages.shareFB} />
          </Button>
        </ControlButtonWrapper>
      </Controls>
    );
  }
  renderCopySnackBar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={this.state.isCopySnackBarOpen}
      autoHideDuration={2000}
      onRequestClose={() => { this.setState({ isCopySnackBarOpen: false }); }}
      message={<FormattedMessage {...messages.url} />}
    />

    )
  renderDescription = () => (
    <Description>
      <Typography type="body1" component="p">
        {sentence(this.props.place.description)}
      </Typography>
    </Description>
    )
  renderTipsList = () => (
    <TipsListWrapper>
      <Typography type="subheading" component="h4">
          Tips
        </Typography>
      <TipsList>
        <TipRow>
          {this.props.place.tips.map((tip) => (
            <Typography key={tip} type="body1" component="p">
                  - {sentence(tip)}
            </Typography>
              ))}
        </TipRow>
      </TipsList>
    </TipsListWrapper>
    )
  renderInfoList = () => (
    <InfoList>
      {this.props.place.info.map((info) => (
        <InfoItem key={Object.keys(info)[0]}>
          <Typography type="body2" component="h5">
            {sentence(Object.keys(info)[0])}
          </Typography>
          <Typography type="body1" component="p" noWrap>
            {sentence(Object.values(info)[0])}
          </Typography>
        </InfoItem>
            ))}
    </InfoList>
    )
  renderHashTags = () => {
    const tags = this.props.place.hash_tags.map((tag) => (
      <StyledChip key={tag} label={`#${tag}`} />
      ));
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
        {this.renderCopySnackBar()}
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
`;

const Controls = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.section`
  margin: 1rem 0;
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TipRow = styled.li`
  margin-top: 0.25rem;
`;

const TipsListWrapper = styled.section`
  margin: 1rem 0;
`;

const InfoList = styled.section`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HashTagsWrapper = styled.section`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.2rem 0.25rem 0.2rem;
`;

const StyledBackButton = styled.button`
  margin-left: -0.75rem;
`;

const StyledBackTypography = styled(Typography)`
  display: flex !important;
`;

const Author = styled.div`
  align-self: flex-start;
  margin-top: 0.25rem;
`;

const ControlButtonWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const { shape, func, string, number, arrayOf, object } = PropTypes;

Place.propTypes = {
  router: shape({
    push: func.isRequired,
  }),
  place: shape({
    name: string,
    district: string,
    author: string,
    coordinates: shape({
      lat: number,
      lng: number,
    }),
    tips: arrayOf(string),
    info: arrayOf(object),
    hash_tags: arrayOf(string),
  }),
  updatePlace: func.isRequired,
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
