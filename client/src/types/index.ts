export type Skill = {
  name: string;
  percentage: number;
};

export type TechStackItem = {
  name: string;
  icon: string;
  color: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  tags: string[];
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  projectUrl: string;
};

export type SocialLink = {
  title: string;
  icon: string;
  value: string;
  link: string | null;
};

export type Strength = {
  title: string;
  icon: string;
  description: string;
};
