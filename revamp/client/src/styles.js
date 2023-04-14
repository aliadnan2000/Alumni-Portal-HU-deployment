import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 0,
        margin: '0 0 30px 0',
        display: 'flex',
        width: `100%`,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5c2568',
      },
      heading: {
        color: 'white',
      },
      image: {
        marginLeft: '15px',
      },
}));