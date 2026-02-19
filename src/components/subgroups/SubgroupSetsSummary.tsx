"use client";



export function SubgroupSetsSummary() {
    return (
        <aside className="w-full h-full flex flex-col justify-center">
            {/* 
                The card uses a deep navy/purple gradient background 
                to match the premium/tech aesthetic. 
            */}
            <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-[#28235f] p-6 shadow-xl text-white flex flex-col group cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.02] border border-[#3c3775]">

                {/* Title and Badge Row */}
                <div className="flex flex-col gap-4 mb-2">
                    <h2 className="text-[22px] font-medium text-white">
                        Subgroup Sets Summary
                    </h2>
                </div>

                {/* Main Content Box (Whiteish inner area in the mock? No, it looks like just graphic elements on the dark bg) */}
                {/* Looking closely at the image, there is a "Set 1" pill and then the chart below */}

                <div className="flex-1 bg-white rounded-2xl p-4 flex flex-col text-[#1e1f23] mt-2 relative overflow-hidden">
                    {/* Inner Label */}
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-[#28235f] text-[10px] font-bold text-white">
                            Set 1
                        </span>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 flex flex-col justify-center mt-6">
                        {/* Group Rows */}
                        <div className="flex flex-col gap-6">
                            {/* Group 1 */}
                            <div className="flex items-center">
                                <span className="w-16 text-[11px] font-bold text-[#4b4d58]">Group 1</span>
                                <div className="flex-1 relative h-4">
                                    {/* Range Line */}
                                    <div className="absolute top-1/2 left-[20%] right-[40%] h-[2px] bg-[#dcdbf5]" />
                                    {/* Dot */}
                                    <div className="absolute top-1/2 left-[30%] w-2.5 h-2.5 bg-[#28235f] rounded-full -translate-y-1/2 -translate-x-1/2" />
                                    {/* Cap Lines */}
                                    <div className="absolute top-1/2 left-[20%] h-2 w-[1px] bg-[#28235f] -translate-y-1/2" />
                                    <div className="absolute top-1/2 right-[40%] h-2 w-[1px] bg-[#28235f] -translate-y-1/2" />
                                </div>
                            </div>

                            {/* Group 2 */}
                            <div className="flex items-center">
                                <span className="w-16 text-[11px] font-bold text-[#4b4d58]">Group 2</span>
                                <div className="flex-1 relative h-4">
                                    {/* Range Line */}
                                    <div className="absolute top-1/2 left-[40%] right-[10%] h-[2px] bg-[#dcdbf5] opacity-50" />
                                    {/* Dot */}
                                    <div className="absolute top-1/2 left-[65%] w-2.5 h-2.5 bg-[#a09ce3] rounded-full -translate-y-1/2 -translate-x-1/2" />
                                    {/* Cap Lines */}
                                    <div className="absolute top-1/2 left-[40%] h-2 w-[1px] bg-[#a09ce3] -translate-y-1/2" />
                                    <div className="absolute top-1/2 right-[10%] h-2 w-[1px] bg-[#a09ce3] -translate-y-1/2" />
                                </div>
                            </div>
                        </div>

                        {/* X-Axis */}
                        <div className="mt-6 pt-2 border-t border-[#e6e6e9] flex justify-between text-[10px] text-[#6d6f7c] font-medium relative">
                            <span>Low Resp.</span>
                            <span className="absolute left-1/2 -translate-x-1/2 font-bold text-[#1e1f23]">Drug Response (rHTE)</span>
                            <span>High Resp.</span>
                        </div>
                    </div>
                </div>

                {/* Decorative blur behind? */}
            </div>

            {/* Shadow effect to match the 'floating' look in the design? 
                The design has a soft shadow behind the card. 
                Using tailwind shadow-xl should be enough.
            */}
        </aside>
    );
}
