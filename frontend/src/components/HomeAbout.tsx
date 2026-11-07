import { Section, Split, Card, CardBody, CardTitle, Stack } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeAboutValue {
  icon: string;
  title: string;
  text: string;
}

interface HomeAboutProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  values?: HomeAboutValue[];
}

const defaultValues: HomeAboutValue[] = [
  {
    icon: 'award',
    title: 'Made fresh, daily',
    text: 'Every dish on our menu is prepared to order in small batches — no steam trays, no shortcuts.',
  },
  {
    icon: 'truck',
    title: 'Fast, reliable pickup',
    text: 'Order ahead and track your food from the kitchen to the counter with live status updates.',
  },
  {
    icon: 'heart',
    title: 'Family recipes',
    text: 'Our recipes have been passed down through three generations of home cooks turned chefs.',
  },
];

export default function HomeAbout({
  eyebrow = 'Our story',
  title = 'About Copper Pot Kitchen',
  body = "Copper Pot Kitchen started as a single stovetop in a family kitchen and grew into a neighborhood favorite built on honest ingredients and generous portions. We still cook the same way: fresh produce from local markets, sauces simmered in copper pots, and a menu that changes with the seasons. Whether you're grabbing a quick bite or ordering for the whole table, every plate leaves our kitchen the way we'd serve it to our own family.",
  values = defaultValues,
}: HomeAboutProps) {
  return (
    <Section eyebrow={eyebrow} title={title}>
      <Split>
        <div className="ds-stack">
          <p className="ds-lead">{body}</p>
        </div>
        <Stack gap="sm">
          {(Array.isArray(values) ? values : []).map((value) => (
            <Card key={value.title}>
              <CardBody>
                <Stack gap="xs">
                  <Icon name={value.icon as any} size={24} />
                  <CardTitle>{value.title}</CardTitle>
                  <p className="ds-muted">{value.text}</p>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Split>
    </Section>
  );
}