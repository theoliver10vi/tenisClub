import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();

        this.getAndInitTranslations();
    }

    getAndInitTranslations() {
        this.itemsPerPageLabel = "Jugadores por página";
        this.nextPageLabel = "Siguiente página";
        this.previousPageLabel = "Página anterior";
        this.firstPageLabel = "Primera página";
        this.lastPageLabel = "Última página";
        this.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if(length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}