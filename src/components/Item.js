import PropTypes from 'prop-types';
import './Item.css'
    
const Item = (props)=>{
    const {title,amount} = props
    const status = amount<0 ? "expense":"income"
    const symbol = amount<0 ? "-":"+"
    const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <li className={status}>{title}<span>{symbol}{formatNumber(Math.abs(amount))}</span></li>
    );
}

//ตรวจสอบชนิดข้อมูลที่ส่งเข้ามาทำงานใน props
//import PropTypes from 'prop-types';
//.isRequired ต้องไม่เป็นค่าว่างที่ส่งมา
Item.propTypes={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item