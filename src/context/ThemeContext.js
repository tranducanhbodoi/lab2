import { createContext, useContext, useEffect, useState } from 'react';

// 1. Tạo context để chia sẻ theme cho cả app
const ThemeContext = createContext();

// 2. Provider: nơi giữ state theme ('light' hoặc 'dark')
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    // Mỗi khi theme đổi, gắn data-bs-theme vào thẻ <html>
    // Bootstrap sẽ tự đổi màu sáng / tối theo thuộc tính này
    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    function toggleTheme() {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Hook dùng nhanh: const { theme, toggleTheme } = useTheme();
export function useTheme() {
    return useContext(ThemeContext);
}
