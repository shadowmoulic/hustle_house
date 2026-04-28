import React, { useState, useEffect } from 'react';

/**
 * HustleHouse KGP - Premium SaaS Landing Page
 * Designed with a Mobile-First approach.
 * Technology: React + Tailwind CSS
 */

const HustleHouseLanding = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    // Theme Toggler
    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const themeClasses = isDarkMode
        ? "bg-[#050505] text-white"
        : "bg-[#F8F9FC] text-[#111]";

    const cardClasses = isDarkMode
        ? "bg-[#0D0D0D] border-white/5 shadow-2xl shadow-blue-900/10"
        : "bg-white border-gray-100 shadow-xl";

    const accentText = isDarkMode ? "text-blue-400" : "text-blue-600";
    const subtextOpacity = "opacity-70";

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${themeClasses}`}>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-extrabold tracking-tighter">HUSTLEHOUSE</div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isDarkMode ? '🌙' : '☀️'}
                    </button>
                    <button className="hidden md:block text-sm font-medium opacity-80 hover:opacity-100">Talent</button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
                        Hire Us
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-16 px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        IIT KGP ELITE NETWORK
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                        Real Work.<br />
                        IIT Kharagpur.<br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Delivered Globally.</span>
                    </h1>

                    <p className={`text-lg md:text-xl ${subtextOpacity} max-w-md mx-auto leading-relaxed`}>
                        Vetted technical specialists delivering high-precision solutions. No middlemen. Just direct access to the best minds.
                    </p>

                    <div className="flex flex-col gap-3 pt-4">
                        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/30 hover:scale-[1.03] transition-all flex items-center justify-center gap-2">
                            Find Your Person <span>→</span>
                        </button>
                        <button className={`w-full py-4 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all`}>
                            How it Works
                        </button>
                    </div>

                    <div className="pt-8 flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-bold opacity-40">
                        <span>12+ Vetted Specialists</span>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <span>48h Delivery</span>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <span>100% Vetted</span>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="py-12 px-6 border-y border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Active Project", val: "24+" },
                        { label: "Talent Pool", val: "IIT KGP" },
                        { label: "Response", val: "< 1h" },
                        { label: "Retention", val: "94%" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-1">
                            <div className="text-3xl font-black">{stat.val}</div>
                            <div className={`text-xs uppercase tracking-tighter ${subtextOpacity}`}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Difference Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">The HustleHouse Edge</h2>
                        <p className={subtextOpacity}>Why high-ticket clients choose campus talent over agencies.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Zero Markup", desc: "Talk directly to the creator. No account managers or agency overhead.", color: "blue" },
                            { title: "IIT Vetted", desc: "Every member is handpicked based on project proof, not just credentials.", color: "purple" },
                            { title: "Agentic Speed", desc: "We utilize cutting-edge AI workflows to deliver 10x faster than traditional agencies.", color: "cyan" },
                        ].map((item, i) => (
                            <div key={i} className={`p-8 rounded-3xl border ${cardClasses} space-y-4 hover:translate-y-[-8px] transition-all cursor-default`}>
                                <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/20 flex items-center justify-center text-2xl`}>
                                    {i === 0 ? '💰' : i === 1 ? '⚡' : '🤖'}
                                </div>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className={`text-sm leading-relaxed ${subtextOpacity}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 px-6 bg-white/5 border-y border-white/5">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-black">The 14-Day Sprint.</h2>
                        <div className="space-y-12 relative">
                            <div className="absolute left-6 top-8 bottom-8 w-px bg-white/10 hidden md:block" />

                            {[
                                { step: "01", title: "Select Your Specialist", desc: "Browse the network and find the exact skill set you need." },
                                { step: "02", stepLabel: "15min Call", title: "Hyper-Scope the MVP", desc: "No fluff meetings. We define the delivery roadmap in 15 minutes." },
                                { step: "03", title: "Iterative Delivery", desc: "Daily updates. Direct communication. Production-ready output." },
                            ].map((p, i) => (
                                <div key={i} className="flex gap-8 relative">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold shrink-0 shadow-lg shadow-blue-600/40 z-10">
                                        {p.step}
                                    </div>
                                    <div className="space-y-2 pt-1">
                                        <h4 className="text-xl font-bold flex items-center gap-3">
                                            {p.title}
                                            {p.stepLabel && <span className="text-[10px] uppercase bg-white/10 px-2 py-0.5 rounded-full opacity-60 font-medium">{p.stepLabel}</span>}
                                        </h4>
                                        <p className={`text-sm ${subtextOpacity}`}>{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-sm aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-[4rem] flex items-center justify-center p-12 shadow-2xl shadow-blue-600/20">
                        <div className="w-full h-full border-4 border-white/20 rounded-[3rem] border-dashed animate-[spin_20s_linear_infinite]" />
                        <div className="absolute text-5xl font-black tracking-widest text-white/40 select-none">HUSTLE</div>
                    </div>
                </div>
            </section>

            {/* Talent Marketplace Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold">Featured Innovators</h2>
                            <p className={subtextOpacity}>Top-tier specialists available for deployment.</p>
                        </div>

                        {/* Filter Pills - Horizontal Scroll */}
                        <div className="w-full md:w-auto flex overflow-x-auto pb-4 md:pb-0 gap-3 scrollbar-hide no-scrollbar">
                            {['All', 'Web Dev', 'SEO', 'AI', 'Design', 'Video'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`shrink-0 px-6 py-2 rounded-full text-sm font-bold transition-all border ${activeFilter === f
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/20'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cards - Mobile Stack / Horizontal Scroll Combo */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`p-6 rounded-[2rem] border ${cardClasses} hover:scale-[1.02] transition-all cursor-pointer group`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 overflow-hidden">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=hustle${i}`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Alex K. {i}</h3>
                                        <div className="text-blue-500 text-xs font-bold uppercase tracking-widest">Full-Stack · KGP</div>
                                    </div>
                                </div>

                                <p className="text-sm font-medium mb-6 leading-relaxed">
                                    Scaled a Fintech MVP from 0 to 10k users in 3 months. Experts in React, Node, and AWS.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {['Next.js', 'Typescript', 'SQL'].map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase px-2 py-1 bg-white/5 rounded-md opacity-60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                    <div className="text-xs font-bold opacity-60">From $400/proj</div>
                                    <div className="text-blue-500 text-sm font-bold group-hover:translate-x-1 transition-transform">Profile →</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-blue-600 to-purple-700 text-center space-y-8 shadow-2xl shadow-blue-600/30">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Ready to build the future?</h2>
                    <p className="text-white/80 text-lg max-w-xl mx-auto font-medium">
                        Skip the agency wait times. Get direct access to the most high-precision technical talent in India.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                        <button className="bg-white text-blue-700 px-10 py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-[1.05] transition-all">
                            Start Your Project
                        </button>
                        <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-3xl font-black text-xl hover:bg-white/10 transition-all">
                            Founder Direct
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 opacity-40">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
                    <div className="font-bold tracking-tighter">HUSTLEHOUSE KGP</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:opacity-100">Twitter</a>
                        <a href="#" className="hover:opacity-100">LinkedIn</a>
                        <a href="#" className="hover:opacity-100">Portfolio</a>
                    </div>
                    <div>© 2026. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};

export default HustleHouseLanding;
