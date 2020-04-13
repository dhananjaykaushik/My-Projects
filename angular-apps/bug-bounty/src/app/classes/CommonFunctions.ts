import * as moment from 'moment';

export class CommonFunctions {

  static materialColors = ['#f44336', '#e91e36', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

  static generateUniqueKey(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getRandomNumber(maxValue: number) {
    return Math.floor(Math.random() * maxValue) + 1;
  }

  static getRandomFromList(list: string[]) {
    const index = CommonFunctions.getRandomNumber(list.length - 1);
    return list[index];
  }

  static dateFormatter(date) {
    return moment(date.seconds ? (date.seconds * 1000) : date).format('LLL');
  }
}
