import { Button, buttonStyles } from '@components';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should be disabled when the disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should render the secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render every variant without throwing', () => {
    const variants = ['primary', 'secondary', 'ghost', 'destructive'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: variant })).toBeInTheDocument();
      unmount();
    }
  });

  it('should apply a custom className alongside its own classes', () => {
    render(<Button className="custom-class">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class', 'inline-flex');
  });

  describe('asChild', () => {
    it('should render the child element with the button styles instead of a <button>', () => {
      render(
        <Button asChild variant="secondary" className="extra">
          <a href="/calculator" className="child-class">
            Go
          </a>
        </Button>,
      );
      const link = screen.getByRole('link', { name: 'Go' });
      expect(link).toHaveAttribute('href', '/calculator');
      expect(link).toHaveClass('inline-flex', 'extra', 'child-class');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should forward the ref to the child element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Button asChild ref={ref}>
          <a href="/">Home</a>
        </Button>,
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it("should keep the child's own ref and run both click handlers", async () => {
      const user = userEvent.setup();
      const childRef = createRef<HTMLAnchorElement>();
      const onButtonClick = vi.fn();
      const onChildClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
      render(
        <Button asChild onClick={onButtonClick}>
          <a href="/" ref={childRef} onClick={onChildClick}>
            Home
          </a>
        </Button>,
      );
      await user.click(screen.getByRole('link', { name: 'Home' }));
      expect(childRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(onChildClick).toHaveBeenCalledOnce();
      expect(onButtonClick).toHaveBeenCalledOnce();
    });

    it('should merge inline styles, child values winning', () => {
      render(
        <Button asChild style={{ color: 'red', margin: 1 }}>
          <a href="/" style={{ color: 'blue' }}>
            Home
          </a>
        </Button>,
      );
      expect(screen.getByRole('link')).toHaveStyle({ color: 'rgb(0, 0, 255)', margin: '1px' });
    });

    it('should render nothing when the child is not an element', () => {
      const { container } = render(<Button asChild>text</Button>);
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('should export buttonStyles for styling other elements', () => {
    expect(buttonStyles({ variant: 'primary' })).toContain('inline-flex');
  });

  it('should be busy, disabled and pulsing while loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveClass('aria-busy:animate-pulse');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
