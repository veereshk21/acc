import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../../common/HorizontalRule';

const DueAccessoriesBundle = (props) => (
  <div>
    {props.accessoriesBundle.map((item, i) => (
      <Row key={item.displayName + '-' + i} >
        <Col xs={8}>
          <p className="fontDisplayBold" dangerouslySetInnerHTML={{ __html: item.displayName }} />
          {(item.discountPercentage > 0) && (
            <span className="displayBlock pad10 onlyTopPad">
              <span>{parseInt(item.discountPercentage, 10)}</span>
              <span>{props.cqContent.label.OD_DUE_TODAY_OFF_SALE}</span>
            </span>)}
        </Col>
        <Col xs={4} className="textAlignRight">
          {item.discounted ?
            <span>
              <span className="displayBlock pad10 onlyTopPad">${item.discountedPrice}</span>
              <span className="textDecLineThrough color_gray_six">${item.regularPrice}</span>
            </span>
            :
            <span>${item.regularPrice}</span>
          }
        </Col>
        <Col xs={12}>
          <HorizontalRule y={1} color="#D8DADA" />
        </Col>
      </Row>
    ))}
  </div>
);

DueAccessoriesBundle.propTypes = {
  accessoriesBundle: PropTypes.array.isRequired,
  cqContent: PropTypes.object,
};

export default DueAccessoriesBundle;
