import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import MDNSelection from './mdnSelection';

export default class mainView extends React.Component {
  componentWillMount() {
    const { statusCode } = this.props;
    if (statusCode !== '00') {
      hashHistory.push('/notEligible/' + statusCode);
    }
  }

  render() {
    // Main view for MDN Selection, user can choose which device to upgrade
    const { mdnDetailsList } = this.props;
    if (mdnDetailsList) {
      return (<MDNSelection
        mdnDetailsList={this.props.mdnDetailsList}
        cqJSON={this.props.cqJSON}
        {...this.props}
      />);
    }
    return (<div />);
  }
}

mainView.propTypes = {
  mdnJSON: PropTypes.object,
  cqJSON: PropTypes.object,
  mdnDetailsList: PropTypes.array,
  mdnSelectionView: PropTypes.string,
  statusCode: PropTypes.number,
};
