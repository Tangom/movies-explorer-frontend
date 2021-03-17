const Preloader = (turnOn) => {
  return (
    <div className="preloader" style={turnOn ? {display:'flex'} : {display:'none'}}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader