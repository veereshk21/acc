/**
 * Created by sgumma on 22-02-2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import AlertImage from '../../../images/Verizon_Alert_Icon.svg';


export default class ErrorComponent extends React.Component {
  render() {
    const { errorMap, onAjaxRequest } = this.props;
    return (
      <div>
        <div className="vh70">
          <div className="pad24 textAlignCenter">
            <div className="margin48 onlyTopMargin">
              <img className="svg-icon_alert" src={`${AlertImage}`} aria-hidden="true" alt="warning" />
            </div>
            <h2 className="fontSize_6" dangerouslySetInnerHTML={{ __html: errorMap.title }} />
            <p className="fontSize_3">{errorMap.message}</p>

          </div>
        </div>
        <div className="textAlignCenter">
          {errorMap.secondaryCTA && <ActionButton cta={errorMap.secondaryCTA} btnType="button secondary large" onAjaxRequest={onAjaxRequest} statedata={this.state} /> }
          {errorMap.primaryCTA && <ActionButton cta={errorMap.primaryCTA} btnType="button primary large" onAjaxRequest={onAjaxRequest} statedata={this.state} /> }
        </div>
      </div>
    );
  }
}


ErrorComponent.propTypes = {
  errorMap: PropTypes.object,
  onAjaxRequest: PropTypes.func,
};
