import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import CartDeviceImage from './CartDeviceImage';
import HorizontalRule from './../../common/HorizontalRule';

const AccessoryBundleDetails = ({ accessoriesBundle, removeAccessoryBundle, CQLabel }) => (
  accessoriesBundle.map((option, index) => (
    <div>
      <Row
        key={`accessoryBundle-${index}`}
        className="noSideMargin pad24"
      >

        <Col xs={6}>
          <h3 className="fontSize_1_3 fontDisplayMedium"><span dangerouslySetInnerHTML={{ __html: option.displayName }} /><br /></h3>
          <p className="fontSize_1_3 margin10 noSideMargin color_gray_six">{option.bundleDescription}</p>
          <p>${option.discounted ? option.discountedPrice : option.regularPrice}</p>
          <p className="margin18 onlyTopMargin fontSize_1_3">
            <a
              role="button"
              className="link"
              onClick={removeAccessoryBundle.bind(this, option.displayName, option.skuID, option.commerceItemId)}
              analyticstrack="remove-accessoriesBundle"
            >
              {CQLabel.get('OD_CART__MAIN_REMOVE_CTA')}
            </a>
          </p>
        </Col>
        <Col xs={6} className="textAlignRight">
          <CartDeviceImage imageUrl={option.imgUrl} />
        </Col>

      </Row>
      <HorizontalRule y={1} margin="0 32px" color="#D8DADA" />
    </div>
  ))
);

AccessoryBundleDetails.propTypes = {

};

export default AccessoryBundleDetails;
