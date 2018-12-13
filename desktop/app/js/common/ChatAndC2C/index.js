import React, { Component } from 'react';

import logger from '../../../../server/logger';

class ChatAndC2C extends Component {
  componentDidMount() {
    const pageIdProperty = window.location.pathname + window.location.hash.split('?')[0];
    setTimeout(() => {
      if (window.PageIds !== null && window.PageIds !== undefined) {
        window.inqSiteId = window.PageIds[pageIdProperty];
        if (window.inqSiteId && window.Inq && window.Inq.reinitChat) {
          try {
            window.Inq.reinitChat(window.inqSiteId);
          } catch (err) {
            logger.log('Unable to reinitialize chat: ' + err);
          }
        }
      }
      if (window.c2c !== null && window.c2c !== undefined) {
        try {
          logger.log('trying  the try');
          window.c2c.initializeC2C([{ buttonname: 'generic-c2c-container-desktop', targeteddiv: ['c2c_container_desktop'], url: '/content/vzw-engage/c2c/btn.display.generic-c2c-container-desktop.html' }]);
        } catch (err) {
          logger.log('Unable to reinitialize c2c: ' + err);
        }
      }
    }, 2000);
  }
  render = () => {
    const hideC2C = (window.sessionTimeOutJSON && (window.sessionTimeOutJSON.hideC2C || false));
    return (
      <div className="textAlignRight positionRelative noChatAndCall pad5 onlyTopPadding">
        <div id="inqC2CImgContainer_Fixed1" className="displayInlineBlock" />
        {!hideC2C && <div id="c2c_container_desktop" className="displayInlineBlock c2c_container_desktop" />}
        <div id="nuance-chat-container-1" />
      </div>
    );
  }
}

export default ChatAndC2C;
