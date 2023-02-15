const initSW = () => {
  if (!process.env.isDev && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${process.env.configs.basepath}/service-worker.js`)
        .then(registration => {
          // console.log('SW registered: ',registration);
        })
        .catch(registrationError => {
          // console.log('SW registration failed: ',registrationError);
        });
    });
  }
};

export default initSW;
