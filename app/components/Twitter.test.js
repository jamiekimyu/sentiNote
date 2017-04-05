import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Twitter from './Twitter';
import UserTweets from './UserTweets';
import SearchTweets from './SearchTweets';

describe('<Twitter />', () => {
	it('should render one <UserTweets />', () => {
		const wrapper = shallow(<Twitter />);
		expect(wrapper.find(UserTweets)).to.have.length(1);
	});

	it('should render one <SearchTweets />', () => {
		const wrapper = shallow(<Twitter />);
		expect(wrapper.find(SearchTweets)).to.have.length(1);
	});
});
