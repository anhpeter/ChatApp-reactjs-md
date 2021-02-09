import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DayIcon from '@material-ui/icons/Brightness7';
import NightIcon from '@material-ui/icons/Brightness4';
import { useDispatch, useSelector } from 'react-redux';
import { switchThemeType } from '../GeneralSlices/themeSlice';
import { useCookies } from 'react-cookie';

export default function DayNightSwitch() {
    const themeType = useSelector((state) => { return state.theme.type });
    const dispatch = useDispatch();
    //const [cookies, setCookie, removeCookie] = useCookies(['theme'])

    //const theme = cookies.theme;
    //if (theme) {
    //if (theme.type) {
    //if (themeType !== theme.type) {
    //dispatch(switchThemeType());
    //}
    //}
    //}

    const onSwitch = () => {
        //let cookieValue = { type: themeType, ...theme };
        //setCookie('theme', JSON.stringify(cookieValue));
        dispatch(switchThemeType());
    }

    return (
        <IconButton aria-label="Day / night toggle" onClick={onSwitch}>
            {(themeType === 'light') ? <NightIcon></NightIcon> : <DayIcon></DayIcon>}
        </IconButton>
    )
}
