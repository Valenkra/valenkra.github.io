export type ProjectKey = 'valenshop' | 'valenos' | 'wordle' | 'progress' | 'caete' | 'finaldeeventos';
export const projectData: Record<ProjectKey,{name:string;type:string;description:string;stack:string;repo:string;demo:string}> = {
  valenshop: {
    name:'ValenShop', type:'Full-stack e-commerce · In development',
    description:'An e-commerce platform for retail and wholesale shopping, with a responsive product catalog, categories, sizes and product variants. Built with a separate backend API.',
    stack:'Next.js · React · TypeScript · Fastify · PostgreSQL',
    repo:'https://github.com/Valenkra/E-commerce', demo:'https://valenkra-ecommerce.vercel.app/'
  },
  valenos: {
    name:'ValenOS', type:'Interactive portfolio',
    description:'A nostalgic interactive portfolio inspired by Windows XP, with draggable application windows, desktop shortcuts and custom interfaces.',
    stack:'React · TypeScript · Vite · Zustand',
    repo:'https://github.com/Valenkra/Valenkra', demo:'https://valenkra.github.io/'
  },
  wordle: {
    name:'Wordle C++', type:'Academic project · Command-line game',
    description:'A command-line Wordle game built with C++17. Guess a secret five-letter word in six attempts, with word-list validation, accurate feedback for repeated letters and automated tests.',
    stack:'C++17 · CMake · STL · Automated Testing',
    repo:'https://github.com/Valenkra/wordle', demo:''
  },
  progress: {
    name:'Progress Tracker', type:'Personal project · Study productivity',
    description:'A personal study-tracking web application created to stay motivated during exam periods. Built with vanilla HTML, CSS and JavaScript, with Supabase integration for persistent data storage.',
    stack:'HTML5 · CSS3 · JavaScript · Supabase',
    repo:'', demo:'https://valenkra.github.io/Progress_Tracker/'
  },
  caete: {
    name:'Caéte', type:'Collaborative project · Social app prototype',
    description:'An early-stage social app concept created with my cousins to help people meet others and find company for shared plans and activities. Designed as a responsive prototype using Lovable.',
    stack:'Lovable · Responsive UI · Product Prototyping',
    repo:'', demo:'https://caete.lovable.app/'
  },
  finaldeeventos: {
    name:'FinalDeEventos', type:'Academic project · Backend REST API',
    description:'A REST API for managing events, users, locations and event registrations. Developed as an academic backend project, with controllers, services and repositories separating HTTP handling, business logic and database access.',
    stack:'Node.js · Express · JavaScript · PostgreSQL · REST API · Postman',
    repo:'https://github.com/Valenkra/FinalDeEventos', demo:''
  }
};
