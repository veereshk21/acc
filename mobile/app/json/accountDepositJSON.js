const accountDepositJSON = {
  output: {
    imageURL: 'https://ss7.vzw.com/is/image/VerizonWireless/SLP_Pixel_MF?$pngalpha$&wid=60&hei=60',
    depositPrice: '85.00',
    checkoutRedirectUrl: '/digital/checkout/',
    title: 'SECURITY_DEPOSIT_TITLE',
    titleDescription: 'SECURITY_DEPOSIT_TITLE_DESCRIPTION',
    buttonText: 'SECURITY_DEPOSIT_BUTTON_TEXT',
  },
  cqJson: {
    SECURITY_DEPOSIT_TITLE: 'We need a deposit of $%price% before you can upgrade.',
    SECURITY_DEPOSIT_TITLE_DESCRIPTION: 'Due to the nature of your account history, we need a security deposit, which will be returned after 1 year. Your deposit will be added to your order.',
    SECURITY_DEPOSIT_BUTTON_TEXT: 'Continue',
  },
};

export default accountDepositJSON;
