import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit,Inject } from '@angular/core';
import { Table, Model, HeaderPredicateFactory } from '@gooddata/react-components';
import '@gooddata/react-components/styles/css/main.css';
import {
  projectId,
  locationStateDisplayFormIdentifier,
  locationNameDisplayFormIdentifier,
  franchiseFeesIdentifier,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  menuCategoryAttributeDFIdentifier,
} from '../../../utils/fixtures.js';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { DrillingPopUpComponent } from '../drilling-pop-up/drilling-pop-up.component.js';

interface TableDrillExampleBucketProps {
  projectId: any;
  measures?: any[];
  attributes?: any[];
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}
interface TableDrillExampleProps {
  projectId: any;
}

@Component({
  selector: 'app-table-drill-example',
  template: '<div class="table-drill-example" style="height:500px" [id]="rootDomID"></div>',
})
export class TableDrillExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  constructor(public dialog: MatDialog) {}
  // public dialog: MatDialog
  @Input() filters: any[];
  @Input() sortBy: any[];
  
  xMeasures = [
    Model.measure(franchiseFeesIdentifier)
      .format("#,##0")
      .localIdentifier("franchiseFeesIdentifier"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier)
      .format("#,##0")
      .localIdentifier("franchiseFeesAdRoyaltyIdentifier"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier)
      .format("#,##0")
      .localIdentifier("franchiseFeesInitialFranchiseFeeIdentifier"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty)
      .format("#,##0")
      .localIdentifier("franchiseFeesIdentifierOngoingRoyalty"),
  ]

  xAttributes = [
    Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("menu"),
  ]
  xTotals = [
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "avg",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesAdRoyaltyIdentifier",
      type: "avg",
      attributeIdentifier: "mostatenth",
    },
    {
      measureIdentifier: "franchiseFeesInitialFranchiseFeeIdentifier",
      type: "avg",
      attributeIdentifier: "state",
    },
    {
      measureIdentifier: "franchiseFeesIdentifierOngoingRoyalty",
      type: "avg",
      attributeIdentifier: "state",
    },
  ];

  xSortBy = [Model.attributeSortItem("menu", "asc")]

  onDrill = drillEvent => {
    const dialogRef = this.dialog.open(DrillingPopUpComponent, {
      width: '250px',
      data: {
        projectId : projectId,
      }
    });

    // console.log(
    //   "onFiredDrillEvent",
    //   drillEvent,
    //   JSON.stringify(drillEvent.drillContext.intersection, null, 2),
    // );
    return true;
  };
  renderDrillValue() {
    let drillEvent;
    if (!drillEvent) {
      return null;
    }
  };
  drillableItems = [
    HeaderPredicateFactory.identifierMatch(menuCategoryAttributeDFIdentifier),
    HeaderPredicateFactory.identifierMatch(franchiseFeesIdentifier),
  ];
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): TableDrillExampleProps | TableDrillExampleBucketProps {
    return {
      projectId: projectId,
      measures: this.xMeasures,
      attributes: this.xAttributes,
      totals: this.xTotals,
      filters: this.filters,
      sortBy: this.xSortBy,
      drillableItems: this.drillableItems,
      onFiredDrillEvent: this.onDrill,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Table, this.getProps()), this.getRootDomNode());
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
    //ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}

