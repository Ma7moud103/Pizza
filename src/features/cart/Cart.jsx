import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './cartSlice';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';



function Cart() {
  const userName = useSelector(state => state.user.userName)

  const cart = useSelector(getCart);

  const dispatch = useDispatch()


  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-3">
      <LinkButton to="/pizza/menu">&larr; Back to menu</LinkButton>

      <h2 className="text-xl font-semibold mt-7">Your cart, {userName}</h2>

      <ul className="mt-3 border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/pizza/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
