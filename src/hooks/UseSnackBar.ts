import { useSnackbar } from 'notistack';

export enum VariantType {
    DEFAULT = 'default',
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
  }

type enqueueSnackbarFunc = (message: string, variant?: VariantType) => void;

const enqueueSnackBar = () => {

    const { enqueueSnackbar } = useSnackbar();

    const toast: enqueueSnackbarFunc = (message,variant) => {
        enqueueSnackbar(message,{
            variant:variant,
            anchorOrigin:{
                vertical:'top',
                horizontal:'right'
            },
            autoHideDuration: 2000
        })
    }

    return toast;

}

export default enqueueSnackBar;