import { useEffect, useState } from "react";

function useImageLoader(src) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(false);
      return;
    }

    const image = new Image();

    image.src = src;

    image.onload = () => {
      setLoaded(true);
    };

    image.onerror = () => {
      setLoaded(false);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return loaded;
}

export default useImageLoader;