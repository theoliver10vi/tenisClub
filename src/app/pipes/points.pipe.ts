import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'points'
})
export class PointsPipe implements PipeTransform {

  transform (points: number, opponentPoints?: number): any {
    if (opponentPoints != null)
      return points == 0 && opponentPoints == 0 ? null : points;
    else
      return points > 0 ? points : null;
  }

}
