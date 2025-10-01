"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Laptop, ChevronDown, Check } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  const themes = [
    {
      name: "light",
      icon: Sun,
      label: "Light mode",
      description: "Use light theme",
    },
    {
      name: "dark",
      icon: Moon,
      label: "Dark mode",
      description: "Use dark theme",
    },
    {
      name: "system",
      icon: Laptop,
      label: "System",
      description: "Follow system preference",
    },
  ];

  const getCurrentIcon = () => {
    const currentThemeObj = themes.find(t => t.name === theme);
    return currentThemeObj?.icon || Laptop;
  };

  const getCurrentLabel = () => {
    const currentThemeObj = themes.find(t => t.name === theme);
    return currentThemeObj?.label || "System";
  };

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ease-out
          bg-white/80 dark:bg-black backdrop-blur-xl 
          border border-gray-200/50 dark:border-white/10 
          shadow-lg hover:shadow-xl dark:shadow-black/30
          text-gray-700 dark:text-white
          hover:scale-105 active:scale-95
          dark:hover:bg-black/70 dark:hover:border-white/20
          ${isOpen ? 'ring-2 ring-blue-500/30 shadow-blue-200/50 dark:shadow-blue-900/30' : ''}
        `}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentIcon size={18} className="transition-transform duration-300" />
        <span className="text-sm font-medium hidden sm:block">{getCurrentLabel()}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute top-full right-0 mt-2 w-56 z-50
          bg-white/95 dark:bg-black/80 backdrop-blur-xl
          border border-gray-200/50 dark:border-white/10
          rounded-xl shadow-xl dark:shadow-black/40
          animate-in slide-in-from-top-2 duration-200
        `}>
          <div className="p-2">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              const isActive = theme === themeOption.name;
              
              return (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeSelect(themeOption.name)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 ease-out
                    text-left group
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 dark:border dark:border-blue-500/30' 
                      : 'text-gray-700 dark:text-white hover:bg-gray-100/60 dark:hover:bg-white/10 dark:hover:backdrop-blur-sm'
                    }
                  `}
                >
                  <div className="flex-shrink-0">
                    <Icon 
                      size={18} 
                      className={`transition-transform duration-200 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{themeOption.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      {themeOption.description}
                    </div>
                  </div>
                  
                  {isActive && (
                    <Check 
                      size={16} 
                      className="text-blue-600 dark:text-blue-300 animate-in zoom-in-75 duration-200" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}