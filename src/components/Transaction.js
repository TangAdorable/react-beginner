import Item from "./Item";
import "./Transaction.css";

const Transaction = (props) => {
  const { items } = props; //ค่าที่ props มาเก็บไว้ในตัวแปร items

  return (
    <div>
      <ul className="item-list">
        {items.map((element) => {
          return <Item {...element} key={element.id} />;
          //{...element} > Spread Operator
        })}
      </ul>

    </div>
  );
};

export default Transaction;
