import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';

export default class ChooseNumberShare extends Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.onNumberShareChanged = this.NumberShareChanged.bind(this);
  }

  /**
   *
   * @param event
   */
  NumberShareChanged(event) {
    this.props.numberShareOptionsChange(event.target.value);
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const { cqKeys } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Title className="textAlignLeft">{cqKeys.label.OD_NS_PROMPT_TITLE}</Title>
              <p className="textAlignLeft pad6 fontSize_1_3">
                <span>{cqKeys.label.OD_NS_PROMPT_SUB_TITLE}</span>
              </p>
              <HorizontalRule />
            </Col>
          </Row>
          <Row >
            <Col xs={12}>
              {
                this.props.numberShareOptions.map((option, index) => {
                  const radioName = `tradeinOptionradio${index}`;
                  const selected = !!((this.props.gotoUrl !== null && option.gotoUrl === this.props.gotoUrl));
                  return (
                    <div>

                      <RadioButton
                        id={radioName}
                        name="tradeinOption"
                        defaultChecked={selected}
                        value={option.gotoUrl}
                        onChange={this.onNumberShareChanged}
                        analyticstrack="choose-num-share"
                      >
                        <div className="fontDisplayMedium">
                          <span>{option.optionText}</span>
                        </div>

                        <div className="pad6 onlyTopPad fontDisplay">{option.optionDescription}</div>
                      </RadioButton>
                      <HorizontalRule y={1} color="#d8dada" />
                    </div>
                  );
                })}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

ChooseNumberShare.defaultProps = {
  cqKeys: {
    label: {
      OD_NS_PROMPT_TITLE: '',
    },
  },
};

ChooseNumberShare.propTypes = {
  numberShareOptions: PropTypes.array,
  numberShareOptionsChange: PropTypes.func,
  gotoUrl: PropTypes.string,
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_NS_PROMPT_TITLE: PropTypes.string,
    }),
  }),
};
