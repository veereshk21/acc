/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */
import React from 'react';

__webpack_public_path__ = window.resourceBaseUrl;

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="textAlignCenter">
          <div className="vh80 ">
            <div className="pad48 ">
              <div className="pad60 onlyTopPad">
                <i className="f-icon_sad" />
              </div>
              <h2 className="fontSize_5">We&apos;re having trouble connecting.</h2>
              <p className="pad12 fontSize_2">You may want to check up on your network, then try again</p>
            </div>
          </div>
          <div>
            <a className="button" href="/">Ok</a>
          </div>
        </div>
      </div>
    );
  }
}
