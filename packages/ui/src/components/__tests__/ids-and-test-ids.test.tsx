import {
  Accordion,
  Breadcrumbs,
  Button,
  Carousel,
  Chip,
  Dropdown,
  IconLink,
  Input,
  Language,
  Link,
  Navbar,
  Select,
  Showcase,
  SocialLinks,
  Switch,
  Textarea,
} from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

/** Every interactive element: the id it is given, and the same value as its data-testid. */
const expectIds = (element: HTMLElement, id: string) => {
  expect(element).toHaveAttribute('id', id);
  expect(element).toHaveAttribute('data-testid', id);
};

describe('ids and test ids', () => {
  it('mirrors the id of the atoms into data-testid', () => {
    expect.hasAssertions();
    render(
      <>
        <Button id="a-button-save">Save</Button>
        <Link id="a-link-help" href="/help">
          Help
        </Link>
        <IconLink id="a-link-github" href="https://github.com" label="GitHub" icon={<svg />} />
        <Chip id="a-button-chip">Chip</Chip>
        <Input id="a-input-name" label="Name" />
        <Textarea id="a-input-message" label="Message" />
        <Select id="a-select-size" label="Size">
          <option>M</option>
        </Select>
        <Switch id="a-switch-dark" label="Dark" checked={false} onCheckedChange={vi.fn()} />
      </>,
    );

    expectIds(screen.getByRole('button', { name: 'Save' }), 'a-button-save');
    expectIds(screen.getByRole('link', { name: 'Help' }), 'a-link-help');
    expectIds(screen.getByRole('link', { name: 'GitHub' }), 'a-link-github');
    expectIds(screen.getByRole('button', { name: 'Chip' }), 'a-button-chip');
    expectIds(screen.getByLabelText('Name'), 'a-input-name');
    expectIds(screen.getByLabelText('Message'), 'a-input-message');
    expectIds(screen.getByLabelText('Size'), 'a-select-size');
    expectIds(screen.getByRole('switch', { name: 'Dark' }), 'a-switch-dark');
  });

  it('keeps an explicit data-testid and adds none without an id', () => {
    render(
      <>
        <Button id="a-button-save" data-testid="custom">
          Save
        </Button>
        <Button>Plain</Button>
        <Input label="Generated" />
      </>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-testid', 'custom');
    expect(screen.getByRole('button', { name: 'Plain' })).not.toHaveAttribute('data-testid');
    expect(screen.getByLabelText('Generated')).not.toHaveAttribute('data-testid');
  });

  it('gives ids to the elements molecules render themselves', async () => {
    expect.hasAssertions();
    render(
      <>
        <Accordion summary="More" summaryId="faq-button-more">
          Body
        </Accordion>
        <Breadcrumbs
          items={[{ id: 'crumbs-link-home', label: 'Home', href: '/' }]}
          current="Page"
        />
        <Carousel
          label="Cards"
          previousLabel="Previous"
          nextLabel="Next"
          buttonIds={{ indicator: (index) => `cards-button-dot-${index + 1}` }}
        >
          <p>One</p>
          <p>Two</p>
        </Carousel>
        <Language
          options={[
            { id: 'lang-button-es', value: 'es', label: 'ES' },
            { id: 'lang-button-en', value: 'en', label: 'EN' },
          ]}
          value="es"
          onChange={vi.fn()}
        />
        <Navbar links={[{ id: 'nav-link-about', href: '/about', label: 'About' }]} />
        <Showcase linkId="card-link-belo" href="/belo" title="Belo" src="/belo.png" alt="" />
        <SocialLinks
          links={[{ id: 'social-link-x', href: 'https://x.com', label: 'X', icon: <svg /> }]}
        />
        <Dropdown
          id="size-select"
          label="Pick"
          options={[{ value: 'm', label: 'M' }]}
          value="m"
          onChange={vi.fn()}
        />
      </>,
    );

    expectIds(screen.getByText('More').closest('summary') as HTMLElement, 'faq-button-more');
    expectIds(screen.getByRole('link', { name: 'Home' }), 'crumbs-link-home');
    expectIds(screen.getByRole('button', { name: 'Go to slide 2' }), 'cards-button-dot-2');
    expectIds(screen.getByRole('radio', { name: 'EN' }), 'lang-button-en');
    expectIds(screen.getByRole('link', { name: 'About' }), 'nav-link-about');
    expectIds(screen.getByRole('link', { name: 'Belo' }), 'card-link-belo');
    expectIds(screen.getByRole('link', { name: 'X' }), 'social-link-x');

    const trigger = screen.getByRole('combobox');
    expectIds(trigger, 'size-select');
    await userEvent.click(trigger);
    expectIds(screen.getByRole('option', { name: 'M' }), 'size-select-option-0');
  });
});
