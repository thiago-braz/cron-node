const crontab = require("..");
const assert = require("assert");

function getCron(now, cronExpression) {
    const cron = crontab.create(cronExpression);
    cron.now = function () {
        return now;
    }
    return cron;
}

let now = new Date("2013-11-21T10:00:09");
let lastExecution = new Date("2013-09-21T10:00:05");

let cronHelper = getCron(now, "0 0 10 21 * *");
assert(cronHelper.shouldRun(lastExecution));

cronHelper = getCron(now, "* * * * * *");
assert(cronHelper.shouldRun(lastExecution));

cronHelper = getCron(now, "*/5 */5 * * * *");
assert(cronHelper.shouldRun(lastExecution));

cronHelper = getCron(new Date("2013-11-21T10:05:00"), "0 */5 * * * *");
assert(cronHelper.shouldRun(new Date("2013-11-21T10:00:00")));

cronHelper = getCron(new Date("2013-11-21T10:00:05"), "*/5 * * * * *");
assert(cronHelper.shouldRun(new Date("2013-11-21T10:00:00")));

cronHelper = getCron(new Date("2013-11-21T10:00:04"), "*/5 * * * * *");
assert(!cronHelper.shouldRun(new Date("2013-11-21T10:00:00")));

cronHelper = getCron(new Date("2013-11-21T21:03:20"), "0 0 21 * * *");
assert(cronHelper.shouldRun(new Date("2013-11-20T21:00:00")));

cronHelper = getCron(new Date("2013-11-21T21:03:20"), "0 0 21 * * *");
assert(!cronHelper.shouldRun(new Date("2013-11-21T21:00:00")));

now = new Date("2013-11-21T15:25:00");
lastExecution = new Date("2013-11-21T15:10:00");
cronHelper = getCron(now, "0 5,10,25 10,15,16 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T15:25:05");
lastExecution = new Date("2013-11-21T15:10:00");
cronHelper = getCron(now, "5 5,10,25 10,15,16 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T03:00:00");
lastExecution = new Date("2013-11-21T00:00:00");
cronHelper = getCron(now, "0 0 */3 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T02:59:00");
lastExecution = new Date("2013-11-21T00:00:00");
cronHelper = getCron(now, "0 0 */3 * * *");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T12:00:00");
lastExecution = new Date("2013-11-21T09:00:00");
cronHelper = getCron(now, "0 0 */3 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T12:00:00");
lastExecution = new Date("2013-11-21T09:15:00");
cronHelper = getCron(now, "0 10 */3 * * *");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T12:10:00");
cronHelper = getCron(now, "0 10 */3 * * *", null);
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T12:10:00");
lastExecution = new Date("2013-11-21T10:25:00");
cronHelper = getCron(now, "0 5,10,25 10,15,16 * * *");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T15:05:00");
lastExecution = new Date("2013-11-21T10:25:00");
cronHelper = getCron(now, "0 5,10,25 10,15,16 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T15:25:00");
lastExecution = new Date("2013-11-21T15:10:00");
cronHelper = getCron(now, "0 5,10,25 10,15,16 * * *");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-21T15:24:00");
lastExecution = new Date("2013-11-21T15:10:00");
cronHelper = getCron(now, "0 5,10,25 10,15,16 * * *");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-25T15:24:00");
lastExecution = new Date("2013-11-18T15:10:00");
cronHelper = getCron(now, "0 * * * * 1");
assert(cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-24T15:24:00");
lastExecution = new Date("2013-11-18T15:10:00");
cronHelper = getCron(now, "* * * * * 1");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-26T15:24:00");
lastExecution = new Date("2013-11-18T15:10:00");
cronHelper = getCron(now, "* * * * * 1");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-25T15:24:00");
lastExecution = new Date("2013-11-25T15:05:00");
cronHelper = getCron(now, "0 1-5 * * * 1");
assert(!cronHelper.shouldRun(lastExecution));

now = new Date("2013-11-25T15:03:00");
lastExecution = new Date("2013-11-25T15:01:00");
cronHelper = getCron(now, "0 1-5 * * * 1");
assert(cronHelper.shouldRun(lastExecution));

console.log("success!")