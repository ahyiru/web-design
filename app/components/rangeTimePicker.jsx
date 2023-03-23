import {useState} from 'react';
import {DatePicker, Button, Space} from 'antd';
import dayjs from 'dayjs';

const {RangePicker} = DatePicker;

const getDateConfigs = () => [
  {
    label: '本日',
    value: [dayjs().startOf('day'), dayjs()],
    key: 'today',
  },
  {
    label: '前7日',
    value: [dayjs().subtract(7, 'days').startOf('days'), dayjs().subtract(1, 'days').endOf('day')],
    key: 'before_day_7',
  },
  {
    label: '本周',
    value: [dayjs().startOf('week'), dayjs()],
    key: 'week',
  },
  {
    label: '上周',
    value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
    key: 'before_week',
  },
  {
    label: '本月',
    value: [dayjs().startOf('month'), dayjs()],
    key: 'month',
  },
  {
    label: '上月',
    value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    key: 'before_month',
  },
  {
    label: '前3月',
    value: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    key: 'before_month_3',
  },
];

const getDateBtn = (defDate = getDateConfigs()) => defDate.filter((item, i) => i % 2 === 0 && i < 6);

const getSelectedKey = (dateBtn, dateStrings) => dateBtn.find(({value}) => value[0].valueOf() === +new Date(dateStrings[0]))?.key ?? '';

const formatType = 'YYYY-MM-DD HH:mm:ss';

export const defaultTime = () => [dayjs().subtract(1, 'month'), dayjs()];

const RangeTimePicker = ({getTime, defaultValue, value, showBtn}) => {
  const dateConfigs = getDateConfigs();
  const dateBtn = getDateBtn(dateConfigs);
  const [dateValue, setDateValue] = useState(value);
  const [selected, setSelected] = useState(value ? getSelectedKey(dateBtn, value) : '');
  const selectRangeTime = (dates, dateStrings) => {
    if (dates) {
      getTime?.({
        startTime: +new Date(dateStrings[0]),
        endTime: +new Date(dateStrings[1]),
      });
      setSelected(getSelectedKey(dateBtn, dateStrings));
    } else {
      getTime?.({startTime: '', endTime: ''});
      setSelected('');
    }
    setDateValue(dates);
  };

  return <>
    {
      showBtn ? <Space>
        {
          dateBtn.map(({key, label, value}) => <Button key={key} type="primary" size="small" ghost={selected !== key} onClick={e => selectRangeTime(value, value.map(item => item.format(formatType)))}>{label}</Button>)
        }
      </Space> : null
    }
    <RangePicker
      defaultValue={defaultValue}
      value={dateValue}
      presets={
        dateConfigs.map(({label, value}) => ({label: <Button type="primary" block>{label}</Button>, value}))
      }
      showTime
      format={formatType}
      onChange={selectRangeTime}
      style={{marginLeft: '12px'}}
    />
  </>;
};

export default RangeTimePicker;
