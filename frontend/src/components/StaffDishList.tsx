import type { Dish } from '../types';
import { Button, Media, Badge, Price, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface StaffDishListProps {
  dishes: Dish[];
  onEdit: (dish: Dish) => void;
  onDelete: (id: number) => void;
}

export default function StaffDishList({ dishes, onEdit, onDelete }: StaffDishListProps) {
  const list = Array.isArray(dishes) ? dishes : [];

  if (list.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No dishes yet"
        text="Add your first dish to start building the menu."
      />
    );
  }

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th>Dish</th>
            <th>Category</th>
            <th>Price</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((dish) => (
            <tr key={dish.id}>
              <td>
                <div className="ds-cluster" style={{ alignItems: 'center' }}>
                  <Media
                    src={dish.photo || ''}
                    alt={dish.name}
                    ratio="square"
                  />
                  <div>
                    <div className="ds-card-title">{dish.name}</div>
                    {dish.description ? (
                      <div className="ds-small ds-muted">
                        {dish.description.length > 60
                          ? `${dish.description.slice(0, 60)}...`
                          : dish.description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </td>
              <td>
                {typeof dish.category === 'object' && dish.category
                  ? (dish.category as any).name
                  : dish.category}
              </td>
              <td>
                <Price value={dish.price} />
              </td>
              <td>
                <div className="ds-cluster">
                  {dish.is_vegetarian ? <Badge tone="success">Vegetarian</Badge> : null}
                  {dish.is_spicy ? <Badge tone="danger">Spicy</Badge> : null}
                </div>
              </td>
              <td>
                <div className="ds-cluster">
                  <Button variant="ghost" size="md" onClick={() => onEdit(dish)}>
                    <Icon name="edit" size={16} />
                    Edit
                  </Button>
                  <Button variant="danger" size="md" onClick={() => onDelete(dish.id)}>
                    <Icon name="trash" size={16} />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}