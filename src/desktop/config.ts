import type { AppId } from './types';

export const XP={welcome:'/icons/xp/welcome.png',projects:'/icons/xp/projects.png',about:'/icons/xp/about.png',music:'/icons/xp/music.png',terminal:'/icons/xp/terminal.png',paint:'/icons/xp/paint.png',contact:'/icons/xp/contact.png',skills:'/icons/xp/folder.png',certifications:'/icons/xp/folder.png'} as const;
export const titles:Record<AppId,string>={welcome:'Welcome to ValenOS',projects:'My Projects',about:'About Me.txt',music:'Valenkramp',terminal:'Terminal',paint:'Paint',contact:'Contact',skills:'Skills',certifications:'Certifications'};
export const desktopItems:AppId[]=['projects','about','music','terminal','paint','contact','skills','certifications'];
