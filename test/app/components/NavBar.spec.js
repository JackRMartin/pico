import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import NavBar from '../../../app/components/NavBar';

describe("NavBar component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<NavBar/>);
  });

});
