/**
 * Created by hmahad on 14/06/17.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

import RadioButton from '../../common/RadioButton/RadioButton';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';


export default class ReActivateDeviceComponent extends Component {
  constructor(props) {
    super(props);

    this.onRadioChange = this.onRadioChange.bind(this);
    this.onNext = this.onNext.bind(this);


    this.state = {
      gotoUrl: '',
      nextBtnDisabled: true,
    };
  }

  onRadioChange(event) {
    this.setState({ nextBtnDisabled: false, gotoUrl: event.currentTarget.value });
  }

  onNext(event) {
    event.preventDefault();
    const hrefVal = event.currentTarget.href;
    const hrefContent = hrefVal.indexOf('selectDevice');
    if (!(hrefContent < 0) && this.props.deviceHistoryList.length) {
      hashHistory.push('/deviceList');
    } else {
      window.location.href = hrefVal;
    }
  }

  render() {
    return (
      <section className="section  group pad18">
        <Title>{this.props.cqContent.label.AAL_BYOD_DEVICE_ACTIVATE}</Title>
        <div className="margin42 onlyTopMargin">
          {this.props.reactivateOptions.map((item, index) => (
            <div
              className={`section group pad18 noSidePad ${(index < this.props.reactivateOptions.length - 1) ? 'border_EB onlyBottomBorder' : ''}`}
            >
              <RadioButton
                onClick={this.onRadioChange}
                defaultChecked={item.defaultSelection}
                name="byodPromptOptions"
                value={item.gotoUrl}
                id={'radio' + index}
              >
                <div className="boldText">{item.optionText}</div>
                <div className="">{item.optionDescription}</div>

              </RadioButton>
            </div>
          ))}
        </div>


        <div className="positionAbsolute  width100 textAlignCenter" style={{ left: 0, bottom: 0 }}>
          <A
            href={this.state.gotoUrl}
            disabled={this.state.nextBtnDisabled}
            onClick={this.onNext}
            className="button large"
          >{this.props.cqContent.label.AAL_BYOD_BUTTON_CTA}
          </A>
        </div>
      </section>
    );
  }
}

ReActivateDeviceComponent.propTypes = {
  deviceHistoryList: PropTypes.array,
  cqContent: PropTypes.object,
  reactivateOptions: PropTypes.array,
};

