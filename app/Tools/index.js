import moment from 'moment';
import '../../node_modules/moment/locale/tr';
moment.locale('tr');

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

export const generateStringDate = (date) => {
  return moment(new Date(date)).format("HH:mm | DD MMMM YYYY");
}

export const shadow = (elevation, color) => {
    return {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: elevation,
    }
}