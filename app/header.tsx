"use client";
import {ArrowUpRight} from 'lucide-react';

import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {Sheet,SheetTrigger,SheetContent,SheetTitle,SheetClose} from '@/components/ui/sheet';
const links=[['/about','О докторе'],['/science','Наука'],['/publications','Публикации'],['/lectures','Лекции'],['/projects','Проекты'],['/contacts','Контакты']];
export function Header(){const path=usePathname();const [open,setOpen]=useState(false);return <header className="header"><a className="wordmark" href="/" aria-label="Капто Александр Александрович — главная">Капто<span>Александр Александрович</span></a><nav className="desktop-nav" aria-label="Основная навигация">{links.map(([href,label])=><a key={href} href={href} aria-current={path.startsWith(href)?'page':undefined}>{label}</a>)}</nav><div className="mobile-nav"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="menu-button" aria-label="Открыть меню"><span/><span/></SheetTrigger><SheetContent className="mobile-sheet" showCloseButton={false}><SheetClose className="menu-close" aria-label="Закрыть меню">×</SheetClose><SheetTitle>Навигация</SheetTitle><nav aria-label="Мобильная навигация">{links.map(([href,label])=><a key={href} href={href} onClick={()=>setOpen(false)} aria-current={path.startsWith(href)?'page':undefined}>{label}<ArrowUpRight className="nav-arrow" aria-hidden="true"/></a>)}</nav></SheetContent></Sheet></div></header>}
