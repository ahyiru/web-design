import {DatePicker, Button} from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const PickerButton = ({children}) => <Button type="primary" block>{children}</Button>;

const RangeTimePicker = ({getTime, defaultValue = [dayjs().startOf('day'), dayjs()]}) => {

  const selectRangeTime = (dates, dateStrings) => {
    if (dates) {
      getTime?.({
        startTime: +new Date(dateStrings[0]),
        endTime: +new Date(dateStrings[1]),
      });
    } else {
      getTime?.({startTime: '', endTime: ''});
    }
  };

  return <RangePicker
    defaultValue={defaultValue}
    presets={[
      {
        label: <PickerButton>今日</PickerButton>,
        value: [dayjs().startOf('day'), dayjs()],
      },
      {
        label: <PickerButton>前7日</PickerButton>,
        value: [dayjs().subtract(7, 'days').startOf('days'), dayjs().subtract(1, 'days').endOf('day')],
      },
      {
        label: <PickerButton>本周</PickerButton>,
        value: [dayjs().startOf('week'), dayjs()],
      },
      {
        label: <PickerButton>上周</PickerButton>,
        value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
      },
      {
        label: <PickerButton>本月</PickerButton>,
        value: [dayjs().startOf('month'), dayjs()],
      },
      {
        label: <PickerButton>上月</PickerButton>,
        value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
      },
      {
        label: <PickerButton>前3月</PickerButton>,
        value: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
      },
    ]}
    showTime
    format="YYYY-MM-DD HH:mm:ss"
    onChange={selectRangeTime}
  />;
};

export default RangeTimePicker;
