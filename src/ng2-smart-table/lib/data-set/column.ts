import { DataSet } from './data-set';

export class Column {

  public title: string = '';
  public type: string = '';
  public class: string = '';
  public isSortable: boolean = false;
  public isEditable: boolean = true;
  public isFilterable: boolean = false;
  public sortDirection: string = '';
  public defaultSortDirection: string = '';
  protected compareFunction: Function;
  protected valuePrepareFunction: Function;
  protected filterFunction: Function;

  constructor(public id: string, protected settings: any, protected dataSet: DataSet) {
    this.process();
  }

  public getCompareFunction(): Function {
    return this.compareFunction;
  }

  public getValuePrepareFunction(): Function {
    return this.valuePrepareFunction;
  }

  public getFilterFunction(): Function {
    return this.filterFunction;
  }

  protected process(): void {
    this.title = this.settings['title'];
    this.class = this.settings['class'];
    this.type = this.prepareType();

    this.isFilterable = !!this.settings['filter'];
    this.defaultSortDirection = this.settings['sort'];
    this.isSortable = !!this.settings['sort'];
    this.isEditable = typeof this.settings['editable'] === 'undefined' ? true : !!this.settings['editable'];
    this.sortDirection = this.prepareSortDirection();

    this.compareFunction = this.settings['compareFunction'];
    this.valuePrepareFunction = this.settings['valuePrepareFunction'];
    this.filterFunction = this.settings['filterFunction'];
  }

  protected prepareType(): string {
    return this.settings['type'] || this.determineType();
  }

  protected prepareSortDirection(): string {
    return this.settings['sort'] === 'desc' ? 'desc' : 'asc';
  }

  protected determineType(): string {
    // TODO: determine type by data
    return 'string';
  }
}
