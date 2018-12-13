/**
 * Component renders a simple list item with a arrow icon for selection.
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import A from './../../common/A/A';

const SelectListItem = (props) => {
  const { classLeftAction, classRightAction } = props;

  return (
    <div className={`${props.className} fontSize_5`}>
      <A href="#" aria-label={`${props.title} ${(props.value ? props.value : '')}`} className="color_000 textDecNone accordionPromo" onClick={props.onClickMethod}>
        <Row className="pad5 noLeftPad fontSize_5 accordion-header m-mathIcon" xs={12} sm={12} md={12} lg={12}>
          <Col className="verticalAlignMiddle textAlignLeft floatLeft" xs={parseInt(classLeftAction, 10)} sm={parseInt(classLeftAction, 10)} md={parseInt(classLeftAction, 10)} lg={parseInt(classLeftAction, 10)} >
            <div><span className="bold">{props.title}</span>
              {props.linkText &&
                <A tabIndex="0" onClick={props.linkAction} className="pad5 block">{props.linkText}</A>}
            </div>
          </Col>
          <Col className="verticalAlignMiddle textAlignRight fontSize_4 floatLeft" xs={parseInt(classRightAction, 10)} sm={parseInt(classRightAction, 10)} md={parseInt(classRightAction, 10)} lg={parseInt(classRightAction, 10)} >
            <p className="floatRight price accordion-header m-downArrow m-cpcPlanArrow"><span dangerouslySetInnerHTML={{ __html: props.value }} />
              <span tabIndex="0" className={props.hideCTA ? ' fontSize_3' : ' arrowCTA fontSize_3'} />
            </p>
            {props.subtext &&
              <p className="clearRight floatRight  textAlignRight color_4B4B4B fontSize_2">{props.subtext}</p>}
          </Col>
        </Row>
      </A>
    </div>
  );
};

SelectListItem.propTypes = {
  title: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  className: PropTypes.string,
  subtext: PropTypes.string,
  value: PropTypes.any,
  onClickMethod: PropTypes.func,
  linkAction: PropTypes.func,
  hideCTA: PropTypes.bool,
  classLeftAction: PropTypes.any,
  classRightAction: PropTypes.any,
};
export default SelectListItem;
