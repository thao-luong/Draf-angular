import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AreaChart, Model } from '@gooddata/react-components';

import {
  projectId,
  totalSalesIdentifier,
  locationResortIdentifier,
  franchiseFeesIdentifier,
  grossProfitIdentifier,
} from "../../../utils/fixtures";

import { CUSTOM_COLOR_PALETTE } from "../../../utils/colors";

interface AreaChartHasColorPaletteBucketProps {
  measures: any[];
  viewBy?: (any);
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
  locale?: any;
}
interface AreaChartHasColorPaletteProps {
  projectId: any;
}

@Component({
  selector: 'app-area-chart-has-color-palette',
  template: '<div class="area-chart-has-color-palette" style="height:500px" [id]="rootDomID"></div>',
})
export class AreaChartHasColorPaletteComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() sortBy: any[];
  @Input() stackBy: any;
  @Input() locale: any;
  @Input() filters: any[];

  xMeasures = [
    Model.measure(totalSalesIdentifier)
      .format("#,##0")
      .alias("$ Total Sales"),
    Model.measure(franchiseFeesIdentifier)
      .alias("Franchise Fee")
      .format("$#,##0.00"),
    Model.measure(grossProfitIdentifier)
      .alias("Gross Profit")
      .format("$#,##0.00")]

  xViewBy = Model.attribute(locationResortIdentifier)
  xconfig = {
    stackMeasures: false,
    stackMeasuresToPercent: true,
    colorPalette: CUSTOM_COLOR_PALETTE,
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: '.',
      decimal: ','
    },
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): AreaChartHasColorPaletteProps | AreaChartHasColorPaletteBucketProps {
    return {
      projectId: projectId,
      measures: this.xMeasures,
      viewBy: this.xViewBy,
      stackBy: this.stackBy,
      filters: this.filters,
      sortBy: this.sortBy,
      config: this.xconfig,
      locale: "ja-JP"
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }
  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AreaChart, this.getProps()), this.getRootDomNode());
    }
  }
  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
