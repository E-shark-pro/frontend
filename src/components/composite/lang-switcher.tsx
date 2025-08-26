"use client"
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, ChevronDown, Moon, Sun } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocale } from 'next-intl'

import { routing } from '@/i18n/routing'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
const LangSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();

    const pathname = usePathname();
    const params = useParams();
    const isRTL = locale === 'ar';

    function changeLanguage(nextLocale: string) {
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: nextLocale }
        );
    }
    return (
        <>
            {/* Language Switcher */}
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`flex items-center hover:bg-gray-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 hover:border-gray-300/80 dark:hover:border-slate-600/80 rounded-xl ${isRTL ? 'flex-row-reverse ml-4' : 'mr-4'
                        }`}>
                        <Globe className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span className={`uppercase font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'font-arabic ml-2' : 'font-english mr-2'}`}>
                            {locale}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/60 dark:border-slate-700/60 shadow-2xl rounded-xl">

                    {routing.locales.map((cur) => (

                        <DropdownMenuItem
                            onClick={() => setLanguage('en')}
                            className="hover:bg-blue-50/80 dark:hover:bg-blue-900/30 cursor-pointer font-english rounded-lg"
                        >
                            {cur}
                        </DropdownMenuItem>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu> */}
            {/* Mobile Language Switcher */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className={`flex items-center backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 hover:border-gray-300/80 dark:hover:border-slate-600/80 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 rounded-xl p-2 ${isRTL ? 'flex-row-reverse ml-3' : 'mr-3'
                        }`}>
                        <Globe className={`w-4 h-4 text-gray-600 dark:text-gray-400 `} />
                        <span className={`uppercase text-xs text-gray-700 dark:text-gray-300 `}>
                            {locale}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200/60 dark:border-slate-700/60 rounded-xl">

                    {routing.locales.map((locale) => (

                        <DropdownMenuItem key={locale} onClick={() => changeLanguage(locale)} className="font-english rounded-lg">
                            {locale.toUpperCase()}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu></>
    )
}

export default LangSwitcher