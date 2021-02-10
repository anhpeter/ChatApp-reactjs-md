import React, { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DayIcon from '@material-ui/icons/Brightness7';
import NightIcon from '@material-ui/icons/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { switchThemeType } from '../../GeneralSlices/themeSlice';
import { useCookies } from 'react-cookie';

export default function DayNightSwitch() {
    const theme = useSelector((state) => { return state.theme });
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['theme'])

    useEffect(() => {
        if (cookies.theme) {
            if (cookies.theme.type) {
                if (cookies.theme.type !== theme.type) {
                    dispatch(switchThemeType());
                }
            }
        }
    })

    const onSwitch = () => {
        let cookieValue = { ...theme, type: theme.type === 'light' ? 'dark' : 'light', };
        setCookie('theme', JSON.stringify(cookieValue));
        dispatch(switchThemeType());
    }

    return (
        <IconButton aria-label="Day / night toggle" onClick={onSwitch} color="inherit">
            {(theme.type === 'light') ? <NightIcon></NightIcon> : <DayIcon></DayIcon>}
        </IconButton>
    )
}
