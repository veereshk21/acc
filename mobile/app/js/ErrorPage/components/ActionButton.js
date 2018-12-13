/**
 * Created by sgumma on 22-02-2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios';
import Button from '../../common/Button/Button';

export default class ActionButton extends React.Component {
  onBtnClick() { // eslint-disable-line 
    if (this.props.cta.ajax) {
      this.props.onAjaxRequest(`${this.props.cta.ajaxUrl}`);
      return false;
    }
    if (this.props.cta.link) {
      delete this.props.statedata.placeholder;
      return request({
        method: 'post',
        url: '/digital/feedback/customer/save',
        data: this.props.statedata,
      }).then(() => {
        window.location.href = this.props.cta.link;
      }).catch(() => {
        window.location.href = this.props.cta.link;
      });
    }
    if (this.props.cta.confirmRequired) {
      if (confirm(`${this.props.cta.confirmationMessage}`)) { // eslint-disable-line
        this.props.onAjaxRequest(`${this.props.cta.ajaxUrl}`);
      }
      return false;
    }
  }

  render() {
    const { cta, btnType } = this.props;
    if (cta.link) {
      return (
        <a className={`${btnType} margin12 link`} href={cta.link} analyticstrack={`error-${cta.label}`}>{cta.label}</a>
      );
    }
    return (
      <Button className={`${btnType} margin12`} onClick={this.onBtnClick.bind(this)} analyticstrack={`error-${cta.label}`}>{cta.label}</Button>
    );
  }
}

ActionButton.propTypes = {
  cta: PropTypes.object,
  onAjaxRequest: PropTypes.func,
  btnType: PropTypes.string,
  statedata: PropTypes.object,
};
