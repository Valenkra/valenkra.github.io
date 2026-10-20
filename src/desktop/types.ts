export type AppId = 'welcome'|'projects'|'about'|'music'|'terminal'|'paint'|'contact'|'skills'|'certifications';
export type Win = {id: AppId; x:number; y:number; w:number; h:number; minimized:boolean; maximized:boolean; z:number};
export type Store = {windows:Win[]; top:number; open:(id:AppId)=>void; close:(id:AppId)=>void; focus:(id:AppId)=>void; minimize:(id:AppId)=>void; maximize:(id:AppId)=>void; move:(id:AppId,x:number,y:number)=>void};
export const initial: Record<AppId,Pick<Win,'x'|'y'|'w'|'h'>> = {
  welcome:{x:180,y:45,w:680,h:420}, projects:{x:260,y:65,w:600,h:430}, about:{x:330,y:75,w:490,h:370},music:{x:400,y:55,w:650,h:460},terminal:{x:400,y:85,w:510,h:330},paint:{x:410,y:70,w:500,h:400},contact:{x:315,y:65,w:650,h:450},skills:{x:260,y:60,w:650,h:440},certifications:{x:290,y:70,w:680,h:455}
};
