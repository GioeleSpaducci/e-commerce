export default function OrderElement({ order }) {
  //order history element for user page
  return (
    <tr className="odd:bg-blue-50">
      <td className="px-2">{order.id}</td>
      <td className="px-2">{order.items.length}</td>
      <td className="px-2">{order.totalPrice}</td>
    </tr>
  )
}