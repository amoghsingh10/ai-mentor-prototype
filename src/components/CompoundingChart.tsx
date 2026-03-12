import React, { useMemo, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
    monthlySurplus: number;
}

export const CompoundingChart: React.FC<Props> = ({ monthlySurplus }) => {
    // We need to know if we are in dark mode to style the Recharts text colors correctly
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );

    useEffect(() => {
        // Overkill but robust mutation observer to detect class changes on html
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'));
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const data = useMemo(() => {
        const points = [];
        let cash = 0;
        let invested = 0;
        const annualRate = 0.08; // 8% avg market return

        for (let year = 0; year <= 20; year += 2) {
            if (year === 0) {
                points.push({ year, Cash: 0, Invested: 0 });
                continue;
            }
            cash = monthlySurplus * 12 * year;
            // Future Value of a Series formula
            const r = annualRate / 12;
            const n = year * 12;
            invested = monthlySurplus * ((Math.pow(1 + r, n) - 1) / r);

            points.push({
                year,
                Cash: Math.round(cash),
                Invested: Math.round(invested),
            });
        }
        return points;
    }, [monthlySurplus]);

    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    const tooltipBg = isDark ? '#0f172a' : '#ffffff';
    const tooltipBorder = isDark ? '#334155' : '#cbd5e1';
    const tooltipText = isDark ? '#f8fafc' : '#1e293b';

    return (
        <div className="w-full h-80 min-h-[320px] mt-2 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner transition-colors duration-300">
            <h3 className="text-sm font-semibold mb-6 flex items-center justify-center text-slate-700 dark:text-slate-300 font-outfit">
                20-Year Growth Projection ($<span className="text-mentor-600 dark:text-mentor-400 ml-1">{monthlySurplus}</span>/mo surplus)
            </h3>
            <div className="w-full h-56 sm:h-64 overflow-x-auto overflow-y-hidden">
                <div style={{ width: '600px', height: '100%' }}>
                    <AreaChart width={600} height={250} data={data} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isDark ? "#a78bfa" : "#8b5cf6"} stopOpacity={isDark ? 0.8 : 0.4} />
                                <stop offset="95%" stopColor={isDark ? "#8b5cf6" : "#8b5cf6"} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748b" stopOpacity={isDark ? 0.5 : 0.2} />
                                <stop offset="95%" stopColor="#475569" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="year"
                            stroke={textColor}
                            tickFormatter={(val) => `Yr ${val}`}
                            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            dy={15}
                        />
                        <YAxis
                            stroke={textColor}
                            tickFormatter={(val) => `$${val > 999 ? (val / 1000).toFixed(0) + 'k' : val}`}
                            tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            width={50}
                        />
                        <CartesianGrid strokeDasharray="4 4" stroke={gridColor} vertical={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                borderColor: tooltipBorder,
                                borderRadius: '16px',
                                color: tooltipText,
                                boxShadow: isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                padding: '12px'
                            }}
                            formatter={(value: any) => [
                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value)),
                                undefined
                            ]}
                            labelStyle={{ color: textColor, marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}
                            itemStyle={{ fontSize: '14px', padding: '2px 0' }}
                        />
                        <Legend verticalAlign="top" height={40} iconType="circle" wrapperStyle={{ fontSize: '14px', fontWeight: 500, color: textColor }} />
                        <Area
                            type="monotone"
                            name="Saved in Cash (0%)"
                            dataKey="Cash"
                            stroke="#64748b"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCash)"
                            isAnimationActive={true}
                        />
                        <Area
                            type="monotone"
                            name="Invested (~8%)"
                            dataKey="Invested"
                            stroke={isDark ? "#a78bfa" : "#8b5cf6"}
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorInvested)"
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </div>
            </div>
        </div>
    );
};
