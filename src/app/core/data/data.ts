import { LinkProvider, Me } from '../interfaces/portfolio';

export const me: Me = {
  firstname: 'Michaell',
  lastname: 'Alavedra',
  headline: 'Front-End Developer',
  bio: 'I love to develop innovative and world-class software solutions, motivated by the art of UI/UX Design and Programming.',
  avatar3D: 'assets/3d/michaell.glb',
  links: [
    {
      provider: LinkProvider.Linkedin,
      url: '',
    },
    {
      provider: LinkProvider.Github,
      url: '',
    },
    {
      provider: LinkProvider.Gmail,
      url: '',
    },
    {
      provider: LinkProvider.Youtube,
      url: '',
    },
    {
      provider: LinkProvider.Whatsapp,
      url: '',
    },
  ]
}
