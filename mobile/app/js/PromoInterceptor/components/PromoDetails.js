import React from 'react';
import PropTypes from 'prop-types';

class PromoDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    const { aemUrl, title, description } = this.props;
    if (aemUrl) {
      return (<iframe title={title} src={aemUrl} className="width100" style={{ height: '70vh', border: '0' }} />);
    }
    return (<div dangerouslySetInnerHTML={{ __html: description }} />);
  }
}

PromoDetails.propTypes = {
  aemUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

PromoDetails.defaultProps = {};

export default PromoDetails;
