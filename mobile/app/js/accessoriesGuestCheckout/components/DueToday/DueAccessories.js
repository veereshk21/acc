import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../../common/HorizontalRule';

class DueAccessories extends Component {
  render() {
    const { cqContent } = this.props;
    const dueAccessories = this.props.accessories;
    return (
      <div>
        {dueAccessories.map((item, i) => {
          const accessoriesItems = [];
          for (let j = 0; j < item.quantity; j++) {
            accessoriesItems.push(<div key={i + '' + j + 'accessory'}>
              <Row>
                <Col xs={8}>
                  <p className="fontDisplayBold" dangerouslySetInnerHTML={{ __html: item.name }} />
                  <p className="fontSize_2">{item.color !== null && item.color} {(item.color !== null && item.size !== null) && ','} {item.size !== null && item.size}</p>
                  {(item.discountPercentage > 0) && (
                    <span className="displayBlock pad10 onlyTopPad">
                      <span>{parseInt(item.discountPercentage, 10)}</span>
                      <span>{cqContent.label.OD_DUE_TODAY_OFF_SALE}</span>
                    </span>)}
                  {/* <span>{item.quantity > 1 && <span> x {item.quantity}</span>}</span> */}
                </Col>
                <Col xs={4} className="textAlignRight">
                  {item.discounted ? (
                    <span>
                      <span className="displayBlock pad10 onlyTopPad">${item.price}</span>
                      <span className="textDecLineThrough color_gray_six">${item.wasPrice}</span>

                    </span>) : <span>${item.price}</span>
                  }
                </Col>

              </Row>
              <HorizontalRule y={1} color="#D8DADA" />
            </div>);
          }
          return accessoriesItems.map((accessories) => (
            <div>{accessories}</div>));
        })}
      </div>
    );
  }
}
DueAccessories.propTypes = {
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
};

export default DueAccessories;
