import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Modal/index';
import Anchor from './../../A/A';

export default class MultiUpgradeModal extends PureComponent { // eslint-disable-line
  render() {
    const { cqContent, multiUpgradeData } = this.props;
    return (
      <Modal
        mounted
        style={{ background: 'white', width: '55%' }}
        showCloseX={false}
      >
        <div>
          <h1 className="border_black onlyBottomBorder pad4 onlyBottomPad fontSize_6">{cqContent.label.DT_OD_PROTECTION_UPGRADE_PENDING_DEVICES}</h1>
          <div className="table" style={{ height: '100%', width: '100%' }}>
            <div className="table_td pad10  onlyTopPad" style={{ height: '100%' }}>
              <div>
                <div>
                  <p className="margin10 onlyBottommargin">{cqContent.label.DT_OD_PROTECTION_PENDING_DESC}</p>
                  {multiUpgradeData.pendingUpgrdeMtns.map((mtn) =>
                    <div className="bold fontSize_4">{mtn}</div>
                  )}
                  <p className="margin10 onlyTopMargin">{cqContent.label.DT_OD_PROTECTION_PENDING_NEXT_DESC} <span className="bold fontSize_4">{multiUpgradeData.nextMtnToUpgrade}</span></p>
                  <p>{cqContent.label.DT_OD_PROTECTION_PENDING_SKIP_DESC}</p>
                </div>
                <div className="margin20 onlyTopMargin">
                  <Anchor href={multiUpgradeData.upgradeURL} className="button large primary">{cqContent.label.DT_OD_PROTECTION_PENDING_CONTINUE}</Anchor>
                  <Anchor href={multiUpgradeData.cartURL} className="button large secondary margin20 onlyLeftMargin">{cqContent.label.DT_OD_PROTECTION_PENDING_GOTO_CART}</Anchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

MultiUpgradeModal.propTypes = {
  cqContent: PropTypes.object,
  multiUpgradeData: PropTypes.object,
};
