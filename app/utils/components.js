import {Button, Form, Input, InputNumber, Select, Checkbox, Radio, Switch, DatePicker, TimePicker, Upload, Tabs, Tag, Tooltip, Badge, Result, Empty, Space, Progress, Spin} from 'antd';

import CustomTable from '@app/components/custom/table';
import CustomForm from '@app/components/custom/form';

import {Row, Col} from '@app/components/row';
import Panel from '@app/components/panel';
import Back from '@app/components/goBack';

const {Item} = Form;
const {TextArea, Search} = Input;
const {Option} = Select;
const {Group: CheckboxGroup} = Checkbox;
const {Radio: RadioGroup, Button: RadioButton} = Radio;
const {RangePicker} = DatePicker;
const {RangePicker: TRangePicker} = TimePicker;
const {TabPane} = Tabs;

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
  Option,
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
  TabPane,
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
