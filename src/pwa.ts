import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegisteredSW(_swScriptUrl, registration) {
    if (document.body.dataset.defaultBang) registration?.active?.postMessage({ defaultBang: document.body.dataset.defaultBang });
  },
});
