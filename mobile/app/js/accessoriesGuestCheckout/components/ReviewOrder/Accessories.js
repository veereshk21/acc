import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import HorizontalRule from '../../../common/HorizontalRule';

const Cols = styled(Col)`
  display:flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;
const HRule = styled(HorizontalRule)`
  width: 100%
`;
const Accessories = ({ accessories }) => (
  <div>
    {
      accessories.map((acc, i) => (
        <Row
          key={i}
          style={{ position: 'relative' }}
          className="noSideMargin pad24 noBottomPad"
        >

          <Cols xs={6} className="verticalCenter">
            <h2 className="h3">
              <span dangerouslySetInnerHTML={{ __html: acc.name }} />
            </h2>
            <p
              className="fontSize_2 margin6 onlyTopMargin"
              dangerouslySetInnerHTML={{ __html: (acc.color ? acc.color : '') + ((acc.color && acc.size) ? ', ' : '') + (acc.size ? acc.size : '') }}
            />
          </Cols>
          <Col xs={6} className="textAlignCenter verticalCenter">
            <img src={acc.imageUrl} alt={acc.name} />
          </Col>
          <HRule y={5} margin="24px 0 0" />
        </Row>
      ))
    }
  </div>
);

Accessories.propTypes = {
  accessories: PropTypes.array,
};

Accessories.defaultProps = {};

export default Accessories;
