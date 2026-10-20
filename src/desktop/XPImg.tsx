import type { AppId } from './types';
import { XP } from './config';

export function XPImg({id,size=24}:{id:AppId;size?:number}){return <img className="xp-icon-image" src={XP[id]} alt="" width={size} height={size}/>;}
