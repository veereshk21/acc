import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import {
  Field,
  reduxForm,
} from 'redux-form/immutable';
import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectListItem from './SelectListItem';
import { renderTextField } from './../../common/TextField';

const validate = (values) => {
  const errors = {};

  const promoCode = values.get('promoCode');

  if (!promoCode) {
    errors.promoCode = 'Required';
  }
  /* else if (/^[A-Z0-9]+$/i.test(promoCode)) {
   errors.promoCode = 'The promo code you entered is not valid.'
   } */

  return errors;
};

/* const renderField = ({ input, label, type, meta: { active, touched, error }, ...custom }) => { // eslint-disable-line
 const displayLabel = (typeof error === 'string' && error.length > 0) ? 'none' : 'block';
 return (<TextField
 hintText={label}
 underlineFocusStyle={styles.underlineFocusStyle}
 floatingLabelFocusStyle={Object.assign({}, styles.floatingLabelFocusStyle, { display: 'none' })}
 floatingLabelShrinkStyle={Object.assign({}, { transform: 'scale(0.8) translate(0px, 36px)' }, { display: displayLabel })}
 style={{ width: '100%', float: 'left' }}
 floatingLabelText={label}
 errorStyle={styles.errorStyle}
 errorText={!active && touched && error}
 {...input}
 {...custom}
 ref={input => input && input.focus()}
 defaultValue={custom.defaultValue}
 />);
 }; */

class promotionCodeWrapper extends Component {
  constructor(props) {
    super(props);
    this.removePromoCode = this.removePromoCode.bind(this);
    this.state = {
      promoCodeExpanded: false,
    };

    this.normalizePromoCode = this.normalizePromoCode.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  togglePromoCodeExpanded = (e) => {
    e.preventDefault();
    this.setState({ promoCodeExpanded: !this.state.promoCodeExpanded });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      this.togglePromoCodeExpanded(e);
    }
  };

  removePromoCode(promoCode, event) {
    event.stopPropagation();
    event.preventDefault();
    /** TODO:An ajax call to determine new prices */
    this.props.removePromoCode(promoCode);
  }
  normalizePromoCode(value) {
    return value.replace(/[^\w\s]/gi, '');
  }

  render() {
    const {
      handleSubmit,
      valid,
      submitting,
      checkPromoCode,
      // cartData,
      cq,
    } = this.props;
    const { promoCodeExpanded } = this.state;
    // const { promotionList } = cartData;
    /* let promoCodeEnteredString = this.props.CQLabel.get('DT_OD_CART_ADD_PROMO_TEXT');
     if (this.props.promoCodes && this.props.promoCodes.size) {
     promoCodeEnteredString = this.props.CQLabel.get('DT_OD_CART_ADD_ANOTHER_PROMO_TEXT');
     } */
    return (
      <section id="promotionCode">
        <div>
          <p className="fontSize_10 bold lineHeight24">Total summary</p>
          <div
            className="borderSize_1 onlyTopBorder border_black margin20 onlyTopMargin"
          >
            {/* promotionList && promotionList.map((item, i) => (
              <SelectListItem
                key={i}
                linkText={item.barcode && cq.label.DT_OD_CART__MAIN_REMOVE_CTA}
                linkAction={this.removePromoCode.bind(null, item.barcode)}
                subtext={item.promoMsg}
                hideCTA
                classLeftAction="6"
                classRightAction="6"
                title={cq.label.DT_OD_CART_PROMO_CODE}
                value={item.barcode}
              />
            )) */}
          </div>
          {<SelectListItem
            className={promoCodeExpanded ? 'expanded' : ''}
            title={cq.label.DT_OD_CART_PROMO_DISCOUNT_TEXT}
            classLeftAction="10"
            classRightAction="2"
            onClickMethod={this.togglePromoCodeExpanded.bind(this)}
          />}
          {promoCodeExpanded &&
          <div className="pad12 noSidePad">
            <section className="section group">
              <form className="">
                <div className="clearfix">
                  <p
                    className="bold fontSize_5"
                  >{cq.label.DT_OD_CART_ENTER_PROMO_TITLE}</p>
                  <Row xs={12} sm={12} md={12} lg={12}>
                    <Col
                      className="displayInlineBlock floatLeft margin5 onlyTopMargin"
                      xs={6} sm={6} md={6} lg={6}
                    >
                      <Field
                        component={renderTextField}
                        id="promoCode"
                        name="promoCode"
                        type="text"
                        placeholder="Promo code"
                        hintStyle="leftAlign fontSize_5 setInlinePad"
                        autoFocus
                        normalize={this.normalizePromoCode}
                      />
                    </Col>
                    <Col
                      className="displayInlineBlock floatLeft margin5 onlyTopMargin pad10 onlyLeftPad"
                      xs={6} sm={6} md={6} lg={6}
                    >
                      <button
                        className="primary button width100"
                        type="submit"
                        disabled={!valid || submitting}
                        onClick={
                          handleSubmit((data) => {
                            const formData = data.toJS();
                            checkPromoCode(formData.promoCode);
                            this.props.initialize({
                              promoCode: '',
                            });
                          })
                        }
                        analyticstrack="submit-promo-code-cta"
                      >{cq.label.DT_OD_CART_PROMO_CODE_APPLY_CTA}
                      </button>
                    </Col>
                  </Row>
                </div>
              </form>
            </section>
          </div>
          }
        </div>
      </section>
    );
  }
}

promotionCodeWrapper.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

promotionCodeWrapper.propTypes = {
  // title: PropTypes.element.String,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  checkPromoCode: PropTypes.func,
  removePromoCode: PropTypes.func,
  // cartData: PropTypes.object,
  cq: PropTypes.object,
  initialize: PropTypes.func,
};

export default reduxForm({
  form: 'promoCodeForm',
  validate,
  touchOnBlur: false,
})(promotionCodeWrapper);
