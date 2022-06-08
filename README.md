# cron-node

**github** code on https://github.com/thiago-braz/cron-node

deployed on npm as **crontab-simple-parser**

```
"dependencies": {
   "crontab-simple-parser": "1.0.3",
}
```

### usage

```
const crontab = require("crontab-simple-parser");
const cronExpression = "";
const parser = crontab.create(cronExpression);
if (parser.shouldRun()) {
    // Run code
}
```
