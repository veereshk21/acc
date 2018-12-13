
/**
 * GenericError
 *
 * This is the page we show when the user visits a url that doesn't have a output
 *
 */

import React from 'react';
import AlertImage from '../../../images/Verizon_Alert_Icon.svg';

export default class GenericError extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="textAlignCenter">
          <div className="vh80 ">
            <div className="pad48 ">
              <div className="pad60 onlyTopPad">
                <img className="svg-icon_alert" src={`${AlertImage}`} aria-hidden="true" alt="warning" />
              </div>
              <h2 className="fontSize_5">Oops something went wrong</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
