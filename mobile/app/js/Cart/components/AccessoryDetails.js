import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import CartDeviceImage from './CartDeviceImage';
import HorizontalRule from './../../common/HorizontalRule';

const AccessoryDetails = ({
  accessories, editItem, CQLabel, removeAccessory, isAgentSite,
}) => (
  accessories.map((acc, i) => {
    const html = [];
    for (let j = 0; j < acc.get('quantity'); j++) {
      html.push(<div>
        <Row key={i + '' + j + 'accessory'} className="noSideMargin pad24">

          <Col xs={6}>
            <h3 className="fontSize_1_3 fontDisplayMedium">
              <span dangerouslySetInnerHTML={{ __html: acc.get('name') }} />
              {!!acc.get('deviceProductDisplayName') && acc.get('deviceProductDisplayName') !== null &&
                  <span>
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: acc.get('deviceProductDisplayName') }} />
                  </span>}
            </h3>
            {(acc.get('color') || acc.get('size')) &&
                <div className="fontSize_1_3 color_gray_six">
                  {acc.get('color')}
                  {(acc.get('color') && acc.get('size')) && ', '}
                  {acc.get('size')}
                </div>}
            <p className="pad18 noSidePad">${acc.get('price')}</p>
            <p className="fontSize_1_3 margin12 onlyBottomMargin ">{acc.get('mtn')}</p>

            {!isAgentSite && <button
              className="button small secondary margin24 noSideMargin"
              analyticstrack="edit-accessory-from-cart"
              onClick={(evt) => { editItem(evt, acc.get('editAccessoryUrl')); }}
            >{CQLabel.get('OD_CART_MAIN_EDIT_CTA')}
            </button>}
            <p className="margin18 onlyTopMargin fontSize_1_3">
              <a
                role="button"
                href="#"
                className="link"
                onClick={removeAccessory.bind(this, acc.get('commerceItemId'), acc.get('skuId'), acc.get('prodId'))}
                analyticstrack="remove-accessory-from-cart"
              >{CQLabel.get('OD_CART__MAIN_REMOVE_CTA')}
              </a>
            </p>
          </Col>
          <Col xs={6} className="textAlignRight">
            <CartDeviceImage imageUrl={acc.get('imageUrl')} />
          </Col>

        </Row>
        <HorizontalRule y={1} margin="0 32px" color="#D8DADA" />
      </div>);
    }

    return html.map((h) => (
      <div>{h}</div>));
  })
);

AccessoryDetails.propTypes = {

};

export default AccessoryDetails;
