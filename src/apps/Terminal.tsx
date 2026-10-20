import { useEffect, useRef, useState } from 'react';
import { useDesktop } from '../desktop/store';
import type { AppId } from '../desktop/types';
import { projectData } from '../data/projects';
import { certifications } from '../data/certifications';
import { SKILL_EXECUTABLES, type SkillCategory } from './SkillsPopups';

type Folder = 'Valen' | 'My Projects' | 'Skills' | 'Certifications';
type Entry = { name: string; kind: 'dir' | 'file'; action?: () => void; description?: string };
const ROOT = 'C:\\Users\\Valen';
const appFiles: { name: string; id: AppId }[] = [
  { name: 'About Me.txt', id: 'about' }, { name: 'Valenkramp.exe', id: 'music' },
  { name: 'Terminal.exe', id: 'terminal' }, { name: 'Paint.exe', id: 'paint' },
  { name: 'Contact.exe', id: 'contact' }, { name: 'Welcome.exe', id: 'welcome' }
];
const normalize = (value: string) => value.trim().replace(/^["']|["']$/g, '').toLowerCase();
const intro = ['Microsoft Windows XP [Version 5.1.2600]', '(c) 2026 ValenOS. All rights reserved.', '', 'Type HELP to see available commands.', ''];

export function Terminal({ onLaunchSkill }: { onLaunchSkill: (category: SkillCategory) => void }) {
  const open = useDesktop(s => s.open);
  const close = useDesktop(s => s.close);
  const [folder, setFolder] = useState<Folder>('Valen');
  const [lines, setLines] = useState<string[]>(intro);
  const [cmd, setCmd] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const path = folder === 'Valen' ? ROOT : `${ROOT}\\${folder}`;
  const entries = (at: Folder): Entry[] => at === 'Valen'
    ? [
        ...(['My Projects', 'Skills', 'Certifications'] as Folder[]).map(name => ({ name, kind: 'dir' as const })),
        ...appFiles.map(file => ({ name: file.name, kind: 'file' as const, action: () => open(file.id) }))
      ]
    : at === 'Skills'
      ? SKILL_EXECUTABLES.map(exe => ({ name: exe.name, kind: 'file', action: () => onLaunchSkill(exe.id), description: exe.description }))
      : at === 'My Projects'
        ? Object.values(projectData).map(project => ({ name: `${project.name}.txt`, kind: 'file', description: `${project.type}\n${project.description}\nStack: ${project.stack}\nDemo: ${project.demo || 'N/A'}\nRepository: ${project.repo || 'N/A'}` }))
        : certifications.map(cert => ({ name: `${cert.name}.url`, kind: 'file', action: cert.url ? () => window.open(cert.url, '_blank', 'noopener,noreferrer') : undefined, description: `${cert.issuer} | ${cert.date}\n${cert.detail}\n${cert.url || 'No verification link'}` }));
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'nearest' }); }, [lines, folder]);
  const findEntry = (name: string, at = folder) => entries(at).find(e => normalize(e.name) === normalize(name));
  const run = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    const firstSpace = value.search(/\s/);
    const command = (firstSpace < 0 ? value : value.slice(0, firstSpace)).toLowerCase();
    const arg = firstSpace < 0 ? '' : value.slice(firstSpace + 1).trim();
    const output: string[] = [];
    const entry = findEntry(value);
    const execute = (target?: Entry) => {
      if (!target) { output.push(`File not found: ${arg || value}`); return; }
      if (target.kind === 'dir') { output.push(`'${target.name}' is a directory. Use CD "${target.name}".`); return; }
      if (target.action) { target.action(); output.push(`Opening ${target.name}...`); }
      else output.push(`Cannot execute ${target.name}. Use TYPE to read it.`);
    };
    let nextFolder = folder;
    switch (command) {
      case 'help': output.push(
        'ValenOS Command Reference',
        'Commands are case-insensitive: DIR, Dir and dir all work.',
        'DIR / LS          List files and folders',
        'CD <folder>      Enter a folder (quotes optional)',
        'CD.. / CD ..     Go to the parent folder',
        'CD \\            Go to the home folder',
        'TREE             Show folders and their files',
        'TYPE <file>      Read a .txt or .url file',
        'START <file>     Run an .exe or open a credential',
        'CLS / CLEAR      Clear the screen',
        'ECHO <text>      Print text',
        'PWD              Show current directory',
        'HISTORY          Show command history',
        'VER / DATE / TIME / WHOAMI',
        'PROJECTS / SKILLS / CERTIFICATIONS / CONTACT / MUSIC',
        'EXIT             Close Terminal',
        '',
        'Tip: CD Skills, DIR, then frontend.exe',
        'Tip: CD Certifications, DIR, then START "SQL (Basic) Certificate.url"'
      ); break;
      case 'dir':
      case 'ls': {
        output.push(` Directory of ${path}`, '');
        const list = entries(folder).filter(e => !arg || normalize(arg) === '/w' || e.name.toLowerCase().includes(normalize(arg)));
        list.forEach(e => output.push(`${e.kind === 'dir' ? '<DIR>   ' : '        '}${e.name}`));
        output.push('', ` ${list.filter(e => e.kind === 'file').length} File(s)`, ` ${list.filter(e => e.kind === 'dir').length} Dir(s)`);
        break;
      }
      case 'cd..':
      case 'cd\\':
        nextFolder = 'Valen'; break;
      case 'cd':
      case 'chdir': {
        const target = normalize(arg);
        if (!arg || target === '.') output.push(path);
        else if (target === '..' || target === '\\' || target === '/' || target === normalize(ROOT)) nextFolder = 'Valen';
        else {
          const selected = entries(folder).find(e => e.kind === 'dir' && normalize(e.name) === target);
          if (selected && folder === 'Valen') nextFolder = selected.name as Folder;
          else output.push('The system cannot find the path specified. CD only works with folders.');
        }
        break;
      }
      case 'pwd': output.push(path); break;
      case 'tree': {
        output.push(ROOT);
        for (const dir of ['My Projects', 'Skills', 'Certifications'] as Folder[]) {
          output.push(`+---${dir}`);
          entries(dir).forEach(e => output.push(`|   ${e.name}`));
        }
        break;
      }
      case 'cls':
      case 'clear': setLines([]); setHistory(h => [...h, value]); setHistoryIndex(-1); setCmd(''); return;
      case 'echo': output.push(arg); break;
      case 'type':
      case 'cat': {
        const target = findEntry(arg);
        if (!target || target.kind === 'dir') output.push('The system cannot find the file specified.');
        else output.push(target.description || `${target.name}\nValenOS application. Run it with START "${target.name}".`);
        break;
      }
      case 'start':
      case 'open': execute(findEntry(arg)); break;
      case 'history': output.push(...[...history, value].map((h, i) => `${i + 1}  ${h}`)); break;
      case 'ver': output.push('ValenOS [Version 1.0.0] — Windows XP inspired portfolio'); break;
      case 'date': output.push(new Date().toLocaleDateString()); break;
      case 'time': output.push(new Date().toLocaleTimeString()); break;
      case 'whoami': output.push('Valen — developer, creator of ValenOS. I enjoy creating innovative solutions to real-world problems, though sometimes I like to create just for the sake of it (like this Terminal you are using).'); break;
      case 'projects': open('projects'); output.push('Opening My Projects...'); break;
      case 'skills': open('skills'); output.push('Opening Skills...'); break;
      case 'certifications': open('certifications'); output.push('Opening Certifications...'); break;
      case 'contact': open('contact'); output.push('Opening Contact...'); break;
      case 'music': open('music'); output.push('Opening Valenkramp...'); break;
      case 'exit': close('terminal'); break;
      default:
        if (entry) execute(entry);
        else output.push(`'${value}' is not recognized as an internal or external command.\nType HELP for a list of commands.`);
    }
    setFolder(nextFolder);
    setLines(old => [...old, `${path}>${raw}`, ...output, '']);
    setHistory(h => [...h, value]);
    setHistoryIndex(-1);
    setCmd('');
  };
  return <div className="terminal-body" onClick={() => input.current?.focus()}>
    {lines.map((line, i) => <div key={i} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{line || '\u00a0'}</div>)}
    <form onSubmit={e => { e.preventDefault(); run(cmd); }}>
      <span style={{ whiteSpace: 'nowrap' }}>{path}&gt;</span>
      <input ref={input} id="cmd-input" autoComplete="off" spellCheck={false} value={cmd} onChange={e => setCmd(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); const i = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(i); setCmd(history[i]); }
          if (e.key === 'ArrowDown' && historyIndex >= 0) { e.preventDefault(); const i = historyIndex + 1; setHistoryIndex(i < history.length ? i : -1); setCmd(i < history.length ? history[i] : ''); }
        }}
        aria-label="Comando de terminal" />
    </form><div ref={bottom} />
  </div>;
}
