import { format } from "timeago.js";
import moment from "moment/moment.js";

export const timeago = (savedTimestamp) => format(savedTimestamp);

export const funciones = (operand_1, operator, operand_2, options) => {
    var operators = {
        'eq': function (l, r) { return l == r; },
        'noteq': function (l, r) { return l != r; },
        'gt': function (l, r) { return Number(l) > Number(r); },
        'or': function (l, r) { return l || r; },
        'and': function (l, r) { return l && r; },
        '%': function (l, r) { return (l % r) === 0; }
    }
        , result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
}

export const dateFormat = (date, format) => {
    return moment(date).format(format);
}