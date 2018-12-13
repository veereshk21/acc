import React from 'react';
import axios from 'axios';
import AlertImage from '../../../images/Verizon_Alert_Icon.svg';
import Button from '../Button/Button';
import cq from './../../../cq/cq_errorPage.json';

__webpack_public_path__ = window.resourceBaseUrl;
const backupErrorJSON = {
  response: {
    errorMap: {
      title: 'Your request could not be processed.',
      message: 'We are currently experiencing a high volume of traffic and are unable to process your request. We apologize for any inconvenience this may have caused and ask that you try again later.',
      secondaryCTA: null,
      primaryCTA: {
        label: 'Home',
        link: '/digital/shoplanding/',
        className: 'button primary large',
      },
    },
  },
};
export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorJSON: null,
    };
  }

  componentDidMount = () => {
    axios.get(__webpack_public_path__ + cq).then((result) => {
      this.setState({ errorJSON: result.data });
    }).catch(() => {
      this.setState({ errorJSON: backupErrorJSON });
    });
  }
  onBtnClick = (cta) => {
    window.location = cta.link;
  }
  render() {
    const { errorJSON } = this.state;
    if (errorJSON) {
      const { errorMap } = errorJSON.response;
      const { secondaryCTA, primaryCTA } = errorMap;
      return (
        <div>
          <div className="vh70">
            <div className="pad24 textAlignCenter">
              <div className="margin48 onlyTopMargin">
                <img className="svg-icon_alert" src={`${AlertImage}`} alt="error" aria-hidden="true" />
              </div>
              <h2 className="fontSize_6">{errorMap.title}</h2>
              <p className="fontSize_3">{errorMap.message}</p>
            </div>
          </div>
          <div className="textAlignCenter">
            {secondaryCTA && <Button className={secondaryCTA.className} onClick={() => { this.onBtnClick(secondaryCTA); }} >{secondaryCTA.label}</Button>}
            {primaryCTA && <Button className={primaryCTA.className} onClick={() => { this.onBtnClick(primaryCTA); }} >{primaryCTA.label}</Button>}
          </div>
        </div>
      );
    }
    return null;
  }
}
