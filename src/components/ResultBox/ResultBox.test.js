import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD', () => {

      const testCases = [
        { amount: '100', toUSD: '28.57' },
        { amount: '20', toUSD: '5.71' },
        { amount: '200', toUSD: '57.14' },
        { amount: '345', toUSD: '98.57' },
      ];
  
      for(const testObj of testCases){

        render(<ResultBox from="PLN" to="USD" amount={parseFloat(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`PLN ${testObj.amount}.00 = $${testObj.toUSD}`);

        // unmount component
        cleanup();
      }
    });
    it('should render proper info about conversion when USD -> PLN', () => {

      const testCases = [
        { amount: '100', toPLN: '350' },
        { amount: '20', toPLN: '70' },
        { amount: '200', toPLN: '700' },
        { amount: '17', toPLN: '59.50' },
      ];
  
      for(const testObj of testCases){

        render(<ResultBox from="USD" to="PLN" amount={parseFloat(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`$${testObj.amount}.00 = PLN ${testObj.toPLN}`);
        
        // unmount component
        cleanup();
      }
    });
    it('should render proper info about conversion when PLN -> PLN and USD -> USD', () => {

      const testCases = [
        { amount: '100', from: 'PLN', to: 'PLN', expectedText: 'PLN 100.00 = PLN 100.00' },
        { amount: '20', from: 'PLN', to: 'PLN', expectedText: 'PLN 20.00 = PLN 20.00' },
        { amount: '200', from: 'USD', to: 'USD', expectedText: '$200.00 = $200.00' },
        { amount: '17', from: 'USD', to: 'USD', expectedText: '$17.00 = $17.00' },
      ];
  
      for(const testObj of testCases){

        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(testObj.expectedText);
      
      // unmount component
      cleanup();
      }
    });
    it('should have wrong value when amount is negative', () => {
      const testCases = [
        { amount: '-100', from: 'PLN', to: 'USD' },
        { amount: '-20', from: 'USD', to: 'PLN' },
        { amount: '-200', from: 'PLN', to: 'PLN' },
        { amount: '-17', from: 'USD', to: 'USD' },
      ];

      for(const testObj of testCases){
        render(<ResultBox from={testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');

        // unmount component
        cleanup();
      }
    })
});