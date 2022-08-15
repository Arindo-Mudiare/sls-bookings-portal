function LayoutStrip({ children }) {
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="content">
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default LayoutStrip;
