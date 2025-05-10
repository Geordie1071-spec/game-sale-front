import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
  <Particles
  id="particles-js"
  options={{
    particles: {
      number: { value: 100 },
      size: { value: 5 },
      move: { enable: true, speed: 1 },
    },
  }}
/>
</div>

  );
};

export default ParticleBackground;
