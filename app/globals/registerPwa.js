const {isDev, configs} = process?.env ?? {};

const registerPwa = () => {
  if (!isDev && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${configs?.basepath ?? ''}/service-worker.js`)
        .then(registration => {
          // console.log('SW registered: ',registration);
        })
        .catch(registrationError => {
          // console.log('SW registration failed: ',registrationError);
        });
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }
};

export default registerPwa;
