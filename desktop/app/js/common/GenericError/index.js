/**
 * GenericError
 *
 * This is the page we show when the user visits a url that doesn't have a output
 *
 */

import React from 'react';

export default class GenericError extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="textAlignCenter">
          <div className="vh80 ">
            <div className="pad48 ">
              <div className="pad60 onlyTopPad">
                <i className="f-icon_sad" />
              </div>
              <h2 className="fontSize_5">Oops something went wrong</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
