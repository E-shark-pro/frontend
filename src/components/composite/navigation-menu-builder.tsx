"use client"

import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

// --- Types
export interface NavigationItem {
    title: string
    href?: string
    description?: string
    icon?: LucideIcon
}

// A group inside a title-based section (e.g. "First class", "Second class")
export interface NavigationGroup {
    title: string
    items: NavigationItem[]
}

export interface NavigationSection {
    title: string
    type: "dropdown" | "link" | "simple" | "composite"
    href?: string
    // when true: items is an array of NavigationGroup
    titleBased?: boolean
    // For non-titleBased sections this can be NavigationItem[]
    items?: NavigationItem[] | NavigationGroup[]
    layout?: {
        width?: string
        columns?: number | string
        featuredItem?: {
            title: string
            description: string
            href: string
            className?: string
        }
    }
}

export interface NavigationConfig {
    sections: NavigationSection[]
    viewport?: boolean
}

interface ReusableNavigationMenuProps {
    config: NavigationConfig
    className?: string
}

// --- Core rendering components (one NavigationMenuItem per section)
function RenderMenuItem({ section }: { section: NavigationSection }) {
    return (
        <NavigationMenuItem>
            {section.type === "link" ? (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={section.href || "#"}>{section.title}</Link>
                </NavigationMenuLink>
            ) : section.type === "simple" ? (
                <>
                    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                            <li>
                                {Array.isArray(section.items) &&
                                    (section.items as NavigationItem[]).map((item, index) => (
                                        <NavigationMenuLink key={index} asChild>
                                            <Link href={item.href || "#"}>{item.title}</Link>
                                        </NavigationMenuLink>
                                    ))}
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </>
            ) : (
                // composite / dropdown
                <>
                    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuContentRenderer section={section} />
                    </NavigationMenuContent>
                </>
            )}
        </NavigationMenuItem>
    )
}

export function NavigationMenuBuilder({ config, className }: ReusableNavigationMenuProps) {
    return (
        <NavigationMenu viewport={config.viewport ?? false} className={className}>
            <NavigationMenuList>
                {config.sections.map((section, index) => (
                    <RenderMenuItem key={index} section={section} />
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

// --- Content renderer for dropdown/composite sections
function NavigationMenuContentRenderer({ section }: { section: NavigationSection }) {
    const { layout, items = [] } = section
    const width = layout?.width || "w-[400px]"
    const columns = layout?.columns || 1

    // featured layout (keeps the featured card on the left)
    if (layout?.featuredItem) {
        return (
            <ul className={`grid gap-2 md:w-[400px] lg:w-[600px] lg:grid-cols-[.85fr_1fr] `}>
                <li className="row-span-3">
                    <NavigationMenuLink asChild>
                        <a
                            className={
                                layout.featuredItem.className ||
                                "from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            }
                            href={layout.featuredItem.href}
                        >
                            <div className="mt-4 mb-2 text-lg font-medium">{layout.featuredItem.title}</div>
                            <p className="text-muted-foreground text-sm leading-tight">{layout.featuredItem.description}</p>
                        </a>
                    </NavigationMenuLink>
                </li>

                {/* If titleBased: treat `items` as NavigationGroup[] */}
                {section.titleBased ? (
                    <li>
                        <div className="grid gap-4">
                            {(items as NavigationGroup[]).map((group, gIndex) => (
                                <div key={`group-${gIndex}`} className="pb-2">
                                    <div className="text-md p-2 text-primary font-semibold">{group.title}</div>
                                    <ul className="mt-2 space-y-2">
                                        {group.items.map((it, iIndex) => (
                                            <ListItem key={`g-${gIndex}-i-${iIndex}`} href={it.href || "#"} title={it.title}>
                                                {it.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </li>
                ) : (
                    <li>
                        <div className="grid gap-2">
                            {(items as NavigationItem[]).map((item, index) => (
                                <ListItem key={`item-${index}`} href={item.href || "#"} title={item.title}>
                                    {item.description}
                                </ListItem>
                            ))}
                        </div>
                    </li>
                )}
            </ul>
        )
    }

    // Grid layout when multiple columns requested (we treat each group as a column)
    if (section.titleBased && typeof columns === "number" && columns > 1) {
        const groups = items as NavigationGroup[]
        return (
            <div className={`${width} grid gap-4`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {groups.map((group, gIndex) => (
                    <div key={`col-${gIndex}`}>
                        <div className="text-md font-semibold mb-2 ml-2 text-primary">{group.title}ds</div>
                        <ul className="space-y-2">
                            {group.items.map((it, iIndex) => (
                                <ListItem key={`col-${gIndex}-it-${iIndex}`} href={it.href || "#"} title={it.title}>
                                    {it.description}
                                </ListItem>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }

    // Default simple list when not titleBased
    if (!section.titleBased) {
        return (
            <ul className={`grid ${width} gap-4`}>
                <li>
                    {(items as NavigationItem[]).map((item, index) => (
                        <NavigationMenuLink key={index} asChild>
                            <Link href={item.href || "#"} className={item.icon ? "flex-row items-center gap-2" : ""}>
                                {item.icon && <item.icon />}
                                {item.description ? (
                                    <>
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-muted-foreground">{item.description}</div>
                                    </>
                                ) : (
                                    item.title
                                )}
                            </Link>
                        </NavigationMenuLink>
                    ))}
                </li>
            </ul>
        )
    }

    // Fallback: empty
    return null
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href} className="no-underline block">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

// -------------------------
// Example usage / test config (title-based composite dropdown with groups)
// -------------------------
export const exampleConfig: NavigationConfig = {
    viewport: false,
    sections: [
        {
            title: "Courses",
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
            title: "Resources",
            type: "simple",
            items: [
                { title: "Docs", href: "/docs" },
                { title: "API", href: "/api" },
            ],
        },
        { title: "About", type: "link", href: "/about" },
    ],
}

export default NavigationMenuBuilder
