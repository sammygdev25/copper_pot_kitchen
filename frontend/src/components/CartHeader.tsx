import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  const subtitle =
    itemCount === 0
      ? 'Your cart is empty — add a dish from the menu to get started.'
      : `${itemCount} ${itemCount === 1 ? 'dish' : 'dishes'} ready for checkout.`;

  return (
    <PageHeader
      eyebrow="Your order"
      title="Cart"
      subtitle={subtitle}
      actions={
        <span className="ds-cluster">
          <Icon name="cart" size={20} />
          <span className="ds-badge-count">{itemCount}</span>
        </span>
      }
    />
  );
}