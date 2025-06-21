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
  role: string;
  company: string;
  period: string;
  details: string[];
}