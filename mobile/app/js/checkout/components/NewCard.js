/**
 * Created by mambig on 2/2/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import NewCardImg from '../../../images/generic_card.svg';

const NewCard = (props) => {
  const cardTypeStyle = {
    backgroundImage: "url('" + NewCardImg + "')",
  };
  return (
    <div className="savedCard pad18 newCard" style={cardTypeStyle} >
      <div className="newCardPan">{props.cardOverlayMsg}</div>
    </div>
  );
};

NewCard.propTypes = {
  cardOverlayMsg: PropTypes.string,
};

export default NewCard;
