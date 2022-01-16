import dayjs from 'dayjs';
require('dayjs/locale/zh-cn');
dayjs.locale('zh-cn');

const delimiter = '-';

const DATE_VAL = 24 * 60 * 60 * 1000;

// const minDate = dayjs([1970, 1, 1])

const minDate = '1970-1-1';

export const formatDelimiter = (str, target, s = delimiter) => str.replace(new RegExp(s, 'g'), target);

export const getOnlineDate = () => format(dayjs(JSON.parse(localStorage.currentProject || '{}').createTime));

export const weeks = [
  {
    key: 0,
    label: '日',
  },
  {
    key: 1,
    label: '一',
  },
  {
    key: 2,
    label: '二',
  },
  {
    key: 3,
    label: '三',
  },
  {
    key: 4,
    label: '四',
  },
  {
    key: 5,
    label: '五',
  },
  {
    key: 6,
    label: '六',
  },
];

export const format = (d, s = delimiter) => d?.format(`YYYY${s}MM${s}DD`) || null;
export const pass = (n, date = dayjs()) => format(dayjs().subtract(n, 'day'));
export const next = (n, date = dayjs()) => format(dayjs().add(n, 'day'));

export const today = () => format(dayjs());
export const yesterday = () => pass(1);
export const curWeekStart = () => format(dayjs().startOf('week'));
export const prevWeekStart = () => pass(6 + dayjs().day());
export const prevWeekEnd = () => pass(dayjs().day());
export const curMonthStart = () => format(dayjs().startOf('month'));
export const curMonthEnd = () => format(dayjs().endOf('month'));
export const prevMonthStart = () => format(dayjs([dayjs().year(), dayjs().month()]));
export const prevMonthEnd = () => format(dayjs([dayjs().year(), dayjs().month()]).endOf('month'));
export const curYearStart = () => format(dayjs().startOf('year'));
export const prevYearStart = () => format(dayjs([dayjs().year() - 1]));
export const prevYearEnd = () => format(dayjs([dayjs().year() - 1]).endOf('year'));

export const passTime = (start, end, unit = 'date', minDate = minDate) => {
  const curYear = dayjs().year();
  const curMonth = dayjs().month();
  const curDate = dayjs().date();
  let startDate = null;
  if (unit === 'year') {
    startDate = dayjs([curYear - start, curMonth + 1, curDate]);
  } else if (unit === 'month') {
    const months = curYear * 12 + curMonth - start;
    startDate = dayjs([~~(months / 12), (months % 12) + 1, curDate]);
  } else if (unit === 'week') {
    startDate = dayjs().subtract(7 * start, 'day');
  } else {
    startDate = dayjs().subtract(start, 'day');
  }
  const endDate = dayjs().subtract(end, 'day');
  if (startDate.valueOf() <= dayjs(minDate).valueOf()) {
    throw Error('超出范围，请重新选择！');
  }
  if (startDate.valueOf() > endDate.valueOf()) {
    throw Error('范围选择错误，请重新选择！');
  }
  return [format(startDate), format(endDate)];
};

export const monthEnd = (year = dayjs().year(), month = dayjs().month()) => format(dayjs([year, month + 1]).endOf('month'));

export const formatMonth = (year = dayjs().year(), month = dayjs().month()) => {
  const endMonth = monthEnd(year, month);
  const lastDay = dayjs(endMonth).date();
  const monthList = Array(lastDay)
    .fill()
    .map((item, i) => {
      const date = dayjs([year, month + 1, i + 1]);
      return {
        date,
        day: date.day(),
        label: i + 1,
      };
    });
  return monthList;
};

export const formatMonthWeeks = (monthList) => {
  const firstDay = monthList[0].day;
  const lastDay = monthList[monthList.length - 1].day;
  const front = Array(firstDay)
    .fill()
    .map((item, i) => ({
      day: i,
      date: pass(firstDay - i, monthList[0].date),
      label: dayjs()
        .subtract(firstDay - i, 'day')
        .date(),
      isPrev: true,
    }));
  const end = Array(6 - lastDay)
    .fill()
    .map((item, i) => ({
      day: lastDay + 1 + i,
      date: next(1 + i, monthList[monthList.length - 1].date),
      label: dayjs()
        .add(1 + i, 'day')
        .date(),
      isNext: true,
    }));
  const dates = [...front, ...monthList, ...end];
  const weeks = [];
  let start = 0;
  dates.map((item, index) => {
    if (item.day === 6) {
      weeks.push(dates.slice(start, index + 1));
      start = index + 1;
    }
  });
  return weeks;
};
export const prevMonth = (year, month) => {
  if (month === 0) {
    return [year - 1, 11];
  }
  return [year, month - 1];
};
export const nextMonth = (year, month) => {
  if (month === 11) {
    return [year + 1, 1];
  }
  return [year, month + 1];
};

export const getMonths = (minDate = minDate) => {
  const minYear = dayjs(minDate).year();
  const minMonth = dayjs(minDate).month();
  const PREV = (dayjs().year() - minYear) * 12 + dayjs().month() - minMonth + 1;
  let currentMonth = [dayjs().year(), dayjs().month() + 1];
  const monthList = Array(PREV)
    .fill()
    .map((item, i) => {
      currentMonth = prevMonth(...currentMonth);
      return {
        month: currentMonth,
        id: i,
      };
    });
  return monthList.reverse();
};

export const formatSelected = (selected) => {
  const start = selected[0] ? dayjs(selected[0]).valueOf() : null;
  const end = selected[1] ? dayjs(selected[1]).valueOf() : null;
  return [start, end].filter(Boolean).sort();
};

export const formatStartDate = (start, unit = 'date') => {
  const curYear = dayjs().year();
  const curMonth = dayjs().month();
  const curDate = dayjs().date();
  let startDate = null;
  if (unit === 'year') {
    startDate = dayjs([curYear - start, curMonth + 1, curDate]);
  } else if (unit === 'month') {
    const months = curYear * 12 + curMonth - start;
    startDate = dayjs([~~(months / 12), (months % 12) + 1, curDate]);
  } else if (unit === 'week') {
    startDate = dayjs().subtract(7 * start, 'day');
  } else {
    startDate = dayjs().subtract(start, 'day');
  }
  const startVal = startDate.endOf('date').valueOf();
  const curVal = dayjs([curYear, curMonth + 1, curDate])
    .endOf('date')
    .valueOf();
  return ~~((curVal - startVal) / DATE_VAL);
};

const formatPassMonth = (start, end = dayjs()) => {
  const dfYear = dayjs(end).year() - dayjs(start).year();
  const dfMonth = dayjs(end).month() - dayjs(start).month();
  const dfDate = dayjs(end).date() - dayjs(start).date();
  return dfYear * 12 + dfMonth - dfDate < 0 ? 1 : 0;
};
const formatPassYear = (start, end = dayjs()) => {
  const dfYear = dayjs(end).year() - dayjs(start).year();
  const dfMonth = dayjs(end).month() - dayjs(start).month();
  return dfYear - dfMonth < 0 ? 1 : 0;
};

export const formatEndDate = (end, unit = 'date') => {
  const start = dayjs().subtract(end, 'day');
  const formatDate = {
    year: formatPassYear(start),
    month: formatPassMonth(start),
    week: ~~(end / 7),
    date: end,
  };
  return formatDate[unit];
};

export const cycleTime = (start, end, unit = 'day') => {
  if (!start) {
    return [];
  }
  const endDate = dayjs().subtract(end || 0, 'day');
  const startDate = dayjs(endDate)
    .subtract(start || 0, unit)
    .add(1, 'day');
  return [format(startDate), format(endDate)];
};
