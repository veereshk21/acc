/**
 * Created by gautam on 2/5/2017.
 */
import { connect } from 'react-redux';

import DeviceImage from '../components/DeviceImage';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.get('confirmationView').toJS();
  let imageUrl = data && data.imageUrl ? data.imageUrl : '';
  const imageWidthHeight = '&wid=165&hei=250';

  if (imageUrl) {
    imageUrl += imageUrl.indexOf('?') === -1 ? '?' + imageWidthHeight : imageWidthHeight;
  }

  return {
    imageUrl,
  };
};

const DeviceImageContainer = connect(mapStateToProps)(DeviceImage);

export default DeviceImageContainer;
