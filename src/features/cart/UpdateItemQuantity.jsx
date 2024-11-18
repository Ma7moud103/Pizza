import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from "./cartSlice"

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch()



    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button onClick={() => dispatch(decreaseItemQuantity(pizzaId))} type={'round'}>-</Button>
            <span>{currentQuantity}</span>
            <Button onClick={() => dispatch(increaseItemQuantity(pizzaId))} type={'round'}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity