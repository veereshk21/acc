/* eslint-disable jsx-a11y/tabindex-no-positive,react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import HeroPrice from './../../../common/HeroPrice/';
import DueAccessories from './DueAccessories';
import DueAccessoriesBundle from './DueAccessoriesBundle';
import BackButton from '../../../common/BackButton/';
import HorizontalRule from '../../../common/HorizontalRule';

class DueToday extends Component {
  render() {
    const { cqContent } = this.props;
    const { dueTodayData } = this.props;
    return (
      <Grid className="pad12 onlyTopPad">
        <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
        <Row className="noSideMargin pad24 noBottomPad">
          <Col xs={12} className="noSideMargin">
            <h1 className="pad24 noSidePad">{dueTodayData.title}</h1>
            <HorizontalRule />
          </Col>

        </Row>
        <HeroPrice displayPrice={dueTodayData.dueTodayPrice} tabIndex="1" />
        <Row className="noSideMargin pad24">
          {((dueTodayData.accessoriesBundle && dueTodayData.accessoriesBundle.length > 0) ||
            (dueTodayData.accessories && dueTodayData.accessories.length > 0)) &&

            <Col xs={12}>
              <Row >
                <Col xs={12}>
                  <h2 className="h3" id="Accessories_title"> {cqContent.label.OD_CHECKOUT_ACCESSORIES_SECTION_TITLE}</h2>
                  <HorizontalRule y={1} />
                </Col>
              </Row>
              {dueTodayData.accessoriesBundle && dueTodayData.accessoriesBundle.length > 0 &&
                <DueAccessoriesBundle
                  cqContent={cqContent}
                  accessoriesBundle={dueTodayData.accessoriesBundle}
                />
              }
              {dueTodayData.accessories && dueTodayData.accessories.length > 0 &&
                <DueAccessories
                  cqContent={cqContent}
                  accessories={dueTodayData.accessories}
                />
              }
            </Col>
          }

        </Row>
        {(dueTodayData.additionalCharges) &&
          <Row className="noSideMargin pad24">
            <Col xs={12}>
              <h2 className="h3">{dueTodayData.additionalCharges.title}</h2>
              <HorizontalRule y={1} />
            </Col>
            <Col xs={12}>
              {dueTodayData.additionalCharges.items.map((additionalCharge, id) => (
                <Row key={id} >
                  <Col xs={8}>
                    <span className="block fontDisplayBold">{additionalCharge.name} </span>
                    <span className="block color_333 fontSize_2">{additionalCharge.description}</span>
                  </Col>
                  <Col xs={4} className="textAlignRight">${additionalCharge.price}</Col>
                  <Col xs={12}>
                    <HorizontalRule y={1} color="#D8DADA" />
                  </Col>
                </Row>
              ))
              }

            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

DueToday.propTypes = {
  cqContent: PropTypes.object,
  dueTodayData: PropTypes.object,
};

export default DueToday;
