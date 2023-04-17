import {Button, Form, Input, InputNumber, Select, Checkbox, Radio, Switch, DatePicker, TimePicker, Upload, Tabs, Tag, Tooltip, Badge, Result, Empty, Space, Progress, Spin} from 'antd';

import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import Back from '@app/components/goBack';

import CustomTable from '@app/components/custom/table';
import CustomForm from '@app/components/custom/form';

const {Item} = Form;
const {TextArea, Search} = Input;
const {Group: CheckboxGroup} = Checkbox;
const {Radio: RadioGroup, Button: RadioButton} = Radio;
const {RangePicker} = DatePicker;
const {RangePicker: TRangePicker} = TimePicker;

const components = {
  CustomTable,
  CustomForm,
  Row,
  Col,
  Panel,
  Back,
  Button,
  Form,
  Item,
  Input,
  TextArea,
  Search,
  InputNumber,
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Switch,
  DatePicker,
  RangePicker,
  TimePicker,
  TRangePicker,
  Upload,
  Tabs,
  Tag,
  Tooltip,
  Badge,
  Result,
  Empty,
  Space,
  Progress,
  Spin,
};

export default components;
