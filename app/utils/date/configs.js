import { getOnlineDate, today, yesterday, pass, curWeekStart, prevWeekStart, prevWeekEnd, curMonthStart, prevMonthStart, prevMonthEnd } from './formatTime';

export const tagList = () => [
  {
    name: 'today',
    label: '今日',
    values: [today(), today()],
    key: 0,
  },
  {
    name: 'yesterday',
    label: '昨日',
    values: [yesterday(), yesterday()],
    key: 1,
  },
  {
    name: 'curWeek',
    label: '本周',
    values: [curWeekStart(), today()],
    key: 2,
  },
  {
    name: 'prevWeek',
    label: '上周',
    values: [prevWeekStart(), prevWeekEnd()],
    key: 3,
  },
  {
    name: 'curMonth',
    label: '本月',
    values: [curMonthStart(), today()],
    key: 4,
  },
  {
    name: 'prevMonth',
    label: '上月',
    values: [prevMonthStart(), prevMonthEnd()],
    key: 5,
  },
  {
    name: 'prev7',
    label: '近7日',
    values: [pass(6), today()],
    key: 6,
  },
  {
    name: 'pass7',
    label: '过去7日',
    values: [pass(7), yesterday()],
    key: 7,
  },
  {
    name: 'prev14',
    label: '近14日',
    values: [pass(13), today()],
    key: 8,
  },
  {
    name: 'pass14',
    label: '过去14日',
    values: [pass(14), yesterday()],
    key: 9,
  },
  {
    name: 'prev30',
    label: '近30日',
    values: [pass(29), today()],
    key: 10,
  },
  {
    name: 'pass30',
    label: '过去30日',
    values: [pass(30), yesterday()],
    key: 11,
  },
  {
    name: 'prev90',
    label: '近90日',
    values: [pass(89), today()],
    key: 12,
  },
  {
    name: 'pass90',
    label: '过去90日',
    values: [pass(90), yesterday()],
    key: 13,
  },
  {
    name: 'online',
    label: '上线至今',
    values: [getOnlineDate(), today()],
    key: 14,
  },
  {
    name: 'online-1',
    label: '上线至昨日',
    values: [getOnlineDate(), yesterday()],
    key: 15,
  },
];

export const unit = [
  {
    name: 'day',
    label: '日',
  },
  {
    name: 'week',
    label: '周',
  },
  {
    name: 'month',
    label: '月',
  },
  {
    name: 'year',
    label: '年',
  },
];

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
