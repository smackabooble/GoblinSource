import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import TweaksMenu from '../../containers/tweaks-menu.jsx';
import {MenuItem} from '../menu/menu.jsx';

const FPS_OPTIONS = [30, 60, 120, 240];

const TweaksSection = ({onRequestCloseSettings}) => (
    <TweaksMenu>{(handlers, {removeLimits, framerate}) => (
        <React.Fragment>
            <MenuItem onClick={handlers.toggleRemoveLimits}>
                {removeLimits ? (
                    <FormattedMessage
                        defaultMessage="Restore Scratch Limits"
                        description="Menu bar item to restore default limits (clones, list length)"
                        id="gui.menuBar.restoreLimits"
                    />
                ) : (
                    <FormattedMessage
                        defaultMessage="Remove Scratch Limits"
                        description="Menu bar item to remove limits (clones, list length)"
                        id="gui.menuBar.removeLimits"
                    />
                )}
            </MenuItem>
            {FPS_OPTIONS.map(fps => (
                <MenuItem
                    key={`fps-${fps}`}
                    onClick={() => handlers.setFramerate(fps)}
                >
                    {`${fps} FPS${framerate === fps ? ' \u2713' : ''}`}
                </MenuItem>
            ))}
        </React.Fragment>
    )}</TweaksMenu>
);

TweaksSection.propTypes = {
    onRequestCloseSettings: PropTypes.func
};

export default TweaksSection;
