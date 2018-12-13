import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from '../../store';

import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton';

class AppleCare extends React.PureComponent {
  constructor(props) {
    super(props);
    const selectedSku = props.applecare.filter((acc) => acc.incart === true)[0];
    this.state = {
      selected: (typeof selectedSku !== 'undefined') ? selectedSku.skuid : 'remove',
    };
  }
  handleRadioChange = (e) => {
    this.setState({
      selected: e.target.value,
    });
  }
  handleSubmitAppleCare = () => {
    // console.log(this.chk.value);
    const { selected } = this.state;
    const { applecare, protection, saveUrl } = this.props;
    const _data = [];
    applecare.map((acc) => { // eslint-disable-line
      const obj = {};
      obj.action = (selected === 'remove') ? 'remove' : 'add';
      obj.accQty = '1';
      obj.accName = acc.name;
      obj.accProdId = acc.productid;
      obj.accSkuId = acc.skuid;
      obj.incart = acc.incart;
      obj.incart = acc.incart;
      obj.commerceItemId = acc.commerceItemId;
      _data.push(obj);
    });
    if (Object.keys(protection).length === 0) {
      hashHistory.push('/');
    } else {
      this.props.addSelectedProtection(saveUrl, Object.assign(protection, { accessories: _data }));
    }
  }
  render() {
    const { applecare, cqLabel } = this.props;
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title className="fontSize_2_5">
              {cqLabel.OD_DEVICE_AC_TITLE}
            </Title>
            <p className="fontSize_1_3 pad12 onlyTopPad">{cqLabel.OD_DEVICE_AC_DESCRIPTION}</p>
            <HorizontalRule />
          </Col>
        </Row>
        <Row>
          {applecare.map((acc, idx) => (
            <Col xs={12} key={`appleCare-${idx}`}>
              <RadioButton
                id={`addCare-${idx}`}
                name="care"
                value={acc.skuid}
                defaultChecked={acc.incart}
                onChange={this.handleRadioChange}
                analyticstrack="choose-applecare"
              >
                <p className="fontDisplayMedium" dangerouslySetInnerHTML={{ __html: cqLabel.OD_DEVICE_AC_ADD + ' ' + acc.name }} />
                {acc.price && <p className="fontDisplayMedium">${acc.price}</p>}
                <p>{cqLabel.OD_DEVICE_AC_EXTEND_TWO_YEAR}</p>
              </RadioButton>
              <HorizontalRule y={1} color="#D8DADA" />
            </Col>
          ))}
          <Col xs={12}>
            <RadioButton
              id="removeCare"
              name="care"
              value="remove"
              onChange={this.handleRadioChange}
              defaultChecked={typeof this.selectedSku === 'undefined'}
              analyticstrack="choose-no-applecare"
            >
              <p className="fontDisplayMedium">{cqLabel.OD_DEVICE_AC_NOT_NOW}</p>
              <p>{cqLabel.OD_DEVICE_AC_SIXTY_DAY}</p>
            </RadioButton>

            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <button className="button primary width40" onClick={this.handleSubmitAppleCare} analyticstrack="submit-applecare-selection">{cqLabel.OD_PROTECTION_NEXT_CTA}</button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AppleCare.propTypes = {
  applecare: PropTypes.array,
  addSelectedProtection: PropTypes.func,
  protection: PropTypes.object,
  saveUrl: PropTypes.string,
  cqLabel: PropTypes.object,
};

AppleCare.defaultProps = {};

export default AppleCare;
