import React from 'react';
import { Monitor, Keyboard, Mouse, Speaker, Cpu, Printer, Disc } from 'lucide-react';

interface DeskPartProps {
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const DeskMonitor: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute flex flex-col items-center justify-center cursor-pointer group transition-transform hover:scale-105 ${className}`}
        style={style}
    >
        {/* Screen Frame */}
        <div className="bg-gray-800 p-2 rounded-t-xl rounded-b-lg shadow-lg w-full h-full flex items-center justify-center border-b-8 border-gray-900">
            {/* Screen Display */}
            <div className="bg-blue-300 w-full h-full rounded-lg relative overflow-hidden group-hover:bg-blue-200 transition-colors shadow-inner flex items-center justify-center">
                <Monitor className="text-blue-600/50 w-1/2 h-1/2" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
            </div>
        </div>
        {/* Stand */}
        {/* Stand */}
        <div className="bg-gray-700 w-1/4 h-[10%] mt-[-4px]"></div>
        <div className="bg-gray-800 w-1/2 h-[5%] rounded-full shadow-md"></div>
    </div>
);

export const DeskKeyboard: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-200 rounded-lg shadow-md border-b-4 border-gray-300 transform -skew-x-6 cursor-pointer group hover:bg-gray-100 transition-all hover:-translate-y-1 ${className}`}
        style={style}
    >
        <div className="grid grid-cols-10 gap-1 p-2 h-full">
            {/* Simulation of keys */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="bg-white rounded-sm shadow-sm h-full w-full opacity-70"></div>
            ))}
            <div className="col-span-6 bg-white rounded-sm shadow-sm h-full opacity-70 mt-1"></div> {/* Spacebar */}
        </div>
    </div>
);

export const DeskMouse: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-white rounded-full shadow-md border-b-2 border-gray-200 cursor-pointer group hover:scale-110 transition-transform ${className}`}
        style={style}
    >
        <div className="w-full h-full relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/3 bg-gray-300"></div> {/* Wheel line */}
            <Mouse className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 text-gray-400 opacity-50" />
        </div>
    </div>
);

export const DeskTower: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-800 rounded-xl shadow-xl border-l-8 border-gray-700 cursor-pointer group hover:bg-gray-700 transition-colors flex flex-col items-center py-4 ${className}`}
        style={style}
    >
        {/* Power Button */}
        <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] mb-4 animate-pulse"></div>
        {/* Disc Drive */}
        <div className="w-3/4 h-2 bg-gray-600 rounded-full mb-2"></div>
        <div className="w-3/4 h-2 bg-gray-600 rounded-full mb-8"></div>

        {/* Vents or Branding */}
        <Cpu className="text-gray-600 w-1/2 h-1/2 opacity-20" />
    </div>
);

export const DeskSpeaker: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-gray-900 rounded-lg shadow-lg cursor-pointer group hover:scale-105 transition-transform flex flex-col items-center justify-center ${className}`}
        style={style}
    >
        <div className="w-2/3 h-2/3 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center">
            <div className="w-1/2 h-1/2 bg-black rounded-full shadow-inner animate-pulse-slow"></div>
        </div>
        <Speaker className="text-gray-600 w-4 h-4 mt-2 opacity-50" />
    </div>
);

export const DeskPrinter: React.FC<DeskPartProps> = ({ onClick, className, style }) => (
    <div
        onClick={onClick}
        className={`absolute bg-white rounded-xl shadow-md border-b-8 border-gray-100 cursor-pointer group hover:bg-gray-50 transition-transform ${className}`}
        style={style}
    >
        {/* Paper Input */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-white border border-gray-200 transform -skew-x-12 z-0"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Printer className="text-gray-400 w-1/2 h-1/2" />
        </div>
        {/* Paper Output */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-gray-800 rounded-full"></div>
    </div>
);
