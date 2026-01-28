const fs = require('node:fs/promises');
const v8 = require('v8');

const GBytes = 1024 * 1024 * 1024;
const v8HeapSizeLimit = (v8.getHeapStatistics().heap_size_limit / GBytes).toFixed(2);

(async () => {
  const file = await fs.open('text.txt', 'w');
  const stream = file.createWriteStream();

  let lastHeapUsed = 0;
  for (let i = 1; i <= 1_000_000_000; i++) {
    if (i % 1_000_000 === 0) {
      const heapCurrentlyUsed = (process.memoryUsage().heapUsed / GBytes).toFixed(2);
      const heapUsedIncrement = (heapCurrentlyUsed - lastHeapUsed).toFixed(2);
      const heapTotal = (process.memoryUsage().heapTotal / GBytes).toFixed(2);

      console.log(
        `Step ${i / 1_000_000} / 1_000 ---`,
        `Heap currently used: ${heapCurrentlyUsed} GB (${heapUsedIncrement} GB increment) /`,
        `Heap total: ${heapTotal} GB /`,
        `Heap size limit: ${v8HeapSizeLimit} GB`,
      );

      lastHeapUsed = heapCurrentlyUsed;
    }

    stream.write(`${i}\n`);
  }
})();
