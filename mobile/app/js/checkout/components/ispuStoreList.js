/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

export default class ISPUStoreList extends Component {
  constructor(props) {
    super(props);
    this.selectStore = this.selectStore.bind(this);
    this.onShowAllClicked = this.showAllClicked.bind(this);
  }
  selectStore(store) {
    if (store.deviceAvailable) {
      this.props.storeSelected(store.storeId);
      hashHistory.push('/storeDetailPage');
    }
  }
  showAllClicked() {
    this.props.showAll(true);
  }

  showMoreStores = (event) => {
    event.preventDefault();
    this.props.showMore();
  }

  displayShowMoreBTN = () => {
    const {
      useISPUService, nextURL, displayShowMore, cqContent,
    } = this.props;
    if ((useISPUService && nextURL && displayShowMore) || (!useISPUService && displayShowMore)) {
      return (
        <li
          role="button"
          className="col span_5_of_5 pad12 margin0 border_EB onlyBottomBorder"
          onClick={this.showMoreStores}
        >
          <p className="fontSize_4 fontTextMedium textAlignCenter"> {cqContent.label.OD_CHECKOUT_ISPU_LOAD_MORE_BUTTON_COPY} </p>
        </li>
      );
    } else if (!this.props.displayShowMore || !this.props.nextURL) {
      return (
        <li
          className="col span_5_of_5 pad12 margin0 border_EB onlyBottomBorder"
        >
          <p className="fontSize_3"> {cqContent.label.OD_CHECKOUT_ISPU_LOAD_MORE_NO_MORE} </p>
        </li>
      );
    }
    return <div />;
  };

  createListOfStores() {
    const { cqContent } = this.props;
    const self = this;
    return this.props.storeList.map((store) => (
      <li role="button" className="col span_5_of_5 pad12 margin0 border_EB onlyBottomBorder" key={store.storeId} onClick={self.selectStore.bind(null, store)}>
        <div className="table width100">
          <div className="table_tr">
            <div className="table_td width60 textAlignLeft">
              <p className="fontSize_4 fontTextMedium">{store.storeName}</p>
              <p>{store.storeAddress}</p>

            </div>
            <div className="table_td verticalAlignMiddle textAlignRight width40">
              {
                store.deviceAvailable ? <p className="bold arrowCTA">{store.distance} {cqContent.label.OD_CHECKOUT_STORE_DISTANCE_UNIT_TEXT}</p> :
                  <p className="color_959595">{cqContent.label.OD_CHECKOUT_STORE_NOT_AVAILABLE_TEXT}</p>
              }
            </div>
          </div>
        </div>
      </li>));
  }

  render() {
    const { cqContent } = this.props;
    return (
      <div>
        <ul className="clearfix" style={{ padding: '0px' }}>
          {this.createListOfStores()}
          {this.displayShowMoreBTN()}
        </ul>
        {
          (typeof this.props.selectedStoreId !== 'undefined' && this.props.selectedStoreId !== null && !this.props.navigateToStoreDetail) &&
          <a
            role="button"
            className="margin10 displayBlock clearfix link"
            onClick={this.onShowAllClicked}
            analyticstrack={cqContent.label.OD_CHECKOUT_ISPU_SEE_ALL_RESULTS_TEXT}
          >{cqContent.label.OD_CHECKOUT_ISPU_SEE_ALL_RESULTS_TEXT}
          </a>
        }
      </div>

    );
  }
}
ISPUStoreList.propTypes = {
  cqContent: PropTypes.object,
  storeList: PropTypes.array,
  selectedStoreId: PropTypes.object,
  navigateToStoreDetail: PropTypes.bool,
  showAll: PropTypes.func,
  storeSelected: PropTypes.func,
  showMore: PropTypes.func,
  displayShowMore: PropTypes.bool,
  nextURL: PropTypes.string,
  useISPUService: PropTypes.bool,
};
