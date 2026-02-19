"use client";

import { motion } from "framer-motion";

export function SubgroupSetsSummary() {
    return (
        <aside className="p-4 w-full h-full flex flex-col gap-4">
            <h2 className="text-[32px] font-medium leading-tight tracking-tight text-gray-900">
                Subgroup Sets
                <br />
                Summary
            </h2>

            {/* 
        The card uses a deep navy/purple gradient background 
        to match the premium/tech aesthetic. 
      */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2E2A6B] to-[#1E1B4B] p-6 shadow-xl text-white flex flex-col justify-between group cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.02]">

                {/* Header Pill */}
                <div className="flex items-start justify-between">
                    <span className="inline-flex items-center justify-center h-7 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-sm">
                        Set 1
                    </span>
                </div>

                {/* Visualization Area */}
                <div className="flex-1 flex flex-col justify-center items-center relative my-4">
                    {/* Axis Line */}
                    <div className="w-full h-[1px] bg-white/20 relative mt-8">
                        {/* Ticks/Labels */}
                        <div className="absolute top-2 w-[1px] h-2 bg-white/20 left-[0%]">
                            <span className="absolute top-3 -translate-x-1/2 text-[10px] text-indigo-200">Low Resp.</span>
                        </div>
                        <div className="absolute top-2 w-[1px] h-2 bg-white/20 left-[100%]">
                            <span className="absolute top-3 -translate-x-1/2 text-[10px] text-indigo-200 whitespace-nowrap">High Resp.</span>
                        </div>
                    </div>

                    {/* Range Plot Container */}
                    <div className="absolute w-full h-12 flex items-center">
                        {/* Connector Line */}
                        <div className="absolute h-[2px] bg-indigo-300/40 rounded-full" style={{ left: '20%', right: '30%' }} />

                        {/* Dot A (Low) */}
                        <div className="absolute w-3 h-3 rounded-full bg-[#8E86F5] ring-2 ring-white/20 shadow-[0_0_10px_#8E86F5]" style={{ left: '20%', transform: 'translate(-50%)' }} />

                        {/* Dot B (High) */}
                        <div className="absolute w-4 h-4 rounded-full bg-[#C4C0FF] ring-2 ring-white/20 shadow-[0_0_15px_#C4C0FF]" style={{ left: '70%', transform: 'translate(-50%)' }} />
                    </div>
                </div>

                {/* Footer Label */}
                <div className="mt-auto pt-4 border-t border-white/10 w-full">
                    <p className="text-xs text-indigo-200 font-medium">Drug Response (rHTE)</p>
                </div>

                {/* Decorative background glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            </div>
        </aside>
    );
}
