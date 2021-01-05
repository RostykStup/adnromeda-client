export class Validator {

  public static validateEmail(email: string): boolean {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
  }

  public static validateSizeMinMax(text: string, min: number, max: number): boolean {
    return (text.length >= min && text.length <= max);
  }

  public static validateSizeMin(text: string, min: number): boolean {
    return text.length >= min;
  }

  public static validateSizeMax(text: string, max: number): boolean {
    return text.length <= max;
  }

  public static validateEquals(test1: string, text2: string): boolean {
    return test1 === text2;
  }

  public static validateNumberForPrice(n: any): boolean {
    n = Number(n);
    const isBiggerZero = n > 0.01;
    const isInteger = (Number(n) == n) && (n % 1 === 0);
    const isFloat = n === +n && n !== (n | 0);
    return (isInteger || isFloat) && isBiggerZero;
  }

  public static validatePriceForTwoDigits(n: any): boolean {
    const c = n.toString().split('.')[1];
    if (c === undefined) {
      return true;
    } else {
      return  c.length > 0 && c.length < 3 ;
    }
  }
}
