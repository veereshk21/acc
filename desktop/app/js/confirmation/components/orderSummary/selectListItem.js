/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';

const SelectListItem = (props) => (
  <div className={`${props.className} clearfix  fontSize_5`}>
    <a aria-label={`${props.title} ${(props.value ? props.value : '')}`} className="color_000 clearfix block" role="button" href="df" onClick={props.onClickMethod}>
      <div className="">
        <div className=" clearfix">
          <div className=" verticalAlignMiddle textAlignLeft floatLeft">
            <div className=""><span className="bold  textDecUnderline">{props.title}</span>
              {props.linkText &&
                <a role="button" onClick={props.linkAction} className="pad5 block">{props.linkText}</a>}
            </div>
          </div>
          <div className=" verticalAlignMiddle textAlignRight  fontSize_4 floatLeft">
            <p className="floatRight price m-downArrow m-cpcPlanArrow"><span dangerouslySetInnerHTML={{ __html: props.value }} />
              <span className={props.hideCTA ? 'bold  fontSize_3' : '  margin5 noBottomMargin displayInlineBlock bold arrowCTA fontSize_1'} />
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
  hideCTA: PropTypes.bool,
};

export default SelectListItem;
