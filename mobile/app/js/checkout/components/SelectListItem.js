/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default class SelectListItem extends React.Component {
  getContent() {
    return (
      <div onClick={this.props.onClick} role={this.props.onClick ? 'link' : ''} className="border_EB onlyBottomBorder">
        <div className="span_12_of_12 verticalCenter rightAlign pad20 ellipsis">
          <div className="table width100">
            <div className="table_tr">
              <div className="table_td width50 verticalAlignMiddle textAlignLeft">
                <p className="color_000 bold width100">{this.props.title}</p>
                {this.props.subtitle && <p className="legalFinePrint color_959595">{this.props.subtitle}</p>}
              </div>
              <div className="table_td width50 verticalAlignMiddle textAlignRight pad10 onlyLeftPad">
                <div className="table_tr">
                  <div className="table_td verticalAlignMiddle textAlignRight width100">
                    {this.props.showValue &&
                      <span className="color_000" dangerouslySetInnerHTML={{ __html: this.props.value ? this.props.value : '' }} />
                    }
                  </div>
                  <div className="table_td verticalAlignMiddle ">
                    <span className={`arrowCTA floatRight ${this.props.showArrow ? '' : 'm-noContent'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }

  render() {
    return (
      <div>
        {(typeof this.props.itemOnJaxPlan !== typeof undefined && this.props.itemOnJaxPlan === false) ||
          (typeof this.props.onClick !== typeof undefined && this.props.onClick) ||
          (typeof this.props.to === typeof undefined && !this.props.to) ?
          this.getContent()
          :
          <Link to={this.props.to}>
            {this.getContent()}
          </Link>}
      </div>
    );
  }
}

SelectListItem.defaultProps = {
  showValue: true,
  onClick: null,
  showArrow: true,
};
SelectListItem.propTypes = {
  to: PropTypes.string,
  value: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showArrow: PropTypes.bool,
  showValue: PropTypes.bool,
  onClick: PropTypes.func,
  itemOnJaxPlan: PropTypes.bool,
};
