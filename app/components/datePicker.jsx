import {DatePicker} from 'antd';
const {RangePicker} = DatePicker;
const DateSelect = (props) => {
  const onChange = (dates, dateStrings) => {
    console.log(dates, dateStrings);
  };
  return (
    <div className="date-select">
      <RangePicker onChange={onChange} />
    </div>
  );
};

export default DateSelect;
