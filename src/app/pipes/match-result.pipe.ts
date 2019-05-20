import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchResult'
})
export class MatchResultPipe implements PipeTransform {

  transform (wonMatch: boolean): string {
    return wonMatch ? "Ganado" : "Perdido";
  }

}
