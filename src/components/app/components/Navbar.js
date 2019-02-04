import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import React from 'react';
import { Avatar, Dropdown, Layout, Menu, message } from 'antd';

import { removeCookie } from '../actions';
import AppLink from './AppLink';

import signin from '../../signin';
import signup from '../../signup';

import { ADD_ITEM_TEXT, LOGO, MARKET_TEXT, NAVBAR, PATHS, USER_AVATAR } from '../constants';

const { Item } = Menu;
const { Header } = Layout;
const { AVATAR, SHAPE, SIZE, SOURCE } = LOGO;
const { MAIN_NAV, NAV_MENU, NAV_MODE, NAV_THEME } = NAVBAR;
const { ADD_ITEM, HOME, MARKET, PROFILE, SIGN_IN, SIGN_UP } = PATHS;
const { CONTAINER, ICON_TYPE, SIGN_OUT, USER_DROP_DOWN, USER_PROFILE } = USER_AVATAR;

const { Signin } = signin.components;
const { Signup } = signup.components;

const items = [
    <AppLink key={AVATAR} to={HOME}>
        <Avatar className={AVATAR} src={SOURCE} size={SIZE} shape={SHAPE} />
    </AppLink>,
    <AppLink key={MARKET} to={MARKET}>{MARKET_TEXT}</AppLink>,
    <AppLink key={ADD_ITEM} to={ADD_ITEM}>{ADD_ITEM_TEXT}</AppLink>,
    <Signin key={SIGN_IN} />,
    <Signup key={SIGN_UP} />,
];

/*
 * this is the the navigation bar at the top of the home page
 */
class Navbar extends React.Component {
    logout () {
        const { removeCookie } = this.props.actions;
        const { isLoggedIn } = this.props;
        isLoggedIn? message.success('blah blah blah', 5): message.error('user not logged in', 5);
        removeCookie();
    }

    render() {
        
        const UserMenu = (
            <Menu>
                <Item key={USER_PROFILE}>
                    <AppLink to={PROFILE} key={PROFILE}>{USER_PROFILE}</AppLink>
                </Item>

                <Item key={SIGN_OUT}>
                    <a onClick={this.logout}>{SIGN_OUT}</a>
                </Item>
            </Menu>
        );

        return (
            <Header className={MAIN_NAV}>
                <Menu
                    className={NAV_MENU}
                    mode={NAV_MODE}
                    theme={NAV_THEME}
                >
                    {
                        items.map(item => {
                            const { key } = item;
                            const className = key === AVATAR ? CONTAINER : '';

                            return (
                                <Item className={className} key={key}>{item}</Item>
                            );
                        })
                    }

                </Menu>
                <Dropdown overlay={UserMenu} className={USER_DROP_DOWN}>
                    <Avatar icon={ICON_TYPE} />
                </Dropdown>
            </Header>
        );
    }
}

Navbar.propTypes = {
    actions: PropTypes.object,
    isLoggedIn: PropTypes.func, 
    links: PropTypes.arrayOf(PropTypes.node),
};

const mapStateToProps = state => ({
    isLoggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ removeCookie }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
