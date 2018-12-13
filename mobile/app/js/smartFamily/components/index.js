/**
 * Created by hmahad on 2/16/2017.
 */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import PropTypes from 'prop-types';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton/';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import LearnMoreFamilyModal from './learnMoreFamilyModal';
import TermsFamilyModal from './termsFamilyModal';


export class SmartFamilyComponent extends React.Component {
  constructor(props) {
    super(props);
    /** Using  preselected json key to set initial checked status */
    const preSelectedItem = props.equipmentList.find((item) =>
      item.get('preSelected'));

    this.state = {
      learnMore: false,
      terms: false,
      selectedOption:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem.get('sfoSkuId')
          : null,
      buttonDisabled:
        !(typeof preSelectedItem !== typeof undefined),
      featureType:
        typeof preSelectedItem !== typeof undefined
          ? preSelectedItem.sorSfoType
          : null,
    };
  }

  onSaveFamily() {
    const requestParams = {
      featureSkuId: this.state.selectedOption || '',
      commerceItemId: this.props.commerceItemId || '',
      featureType: this.state.featureType || '',
      editSmartFamily: this.props.editSmartFamily,
    };

    this.props.addSelectedFamily(this.props.saveUrl, Object.assign(requestParams));
  }

  familyOptionChange=(e) => {
    this.setState({
      selectedOption: e.target.value,
      buttonDisabled: false,
      featureType: e.target.getAttribute('data-sorSfoType'),
    });
    const equipmentList = this.props.equipmentList.toJS();
    equipmentList.map((listData) => { // eslint-disable-line array-callback-return
      const currentListData = listData;
      currentListData.preSelected = false;
      if (currentListData.sfoSkuId === e.target.value && currentListData.sorSfoType === e.target.getAttribute('data-sorSfoType')) {
        currentListData.preSelected = true;
      }
    });
    return false;
  };

  closeLearnModal() {
    this.setState({ learnMore: false });
  }

  closeterms() {
    this.setState({ terms: false, learnMore: true });
  }

  termsModal() {
    this.setState({
      learnMore: false,
      terms: true,
    });
  }
  render() {
    // const self = this;

    if (this.state.learnMore) {
      return (
        <LearnMoreFamilyModal
          termsModal={this.termsModal.bind(this)}
          cqLabel={this.props.cqLabel}
          cqHTML={this.props.cqHTML}
          closeLearn={this.closeLearnModal.bind(this)}
        />);
    }

    if (this.state.terms) {
      return (
        <TermsFamilyModal
          cqLabel={this.props.cqLabel}
          cqHTML={this.props.cqHTML}
          closeTerms={this.closeterms.bind(this)}
        />);
    }

    return (
      <Grid className="pad32">
        {this.props.isFetching ? <Loader /> : ''}

        <Row>
          <Col xs={12}>
            <Title
              id="section_title"
              tabIndex="0"
            >
              <p>Verizon Smart Family<sup className="h6">TM</sup></p>
            </Title>
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <p>When it comes to parenting, everyone could use a little backup. Verizon Smart Family<sup className="fontSize_1">TM</sup> is here to help. It lets you know where your kids are by tracking their device. It also allows you to limit what they see on their devices by setting content filters. Verizon Smart Family<sup className="fontSize_1">TM</sup> –your new partner in parenting.</p>
          </Col>
          <Col xs={3}>
            <img height="80" width="80" alt="VZ family" src="//scache.vzw.com/content/dam/support/assets/apps/smart-family.png" />
          </Col>
        </Row>
        <div className="margin10 noSideMargin">
          <Link role="link" to="/" className="link" onClick={() => this.setState({ learnMore: true })} analyticstrack="smartFamily-learnMoreLink">
            Learn More
          </Link>
        </div>
        <Row>
          <Col xs={9}>
            <p className="fontSize_1">Compatible phone req’d; accuracy of info is not guaranteed; certain restrictions apply.</p>
          </Col>
        </Row>
        <HorizontalRule y={1} color="#D8DADA" />

        <Row>
          <Col xs={12}>
            <form action="" method="POST" name="smartFamilyForm">
              {this.props.equipmentList.map((item, index) => (
                <Row key={index} className=" ">

                  <Col xs={12}>
                    <RadioButton
                      checked={
                        this.state.selectedOption ===
                          item.get('sfoSkuId')
                      }
                      aria-labelledby={
                        'labelof' + item.get('sfoSkuId')
                      }
                      value={item.get('sfoSkuId')}
                      data-sfoSORId={item.get('sfoSORId')}
                      data-sorSfoType={item.get('sorSfoType')}
                      id={item.get('sfoSkuId')}
                      name="familyOptions"
                      onChange={this.familyOptionChange}
                      analyticstrack="smartFamily-Selection-radioBtn"
                    >
                      <div
                        className="boldText displayBlock"
                        id={'labelof' + item.get('sfoSkuId')}
                      >
                        {item.get('displayName') && <p
                          dangerouslySetInnerHTML={{
                            __html: item.get('displayName'),
                          }}
                        />}
                        {item.get('price') &&
                        <p className="margin6 onlyRightMargin">
                          {(parseFloat(item.get('wasPrice')) > parseFloat(item.get('price'))) && <span className="color_red textDecLineThrough margin6 onlyRightMargin">${item.get('wasPrice')}</span>}
                            ${item.get('price')}
                          {item.get('priceTerm')}
                        </p>}
                        {item.get('freeTrailLabel') && item.get('freeTrial') && <p
                          dangerouslySetInnerHTML={{
                            __html: item.get('freeTrailLabel'),
                          }}
                        />}
                      </div>
                      {item.get('introText') && <p
                        className="color_666 clearfix"
                        dangerouslySetInnerHTML={{
                          __html: item.get('introText'),
                        }}
                      />}
                    </RadioButton>
                    <HorizontalRule y={1} color="#D8DADA" />
                  </Col>
                </Row>
              ))}
            </form>
          </Col>
        </Row>


        <div className="footerFixed">
          <div className="centerBlock textAlignCenter">
            <Button
              type="button"
              className="button width90 primary margin12 onlyRightMargin "
              role="button"
              disabled={this.state.buttonDisabled}
              onClick={this.onSaveFamily.bind(this)}
              analyticstrack="smartFamily-selection-ctnBtn"
            >
              Continue
            </Button>
          </div>
        </div>
      </Grid>
    );
  }
}

SmartFamilyComponent.propTypes = {
  isFetching: PropTypes.bool,
  cqLabel: PropTypes.object,
  equipmentList: PropTypes.object,
  cqHTML: PropTypes.object,
  commerceItemId: PropTypes.string,
  editSmartFamily: PropTypes.bool,
  addSelectedFamily: PropTypes.func,
  saveUrl: PropTypes.string,
  // deviceProdId: PropTypes.string,
};

export default reduxForm({
  // eslint-disable-line no-class-assign
  form: 'SmartFamilyForm',
  enableReinitialize: true,
})(SmartFamilyComponent);
