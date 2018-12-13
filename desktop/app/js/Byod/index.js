import 'babel-polyfill';
import a11y from 'react-a11y';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './../store';
import provider from './../provider';
import createRoutes from './routes';

import '../../css/base/base.scss';
import '../../css/base/fonts.scss';
import '../../css/layout/grid.scss';
import '../../css/layout/layout.scss';
import '../../css/modules/buttons.scss';
import '../../css/modules/icons.scss';
import '../../css/modules/modules.scss';
import './../../css/modules/modal.scss';
import '../../css/modules/radioButtons.scss';
import '../../css/modules/singles.scss';
import '../../css/states/states.scss';
import './../../css/modules/menu.scss';
import './../../css/modules/checkbox.scss';
import './../../css/modules/notification.scss';
import './../../css/modules/gw.scss';
import './../../css/pages/mdnSelection/mdnSelection.scss';
import './../../css/pages/byod/byod.scss';
import './../../css/modules/accordion.scss';
import cq from '../../cq/cq_byod.json';
import * as reducers from './reducer';

// TODO: Remove once integrated with backend
/* testing start */
// import byodJSON from './../../json/byodCheckedDevice'; //eslint-disable-line

if (process.env.NODE_ENV !== 'production') {
  a11y(React, ReactDOM, { device: ['desktop'] });
  // window.byodJSON = byodJSON; //eslint-disable-line
}

__webpack_public_path__ = window.resourceBaseUrl;


/* testing end */

const deviceOptions = {
  output: {
    deviceType: [
      {
        name: 'Smartphone',
        OS: [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="deviceInstructionsDetails"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Dial *#06# from your device.</li><li>The device ID number should display on your screen.</li></ol> <div class="bold margin10 noSideMargin fontSize_5">Or</div><ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your home screen, select "Menu".</li><li>Select "Settings".</li><li>Select "About Phone".</li><li>Select "Status".</li><li>Scroll down to the IMEI, ESN, or MEID number.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
        }, {
          name: 'Windows',
          deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
        }, {
          name: 'BlackBerry',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Dial #4357* from your device.</li><li>A Device ID number should display on your screen</li></ol> <div class="bold margin10 noSideMargin fontSize_5">Or</div><ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the Home screen, scroll to and select the "Options" icon.</li><li>From the Device Options screen, scroll to and select "Status".</li><li>Scroll down to the ESN number.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }, {
          name: 'Palm',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the Home screen, select the "Launcher" icon.</li><li>Select "Device Info".</li><li>Select "More Info".</li><li>Select the "Hardware" tab to display the ESN and MEID numbers.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }],
      },
      {
        name: 'Basic Phone',
        deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN, or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Devices Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Devices Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the devices purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
      },
      {
        name: 'Tablet',
        OS: [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your Home screen, select "Settings".</li><li>Select "General".</li><li>Select "About".</li><li>Scroll down to see the IMEI, ESN, or MEID number displayed.</li></ol></div></div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your home screen, select "Menu".</li><li>Select "Settings".</li><li>Select "About Phone".</li><li>Select "Status".</li><li>Scroll down to the IMEI, ESN or MEID number.</li></ol></div></div></div>',
        }, {
          name: 'Windows',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the right edge of the screen, swipe left to display the menu</li><li>Tap "Settings"</li><li>Tap "Change PC Settings"</li><li>From the left pane, tap "Network"</li><li>Ensure that "Connections" is selected from the left pane then tap "Verizon Wireless" from the Mobile broadband section</li><li>From the "Properties" section, view the IMEI (may require scrolling to the bottom)</li></ol></div></div></div>',
        }],
      },
      {
        name: 'Mobile Hotspot',
        OS: [{
          name: '3G Mobile Hotspot/Verizon Jetpack',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }, {
          name: '4G Mobile Hotspot/Verizon Jetpack',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the main screen, select the Settings icon</li><li>Note Utilize the Scroll buttons to highlight and the OK button to select.</li><li>Select Device Info</li><li>View the MEID</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 4 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the Device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }],
      },
      {
        name: 'USB Modem',
        OS: [{
          name: '3G USB Modem',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Locate the IMEI, ESN or MEID number on the outside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }, {
          name: '4G USB Modem',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Inside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Access the Verizon Mobile Broadband Manager interface through your connected device</li><li>Click Menu (located in the upper-right)</li><li>From the "Help" tab, click About (located in the lower-right)</li><li>View the Device ID</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Locate the IMEI, ESN or MEID number on the outside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 4 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }],
      },
      {
        name: 'Connected Device',
        OS: [{
          name: 'Other',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the Device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }, {
          name: 'LG GizmoPal',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Activate Your GizmoPal with Your iPhone or Android Phone</h5> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Click here for complete instructions on how to activate your GizmoPal:</h5> <a href="https://www.verizonwireless.com/support/lg-gizmopal/" target="_blank">https://www.verizonwireless.com/support/lg-gizmopal</a> <br/><br/><img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }, {
          name: 'Samsung Gear S',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Click here for complete instructions on how to activate your Galaxy Gear S:</h5> <a href="http://www.verizonwireless.com/support/knowledge-base-127904/" target="_blank">http://www.verizonwireless.com/support/knowledge-base-127904/</a> <br/><br/><img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div></div>',
        }],
      },
    ],
    simOption: [
      {
        text: 'Get new SIM',
      },
      {
        text: 'Next',
      },
    ],
    gotoURL: '/digital/cart/addPackageToCart',
    selectedDeviceId: '99000193404081',
  },
};

const simOptions = {
  output: {
    deviceType: [
      {
        name: 'Smartphone',
        OS: [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions span_12_of_12"><div id="o-sp-ios"> <p class="o-small-header">Find It Within Your Device</p><ul class="o-device-inst"> <li>1. From your home screen, select "Settings".</li><li>2. Select "General".</li><li>3. Select "About".</li><li>4. Scroll down to the ICCID number.</li></ul> </div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions span_12_of_12"><div id="o-sp-android" style=""> <p class="o-small-header">Find It Within Your Device</p><ul class="o-device-inst"> <li>1. From the home screen, press the "Menu" button</li><li>2. Select "Settings"</li><li>3. Select "About Phone"</li><li>4. Scroll down and your SIM number should appear as the SIM ID</li></ul> </div></div>',
        }, {
          name: 'Windows',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions span_12_of_12"><div id="o-sp-windows" style=""><p class="o-small-header"><span>Option 1</span> - Find It Within Your Device</p><ul class="o-device-inst"><li>1. From the main menu, swipe from right to left to get to the applications list</li><li>2. Scroll down and click on Settings</li><li>3. Scroll down and click on About</li><li>4. Click More Information</li><li>5. Your SIM number will appear as the SIM ID</li></ul><p class="o-small-header"><span>Option 2</span> - Find It on the Outside of Your Device</p><ul class="o-device-inst"><li>1. Remove the battery from your device.</li><li>2. Locate the IMEI, ESN, or MEID number on the inside of your device. See image for reference.</li></ul></div></div>',
        }, {
          name: 'BlackBerry',
          deviceIdInstructions: '',
        }],
      },
      {
        name: 'Tablet',
        OS: [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions  span_12_of_12"><div id="o-sp-ios"> <p class="o-small-header">Find It Within Your Device</p> <ul class="o-device-inst"> <li>1. From your home screen, select "Settings".</li> <li>2. Select "General".</li> <li>3. Select "About".</li> <li>4. Scroll down to the ICCID number.</li> </ul> </div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions  span_12_of_12"><div id="o-t-android"> <p class="o-small-header">Find It Within Your Device</p> <ul class="o-device-inst"> <li>1. From the home screen, press the menu button and select Settings</li> <li>2. Scroll down and click on About</li> <li>3. Click Phone Identity or About depending on model you are using.</li> <li>4. Your SIM number should appear as the SIM ID</li> </ul> </div></div>',
        }],
      },
      {
        name: 'Mobile Hotspot',
        OS: [{
          name: '4G Mobile Hotspot/Verizon Jetpack',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions  span_12_of_12"><div id="o-hotspot-4g-hotspot"><p class="o-small-header">Find It Within Your Device</p><ul class="o-device-inst"><li>1. From the main screen, select the Settings icon</li><li>2. Note Utilize the Scroll buttons to highlight and the OK button to select.</li><li>3. Select Device Info</li><li>4. View the MEID</li></ul></div></div>',
        }],
      },
      {
        name: 'USB Modem',
        OS: [{
          name: '4G USB Modem',
          deviceIdInstructions: '<div id="otherSIMInstructionsDetails" class="clearfix margin20 floatLeft onlyBottomMargin deviceInstructions  span_12_of_12"><div id="o-instructions-usbmodem" style=""> <div id="o-usb-4g"> <p class="o-small-header">Find It Within Your Device</p> <ul class="o-device-inst"> <li>1. From the main screen, select the "Settings" icon</li> <li>2. Select "Device Info"</li> <li>3. View the ICCID</li> </ul> </div> </div></div>',
        }],
      },
    ],
  },
};

const deviceList = [{
  name: 'iOS(Apple)',
  img: 'https://ss7.vzw.com/is/image/VerizonWireless/apple-1?$defaultScale$',
  key: '<div id="deviceInstructionsDetails"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
}, {
  name: 'Android',
  img: 'https://ss7.vzw.com/is/image/VerizonWireless/android?$defaultScale$',
  key: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Dial *#06# from your device.</li><li>The device ID number should display on your screen.</li></ol> <div class="bold margin10 noSideMargin fontSize_5">Or</div><ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your home screen, select "Menu".</li><li>Select "Settings".</li><li>Select "About Phone".</li><li>Select "Status".</li><li>Scroll down to the IMEI, ESN, or MEID number.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
}, {
  name: 'Windows',
  img: 'https://ss7.vzw.com/is/image/VerizonWireless/windows?$defaultScale$',
  key: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div>',
}, {
  name: 'Basic Phone',
  img: 'https://ss7.vzw.com/is/image/VerizonWireless/basic phone?$defaultScale$',
  key: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN, or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Devices Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Devices Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the devices purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""/></div></div>',
}, {
  name: 'Other Device',
  img: 'https://ss7.vzw.com/is/image/VerizonWireless/other devices?$defaultScale$',
  key: '',
}];


axios.get(__webpack_public_path__ + cq).then((result) => {
  const initialState = {
    pageJSON: window.byodJSON.output || {},
    simOptions,
    deviceList,
    deviceOptions,
    cqContent: result.data || { html: {}, label: {}, error: {} },
  };
  const store = configureStore(initialState, { ...reducers });

  /* Calling the render method of ReactDOM, with Providers */
  const render = () => {
    ReactDOM.render(
      provider(store, createRoutes(store)),
      document.getElementById('app')
    );
  };

  render();
});
