import { getResults } from './results.utilities';

describe('results-utilities', () => {
  describe('getResults when called', () => {
    it('should return correct obj', () => {
       const args = 10;
       const expected = getResults(args);
       const received = {
        feedback: 'well done!',
        color: 'light-green',
       };

       expect(received).toMatchObject(expected);
    });
  });
});
