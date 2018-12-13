/**
 * Created by hmahad on 2/17/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';

import TapImg from '../../../images/tap.svg';
import TapImg2X from '../../../images/tap2x.svg';

export default class TPMDComponent extends Component { // eslint-disable-line

  render() {
    return (
      <div>
        <section className="section group ">
          <Title
            id="section_title"
            tabIndex="0"
            className="textAlignCenter pad18 onlySidePad outlineNone margin12 noSideMargin"
          >
            {this.props.cqLabel.OD_PROTECTION_TMPMD_HEADER}
          </Title>
        </section>
        <section className="section group margin24 noSideMargin">
          <div className=" cart_tmpmdImage centerBlock">
            <img src={TapImg} srcSet={`${TapImg2X} 2x`} alt="Total Mobile Protection Multi-Device" />
          </div>
        </section>
        <p className="fontSize_2 width70 textAlignCenter centerBlock">{this.props.cqLabel.OD_PROTECTION_TMPMD_CONTENT}</p>
        <section className="section group  textAlignCenter margin36 noSideMargin ">
          <Button type="button" onClick={this.props.onClick} className="button large primary">{this.props.cqLabel.OD_PROTECTION_NEXT_CTA}</Button>
        </section>
      </div>
    );
  }
}
TPMDComponent.propTypes = {
  onClick: PropTypes.func,
  cqLabel: PropTypes.object,
};
