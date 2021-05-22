import icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const drawerItemsMain = [
  {
    key: 'Home',
    title: 'Home',
    icon: 'home-outline',
    route: {nav: 'Home', routeName: 'DisplayCategory', title: 'Home'},
  },
  {
    key: 'Profile',
    title: 'Profile',
    icon: 'account',
    route: {nav: 'Guest', routeName: 'GProfile', title: 'Profile' },
  },
];
