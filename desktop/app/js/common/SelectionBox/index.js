import React from 'react';
import PropTypes from 'prop-types';
import './../../../css/modules/radioButtonSelection.scss';

class SelectionBox extends React.Component {
  render() {
    const disabled = this.props.disabled;
    const selected = !disabled && this.props.selected;
    const value = this.props.value;
    return (
      <div className={`${disabled ? 'disabled selectionBox' : 'selectionBox'}`} analyticstrack={this.props.analyticstrack}>
        <input disabled={disabled} checked={selected} onChange={() => { if (!disabled) { this.props.selectFn(this.props.id, this.props.priceHeaderText); } }} aria-labelledby={this.props.id} role="radio" id={'radio_' + this.props.id} type="radio" name={this.props.name} aria-checked={selected} value={value} style={{ position: 'absolute', width: '100%', height: '100%' }} />
        <div id={this.props.id} onKeyDown={(e) => { if (!disabled && e.keyCode === 13) { this.props.selectFn(this.props.id, this.props.priceHeaderText); } }} onClick={() => { if (!disabled) { this.props.selectFn(this.props.id, this.props.priceHeaderText); } }}>
          <label htmlFor={'radio_' + this.props.id}>
            <div className="flex">
              <div style={{ width: '100%' }}>
                <p className="bodySM fontDisplayBold headerText fontSize_7" dangerouslySetInnerHTML={{ __html: this.props.headerText }} />
              </div>
              { this.props.showImage && <div style={{ width: '20%' }}>
                <img className="floatRight" src={this.props.image} height="35px" width="35px" alt="" />
              </div> }
            </div>
            {this.props.infoMsgHeader &&
              <p className="fontSize_3 margin6 onlyBottomMargin">{this.props.infoMsgHeader}</p>
            }
            {this.props.showBodyNoSpace && <div>
              <p
                className="caption fontSize_3"
                dangerouslySetInnerHTML={{
                  __html: this.props.bodyText,
                }}
              />
            </div>}
            {this.props.showBody && <div className="margin10 noSideMargin">
              <p
                className="caption"
                dangerouslySetInnerHTML={{
                  __html: this.props.bodyText,
                }}
              />
            </div>}
            {this.props.showPriceHeaderText && <div>
              <div style={LineStyle} />
              <div style={{ width: '100%' }}>
                <p className="bodySM fontDisplayBold margin10 noSideMargin">{this.props.priceHeaderText}</p>
              </div>
            </div>}
            {this.props.infoMsgFooter &&
              <p className="fontSize_3 margin6 onlyTopMargin">{this.props.infoMsgFooter}</p>
            }
          </label>
        </div>
      </div>
    );
  }
}

const LineStyle = { marginTop: '8px', marginBottom: '6px', height: '1px', backgroundColor: '#000' };

SelectionBox.defaultProps = {
  showBody: false,
  showBodyNoSpace: false,
  headerText: 'No thanks',
  bodyText: '',
  id: '',
  name: 'radio_box',
  showCaptionText: false,
  captionText: '$199.97/today',
  showPriceHeaderText: false,
  priceHeaderText: '$3.00/mo',
  showImage: false,
  image: '',
  value: '',
  selected: false,
  selectFn: () => {},
  analyticstrack: '',
};

SelectionBox.propTypes = {
  showBody: PropTypes.bool,
  showBodyNoSpace: PropTypes.bool,
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  showPriceHeaderText: PropTypes.bool,
  priceHeaderText: PropTypes.string,
  showImage: PropTypes.bool,
  image: PropTypes.string,
  value: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  selectFn: PropTypes.func,
  analyticstrack: PropTypes.string,
  infoMsgHeader: PropTypes.bool,
  infoMsgFooter: PropTypes.bool,
};

export default SelectionBox;
