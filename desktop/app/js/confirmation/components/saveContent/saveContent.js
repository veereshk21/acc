import React from 'react';
import PropTypes from 'prop-types';

const SaveContent = (props) => {
  const { cqContent } = props;
  return (
    <div className="margin16 onlyTopMargin">
      <section className="background_gray_three pad30" style={{ background: '#e3e3e3' }}>
        <div>
          <h2 className="fontSize_11">{cqContent.label.DT_OD_CONFIRMATION_GET_HEAD_START}</h2>
          <p className="fontSize_6 bold pad10 noSidePad" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_SAVE_DATA }} />
        </div>
        <ul className="plainList clearfix margin40 onlyTopMargin pad20 onlyBottomPad">
          <li className="floatLeft width50 pad20 onlyRightPad">
            <span className="floatLeft confirmation_circle textAlignCenter background_gray_six fontSize_11 margin20 onlyRightMargin">1</span>
            <p className="floatLeft width80">
              <span className="color_666" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_BACKUP_DATA }} />
              <a className="block textDecUnderline margin10 onlyTopMargin" href="/support/transfer-contacts-and-media/" target="_blank" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_EASY_FILE_TRANSFER }} />
            </p>
          </li>
          <li className="floatLeft width50 pad20 onlyRightPad">
            <span className="floatLeft confirmation_circle textAlignCenter background_gray_six fontSize_11 margin20 onlyRightMargin">2</span>
            <p className="floatLeft width80">
              <span className="color_666">
                {cqContent.label.DT_OD_CONFIMATION_ACTIVATE_NEW_DEVICE}
              </span>
              <a className="block textDecUnderline margin10 onlyTopMargin" href="/solutions-and-services/activate-my-device/" target="_blank">{cqContent.label.DT_OD_CONFIRMATION_EASY_TO_ACTIVATE}</a>
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

SaveContent.propTypes = {
  cqContent: PropTypes.object,
};
export default SaveContent;
