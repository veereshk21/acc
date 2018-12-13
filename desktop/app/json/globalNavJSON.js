const globalNavJSON = {
  pageTitle: 'SmartPhones',
  icons: [{
    name: 'cart',
    url: '/cart',
    isShown: true,
  }],
  menuItems: [  
    {
      name: "Shop",
      url: "/digital/shoplanding/",
      isSelected: false,
      isShown: true
    },
    {
      name: "Support",
      url: "/support",
      isSelected: false,
      isShown: true
    },{
    name: 'My Verizon',
    url: 'https://tlogin.verizonwireless.com/amserver/UI/Login?realm=vzw&goto=https%3A%2F%2Ftmyacct.verizonwireless.com%3A443%2Fclp%2Flogin%3Fredirect%3D%2Fmyv%2Foverview',
    isSelected: true,
    isShown: true,
    subItems: [{
      name: 'Most Popular',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_most_popular.png',
      isShown: true,
    }, {
      name: 'My Billings & Usage',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_billing_and_usage.png',
      isShown: true,
    }, {
      name: 'My Devices',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_my_devices.png',
      isShown: true,
    }, {
      name: 'My Plans & Services',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_plans_and_services.png',
      isShown: true,
    }, {
      name: 'My Profile & Settings',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_profile_and_settings.png',
      isShown: true,
    }, {
      name: 'Customer Support',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_customer_support.png',
      isShown: true,
    }, {
      name: 'Community Support',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_community_support.png',
      isShown: true,
    }, {
      name: 'Shop',
      url: '/account',
      iconURL: '/onedigital/build/images/gn_shop.png',
      isShown: true,
    }],

  }],
  signout: {
    text: 'Signout',
    url: '/signout',
    isShown: true,
  },
};
export default globalNavJSON;
