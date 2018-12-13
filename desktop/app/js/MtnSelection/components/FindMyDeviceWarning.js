import PropTypes from 'prop-types';
import React from 'react';

// import A from '../../common/A/A';
// import FindMyDeviceImg from '../../../images/find_my_phone_tmp.svg';

import AsyncComponent from '../../common/AsyncComponent';

const FindMyDeviceImg = AsyncComponent(() => import('../../../images/find_my_phone_tmp.svg'));
const A = AsyncComponent(() => import('../../common/A/A'));
export default class FindMyDeviceWarning extends React.Component {
  static defaultProps = {
    redirectURL: '/error',
  };
  static propTypes = {
    redirectURL: PropTypes.string,
    cqJSON: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.mediaStyle = {
      height: 235,
      width: 235,
    };
  }

  render() {
    return (
      <div className="pad24">
        <div>{this.props.cqJSON.label.DT_OD_MDN_TURN_OFF_IPHONE_TITLE}</div>
        <div className="mediaSplash_container" style={{ height: '50vh' }}>
          <div className="margin100 noSideMargin textAlignCenter media_splash pad20 background_lightGreen" style={this.mediaStyle} >
            <img src={FindMyDeviceImg} alt="" style={{ maxWidth: 105 }} className="img_boxShadow" />
          </div>
        </div>
        <p className="textAlignCenter fontSize_3 pad12 onlyBottomPad">{this.props.cqJSON.label.DT_OD_MDN_TURN_OFF_IPHONE_DESC}</p>
        <div className="textAlignCenter footerContent width100 margin20 noSideMargin">
          <A className="button large" href={this.props.redirectURL} analyticstrack="select-findMyDevice-redirect-link">{this.props.cqJSON.label.DT_OD_MDN_DPP_APPRAISAL_NEXT_CTA}</A>
        </div>
      </div>
    );
  }
}
