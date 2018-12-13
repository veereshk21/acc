/**
 * Created by hmahad on 15/06/17.
 */
const byodDeviceDetailsJSON = {
  "output": {
    "deviceType": [
      {
        "name": "Smartphone",
        "OS": [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="deviceInstructionsDetails"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Dial *#06# from your device.</li><li>The device ID number should display on your screen.</li></ol> <div class="bold margin10 noSideMargin fontSize_5">Or</div><ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your home screen, select "Menu".</li><li>Select "Settings".</li><li>Select "About Phone".</li><li>Select "Status".</li><li>Scroll down to the IMEI, ESN, or MEID number.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div>',
        }, {
          name: 'Windows',
          deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From Start screen, select the right arrow (located in the upper-right).</li><li>Select "Settings".</li><li>Select "About".</li><li>Select "More Info" and the MEID number will appear.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div>',
        }, {
          name: 'BlackBerry',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Dial #4357* from your device.</li><li>A Device ID number should display on your screen</li></ol> <div class="bold margin10 noSideMargin fontSize_5">Or</div><ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the Home screen, scroll to and select the "Options" icon.</li><li>From the Device Options screen, scroll to and select "Status".</li><li>Scroll down to the ESN number.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }, {
          name: 'Palm',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the Home screen, select the "Launcher" icon.</li><li>Select "Device Info".</li><li>Select "More Info".</li><li>Select the "Hardware" tab to display the ESN and MEID numbers.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See the image for reference.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }]
      },
      {
        name: 'Basic Phone',
        deviceIdInstructions: '<div id="deviceInstructionsDetails" aria-hidden="true" tabindex="-1"><div class="margin30 onlyTopMargin"> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN, or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Devices Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Devices Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the devices purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div>',
      },
      {
        "name": "Tablet",
        "OS": [{
          name: 'iOS(Apple)',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your Home screen, select "Settings".</li><li>Select "General".</li><li>Select "About".</li><li>Scroll down to see the IMEI, ESN, or MEID number displayed.</li></ol></div></div></div>',
        }, {
          name: 'Android',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From your home screen, select "Menu".</li><li>Select "Settings".</li><li>Select "About Phone".</li><li>Select "Status".</li><li>Scroll down to the IMEI, ESN or MEID number.</li></ol></div></div></div>',
        }, {
          name: 'Windows',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the right edge of the screen, swipe left to display the menu</li><li>Tap "Settings"</li><li>Tap "Change PC Settings"</li><li>From the left pane, tap "Network"</li><li>Ensure that "Connections" is selected from the left pane then tap "Verizon Wireless" from the Mobile broadband section</li><li>From the "Properties" section, view the IMEI (may require scrolling to the bottom)</li></ol></div></div></div>',
        }]
      },
      {
        "name": "Mobile Hotspot",
        "OS": [{
          name: '3G Mobile Hotspot/Verizon Jetpack',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }, {
          name: '4G Mobile Hotspot/Verizon Jetpack',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It Within Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>From the main screen, select the Settings icon</li><li>Note Utilize the Scroll buttons to highlight and the OK button to select.</li><li>Select Device Info</li><li>View the MEID</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 4 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the Device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }]
      },
      {
        "name": "USB Modem",
        "OS": [{
          name: '3G USB Modem',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Locate the IMEI, ESN or MEID number on the outside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }, {
          name: '4G USB Modem',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Inside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Access the Verizon Mobile Broadband Manager interface through your connected device</li><li>Click Menu (located in the upper-right)</li><li>From the "Help" tab, click About (located in the lower-right)</li><li>View the Device ID</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Locate the IMEI, ESN or MEID number on the outside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 4 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }]
      },
      {
        "name": "Connected Device",
        "OS": [{
          name: 'Other',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Option 1 - Find It on the Outside of Your Device</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Remove the battery from your device.</li><li>Locate the IMEI, ESN or MEID number on the inside of your device. See image for reference.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 2 - Find It On Your Device&apos;s Packaging</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Check the inside and outside of the box your device came in for the MEID, ESN or IMEI.</li></ol> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Option 3 - Find It On Your Device&apos;s Receipt</h5> <ol class="listStyle_decimal" style="padding-left:1em;"> <li>Review the Device&apos;s purchase receipt for a number labeled MEID, ESN or IMEI.</li></ol> <img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }, {
          name: 'LG GizmoPal',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Activate Your GizmoPal with Your iPhone or Android Phone</h5> <h5 class="margin30 onlyTopMargin pad10 onlyBottomPad">Click here for complete instructions on how to activate your GizmoPal:</h5> <a href="https://www.verizonwireless.com/support/lg-gizmopal/" target="_blank">https://www.verizonwireless.com/support/lg-gizmopal</a> <br><br><img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }, {
          name: 'Samsung Gear S',
          deviceIdInstructions: '<div id="otherDeviceInstructionsDetails" class="clearfix margin20 floatLeft noSideMargin deviceInstructions span_12_of_12" aria-hidden="true" tabindex="-1"><div><div> <h5 class="margin10 onlyBottomMargin">Click here for complete instructions on how to activate your Galaxy Gear S:</h5> <a href="http://www.verizonwireless.com/support/knowledge-base-127904/" target="_blank">http://www.verizonwireless.com/support/knowledge-base-127904/</a> <br><br><img src="https://stcache.vzw.com/omni/dt/i/nso/device-id.jpg" class="margin20 onlyTopMargin" alt=""></div></div></div>',
        }]
      }
      
    ],
    "simOption": [
      {
        "text": "Get new SIM"
      },
      {
        "text": "Next"
      }
    ],
    "gotoURL": "/digital/cart/addPackageToCart",
    "selectedDeviceId": "99000193404081"
  }
}
export default byodDeviceDetailsJSON;

