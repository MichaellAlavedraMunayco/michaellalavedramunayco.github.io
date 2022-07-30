import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  public person: Person;

  constructor() {

    this.person = {
      firstname: 'Michaell',
      lastname: 'Alavedra',
      welcome: 'Hello, I am',
      headline: 'Front-End Developer',
      bio: 'I love to develop innovative and world-class software solutions, motivated by the art of UI/UX Design and Programming.',
      avatar: 'assets/3d/michaell.glb',
      links: {
        [LinkProvider.Facebook]: 'https://www.facebook.com/michaell.alavedra',
        [LinkProvider.Linkedin]: 'https://www.linkedin.com/in/michaell-alavedra',
        [LinkProvider.Github]: 'https://github.com/michaellAlavedraMunayco/',
        [LinkProvider.Instagram]: 'https://www.instagram.com/f.michaell.a.m/',
        [LinkProvider.Twitter]: 'https://twitter.com/michaelldev',
        [LinkProvider.Whatsapp]: 'https://wa.me/59177824436?text=Hola%20Michaell!%20Vengo%20de%20tu%20sitio%20web',
      },
      projects: Array.from<Project>({ length: 10 }).fill(
        {
          icon: 'facebook',
          shortname: 'Eficientis',
          name: 'Eficientis - Accelerating Strategy Execution',
          detail: 'Eficientis supports all stages of strategy execution, such as the Kaplan-Norton strategy Execution Premium Process (XPP).The platform supports all of your core strategy execution activities including.',
          video: 'assets/videos/sample.mp4',
          poster: 'assets/videos/sample.poster.png',
        }),
    }

  }

}

export interface Person {
  firstname?: string;
  lastname?: string;
  welcome?: string;
  headline?: string;
  bio?: string;
  avatar?: string;
  links?: Record<string, string>;
  projects?: Project[],
}

export const enum LinkProvider {
  Facebook = "Facebook",
  Instagram = "Instagram",
  Linkedin = "Linkedin",
  Github = "Github",
  Whatsapp = "Whatsapp",
  Gmail = "Gmail",
  Dev = "Dev",
  Arc = "Arc",
  Youtube = "Youtube",
  Twitter = "Twitter",
  Dribble = "Dribble",
  Behance = "Behance",
  Resume = "Resume",
  Udemy = "Udemy",
}

export interface Project {
  icon?: string;
  shortname?: string;
  name?: string;
  detail?: string;
  video?: string;
  poster?: string;
}
