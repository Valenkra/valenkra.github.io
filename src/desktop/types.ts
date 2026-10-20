export type AppId = 'welcome'|'projects'|'about'|'music'|'terminal'|'paint'|'contact';
export type Win = {id: AppId; x:number; y:number; w:number; h:number; minimized:boolean; maximized:boolean; z:number};
export type Store = {windows:Win[]; top:number; open:(id:AppId)=>void; close:(id:AppId)=>void; focus:(id:AppId)=>void; minimize:(id:AppId)=>void; maximize:(id:AppId)=>void; move:(id:AppId,x:number,y:number)=>void};
export const initial: Record<AppId,Pick<Win,'x'|'y'|'w'|'h'>> = {
  welcome:{x:180,y:75,w:680,h:420}, projects:{x:260,y:175,w:600,h:430}, about:{x:330,y:100,w:490,h:370},music:{x:400,y:105,w:650,h:460},terminal:{x:400,y:225,w:510,h:330},paint:{x:410,y:150,w:500,h:400},contact:{x:315,y:120,w:650,h:450}
};
