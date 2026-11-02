import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegisteredSW() {
    const defaultBang = document.body.dataset.defaultBang;
    if (!defaultBang) return;

    navigator.serviceWorker.ready.then((registration) => registration.active?.postMessage({ defaultBang }));
  },
});
