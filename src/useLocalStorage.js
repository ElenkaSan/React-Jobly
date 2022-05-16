import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue = null) => {

    if (localStorage.getItem(key)) {
        initialValue = localStorage.getItem(key);
    }

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (value === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, value);
        }

    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;