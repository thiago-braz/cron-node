# cron-node

deploy on npm as **crontab-simple-parser**

```
"dependencies": {
   "crontab-simple-parser": "1.0.2",
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
