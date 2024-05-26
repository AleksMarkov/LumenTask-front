import { BACKGROUND_LIST } from '../../../constants/index.js';
import defaultdark from './small-back/defaultdark.jpg';
import defaultlight from './small-back/defaultlight.jpg';
import defaultviolet from './small-back/defaultviolet.jpg';
import air from './small-back/air.jpg';
import ballons from './small-back/ballons.jpg';
import canyon from './small-back/canyon.jpg';
import abstract from './small-back/abstract.jpg';
import clouds from './small-back/clouds.jpg';
import magnolia from './small-back/magnolia.jpg';
import milkyway from './small-back/milkyway.jpg';
import moon from './small-back/moon.jpg';
import night from './small-back/night.jpg';
import palm from './small-back/palm.jpg';
import rocks from './small-back/rocks.jpg';
import sea from './small-back/sea.jpg';
import stars from './small-back/stars.jpg';
import tree from './small-back/tree.jpg';
import yacht from './small-back/yacht.jpg';

export const backgroundMap = () => {

  const images = [
    '',
    air,
    ballons,
    canyon,
    abstract,
    clouds,
    magnolia,
    milkyway,
    moon,
    night,
    palm,
    rocks,
    sea,
    stars,
    tree,
    yacht,
  ];

  const icons = images.map((image, index) => ({
    id: index,
    name: BACKGROUND_LIST[index],
    src: image,
    alt: `${index}`,
  }));

  const theme = localStorage.getItem('currentTheme') || 'dark'

  switch (theme) {
    case 'dark':
      icons[0].src = defaultdark;
      break;
    case 'light':
      icons[0].src = defaultlight;
      break;
    case 'violet':
      icons[0].src = defaultviolet;
      break;
    default:
      icons[0].src = defaultdark; 
      break;
  }

  return icons;
};


