const Index = ({children, title, placement}) => (
  <span className={`tooltip-${placement}`} tooltips={title}>
    {children}
  </span>
);

export default Index;
