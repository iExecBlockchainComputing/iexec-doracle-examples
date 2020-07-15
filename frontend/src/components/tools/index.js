import React          from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip        from 'react-bootstrap/Tooltip';
import HelpIcon       from '@material-ui/icons/Help';

export const WithTooltip = (props) => <OverlayTrigger placement={props.placement || 'top'} overlay={ <Tooltip>{props.message || 'placeholder'}</Tooltip> }>{ props.children }</OverlayTrigger>;
export const WithHelp    = (props) => <span className='float-right'><WithTooltip message={props.message}><HelpIcon fontSize={ props.fontSize || 'small'}/></WithTooltip></span>;
