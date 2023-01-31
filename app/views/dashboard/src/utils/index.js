import {fixTimeUnit, classifyArr, unique, addDays, formatTime} from '@huxy/utils';

import osTypeOpt from '../monitor/data/osType';
import browserTypeOpt from '../monitor/data/browserType';
import viewsOpt from '../monitor/data/views';
import rankingOpt from '../monitor/data/ranking';
import mapOpt from '../monitor/data/map';
import firstLoadOpt from '../monitor/data/firstLoad';

export const fixTime = t => fixTimeUnit(t, ['秒', '分', '小时', '天']);

const weekLabel = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const getDateStart = (now = new Date()) => {
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  return +new Date(y, m, d);
};

const getPrevDays = (n, start = 0) => {
  return [...Array(n)].map((v, i) => {
    const space = i + start - n;
    const day = addDays(space);
    const week = day.getDay();
    return {
      startTime: getDateStart(day),
      endTime: getDateStart(addDays(space + 1)) - 1,
      weekDay: week,
      weekLabel: weekLabel[week],
    };
  });
};

const getWeekData = list => {
  const weeks = getPrevDays(7, 1);
  list.map(item => {
    const {startTime} = item;
    const weekItem = weeks.find(w => startTime >= w.startTime && startTime <= w.endTime);
    if (weekItem) {
      if (!weekItem.data) {
        weekItem.data = [];
      }
      weekItem.data.push(item);
    }
  });
  return weeks;
};

export const sum = (arr, key = 'stay') => arr.reduce((prev, cur) => prev + ((key ? cur[key] : cur) || 0), 0);

const filterByIp = list => {
  const ipObj = classifyArr(list, 'ip');
  return Object.keys(ipObj).map(key => ipObj[key][0]);
};

const filterByIpAndType = (list, type = 'osType') => {
  const ipObj = classifyArr(list, 'ip');
  const types = [];
  Object.keys(ipObj).map(key => types.push(...unique(ipObj[key], type)));
  return types;
};

export const getOverview = list => {
  const stay = fixTime(~~sum(list.filter(item => item.route !== '/')));
  const actionsObj = classifyArr(list, 'actionType');
  const click = `${(actionsObj.click?.length ?? 0) + (actionsObj.change?.length ?? 0)} 次`;
  const fetchError = `${actionsObj.fetchError?.length ?? 0} 次`;
  const pageError = `${actionsObj.pageError?.length ?? 0} 次`;
  return {stay, click, fetchError, pageError};
};

export const totalViews = list => Object.keys(classifyArr(list, 'ip')).length;

export const getOsTypeOpt = list => {
  const osTypeObj = classifyArr(list, 'osType');
  const optData = Object.keys(osTypeObj).map(key => ({
    name: key,
    value: unique(osTypeObj[key], 'ip').length ?? 0,
  }));
  return {
    opt: osTypeOpt('系统', optData),
    name: '系统类型',
  };
};

export const getBrowserTypeOpt = list => {
  const browserTypeObj = classifyArr(list, 'browserType');
  const optData = Object.keys(browserTypeObj).map(key => ({
    name: key,
    value: unique(browserTypeObj[key], 'ip').length ?? 0,
  }));
  return {
    opt: browserTypeOpt('浏览器', optData),
    name: '浏览器类型类型',
  };
};

export const getViewsOpt = data => {
  data = filterByIpAndType(data);
  const osTypeObj = classifyArr(data, 'osType');
  const optData = Object.keys(osTypeObj).map(key => ({
    name: key,
    value: osTypeObj[key] ? getWeekData(osTypeObj[key]).map(item => ({...item, count: item.data?.length ?? 0})) : [],
  }));
  return {
    opt: viewsOpt(optData),
    name: '近一周访问量',
  };
};

export const getRouteVisitOpt = list => {
  const routeObj = classifyArr(list, 'route');
  const viewsData = Object.keys(routeObj).filter(key => key !== '/').map(key => ({
    name: key,
    value: routeObj[key].length ?? 0,
    stay: ~~sum(routeObj[key]),
  }));
  return {
    opt: rankingOpt([
      {
        name: '访问量',
        data: viewsData.sort((a, b) => b.value - a.value).slice(0, 10),
      },
      {
        name: '停留时间',
        data: viewsData.sort((a, b) => b.stay - a.stay).slice(0, 10),
      },
    ]),
    name: '页面访问量与停留时间Top10',
  };
};

export const getVisitCityOpt = (list, theme) => {
  const data = filterByIp(list);
  const cityObj = classifyArr(data, 'city');
  const cityData = Object.keys(cityObj).map(key => {
    const item = cityObj[key];
    const rectangle = item[0].rectangle?.split(';')[0]?.split(',') ?? [];
    return {
      name: key,
      value: [...rectangle, item.length ?? 0],
    };
  });
  return {
    opt: mapOpt(cityData, {key: theme?.key, colors: theme?.list?.colors}),
    name: '访问者分布',
  };
};

export const getFirstloadOpt = list => {
  const optData = list.filter(({firstLoadTime}) => firstLoadTime && firstLoadTime < 1024).map(({startTime, firstLoadTime}) => ({startTime: formatTime(new Date(startTime)), firstLoadTime}));
  return {
    opt: firstLoadOpt('首屏加载时间', optData),
    name: '首屏加载时间',
  };
};

