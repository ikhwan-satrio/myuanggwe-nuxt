import { n as defineEventHandler, U as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@iconify/utils';
import 'consola';
import 'xss';

const exchangeRates = defineEventHandler(async () => {
  const apiKey = useRuntimeConfig().exchangeRateApiKey;
  const data = await $fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/IDR`
  );
  console.log("exhange");
  return data.conversion_rates;
});

export { exchangeRates as default };
//# sourceMappingURL=exchange-rates.mjs.map
