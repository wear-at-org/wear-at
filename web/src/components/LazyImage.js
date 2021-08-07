import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LazyImage({ src }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <div className="lazy-img">
      <div className={`${pulsing ? 'pulse' : ''} loadable`} style={{ background: '#ccc' }}>
        <motion.img
          initial={{ opacity: 0 }}
          // style={{ height: imageLoading ? "6rem" : "auto" }}
          animate={{
            height: imageLoading ? '16rem' : 'auto',
            opacity: imageLoading ? 0 : 1,
          }}
          transition={({ height: { delay: 0, duration: 0.0 } }, { opacity: { delay: 0.5, duration: 0.4 } })}
          onLoad={imageLoaded}
          width="100%"
          src={src}
        />
      </div>
    </div>
  );
}
