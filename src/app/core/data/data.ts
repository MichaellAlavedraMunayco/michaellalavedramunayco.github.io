import { LinkProvider, Me } from '../interfaces/portfolio';

export const data: Me = {
  firstname: 'Michaell',
  lastname: 'Alavedra',
  headline: 'Front-End Developer',
  bio: 'I love to develop innovative and world-class software solutions, motivated by the art of UI/UX Design and Programming.',
  avatar3D: 'assets/3d/michaell.glb',
  links: {
    [LinkProvider.Facebook]: {
      url: 'https://www.facebook.com/michaell.alavedra',
    },
    [LinkProvider.Linkedin]: {
      url: 'https://www.linkedin.com/in/michaell-alavedra',
    },
    [LinkProvider.Github]: {
      url: 'https://github.com/michaellAlavedraMunayco/',
    },
    [LinkProvider.Instagram]: {
      url: 'https://www.instagram.com/f.michaell.a.m/',
    },
    [LinkProvider.Twitter]: {
      url: 'https://twitter.com/michaelldev',
    },
    [LinkProvider.Whatsapp]: {
      url: 'https://wa.me/59177824436?text=Hola%20Michaell!%20Vengo%20de%20tu%20sitio%20web',
    },
  }
}
