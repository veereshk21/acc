import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { Row, Col } from 'react-flexbox-grid';
// import Modal from './../../common/Modal/index';
// import Button from '../../common/Button/Button';
// import Loader from '../../common/Loader/Loader';

import './../../../css/pages/mdnSelection/sharedCartModalSwiper.scss';
import AsyncComponent from '../../common/AsyncComponent';

const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));
const Modal = AsyncComponent(() => import('./../../common/Modal/index'));
export default class SharedCartModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClickViewCartLink = this.onClickViewCartLink.bind(this);
    this.onClickClearCartLink = this.onClickClearCartLink.bind(this);
  }
  onClickViewCartLink() {
    window.location.href = this.props.sharedCartInfo.cartLink;
  }
  onClickClearCartLink() {
    this.props.clearFunc(this.props.sharedCartInfo.clearCartLink);
  }
  render() {
    const { sharedCartInfo } = this.props;
    const params = {
      slidesPerView: 1,
      noSwiping: sharedCartInfo.items.length <= 1,
      spaceBetween: 0,
      navigation: {
        nextEl: sharedCartInfo.items.length > 1 ? '.swiper-button-next.icon-arrow.arrow-right' : '',
        prevEl: sharedCartInfo.items.length > 1 ? '.swiper-button-prev.icon-arrow.arrow-left' : '',
      },
      pagination: { el: '.swiper-pagination', clickable: true },
    };

    const style = {
      height: '450px',
      width: '450px',
    };
    const zIndex = {
      zIndex: 99999999999,
    };

    const sharedCartItems = (
      sharedCartInfo.items.map((item, index) => (
        <div key={'item ' + index} className="height245"><Row>
          <Col xs={1} />
          <Col xs className="leftAlign pad20 noSidePad">
            <h3 className="bold fontSize_6" dangerouslySetInnerHTML={{ __html: item.brandName }} />
            <h3 className="bold fontSize_6" dangerouslySetInnerHTML={{ __html: item.displayName }} />
            {/* <h3 className="bold fontSize_6 pad12 onlyTopPad">${item.price}</h3> */}
          </Col>
          <Col xs className="textAlignCenter">
            <img src={item.deviceImageUrl} alt={item.displayName} />
          </Col>
          <Col xs={1} />
        </Row></div>
      ))
    );

    return (
      <Modal style={style} showCloseX={false} underlayStyle={zIndex}>
        {this.props.isFetching && <Loader />}
        <h2 className="width80 margin30 onlyBottomMargin">{sharedCartInfo.title}</h2>
        {sharedCartInfo.items.length > 1 ? <Swiper {...params}>{sharedCartItems}</Swiper> : sharedCartItems}
        <div className="textAlignCenter margin20 onlyTopMargin">
          <Button type="button" analyticstrack="select-sharedCart-clear-continue-CTA" onClick={this.props.clearFunc.bind(this, sharedCartInfo.clearCartLink)} role="link" className="button secondary  margin6 onlySideMargin">
             Clear and continue
          </Button>
          <button type="button" onClick={this.onClickViewCartLink} className="button margin6 onlySideMargin" role="link" analyticstrack="select-sharedCart-gotoCart-CTA" id="gotoCartButton">Go to cart</button>
        </div>
      </Modal>
    );
  }
}
SharedCartModal.propTypes = {
  sharedCartInfo: PropTypes.object,
  clearFunc: PropTypes.func,
  isFetching: PropTypes.bool,
};
