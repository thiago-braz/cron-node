"use strict";

let Cron = {
    cronExpression: "",

    shouldRun: function (when) {
        const now = this.now();
        const nextDate = this.calculatePossibleDates(now);
        if (nextDate != null) {
            if (when != null) {
                return now >= nextDate && when < nextDate;
            } else {
                return now >= nextDate;
            }
        }
        return false;
    },

    calculatePossibleDates: function (now) {
        let cron = this.cronExpression.split(" ");
        return this.calculatePossibleDates0(cron, now);
    },

    calculatePossibleDates0: function (cron, referenceDate) {
        const seconds = this.calculatePossibilities(cron[0], "0-59", referenceDate.getSeconds());
        const minutes = this.calculatePossibilities(cron[1], "0-59", referenceDate.getMinutes());
        const hours = this.calculatePossibilities(cron[2], "0-23", referenceDate.getHours());
        const days = this.calculatePossibilities(cron[3], "1-31", referenceDate.getDate());
        const months = this.calculatePossibilities(cron[4], "1-12", referenceDate.getMonth() + 1);
        const week = this.listPossibleValues(cron[5], "0-6");

        const nextDate = new Date(referenceDate.getFullYear(), months - 1, days, hours, minutes, seconds);

        const referenceWeek = referenceDate.getDay();
        return week.filter(x => x === referenceWeek).length === 0 ? null : nextDate;
    },

    listPossibleValues: function (expression, possibilityRange) {
        let increment = expression.split("/");
        let range = increment[0].split("-");
        let items = increment[0].split(",");
        let possibilities;
        if (range.length > 1) {
            possibilities = this.processRange(range);
        } else if (items.length > 1) {
            possibilities = this.processItems(items);
        } else {
            if (range[0] === "*") {
                possibilities = this.processRange(possibilityRange.split("-"));
            } else {
                possibilities = [parseInt(range[0], 10)];
            }
        }
        if (increment.length > 1) {
            possibilities = this.processIncrement(possibilities[0], possibilities[possibilities.length - 1], increment[1]);
        }
        return possibilities.sort(function (a, b) {
            return a - b;
        });
    },

    processRange: function (possibleRange) {
        const result = [];
        let startRange = parseInt(possibleRange[0], 10);
        let endRage = parseInt(possibleRange[1], 10);
        for (let i = startRange; i <= endRage; i++) {
            result.push(i);
        }
        return result;
    },

    processItems: function (items) {
        const result = [];
        items.forEach(x => result.push(parseInt(x, 10)));
        return result;
    },

    processIncrement: function (startValue, endValue, increment) {
        increment = parseInt(increment, 10);
        if (increment <= 0) {
            throw Error("Increment value must be greater than zero");
        }
        const result = [];
        for (let val = startValue; val < endValue; val += increment) {
            result.push(val);
        }
        return result;
    },

    calculatePossibilities: function (expression, possibleRange, referenceValue) {
        const possibleValues = this.listPossibleValues(expression, possibleRange);
        let correctValue = -1;
        for (let i in possibleValues) {
            let possibleValue = possibleValues[i];
            if (correctValue === -1) {
                correctValue = possibleValue;
            }
            if (possibleValue <= referenceValue) {
                correctValue = possibleValue;
            } else {
                break;
            }
        }
        return correctValue;
    },

    now: function () {
        return new Date();
    }
}


module.exports = {
    create: function (cronExpression) {
        return Object.create(Cron, {
            cronExpression: {
                value: cronExpression
            }
        });
    }
}