(function () {
  // initialize history buffer
  const historyBuffer = [];
  let previousUrl = '';
  // push loaded hash value
  historyBuffer.push(window.location.href);

  window.onhashchange = function () {
    previousUrl = historyBuffer[historyBuffer.length - 1];
    // detects a back click or a routing to the previous route
    let eventType = 'button_click';
    if (historyBuffer[historyBuffer.length - 2] === window.location.href) {
      historyBuffer.pop();
      eventType = 'back_button_click';
    } else { historyBuffer.push(window.location.href); }

    postData(eventType, previousUrl, window.location.href, '');
  };

  function logInfo(message) {
    postData('info_log', previousUrl, window.location.href, message);
  }

  function logError(message) {
    postData('error_log', previousUrl, window.location.href, message);
  }

  function postData(eventType, parentUrl, requestUrl, message) {
    const http = new XMLHttpRequest();
    const url = '/od/cust/auth/logs/frontend';
    const params = {
      parent_url: parentUrl, // previous
      request_url: requestUrl, // current
      event_type: eventType,
      log_message: message,
    };
    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader('Content-Type', 'text/plain'); // default type: x-www-form-urlencoded
    http.onreadystatechange = function () { // Call a function when the state changes.
      if (http.readyState === 4 && http.status === 200) {
        console.log(http.responseText);
      }
    };
    http.send(JSON.stringify(params));
  }

  return {
    logInfo,
    logError,
  };
}());
