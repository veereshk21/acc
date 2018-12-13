import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { capitalize } from '../../common/Helpers/index';

const onShowAccessoryDetails = (pdpUrl) => {
  window.location = pdpUrl;
};

const RecommendedAccessories = (props) => {
  const { recommendedAccessories, cqContent } = props;
  const { data } = recommendedAccessories;
  const recommendedAccessoriesItems = data.output.recommendedAccessoriesDetails;
  const recommendedAccessoriesItemsLength = recommendedAccessoriesItems.length;
  return (
    <div className="recommendedAccessories margin24 onlyTopMargin">
      <Row className="pad18 background_00 recommendedAccessories_header noTopPad">
        <Col xs={12}>
          <h1 className="h2 bold lineHeight24 margin12 noSideMargin color_FFF">{cqContent.label.OD_CONFIRMATION_RECOMMENDED_ACCESSORIES_TITLE}</h1>
          <p className="color_FFF margin20 onlyBottomMargin">{cqContent.label.OD_CONFIRMATION_RECOMMENDED_ACCESSORIES_SUBTITLE}</p>
        </Col>
      </Row>
      <Row className="recommendedAccessories_content tile-outer">
        {recommendedAccessoriesItems.map((recommendedAccessory, i) => {
          const index = i + 1;
          return (
            <Col onClick={() => onShowAccessoryDetails(recommendedAccessory.pdpUrl)} xs={recommendedAccessoriesItemsLength === 1 ? 12 : 6} key={`recommendedAccessory-${index}`} className="border_CC pad18 tile">
              <h2 className="recommendedAccessories_content_title margin20 onlyBottomMargin fontSize_3">{capitalize(`${recommendedAccessory.brand} ${recommendedAccessory.displayName}`)}</h2>
              <div className="recommendedAccessories_content_item margin72 onlyTopMargin">
                <img src={recommendedAccessory.imageUrl} alt={recommendedAccessory.displayName} />
              </div>
            </Col>
          );
        })
        }
      </Row>
    </div>
  );
};

RecommendedAccessories.propTypes = {
  cqContent: PropTypes.object,
  recommendedAccessories: PropTypes.array,
};

export default RecommendedAccessories;
