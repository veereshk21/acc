import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Specs extends Component {
  showDetailSpecs(evt) {
    evt.preventDefault();
  }

  render() {
    const { isActive, cqKeys } = this.props;

    return (
      <div className={`margin12 onlyTopMargin ${isActive ? '' : 'is-hidden'}`}>
        <div className="background_FF pad10 span_12_of_12 pdpSlide" >
          <div className=" background_FF">
            <div className="pad20 onlySidePad">
              <h4 className="h2 margin12 onlyTopMargin pad10 onlyBottomPad">
                {cqKeys.label.OD_ACCPDP_SPECS_TITLE}
              </h4>
              <div className="accPDP_specsWrap" dangerouslySetInnerHTML={{ __html: this.props.techSpecs }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Specs.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_SPECS_SEE_DETAILED_SPECS_TEXT: '',
    },
  },
};

Specs.propTypes = {
  isActive: PropTypes.bool,
  techSpecs: PropTypes.string,
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_SPECS_SEE_DETAILED_SPECS_TEXT: PropTypes.string,
    }),
  }),
};
