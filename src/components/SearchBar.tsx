import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar ({ value, onChange } : SearchBarProps) {

    return (
        <div className="relative">
        <div className="absolute inset-y-0 start-0 pl-2 flex items-center text-2xl text-gray-300 pr-2">
            <FiSearch />
        </div>
        <input
            type="text"
            className="block h-12 w-full pl-10 rounded-2xl text-[15px] bg-sky-950 text-white placeholder-gray-400 focus:outline-0"
            placeholder="Search songs & artist.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </div>
    );
}