import { Hero, Button, Media } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeHeroProps {
  imageUrl?: string;
  onBrowse?: () => void;
}

export default function HomeHero({ imageUrl = '/img/brand/hero.jpg', onBrowse }: HomeHeroProps) {
  return (
    <Hero
      eyebrow="Fresh. Fast. Flavorful."
      title="Order your favorite dishes, straight from our kitchen to your door"
      text="Browse a full menu of hand-crafted dishes, pay securely with Stripe, and track your order from the kitchen to your table in real time."
      actions={
        <>
          <Button variant="primary" size="lg" to="/dishes">
            Browse the Menu
          </Button>
          <Button variant="ghost" size="lg" onClick={onBrowse}>
            <Icon name="map-pin" size={18} />
            Track an Order
          </Button>
        </>
      }
      media={imageUrl ? <Media src={imageUrl} alt="Signature dish from our kitchen" ratio="wide" /> : undefined}
    />
  );
}