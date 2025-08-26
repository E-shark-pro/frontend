'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl';


export default function HeroSection() {

    const t = useTranslations('hero');


    const [dotsStyle, setDotsStyle] = useState({});

    useEffect(() => {
        setDotsStyle({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
        });
    }, [])
    return (
        <section className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-colors duration-500 `}>
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                <div className={`absolute top-20 w-96 h-96 bg-blue-200/40 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-blob`}></div>
                <div className={`absolute top-40 w-80 h-80 bg-orange-200/40 dark:bg-orange-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-40 animate-blob animation-delay-2000 `}></div>
                <div className={`absolute -bottom-8 w-72 h-72 bg-blue-300/30 dark:bg-blue-600/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000 `}></div>
                <div className={`absolute top-1/2 w-64 h-64 bg-purple-200/25 dark:bg-purple-500/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-25 animate-blob animation-delay-6000 `}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400/30 dark:bg-blue-300/40 rounded-full animate-float-particle"
                        style={dotsStyle}
                    />
                ))}
            </div>



            <div className="relative container mx-auto space-x-4 py-20  text-center md:text-left ">
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] `}>

                    {/* Content Section */}
                    <div className={`space-y-6 md:space-y-8 animate-slide-in-left order-2 lg:order-1 `}>
                        <div className={`space-y-4 md:space-y-6 `}>
                            {/* Badge */}
                            <div className={`inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg dark:shadow-blue-500/10`}>
                                {t('badge')}
                            </div>
                            {/* Title */}
                            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-900 dark:text-blue-100 leading-tight `}>
                                <span className="block animate-fade-in-up">{t('title')}</span>
                                <span className="pb-5 block  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 dark:from-blue-400 dark:to-orange-400 animate-gradient-x animate-fade-in-up animation-delay-300 mt-2">
                                    {t('titleHighlight')}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-300  px-2 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-600  `}>
                                {t('description')}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className={`flex flex-col px-4 md:flex-row gap-4 animate-fade-in-up animation-delay-900  `}>
                            <Button
                                size="lg"
                                className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl dark:shadow-blue-500/25 group rounded-xl `}
                            >
                                <span className={`flex items-center  `}>
                                    {t('startTrial')}
                                    <ArrowRight className={`w-5 h-5 transition-transform  `} />
                                </span>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className={`border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-blue-500/10 group rounded-xl `}
                            >
                                <span className={`flex items-center  `}>
                                    <Play className={`w-5 h-5 group-hover:scale-110 transition-transform  `} />
                                    {t('watchDemo')}
                                </span>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className={`flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8 pt-6 md:pt-8 animate-fade-in-up animation-delay-1200 `}>
                            <div className={`text-center group cursor-pointer  `}>
                                <div className={`text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 group-hover:scale-110 transition-transform  `}>
                                    10K+
                                </div>
                                <div className={`text-xs md:text-sm text-gray-600 dark:text-gray-400 `}>
                                    {t('educators')}
                                </div>
                            </div>

                            <div className={`text-center group cursor-pointer  `}>
                                <div className={`text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 group-hover:scale-110 transition-transform  `}>
                                    500K+
                                </div>
                                <div className={`text-xs md:text-sm text-gray-600 dark:text-gray-400 `}>
                                    {t('students')}
                                </div>
                            </div>

                            <div className={`text-center group cursor-pointer  `}>
                                <div className={`text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100 group-hover:scale-110 transition-transform  `}>
                                    $2M+
                                </div>
                                <div className={`text-xs md:text-sm text-gray-600 dark:text-gray-400 `}>
                                    {t('revenue')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shark Section */}
                    <div className={`relative flex justify-center items-center animate-slide-in-right order-1 lg:order-2  min-h-[300px] md:min-h-[400px] lg:min-h-[500px]`}>
                        <div className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-full">
                            <div className="w-full h-full">
                                <Image
                                    src="/images/tutor-img.png"
                                    alt="Shark"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-contain"
                                />

                            </div>
                        </div>


                    </div>

                </div>

                {/* <div className='mt-10'>
                    <Partners />
                </div> */}
            </div>


        </section>
    )
}