export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link: string;
  featured: boolean;
}

export interface Experience {
  ROLE: string;
  COMPANY: string;
  PERIOD: string;
  DETAILS: string[];
}
