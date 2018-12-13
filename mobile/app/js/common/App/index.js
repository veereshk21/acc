/**
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

/**
 * This component communicates with store and retreive the notificationbar state,so as to position the
 * main section down accordingly.
 */

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Feedback from '../GlobalNav/Feedback';
import MyOffersBanner from '../MyOfferBanner/containers';
import NotificationBar from '../NotificationBar';
import SessionTimeOut from './../../common/SessionOut';
import ScrollToTop from './ScrollToTop';
import CostHeader from '../CostHeader';
// Importing Global Nav JSONs
// import gnav_vzwqa7 from './../../../json/globalNav/gnav_vzwqa7.json';
// import gnav_vzwqa1 from './../../../json/globalNav/gnav_vzwqa1.json';
// import gnav_vzwqa2 from './../../../json/globalNav/gnav_vzwqa2.json';
// import gnav_vzwqa8 from './../../../json/globalNav/gnav_vzwqa8.json';
// import gnav_vzwqa10 from './../../../json/globalNav/gnav_vzwqa10.json';
// import gnav_prod from './../../../json/globalNav/gnav_prod.json';
// import gnav_testman from './../../../json/globalNav/gnav_testman.json';


class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isFeedback: false,
    };
    this.openFeedback = this.openFeedback.bind(this);
  }
  componentDidMount = () => {
    // const host = window.location.hostname.split('.');
    // let environment = 'prod';
    // if (host[0].toLowerCase() === 'www') {
    //   environment = this.checkEnvironment(host[1]);
    // } else {
    //   environment = this.checkEnvironment(host[0]);
    // }
    // axios.get(__webpack_public_path__ + this.gnavMap[environment]).then((result) => {
    //   this.setState({ navJSON: result.data });
    // });
  }
  openFeedback(event) {
    event.preventDefault();
    this.setState({ isFeedback: true });
  }

  closeFeedback(event) {
    event.preventDefault();
    this.setState({ isFeedback: false });
  }

  checkEnvironment = (host) => {
    if (host.toLowerCase() === 'verizonwireless' || host.toLowerCase() === 'vzw' || host.toLowerCase() === 'localhost') {
      return 'prod';
    }
    return host.toLowerCase();
  }


  render() {
    // const ele = document.getElementsByClassName('promo-ribbon');
    const { sessionTimeOutJSON } = window;
    const className = (window.preOrderInterstitialJSON && !_.isEmpty(window.preOrderInterstitialJSON)) ? 'main_interstitial' : 'main';
    const gnDiv = document.getElementById('vzw-gn');
    const gnHeight = gnDiv ? gnDiv.offsetHeight : 0;
    let topHeight;
    let costHeaderTopHeight;
    const ccEnabled = window.upgradeHeaderJSON && !_.isEmpty(window.upgradeHeaderJSON) && (window.upgradeHeaderJSON.flow === 'EUP' || window.upgradeHeaderJSON.ccEnabled);
    if (window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON) && this.props.isNotificationVisible) {
      topHeight = gnHeight + 144;
      costHeaderTopHeight = ccEnabled && (gnHeight + 144);
    } else if (this.props.isNotificationVisible) {
      topHeight = gnHeight + 102;
      costHeaderTopHeight = ccEnabled && (gnHeight + 102);
    } else if (window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON)) {
      topHeight = 42;
      costHeaderTopHeight = ccEnabled && 42;
    } else {
      topHeight = 0;
      costHeaderTopHeight = ccEnabled && 0;
    }
    // const topHeight = (window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON) && this.props.isNotificationVisible) ? gnHeight + 144 : ((window.myOffersBannerJSON && !_.isEmpty(window.myOffersBannerJSON)) ? 42 : ((this.props.isNotificationVisible) ? gnHeight + 102 : 0));
    return (
      <div>
        {sessionTimeOutJSON && Object.keys(sessionTimeOutJSON).length > 0 && <SessionTimeOut {...sessionTimeOutJSON} />}
        {<NotificationBar page={this.props.location} />}
        <MyOffersBanner isNotificationVisible={this.props.isNotificationVisible} />
        <CostHeader topHeight={costHeaderTopHeight} />
        <main
          style={{ marginTop: !costHeaderTopHeight && topHeight }}
          className={className}
          id="page-wrap"
          role="main"
        >
          <section role="region">
            {(this.state.isFeedback) ?
              <Feedback closeFeedback={this.closeFeedback.bind(this)} /> : React.Children.toArray(this.props.children)}
          </section>
          <section className="contentstuff">
            <ScrollToTop />
            <Switch>
              {this.props.routemap.map((route, i) =>
                (<Route key={i} path={route.path} component={route.component} exact={route.exact} />))}
            </Switch>
          </section>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children:PropTypes.node, // eslint-disable-line
  routemap: PropTypes.array,
  location: PropTypes.object,
  isNotificationVisible: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isNotificationVisible: state.get('notification').isNotificationVisible,
});
export default withRouter(connect(mapStateToProps)(App));
