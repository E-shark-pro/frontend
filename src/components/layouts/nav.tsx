'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Menu,
    X,
    Home,
    Info,
    Phone,
    LogIn,
    Play,
    ChevronDown,
    ChevronRight,
    ExternalLink
} from 'lucide-react'
import LangSwitcher from '@/components/composite/lang-switcher'
import { useLocale, useTranslations } from 'next-intl'
import { ModeToggle } from "@/components/composite/theme-toggle"
import { NavigationConfig, NavigationMenuBuilder } from '@/components/composite/navigation-menu-builder'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function EnhancedNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openSections, setOpenSections] = useState<string[]>([])
    const t = useTranslations('nav')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { href: '/', label: t('home'), icon: Home },
        { href: '/about', label: t('about'), icon: Info },
        { href: '/contact', label: t('contact'), icon: Phone },
    ]

    const navData: NavigationConfig = {
        viewport: false,
        sections: [
            {
                title: t('grads'),
                type: "composite",
                titleBased: true,
                layout: {
                    columns: 2,
                    featuredItem: {
                        title: "Featured course",
                        description: "Check out our most popular course.",
                        href: "/courses/featured",
                    },
                },
                items: [
                    {
                        title: "First class",
                        items: [
                            { title: "Intro to React", href: "/courses/react-intro", description: "Learn the basics of React." },
                            { title: "React Hooks", href: "/courses/react-hooks", description: "Master hooks and patterns." },
                        ],
                    },
                    {
                        title: "Second class",
                        items: [
                            { title: "Advanced JS", href: "/courses/advanced-js", description: "Dive deeper into JS internals." },
                            { title: "TypeScript", href: "/courses/typescript", description: "Type-safe JavaScript." },
                        ],
                    },
                ],
            },
            {
                title: t('materials'),
                type: "dropdown",
                layout: {
                    width: "w-[400px]",
                    columns: 2,
                },
                items: [
                    {
                        title: "Alert Dialog",
                        href: "/docs/primitives/alert-dialog",
                        description: "A modal dialog that interrupts the user with important content and expects a response."
                    },
                    {
                        title: "Hover Card",
                        href: "/docs/primitives/hover-card",
                        description: "For sighted users to preview content available behind a link."
                    },
                    {
                        title: "Progress",
                        href: "/docs/primitives/progress",
                        description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
                    },
                    {
                        title: "Scroll-area",
                        href: "/docs/primitives/scroll-area",
                        description: "Visually or semantically separates content."
                    },
                    {
                        title: "Tabs",
                        href: "/docs/primitives/tabs",
                        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time."
                    },
                    {
                        title: "Tooltip",
                        href: "/docs/primitives/tooltip",
                        description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
                    }
                ]
            }
        ]
    }

    const toggleSection = (sectionTitle: string) => {
        setOpenSections(prev =>
            prev.includes(sectionTitle)
                ? prev.filter(title => title !== sectionTitle)
                : [...prev, sectionTitle]
        )
    }

    const renderMobileNavSection = (section: any) => {
        const isOpen = openSections.includes(section.title)

        if (section.type === "link") {
            return (
                <Link
                    key={section.title}
                    href={section.href}
                    className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {section.title}
                </Link>
            )
        }

        return (
            <Collapsible
                key={section.title}
                open={isOpen}
                onOpenChange={() => toggleSection(section.title)}
            >
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <span className="font-medium">{section.title}</span>
                    {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                    {section.layout?.featuredItem && (
                        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                            <Link
                                href={section.layout.featuredItem.href}
                                className="block hover:text-blue-600 dark:hover:text-blue-400"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <div className="font-medium text-blue-600 dark:text-blue-400">
                                    {section.layout.featuredItem.title}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {section.layout.featuredItem.description}
                                </div>
                            </Link>
                        </div>
                    )}

                    {section.type === "composite" && section.items?.map((group: any) => (
                        <div key={group.title} className="mb-4">
                            <div className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2 px-3">
                                {group.title}
                            </div>
                            {group.items?.map((item: any) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="font-medium">{item.title}</div>
                                    {item.description && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.description}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    ))}

                    {section.type === "dropdown" && section.items?.map((item: any) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="font-medium">{item.title}</div>
                            {item.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {item.description}
                                </div>
                            )}
                        </Link>
                    ))}

                    {section.type === "simple" && section.items?.map((item: any) => (
                        <Link
                            key={item.title}
                            href={item.href || "#"}
                            className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                </CollapsibleContent>
            </Collapsible>
        )
    }

    return (
        <>
            {/* Desktop Top Nav */}
            <nav className={`fixed top-2 w-full z-50 transition-all duration-700 ${isScrolled
                ? 'bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200/60 dark:border-slate-700/60'
                : 'bg-white/15 dark:bg-slate-900/20 backdrop-blur-xl'
                }`}>
                <div className="container mx-auto px-4 relative">
                    <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
                        {/* Logo */}
                        <Link href="/" className="font-bold text-blue-900 dark:text-blue-100 text-2xl">
                            E Shark
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <NavigationMenuBuilder config={navData} />
                            <Button className="bg-blue-600 text-white py-6" size={"lg"}>
                                {t('trial')}
                            </Button>
                            <div className="flex items-center gap-1">
                                <LangSwitcher />
                                <ModeToggle />
                            </div>
                        </div>

                        {/* Mobile Controls */}
                        <div className="md:hidden flex items-center gap-2">
                            <LangSwitcher />
                            <ModeToggle />
                            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Menu className="w-6 h-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col">
                                    <SheetHeader className="flex-shrink-0">
                                        <SheetTitle>Navigation</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex-1 overflow-y-auto mt-6 space-y-2 pr-2">
                                        {/* Main Navigation Items */}
                                        {navItems.map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center gap-3 py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    {item.label}
                                                </Link>
                                            )
                                        })}

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 dark:border-slate-700 my-4"></div>

                                        {/* Navigation Sections from navData */}
                                        {navData.sections.map(renderMobileNavSection)}

                                        {/* Divider */}
                                        <div className="border-t border-gray-200 dark:border-slate-700 my-4"></div>

                                        {/* Trial Button */}
                                        <div className="sticky bottom-0 bg-white dark:bg-slate-950 pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
                                            <Button
                                                className="w-full bg-blue-600 text-white justify-center"
                                                size="lg"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Play className="w-4 h-4 mr-2" />
                                                {t('trial')}
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Floating Nav */}
            <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 z-50">
                <div className="flex justify-around items-center py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                    <button className="flex flex-col items-center gap-1 text-sm text-white bg-blue-600 px-3 py-2 rounded-lg">
                        <Play className="w-4 h-4" />
                        {t('trial')}
                    </button>
                </div>
            </div>
        </>
    )
}