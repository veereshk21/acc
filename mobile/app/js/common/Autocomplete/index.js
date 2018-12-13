import GoogleMapLoader from '../GoogleMaps/GoogleMapLoader';

const autoCompleteCallBack = (autocomplete, placesAutocompleteOnSelect) => {
  const componentForm = {
    street_number: 'short_name',
    route: 'short_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name',
  };
  const place = autocomplete.getPlace();
  let street_address1 = '';
  const test = {};
  for (let i = 0, len = place.address_components.length; i < len; i++) {
    const addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      const val = place.address_components[i][componentForm[addressType]];
      if (addressType === 'street_number') { /* Saving street_number to prepend it with the route and use as value for Address 1 */
        street_address1 = place.address_components[i][componentForm[addressType]];
      } else if (addressType === 'route') {
        street_address1 += ' ' + place.address_components[i][componentForm[addressType]];
        test[addressType] = street_address1;
      } else {
        test[addressType] = val;
      }
    }
  }
  placesAutocompleteOnSelect(test);
};

const options = {
  types: ['address'],
  componentRestrictions: { country: 'us' },
};

export const initAutoComplete = (googleMapAPI, id, placesAutocompleteOnSelect) => {
  const inputField = document.getElementById(id);

  GoogleMapLoader(googleMapAPI).then(() => {
    if (inputField) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputField, options);
      window.google.maps.event.addListener(autocomplete, 'place_changed', () => { autoCompleteCallBack(autocomplete, placesAutocompleteOnSelect); });
    }
  });
};
