import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

/**
 * GoblinSource tweaks: passes toggle/set functions for VM runtimeOptions to its child.
 * function (handlers, {removeLimits, fps, ...props}) {}
 */
class TweaksMenu extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleRemoveLimits',
            'setFramerate'
        ]);
    }
    toggleRemoveLimits () {
        const runtime = this.props.vm.runtime;
        runtime.runtimeOptions.miscLimits = !runtime.runtimeOptions.miscLimits;
        this.forceUpdate();
    }
    setFramerate (fps) {
        const runtime = this.props.vm.runtime;
        runtime.runtimeOptions.framerate = fps;
        if (runtime._steppingInterval) {
            runtime.quit();
            runtime.start();
        }
        this.forceUpdate();
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        const runtime = vm.runtime;
        return this.props.children(
            {
                toggleRemoveLimits: this.toggleRemoveLimits,
                setFramerate: this.setFramerate
            },
            {
                removeLimits: !runtime.runtimeOptions.miscLimits,
                framerate: runtime.runtimeOptions.framerate,
                ...props
            }
        );
    }
}

TweaksMenu.propTypes = {
    children: PropTypes.func,
    vm: PropTypes.shape({
        runtime: PropTypes.shape({
            runtimeOptions: PropTypes.object,
            start: PropTypes.func,
            quit: PropTypes.func
        })
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({})
)(TweaksMenu);
