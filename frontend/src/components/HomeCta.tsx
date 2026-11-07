import React from 'react';
import { Section, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeCtaProps {
  isAuthenticated?: boolean;
}

export default function HomeCta({ isAuthenticated }: HomeCtaProps) {
  return (
    <Section tight>
      <div className="ds-hero ds-stack" style={{ alignItems: 'center', textAlign: 'center' }}>
        <p className="ds-lead">
          Hungry? Browse our full menu of fresh dishes and get it delivered hot to your door.
        </p>
        <div className="ds-cluster" style={{ justifyContent: 'center' }}>
          <Button to="/dishes" variant="primary" size="lg">
            <Icon name="arrow-right" size={18} />
            Browse the Menu
          </Button>
          {!isAuthenticated && (
            <Button to="/register" variant="ghost" size="lg">
              <Icon name="user" size={18} />
              Create an Account
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}