import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import ChooseNumberShare from './ChooseNumberShare';
import NextButton from './NextButton';

export class TradeIn extends Component { // eslint-disable-line
  render() {
    return (
      <Grid className="pad32">
        <ChooseNumberShare />
        <NextButton />
      </Grid>
    );
  }
}

export default TradeIn;
