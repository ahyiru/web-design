import {components} from '@common';

const {Panel}=components;

const Index=({style,children,...rest})=><Panel style={{background:'var(--panelBgColor)',...style}} {...rest}>{children}</Panel>;

export default Index;


