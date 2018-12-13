import React from 'react';
import PropTypes from 'prop-types';

class PromoDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { aemURL, title, description } = this.props;
    if (aemURL) {
      return (<iframe title={title} src={aemURL} className="width100" style={{ height: '70vh', border: '0' }} />);
    }
    return (<div dangerouslySetInnerHTML={{ __html: description }} />);
  }
}

PromoDetails.propTypes = {
  aemURL: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

PromoDetails.defaultProps = {};

export default PromoDetails;
