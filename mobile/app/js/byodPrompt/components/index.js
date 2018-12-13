/**
 * Created by hmahad on 08/06/17.
 */


import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';

import RadioButton from '../../common/RadioButton/RadioButton';
import Title from '../../common/Title/Title';
import A from '../../common/A/A';


export default class NSOLandingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onNext = this.onNext.bind(this);
    this.state = {
      goToUrl: '',
      reActivate: false,
      nextBtnDisabled: true,
    };
  }

  onRadioChange(event) {
    this.setState({ goToUrl: event.currentTarget.value, nextBtnDisabled: false });
  }


  onNext(event) {
    event.preventDefault();
    const hrefVal = event.currentTarget.href;
    const hrefContent = hrefVal.indexOf('deviceDetail');
    if (!(hrefContent < 0) && this.props.deviceHistoryList.length) {
      hashHistory.push('/reActivateDevice');
    } else {
      window.location.href = hrefVal;
    }
  }

  render() {
    return (
      <section className="section  group pad18">
        <Title>{this.props.cqContent.label.AAL_BYOD_PROMPT_PAGE_HEADING}</Title>
        <div className="margin42 onlyTopMargin">
          {this.props.options.map((item, index) => (
            <div
              className={`section group pad18 noSidePad ${(index < this.props.options.length - 1) ? 'border_EB onlyBottomBorder' : ''}`}
            >
              <RadioButton
                onClick={this.onRadioChange.bind(this)}
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
          <A disabled={this.state.nextBtnDisabled} onClick={this.onNext} href={this.state.goToUrl} className="button large">{this.props.cqContent.label.AAL_BYOD_BUTTON_CTA}</A>
        </div>
      </section>
    );
  }
}
NSOLandingComponent.propTypes = {
  deviceHistoryList: PropTypes.array,
  cqContent: PropTypes.object,
  options: PropTypes.array,
};
