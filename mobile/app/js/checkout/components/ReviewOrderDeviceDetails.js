import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewOrderImage from './ReviewOrderImage';
import A from '../../common/A/A';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import { hashHistory } from './../../store';

class ReviewOrderDeviceDetails extends Component {
  render() {
    const { devices, cqContent } = this.props;
    const { accessories } = devices;
    return (

      <div className="ensighten_deviceDetails">
        {
          devices.items.map((device, id) => (
            <div key={id} style={{ position: 'relative' }} className="background_FF pad42 noSidePad margin6 clearfix">
              <div className="span_6_of_12 textAlignCenter">
                {device.numberSharedMtn && (
                  <div>
                    <p>{cqContent.label.OD_NS_NEW_SERVICE}</p>
                    <div className="pad10 onlyBottomPad">{device.numberSharedMtn}</div>
                  </div>
                )}
              </div>

              <ReviewOrderImage device={device} itemCount={id} />
              <div className="span_6_of_12 leftAlign verticalCenter">
                <h5 dangerouslySetInnerHTML={{ __html: device.manufactureName }} />
                <h5 dangerouslySetInnerHTML={{ __html: device.displayName }} />
                <p
                  className="fontSize_2 margin10 noSideMargin"
                  dangerouslySetInnerHTML={{ __html: (device.color ? device.color : '') + ((device.color && device.size) ? ', ' : '') + (device.size ? device.size : '') }}
                />
              </div>
              {device.devicePromotionList.map((devicePromo, i) => (
                (devicePromo.PromoName !== null) ? <PromoBadge className="m-pdp" animated><span>{devicePromo.PromoName}{(devicePromo.promoContentText !== null) ? <A role="button" aria-label="View Promo Details" className="margin6 link" onClick={() => { hashHistory.push('/promoModal?index=' + i); }}>View Details</A> : <span />}</span></PromoBadge> : <div />))}

            </div>
          ))
        }
        {accessories &&
          accessories.map((acc, i) => {
            const accessoriesItems = [];
            for (let j = 0; j < acc.quantity; j++) {
              accessoriesItems.push(<div key={i + '' + j + 'accessory'} className="background_FF pad42 noSidePad margin10 clearfix">
                <div className="col span_6_of_12 textAlignCenter">

                  <img src={acc.imageUrl} alt={acc.name} />
                </div>
                <div className="span_6_of_12 leftAlign verticalCenter">
                  <h5 dangerouslySetInnerHTML={{ __html: acc.name }} />
                  <h5 dangerouslySetInnerHTML={{ __html: acc.deviceProductDisplayName }} />
                  <p className="fontSize_2 margin10 noSideMargin">{acc.color} {(acc.color && acc.size) ? ',' : ''} {acc.size}</p>
                </div>
              </div>);
            }
            return accessoriesItems.map((acces) => (
              <div>{acces}</div>));
          })}
      </div>

    );
  }
}

export default ReviewOrderDeviceDetails;
ReviewOrderDeviceDetails.propTypes = {
  devices: PropTypes.object,
  cqContent: PropTypes.object,
};
