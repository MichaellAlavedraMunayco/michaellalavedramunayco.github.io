export interface Me {
  firstname?: string;
  lastname?: string;
  headline?: string;
  bio?: string;
  avatar3D?: string;
  links?: Record<string, Link>;
}

export interface Link {
  url: string;
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
