/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';

const SelectListItem = (props) => (
  <div className={`${props.className} clearfix  fontSize_3`}>
    <a aria-label={`${props.title} ${(props.value ? props.value : '')}`} analyticstrack="features-CTA" className="color_black clearfix block" role="button" href="df" onClick={props.onClickMethod}>
      <div className="">
        <div className=" clearfix">
          <div className=" verticalAlignMiddle textAlignLeft floatLeft">
            <div className=""><span className={props.fontSize ? `${props.fontSize} textDecUnderline` : 'textDecUnderline'}>{props.title}</span>
              {props.linkText &&
                <a role="button" analyticstrack="backupData-link" onClick={props.linkAction} className="pad5 block">{props.linkText}</a>}
            </div>
          </div>
          <div className=" verticalAlignMiddle textAlignRight  fontSize_4 floatLeft">
            <p className="floatRight price m-downArrow m-cpcPlanArrow"><span dangerouslySetInnerHTML={{ __html: props.value }} />
            </p>
            {props.subtext &&
              <p className="clearRight floatRight  textAlignRight color_4B4B4B fontSize_2">{props.subtext}</p>}
          </div>
        </div>
      </div>
    </a>
  </div>
);

SelectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  className: PropTypes.string,
  subtext: PropTypes.string,
  value: PropTypes.any,
  onClickMethod: PropTypes.func,
  linkAction: PropTypes.func,
  fontSize: PropTypes.string,
};

export default SelectListItem;
