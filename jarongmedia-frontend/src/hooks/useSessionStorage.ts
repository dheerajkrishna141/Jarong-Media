const useSessionStorage = (key: string) => {
  const setItem = (value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = () => {
    return window.sessionStorage.getItem(key);
  };

  const clear = () => {
    return window.sessionStorage.removeItem(key);
  };

  return { setItem, getItem, clear };
};

export default useSessionStorage;
