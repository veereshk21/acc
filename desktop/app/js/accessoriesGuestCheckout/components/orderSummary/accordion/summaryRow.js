import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const SummaryRow = (props) => {
  const {
    description, dueToday, dueMonthly, isTitle, isBTA, accessoryFlow, dueTodayDiscounted, dueTodayOriginal, dueMonthlyDiscounted, dueMonthlyOriginal, promoMessage, promotionsList,
  } = props;
  const descriptionClass = isTitle ? 'bold fontSize_5' : '';
  const priceClass = isTitle ? 'bold fontSize_5 textAlignRight' : 'textAlignRight';
  const iconClass = isTitle ? 'fontSize_6 lineHeight18 overflowHidden accordion_icon' : '';
  const rowClass = isTitle ? '' : 'margin12 noSideMargin';
  const dueTodayText = isBTA ? 'On next bill,' : 'Due today,';
  return (
    <Row className={rowClass}>
      <Col xs={accessoryFlow ? 8 : 5}>
        {description &&
          <div className={descriptionClass}>{description} <span className="is-visuallyHidden">,</span></div>
        }
        {promoMessage &&
          <div>{promoMessage}</div>
        }
        {promotionsList && promotionsList.length > 0 &&
          promotionsList.map((promotion) => (<p className="fontSize_2">{promotion.promotionalMessage}</p>))
        }
      </Col>
      <Col xs={3}>
        {dueTodayDiscounted &&
          <div className="textAlignRight textDecLineThrough">
            {dueTodayOriginal}
            {dueTodayOriginal !== '-' &&
              <span className="is-visuallyHidden">{dueTodayText}</span>
            }
          </div>
        }
        {dueToday &&
          <div className={priceClass}>
            {dueToday}
            {dueToday !== '-' &&
              <span className="is-visuallyHidden">{dueTodayText}</span>
            }
          </div>
        }
      </Col>
      {!accessoryFlow &&
        <Col xs={3}>
          {dueMonthlyDiscounted &&
            <div className="textAlignRight textDecLineThrough">
              {dueMonthlyOriginal}
              {dueMonthlyOriginal !== '-' &&
                <span className="is-visuallyHidden">{dueTodayText}</span>
              }
            </div>
          }
          {dueMonthly &&
            <p className={priceClass}>
              {dueMonthly}
              {dueMonthly !== '-' &&
                <span className="is-visuallyHidden">Due monthly</span>
              }
            </p>
          }
        </Col>
      }
      <Col xs={1} aria-hidden className={iconClass} />
    </Row >
  );
};

SummaryRow.defaultProps = {
  isBTA: false,
  accessoryFlow: false,
  dueTodayDiscounted: false,
  dueMonthlyDiscounted: false,
};

SummaryRow.propTypes = {
  description: PropTypes.element,
  dueToday: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  dueMonthly: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  isTitle: PropTypes.bool,
  isBTA: PropTypes.bool,
  accessoryFlow: PropTypes.bool,
  dueTodayDiscounted: PropTypes.bool,
  dueTodayOriginal: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  dueMonthlyDiscounted: PropTypes.bool,
  dueMonthlyOriginal: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  promotionsList: PropTypes.array,
  promoMessage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),

};

export default SummaryRow;
