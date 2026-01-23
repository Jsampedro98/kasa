import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyGallery from '@/components/property/PropertyGallery';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('PropertyGallery', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];
  const mockTitle = 'Test Property';

  it('renders grid images correctly', () => {
    render(<PropertyGallery images={mockImages} title={mockTitle} />);
    const images = screen.getAllByRole('img');
    // 3 images mock => 3 images in grid
    expect(images.length).toBe(3);
  });

  it('opens lightbox on image click and displays first image', () => {
    render(<PropertyGallery images={mockImages} title={mockTitle} />);
    
    // Click the first image in the grid
    const gridImages = screen.getAllByRole('img');
    fireEvent.click(gridImages[0]);

    // Check for Lightbox presence via unique element (e.g. counter)
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    
    // Check if close button is present
    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument();
  });

  it('navigates to next image and loops using buttons', () => {
    render(<PropertyGallery images={mockImages} title={mockTitle} />);
    
    // Open Lightbox
    const gridImages = screen.getAllByRole('img');
    fireEvent.click(gridImages[0]); // Open at index 0

    const nextBtn = screen.getByLabelText('Next image');
    
    // Click Next -> Index 1
    fireEvent.click(nextBtn);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    // Click Next -> Index 2
    fireEvent.click(nextBtn);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();

    // Click Next -> Loop back to Index 0
    fireEvent.click(nextBtn);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('navigates to previous image and loops using buttons', () => {
    render(<PropertyGallery images={mockImages} title={mockTitle} />);
    
    // Open Lightbox
    const gridImages = screen.getAllByRole('img');
    fireEvent.click(gridImages[0]); // Open at index 0

    const prevBtn = screen.getByLabelText('Previous image');
    
    // Click Prev -> Loop to Index 2 (Last)
    fireEvent.click(prevBtn);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();

    // Click Prev -> Index 1
    fireEvent.click(prevBtn);
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('closes lightbox on Close button click', () => {
    render(<PropertyGallery images={mockImages} title={mockTitle} />);
    
    // Open
    const gridImages = screen.getAllByRole('img');
    fireEvent.click(gridImages[0]); 
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    // Close
    const closeBtn = screen.getByLabelText('Close lightbox');
    fireEvent.click(closeBtn);

    // Lightbox should disappear (counter removed)
    expect(screen.queryByText('1 / 3')).not.toBeInTheDocument();
  });
});
