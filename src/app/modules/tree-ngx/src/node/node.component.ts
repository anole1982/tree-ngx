import { Component, OnChanges, ElementRef, ViewChild, Input, TemplateRef, SimpleChanges } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { NodeState } from '../model/node-state';
import { NodeSelectedState } from '../model/node-selected-state';
import { TreeCallbacks } from '../model/tree-callbacks';
import { TreeOptions } from '../model/tree-options';
import { TreeService } from '../service/tree-service';


@Component({
  selector: 'node',
  templateUrl: './node.component.html'
})
export class NodeComponent implements OnChanges {

  @ViewChild('nodeCheckbox') nodeCheckbox: ElementRef;

  @Input() state: NodeState;
  @Input() selectedState: NodeSelectedState;
  @Input() nodeNameTemplate: TemplateRef<any>;
  @Input() nodeCollapsibleTemplate: TemplateRef<any>;

  public _this = this;

  constructor(private treeService: TreeService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedState) {
      this.selectedStateChanged();
    }
  }

  private selectedStateChanged() {
    if (this.nodeCheckbox) {
      if (this.selectedState === NodeSelectedState.indeterminate) {
        this.nodeCheckbox.nativeElement.indeterminate = true;
      } else {
        this.nodeCheckbox.nativeElement.indeterminate = false;
      }
    }
  }

  public toggleSelected() {
    this.treeService.toggleSelected(this.state);
  }
}
