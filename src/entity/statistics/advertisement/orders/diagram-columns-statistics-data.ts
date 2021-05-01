import {DiagramStatisticsColumn} from './diagram-statistics-column';

export class DiagramColumnsStatisticsData {
  max = 100;
  min = 0;
  average = 50;
  averageValue = 0;

  columns = new Array<DiagramStatisticsColumn>();
}
