export const paymentTagging = (bta, paypal, applepay, masterpass) => {
  // Build tagging string for payment options.
  const taggingArray = [];
  let testVersion = 'play akka version';

  if (bta) {
    taggingArray.push('bta offered');
  }
  if (paypal) {
    taggingArray.push('paypal offered');
  }
  if (applepay) {
    taggingArray.push('apple pay offered');
  }
  if (masterpass) {
    taggingArray.push('masterpass offered');
  }

  taggingArray.push('play akka version');
  testVersion = taggingArray.toString();

  if (window.vzwDL && window.vzwDL.page && window.vzwDL.page.testVersion !== testVersion) {
    window.vzwDL.page.testVersion = testVersion;
  }
};
