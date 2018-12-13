import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import RadioButton from '../../common/RadioButton/RadioButton';
import Button from './../../common/Button/Button';

export default class AppleCare extends React.Component {
  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
  }
  render() {
    const { cq, appleCare } = this.props;
    return (
      <div className="pad12 noBottom{ad">
        <div className="cartPage_dmPlanBrkdwn vh70">
          <section className="section group pad18 onlyTopPad textAlignCenter">
            <Title
              id="section_title"
              tabIndex="0"
              className="red fontSize_6 textAlignCenter pad18 onlySidePad outlineNone outlineNone margin12 onlyBottomMargin"
            >
              <span dangerouslySetInnerHTML={{ __html: cq.html.OD_APPLE_CARE_TITLE }} />
            </Title>
          </section>
          <div className="pad20 noTopPad">
            <span
              className="fontSize_3 lineHeight18"
              dangerouslySetInnerHTML={{ __html: cq.html.OD_APPLE_CARE_DESCRIPTION }}
            />
          </div>
          <div
            className="appleCareOption"
          >
            <div className="section group pad18 noSidePad border_grey onlyBottomBorder">

              <RadioButton
                id="no"
                name="appleCareOption"
                defaultChecked={!appleCare.appleCareSelected}
              >
                <div className="pad15 onlyTopPad">{cq.label.OD_APPLE_CARE_NO_OPTION}</div>
              </RadioButton>
            </div>
            <div className="section group pad18 noSidePad">

              <RadioButton
                id="yes"
                name="appleCareOption"
                defaultChecked={appleCare.appleCareSelected}
              >
                <div className="pad6 onlyTopPad">
                  <span dangerouslySetInnerHTML={{ __html: cq.html.OD_APPLE_CARE_YES_OPTION.replace('$PRICE$', appleCare.appleCareCost) }} />
                </div>
              </RadioButton>
            </div>
          </div>
        </div>
        <div className="section group">
          <div className="col span_5_of_5 textAlignCenter margin24 noSideMargin">
            <Button type="button" className="large button primary">
              {cq.label.OD_APPLE_CARE_APPLY}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AppleCare.propTypes = {
  cq: PropTypes.object,
  appleCare: PropTypes.any,
  // isFetching: PropTypes.bool,
};
