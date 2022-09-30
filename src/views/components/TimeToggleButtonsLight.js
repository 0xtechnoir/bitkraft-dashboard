// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const TimeToggleButtonsLight = (props) => {

    const [alignment, setAlignment] = useState('All');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
            >
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => props.handleClick('ALL', props.data)} value="All"> All </ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => props.handleClick('1Y', props.data)} value="1Y"> 1Y</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => props.handleClick('YTD', props.data)} value="YTD"> YTD</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => props.handleClick('90D', props.data)} value="90D"> 90D</ToggleButton>
                <ToggleButton size='small' sx={{ mr: 3.5 }} variant='outlined' onClick={() => props.handleClick('30D', props.data)} value="30D"> 30D</ToggleButton>
            </ToggleButtonGroup>
        </div>
    )
}

// export default TimeToggleButtonsLight