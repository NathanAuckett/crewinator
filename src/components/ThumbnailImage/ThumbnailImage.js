import Box from '@mui/material/Box';

import './ThumbnailImage.css'

export function ThumbnailImage(props) {
    const thumbnailURL = props.thumbnailURL;
    const size = props.size;
    
    return (
        <Box className='ItemPreviewImage' sx={{width: size, height: size}}>
            <img alt="Thumbnail" src={thumbnailURL}/>
        </Box>
    )
}