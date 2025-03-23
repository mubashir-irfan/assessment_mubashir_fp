import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../shared/components/SearchInput';

// Mock function for onSearch
const mockOnSearch = jest.fn();

describe('SearchInput Component', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();  // Clear the mock before each test
  });

  test('should render the input field and button', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    // Check if the input and button are in the document
    expect(screen.getByPlaceholderText('Enter value...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('should update the input value when typed into', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter value...') as HTMLInputElement;

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'test query' } });

    // Check if the value is updated correctly
    expect(input.value).toBe('test query');
  });

  test('should call onSearch when the Search button is clicked', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter value...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'search query' } });

    const button = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(button);

    // Check if the onSearch function is called with the correct argument
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('search query');
  });

  test('should call onSearch when the Enter key is pressed', () => {
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Enter value...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'query on enter' } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Check if the onSearch function is called with the correct argument
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('query on enter');
  });

  test('should use custom label and placeholder when provided', () => {
    const customLabel = 'Custom Label';
    const customPlaceholder = 'Custom Placeholder';

    render(
      <SearchInput
        onSearch={mockOnSearch}
        label={customLabel}
        placeholder={customPlaceholder}
      />
    );

    // Check if the label and placeholder are correct
    expect(screen.getByLabelText(customLabel)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });
});
