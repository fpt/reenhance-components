import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';


beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});
