import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HorizontalRule from '../../common/HorizontalRule';

const Cols = styled(Col)`
  align-items: flex-end;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const Component = (props) => (
  <Row className="noSideMargin pad24 noBottomPad" onClick={props.onClick} role={props.onClick ? 'link' : ''}>
    <Cols xs={6} style={{ justifyContent: 'flex-start' }}>
      <p className="color_000 bold width100">{props.title}</p>
      {props.subtitle && <p className="legalFinePrint color_959595 width100">{props.subtitle}</p>}
    </Cols>
    <Cols xs={5} >
      <div className="table_tr textAlignRight">
        {props.showValue &&
          <span className="color_000" dangerouslySetInnerHTML={{ __html: props.value ? props.value : 'Not found' }} />
        }
      </div>
    </Cols>
    <Cols
      xs={1}
      className="textAlignRight"
    >
      <span className={`arrowCTA pad3 onlyTopPad floatRight ${props.showArrow ? '' : 'm-noContent'}`} />
    </Cols>
    <HorizontalRule style={{ width: '100%' }} margin="24px 0 0" y={1} color={props.color} />
  </Row>
);
// const Component =
const SelectListItem = (props) => (
  <div>
    {(typeof props.onClick !== typeof undefined && props.onClick) ||
      (typeof props.to === typeof undefined && !props.to) ?
      <Component {...props} analyticstrack="view-breakdown-content" />
      :
      <Link to={props.to} analyticstrack="view-breakdown-content">
        <Component {...props} />
      </Link>}
  </div>
);

Component.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showValue: PropTypes.bool,
  value: PropTypes.string,
  showArrow: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

Component.defaultProps = {
  title: '',
  subtitle: '',
  showValue: true,
  value: '',
  showArrow: true,
  color: '#D8DADA',
};
SelectListItem.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
};

export default SelectListItem;
