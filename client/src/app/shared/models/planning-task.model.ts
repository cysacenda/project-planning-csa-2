export class PlanningTask {
  constructor(public _id?: number,
              public name?: string,
              public workload?: number,
              public etc?: number,
              public position?: number,
              public resourceTrigram?: string,
              public projectName?: string,
              public isMilestone?: boolean,
              public milestoneDate?: string,
              public daysMap?: Map<string, number>,
              public selected?: boolean) {
    if (this.daysMap == null) {
      this.daysMap = new Map<string, number>();
    }
  }

  public toJSON(): String {
    let json: String = '{';
    if (this._id != null) {
      json += '"_id":"' + this._id + '",';
    }
    json += '"name":"' + this.name + '",';

    if (this.workload != null) {
      json += '"workload":' + this.workload + ',';
    }

    if (this.etc != null) {
      json += '"etc":' + this.etc + ',';
    }

    if (this.position != null) {
      json += '"position":' + this.position + ',';
    }
    json += '"resourceTrigram":"' + this.resourceTrigram + '",';
    json += '"projectName":"' + this.projectName + '",';
    json += '"isMilestone":';
    json += this.isMilestone == null ? 'false,' : this.isMilestone + ',';

    if (this.milestoneDate != null) {
      json += '"milestoneDate":"' + this.milestoneDate + '",';
    }

    if (this.daysMap != null && this.daysMap.size > 0) {
      json += '"daysMap":[';
      this.daysMap.forEach(function (value, key) {
        json += '{"key":"' + key + '", "val":' + value + '},';
      });
      json = json.slice(0, -1);
      json += ']';
    } else {
      json = json.slice(0, -1);
    }
    json += '}';
    return json;
  }
}
