## HOW TO RUN THIS EXAMPLE

1. You need to have PM2 installed on your system `sudo npm i -g pm2` or `npm run install:pm2` from project folder (use package manager of choice)
2. `npm i` in project folder to install dependencies (express)
3. `npm run pm2:start` to start the cluster
4. `npm run pm2:monitor` to get a dashboard which shows you running instances and resources that they consume
5. In the top right quadrant of the monitoring dashboard live index Logs. There you'll see logs coming from each instance. By default the first instance is selected in the top left quadrant's Process List. To see logs from a different instance, use arrow keys to first select Process List and then move up/down to selected instance.
6. If you're on a mac or linux, you can use Apache HTTP server benchmarking tool to flood the cluster with requests and thus test the setup. Use could use: `ab -n 100000 -c 100 http://localhost:3000/`.

   - `-n 100000` will send 100,000 requests in batches of 100 concurrent requests (`-c 100`)
   - `-k` means keep alive, meaning ab will reuse existing connections - not to run out of ephemeral ports. E.g. The default ephemeral port range on OSX is 49152-65535 i.e. 16,383 ports

7. `q` to quite the monitoring dashboard
8. `npm run pm2:stop` to stop the cluster
9. `npm run pm2:delete` to clean up

### RUNNING FROM ECOSYSTEM FILE

1. `pm2:config:start` to run pm2 based on the ecosystem file. It will launch four instances of api app and 1 of the worker.
2. `pm2:config:prod` to run prod configuration. Only change is the `NODE_ENV` variable logged to the console in the worker.
3. The same monitor, stop and delete commands apply.
4. Running `pm2:start` and then `pm2:config:start` will create two different clusters - you can clean them up with `npm run pm2:delete`
