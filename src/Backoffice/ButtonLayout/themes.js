const iconThemes = [
  'close-standard',
  'close-dark',
  'close-transparent',
  'icon-greybackground',
  'icon-standard',
  'icon-standardsecondary',
  'icon-white',
  'icon-whitesecondary'
];

const regularThemes = [
  'transparent',
  'fullred',
  'fullgreen',
  'fullpurple',
  'emptyred',
  'emptygreen',
  'emptybluesecondary',
  'emptyblue',
  'emptypurple',
  'fullblue',
  'login',
  'emptylogin',
  'transparentblue',
  'whiteblue',
  'whiteblueprimary',
  'whitebluesecondary'
];

export const themes = [...iconThemes, ...regularThemes];
export const isIcon = theme => iconThemes.indexOf(theme) > -1;
