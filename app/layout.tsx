import type { Metadata } from 'next';
import './globals.css';
import { Header } from './header';
export const metadata: Metadata = {title: {default: 'Капто Александр Александрович', template: '%s — Капто А. А.'},description:'Доктор Капто Александр Александрович.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="ru"><body><a className="skip" href="#main">Перейти к содержанию</a><Header/>{children}<footer><a className="wordmark" href="/">Капто<span>Александр Александрович</span></a><div className="footer-links"><a href="/about">О докторе</a><a href="/science">Наука</a><a href="/contacts">Контакты</a></div><p>© 2026 <a href="http://www.kapto.ru">www.kapto.ru</a></p></footer></body></html>}
