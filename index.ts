
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import { main } from './src/main';

(async () => {
  try {
    await main();
  } catch(e) {
    console.error(e);
    throw e;
  }
})();
