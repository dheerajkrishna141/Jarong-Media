const useLocalStorage = (key: string) => {
  const setItem = (value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = () => {
    return window.localStorage.getItem(key);
  };

  const clear = () => {
    return window.localStorage.removeItem(key);
  };

  return { setItem, getItem, clear };
};

export default useLocalStorage;
