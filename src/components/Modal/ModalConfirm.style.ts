import { createStyles, makeStyles } from '@mui/styles'
import { theme } from '../../utils'
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            '& .MuiDialog-paper': {
                width: '80%',
                '& .MuiTypography-h6.MuiDialogTitle-root': {
                    padding: '16px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                },
                '&.MuiPaper-elevation .MuiTypography-h6.MuiDialogTitle-root .MuiIconButton-root.MuiIconButton-sizeMedium': {
                    marginTop: '3px',
                },
                '&.MuiPaper-elevation': {
                    '& .MuiTypography-h6.MuiDialogTitle-root .MuiIconButton-root.MuiIconButton-sizeMedium .MuiSvgIcon-fontSizeMedium': {
                        color: '#4b5563',
                        width: '20px',
                        height: '20px',
                    },
                    '& .MuiDialogActions-root .MuiButton-outlined.MuiButton-outlinedPrimary': {
                        padding: '5px 15px',
                        minWidth: '56px',
                    },
                    '& .MuiDialogActions-root .MuiButton-outlined.MuiButton-outlinedPrimary:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    '& .MuiDialogActions-root .MuiButton-contained.MuiButton-containedPrimary': {
                        backgroundColor: '#2463eb',
                        color: '#ffffff',
                        boxShadow: 'none',
                    },
                    '& .MuiDialogActions-root .MuiButton-contained.MuiButton-containedPrimary:hover': {
                        backgroundColor: '#0051ff',
                        color: 'rgba(255, 255, 255, 0.9)',
                    },
                    '& .MuiDialogContent-root': {
                        padding: '0px',
                    },
                },
            },
            [theme.breakpoints.down('sm')]: {
                '& .MuiDialog-paper': {
                    width: '90%',
                    height: 'auto',
                    marginBottom: '110px',
                },
                '& .MuiDialogContent-root': {
                    overflowY: 'auto',
                },
            },
        },
    }),
)

export default useStyles
