import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders all sub-components together', () => {
    render(
      <Card noPadding>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders CardTitle as the correct heading element', () => {
    render(<CardTitle as="h1">Heading 1</CardTitle>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading 1');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Test</Card>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('applies a custom className to every sub-component alongside its own classes', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle className="custom-title">Title</CardTitle>
          <CardDescription className="custom-description">Description</CardDescription>
        </CardHeader>
        <CardContent className="custom-content">Content</CardContent>
        <CardFooter className="custom-footer">Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Title').parentElement).toHaveClass('custom-header', 'flex');
    expect(screen.getByText('Title')).toHaveClass('custom-title', 'font-semibold');
    expect(screen.getByText('Description')).toHaveClass('custom-description', 'text-sm');
    expect(screen.getByText('Content')).toHaveClass('custom-content', 'px-6');
    expect(screen.getByText('Footer')).toHaveClass('custom-footer', 'flex');
  });
});
