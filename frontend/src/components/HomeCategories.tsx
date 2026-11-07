import { Link } from 'react-router-dom';
import type { Category } from '../types';
import { Section, Grid, Card, CardBody, CardTitle, CardMeta, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeCategoriesProps {
  categories: Category[];
}

export default function HomeCategories({ categories }: HomeCategoriesProps) {
  const list = Array.isArray(categories) ? categories : [];

  return (
    <Section
      eyebrow="Explore the menu"
      title="Browse by category"
      subtitle="From sizzling starters to hearty mains and spicy specials, find exactly what you're craving."
    >
      {list.length === 0 ? (
        <EmptyState
          icon="grid"
          title="Categories coming soon"
          text="We're organizing our menu into categories. Check back shortly or browse all dishes."
          action={
            <Link to="/dishes" className="btn btn-primary">
              View all dishes
            </Link>
          }
        />
      ) : (
        <Grid size="sm">
          {list.map((category) => (
            <Card key={category.id} to={`/dishes?category=${category.slug}`}>
              <CardBody>
                <Icon name="tag" size={24} />
                <CardTitle>{category.name}</CardTitle>
                <CardMeta>View dishes</CardMeta>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}