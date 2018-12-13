/**
 * Created by sgumma on 22-02-2017.
 */
import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from './ActionButton';

const ErrorComponent = (props) => (
  <div className="section group grid vh70">
    <div className="">
      <div className="pad24  margin42 onlyTopMargin">
        <h1 className="margin6 onlyTopMargin" dangerouslySetInnerHTML={{ __html: props.errorMap.title }} />
        <p className="fontSize_6 bold margin18 onlyTopMargin">{props.errorMap.message}</p>
      </div>
    </div>
    <div className="pad10">
      {props.errorMap.secondaryCTA && <ActionButton cta={props.errorMap.secondaryCTA} btnType="button secondary large" onAjaxRequest={props.onAjaxRequest} />}
      {props.errorMap.primaryCTA && <ActionButton cta={props.errorMap.primaryCTA} btnType="button primary large" onAjaxRequest={props.onAjaxRequest} />}
    </div>
  </div>
);

ErrorComponent.propTypes = {
  errorMap: PropTypes.object,
  onAjaxRequest: PropTypes.func,
};

export default ErrorComponent;
