export class EnumEx {
  static getNames(e: any): string[] {
    return Object.keys(e).filter(v => isNaN(parseInt(v, 10)));
  }

  static getLowercasedNames(e: any): string[] {
    return Object.keys(e)
      .filter(v => isNaN(parseInt(v, 10)))
      .map(v => v.toLowerCase());
  }

  static getValues(e: any): number[] {
    return Object.keys(e).map(v => parseInt(v, 10)).filter(v => !isNaN(v));
  }

  static getNamesAndValues(e: any) {
    return EnumEx.getValues(e).map(v => { return { name: e[v] as string, value: v }; });
  }
}
