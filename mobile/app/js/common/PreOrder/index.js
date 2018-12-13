import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from '../Title/Title';
import CountdownClock from '../../expressConfig/components/CountdownClock';

export const getCookie = (name) => {
  const pattern = RegExp(name + '=.[^;]*');
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return false;
};
class PreorderPromo extends Component {
  onCountDownComplete = () => {
    this.props.onCountDownComplete();
  };
  render() {
    const {
      givenDate, image, title, enableCountdown, ButtonMap, subTitle,
    } = this.props;
    const actionURL = getCookie('loggedIn') ? ButtonMap.SecondaryButton.digitalActionURL : '/vzw/devices';
    const redirectURL = getCookie('loggedIn') ? ButtonMap.SecondaryButton.redirectLoginURL : ButtonMap.SecondaryButton.redirectURL;
    return (
      <div>
        <div className=" pad18" style={{ height: 'calc(100vh - 50px)' }}>
          <Title className="fontSize_6">{title}</Title>
          <div className="pad12" style={{ height: '65vh' }}>
            {enableCountdown && <CountdownClock givenDate={givenDate} onComplete={this.onCountDownComplete} cssClass="fontSize_2-8" styleName={{ fontSize: '2.4rem' }} />}
            {subTitle && <p className="pad12 noBottomPad noLeftPad" dangerouslySetInnerHTML={{ __html: subTitle }} />}
            <div className="pad18">
              <img src={`${image}?hei=280`} alt="new device" />
            </div>
          </div>
          <div>
            {ButtonMap.SecondaryButton.digitalActionURL && <a href={actionURL} className="button secondary large margin12">{ButtonMap.SecondaryButton.title}</a>}
            <a disabled className="button large margin12 onlySideMargin disabled">{ButtonMap.PrimaryButton.title}</a>
          </div>
          {ButtonMap.SecondaryButton.redirectTitle && <p className="pad12" ><a href={redirectURL}>{ButtonMap.SecondaryButton.redirectTitle}</a></p>}
        </div>
      </div>
    );
  }
}

PreorderPromo.propTypes = {
  givenDate: PropTypes.string,
  image: PropTypes.string,
  onCountDownComplete: PropTypes.func,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  enableCountdown: PropTypes.bool,
  ButtonMap: PropTypes.object,
  subTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

export default PreorderPromo;
