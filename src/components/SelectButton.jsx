

const SelectButton = ({ children, selected, onClick }) => {


  return (
    <span onClick={onClick} className={`${selected?"bg-amber-400":''} border-amber-200 border rounded-md px-5 py-2`}>
      {children}
    </span>
  );
};

export default SelectButton;