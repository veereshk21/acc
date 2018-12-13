import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpecCategory from './SpecCategory';
import BackButton from '../../common/BackButton/BackButton';
/* eslint-disable react/prefer-stateless-function */
class DetailedDesc extends Component {
  render() {
    const { techSpecs } = this.props;
    const { cqKeys } = this.props;

    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/">{cqKeys.label.OD_PDP_BACK_BUTTON_TEXT}</BackButton>
        <div className="pad30">
          <h4 className="h2 margin12 onlyTopMargin width80 textAlignCenter" dangerouslySetInnerHTML={{ __html: cqKeys.label.OD_PDP_DETAIL_SPECS_TITLE_TEXT }} />
          {
            techSpecs.techSpecsDetails.map((spec, index) => <SpecCategory key={index} data={spec} />)
          }
        </div>
      </div>
    );
  }
}

DetailedDesc.defaultProps = {
  cqKeys: {
    label: {
      OD_PDP_BACK_BUTTON_TEXT: '',
      OD_PDP_DETAIL_SPECS_TITLE_TEXT: '',
    },
  },
};

/* eslint-disable react/require-default-props, react/forbid-prop-types */
DetailedDesc.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_PDP_BACK_BUTTON_TEXT: PropTypes.string,
      OD_PDP_DETAIL_SPECS_TITLE_TEXT: PropTypes.string,
    }),
  }),
};

export default DetailedDesc;

DetailedDesc.propTypes = {
  techSpecs: PropTypes.object,
};
