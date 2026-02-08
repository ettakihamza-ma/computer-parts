import React from 'react';
import { Cpu, CircuitBoard, Disc, Battery, Fan, Zap, Box, Calculator, HardDrive } from 'lucide-react';

interface PartProps {
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const InternalMotherboard: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-emerald-700/80 rounded-lg border-2 border-emerald-500 shadow-inner cursor-pointer group hover:bg-emerald-600 transition-colors ${className}`}
        style={style}
    >
        {/* Circuit Traces Pattern */}
        <div className="w-full h-full opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #34d399 10px, #34d399 11px)'
        }}></div>
        <CircuitBoard className="absolute top-2 right-2 text-emerald-300 w-8 h-8 opacity-50" />
    </div>
);

export const InternalCPU: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-300 rounded-md border-4 border-gray-400 shadow-lg cursor-pointer group hover:scale-110 transition-transform flex items-center justify-center z-20 ${className}`}
        style={style}
    >
        <div className="w-3/4 h-3/4 border-2 border-dashed border-gray-500 flex items-center justify-center bg-gray-200">
            <Cpu className="text-blue-600 w-2/3 h-2/3" />
        </div>
    </div>
);

export const InternalRAM: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-green-600 rounded-sm border-x-2 border-yellow-400 shadow-md cursor-pointer group hover:-translate-y-1 transition-transform flex flex-col justify-between py-1 ${className}`}
        style={style}
    >
        {/* Memory Chips */}
        <div className="flex flex-col gap-1 items-center h-full justify-around">
            <div className="w-3/4 h-[20%] bg-black/80 rounded-[1px]"></div>
            <div className="w-3/4 h-[20%] bg-black/80 rounded-[1px]"></div>
            <div className="w-3/4 h-[20%] bg-black/80 rounded-[1px]"></div>
            <div className="w-3/4 h-[20%] bg-black/80 rounded-[1px]"></div>
        </div>
    </div>
);

export const InternalGPU: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-red-800 rounded-md border-b-4 border-gray-800 shadow-xl cursor-pointer group hover:scale-105 transition-transform flex items-center justify-center ${className}`}
        style={style}
    >
        {/* Fan on GPU */}
        <div className="w-16 h-16 rounded-full border-4 border-red-900 bg-black/50 flex items-center justify-center animate-spin-slow">
            <Fan className="text-red-500 w-12 h-12" />
        </div>
        <div className="absolute right-2 top-1/3 w-1/4 h-1/4 bg-yellow-400/20 rounded"></div>
    </div>
);

export const InternalPSU: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-900 rounded-lg border-4 border-yellow-500/50 shadow-2xl cursor-pointer group hover:bg-gray-800 transition-colors flex items-center justify-center ${className}`}
        style={style}
    >
        <Zap className="text-yellow-500 w-12 h-12 animate-pulse" />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">500W</div>
    </div>
);

export const InternalHDD: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-400 rounded-md border-b-4 border-gray-500 shadow-lg cursor-pointer group hover:translate-x-1 transition-transform overflow-hidden flex items-center justify-center ${className}`}
        style={style}
    >
        <HardDrive className="text-gray-700 w-2/3 h-2/3 opacity-80" />
        <div className="absolute bottom-2 right-2 text-[10px] text-gray-600 font-mono">1TB</div>
    </div>
);

export const InternalFan: React.FC<PartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-800 rounded-full border-4 border-gray-600 shadow-md cursor-pointer group hover:rotate-45 transition-transform flex items-center justify-center ${className}`}
        style={style}
    >
        <Fan className="text-cyan-400 w-full h-full p-2 animate-[spin_3s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite]" />
    </div>
);
