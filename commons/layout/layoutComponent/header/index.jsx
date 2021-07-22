import HoriMenu from '../components/horiMenu';
import NavList from '../components/navList';
import './index.less';

const Index=props=>{
  const {store,navMenu,leftList,rightList,handleNavClick,fixIcons,navMenuStyle}=props;
  const i18ns=store.getState('i18ns')||{};
  const {title}=i18ns;

  return <div className="header">
    <a className="banner" href="/">
      <div className="logo"><img src={props.logo} alt="logo" /></div>
      <div className="title">{title??props.title}</div>
    </a>
    <div className="nav">
      <div className="nav-wrap">
        {
          navMenu?.length?null:<div className="nav-left">
            <NavList list={leftList} click={item=>handleNavClick(props,item)} store={store} fixIcons={fixIcons}  />
          </div>
        }
        {navMenu?.length?<HoriMenu menu={navMenu.slice(0,5)} fixIcons={fixIcons} style={navMenuStyle} />:null}
        <div className="nav-right">
          <NavList list={rightList} click={item=>handleNavClick(props,item)} store={store} fixIcons={fixIcons}  />
        </div>
      </div>
    </div>
  </div>;
};

export default Index;


