/**
 * Created by mambig on 2/2/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import AmexCardImg from '../../../images/saved_card_amex.svg';
import MasterCardImg from '../../../images/saved_card_mastercard.svg';
import VisaCardImg from '../../../images/saved_card_visa.svg';
import DiscoverCardImg from '../../../images/saved_card_discover.svg';
import DinnersClubCardImg from '../../../images/saved_card_dinersclub.svg';


const getCardTypeStyle = (cardType) => {
  let cardTypeStyle = null;
  switch (cardType.toString().toLocaleLowerCase()) {
    case 'amex':
      cardTypeStyle = {
        backgroundImage: "url('" + AmexCardImg + "'), none",
      };
      break;
    case 'mastercard':
      cardTypeStyle = {
        backgroundImage: "url('" + MasterCardImg + "'), none",
      };
      break;
    case 'visa':
      cardTypeStyle = {
        backgroundImage: "url('" + VisaCardImg + "'), none",
      };
      break;
    case 'dinersclub':
      cardTypeStyle = {
        backgroundImage: "url('" + DinnersClubCardImg + "'), none",
      };
      break;
    case 'discover':
      cardTypeStyle = {
        backgroundImage: "url('" + DiscoverCardImg + "'), none",
      };
      break;
    default:
      cardTypeStyle = {
        backgroundColor: '#b4dff3',
        borderRadius: '6px',
      };
  }
  return cardTypeStyle;
};

const SavedCard = (props) => {
  const { cardName, cardNumber, cardType } = props;


  return (
    <div className="savedCard pad18" style={getCardTypeStyle(cardType)}>
      <div className="savedCardPan">....&nbsp;&nbsp;&nbsp;....&nbsp;&nbsp;&nbsp;....&nbsp;&nbsp;&nbsp;{cardNumber}</div>

      <div className="savedCardName width80 floatLeft" title={cardName}>{cardName}</div>

    </div>
  );
};
SavedCard.propTypes = {
  cardName: PropTypes.string,
  cardNumber: PropTypes.string,
  cardType: PropTypes.string,
};
export default SavedCard;
