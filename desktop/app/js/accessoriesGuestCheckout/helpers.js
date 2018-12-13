export const transformServiceAddress = (values) => ({
  firstName: values.firstNameServAddress,
  lastName: values.lastNameServAddress,
  address1: values.address1ServAddress,
  address2: values.address2ServAddress,
  city: values.cityServAddress,
  state: values.stateServAddress,
  zipCode: values.zipcodeServAddress,
  phoneNumber: values.phoneNumberServAddress,
});

export const transformPortIn = (values) => ({
  address1: values.portInAddress,
  address2: values.portInAddress2,
  zipcode: values.portInZipCode,
  city: values.portInCity,
  state: values.portInState,
  existingNumber: values.portInExistingNumber,
  existingAccountNumber: values.portInExistingAccount,
  accountPin: values.portInPin,
  altContactNumber: values.portInContactNumber,
  accountHolderName: values.portInName,
});
