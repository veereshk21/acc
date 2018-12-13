/* eslint-disable jsx-a11y/tabindex-no-positive,react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

import DueItems from '../components/DueItems';
import DueAccessories from '../components/DueAccessories';
import DueAccessoriesBundle from '../components/DueAccessoriesBundle';

class DueToday extends Component {
  render() {
    const {
      dueTodayData, accessories, cqContent, itemsData, plans, lineLevelOpted,
    } = this.props;
    return (
      <Grid className="pad12 noSidePad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{dueTodayData.title}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={dueTodayData.dueTodayPrice} />
            <DueItems
              items={dueTodayData.items}
              title={cqContent.label.OD_CHECKOUT_DEVICES_SECTION_TITLE}
              devices={itemsData}
              plans={plans}
              lineLevelOpted={lineLevelOpted}
              dueToday
            />
            {((dueTodayData.accessoriesBundle && dueTodayData.accessoriesBundle.length > 0) ||
              (accessories && accessories.length > 0)) &&

              <div>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_ACCESSORIES_SECTION_TITLE }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                {dueTodayData.accessoriesBundle && dueTodayData.accessoriesBundle.length > 0 &&
                  <DueAccessoriesBundle
                    cqContent={cqContent}
                    accessoriesBundle={dueTodayData.accessoriesBundle}
                  />
                }
                {accessories && accessories.length > 0 &&
                  <DueAccessories
                    cqContent={cqContent}
                    accessories={accessories}
                  />
                }
              </div>
            }
            {(dueTodayData.additionalCharges) &&
              <div>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: dueTodayData.additionalCharges.title }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                {
                  dueTodayData.additionalCharges.items.map((additionalCharge, id) => (
                    <ItemBreakdown
                      key={`addl-${id}`}
                      name={<span className="fontSize_1_3 fontDisplayMedium">{additionalCharge.name} </span>}
                      price={additionalCharge.price}
                    >
                      <p className="color_gray_six">{additionalCharge.description}</p>
                      {additionalCharge.instantCreditDescription &&
                        <div
                          className="margin12 onlyTopMargin"
                          dangerouslySetInnerHTML={{ __html: additionalCharge.instantCreditDescription }}
                        />
                      }
                    </ItemBreakdown>
                  ))
                }
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

DueToday.propTypes = {
  cqContent: PropTypes.object,
  dueTodayData: PropTypes.object,
  accessories: PropTypes.array,
  itemsData: PropTypes.array,
  plans: PropTypes.object,
  lineLevelOpted: PropTypes.bool,
};

export default DueToday;
