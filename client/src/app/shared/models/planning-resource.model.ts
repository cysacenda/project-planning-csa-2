export class PlanningResource {
  constructor(public _id?: number,
              public trigram?: string,
              public name?: string,
              public role?: string,
              public description?: string,
              public vacationMap?: Map<string, number>,
              public selected?: boolean) {
    if (this.vacationMap == null) {
      this.vacationMap = new Map<string, number>();
    }
  }

  public toJSON(): String {
    let json: String = '{';
    if (this._id != null) {
      json += '"_id":"' + this._id + '",';
    }
    if (this.trigram != null) {
      json += '"trigram":"' + this.trigram + '",';
    }
    if (this.name != null) {
      json += '"name":"' + this.name + '",';
    }
    if (this.role != null) {
      json += '"role":"' + this.role + '",';
    }
    if (this.description != null) {
      json += '"description":"' + this.description + '",';
    }
    if (this.vacationMap != null && this.vacationMap.size > 0) {
      json += '"vacationMap":[';
      this.vacationMap.forEach(function (value, key) {
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
