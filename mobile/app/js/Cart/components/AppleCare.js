import React from 'react';
import PropTypes from 'prop-types';
// import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import BackButton from '../../common/BackButton/BackButton';
import RadioButton from '../../common/RadioButton/RadioButton';
import Button from './../../common/Button/Button';

export default class AppleCare extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
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

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    const { CQLabel, CQHtml, appleCare } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/">{this.props.CQLabel.get('OD_CART_BACK_CTA')}</BackButton>
        <div className="cartPage_dmPlanBrkdwn pad12 onlySidePad vh70">
          <section className="section group pad18 onlyTopPad textAlignCenter">
            <Title
              id="section_title"
              tabIndex="0"
              className="h2 textAlignCenter pad18 onlySidePad outlineNone outlineNone margin12 onlyBottomMargin"
            >
              <span dangerouslySetInnerHTML={{ __html: CQHtml.get('OD_CART_APPLE_CARE_TITLE') }} />
            </Title>
            {/* <HeroPriceComponent
              displayPrice={this.props.totalDueMonthly}
              tabIndex="1"
            /> */}
          </section>
          <div className="pad20 noTopPad">
            <span
              className="fontSize_3 lineHeight18"
              dangerouslySetInnerHTML={{ __html: CQHtml.get('OD_CART_APPLE_CARE_DESCRIPTION') }}
            />
          </div>
          <div
            className="appleCareOption"
          >
            <div className="section group pad18 noSidePad border_grey onlyBottomBorder">

              <RadioButton
                id="no"
                name="appleCareOption"
                defaultChecked={!appleCare.get('selected')}
                value={false}
              >
                <div className="pad15 onlyTopPad">{CQLabel.get('OD_CART_APPLE_CARE_NO_OPTION')}</div>
              </RadioButton>
            </div>
            <div className="section group pad18 noSidePad">

              <RadioButton
                id="yes"
                name="appleCareOption"
                defaultChecked={appleCare.get('selected')}
                value
              >
                <div className="pad6 onlyTopPad">
                  <span dangerouslySetInnerHTML={{ __html: CQHtml.get('OD_CART_APPLE_CARE_YES_OPTION') }} />
                </div>
              </RadioButton>
            </div>
          </div>
        </div>
        <div className="section group">
          <div className="col span_5_of_5 textAlignCenter margin24 noSideMargin">
            <Button type="button" className="large button primary">
              Apply
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

AppleCare.propTypes = {
  CQLabel: PropTypes.object,

  CQHtml: PropTypes.object,
  appleCare: PropTypes.any,
  // isFetching: PropTypes.bool,
};
