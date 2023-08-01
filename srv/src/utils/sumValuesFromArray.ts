/**
 * Calculates the total sum of the "value" property in the given array of objects.
 *
 * @template T - The type of the array elements. It must extend an object with a "value" property of type number.
 * @param {T[]} items - The array of objects to calculate the total sum for.
 * @param {string} period - The period name to include in the result.
 * @returns {{ total: number, periodName: string }} An object containing the total sum of "value" property and the period name.
 */
  
    export const sumValues = <T extends { value: number }>(items: T[],period:string) => {
   /**
   * The total sum of the "value" property.
   *
   * @type {number}
   */
      let total: number = items.reduce((sum, item) => {
        return sum + item.value;
      }, 0);
    
  /**
   * The period name.
   *
   * @type {string}
   */
      const periodName: string = `${period} totals`

      return {total, periodName}
    };