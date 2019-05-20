import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suspended'
})
export class SuspendedPipe implements PipeTransform {

  transform (suspended: boolean): string {
    return suspended ? 'Suspendido' : null;
  }

}
