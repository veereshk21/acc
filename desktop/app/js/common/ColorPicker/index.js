// import ClassNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import RadioButton from './../RadioButton';

// import * as Constants from './../Constants';

class ColorPicker extends Component {
  // Pass array of skus and an event from parent to be called to manage selectedSku
  // create generic helper to pull color from skus? or pass skus entirely and filter down here?
  renderColors = () => {
    // let deviceColors = this.props.deviceSkus.map((sku) => (sku.color));
    // deviceColors = deviceColors.filter((elem, pos) => deviceColors.indexOf(elem) === pos);
    // console.log(this.props);

    const renderedColors = this.props.deviceSkus.map((sku, index) => {
      const radioName = `colorRadio${index}`;
      // Add functionality to disable based on out of stock colors
      return (
        <Col xs={3}>
          <RadioButton
            name="colorRadio"
            id={radioName}
            value={sku}
            defaultChecked={sku.selected}
          />
        </Col>
      );
    });
    return renderedColors;
  }

  render() {
    // const { content, ...otherProps } = this.props;
    // const radioClass = !content.radio.className ? Constants.DROPDOWN_CSS_CLASSES : ClassNames(Constants.DROPDOWN_CSS_CLASSES, content.radio.className);
    // const labelClass = !content.label.className ? Constants.DROPDOWN_LABEL_CSS_CLASSES : ClassNames(Constants.DROPDOWN_LABEL_CSS_CLASSES, content.label.className);
    // const radioClass = '';
    // const labelClass = '';

    return (
      <Row style={{ margin: 0 }}>
        {this.renderColors()}
      </Row>
    );
  }
}

ColorPicker.propTypes = {
  deviceSkus: PropTypes.array,
};

export default ColorPicker;
