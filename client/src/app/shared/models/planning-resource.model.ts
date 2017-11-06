export class PlanningResource {
  constructor(public _id?: number,
              public trigram?: string,
              public name?: string,
              public role?: string,
              public description?: string,
              public vacationMap?: Map<string, number>,
              public selected?: boolean) {
  }

  public toJSON(): String {
    let json: String = '';
    json = '{"_id":"' + this._id + '",';
    json += '"trigram":"' + this.trigram + '",';
    json += '"name":"' + this.name + '",';
    json += '"role":"' + this.role + '",';
    json += '"description":"' + this.description + '",';

    // TODO : Méthode générique static pour toute l'appli ?
    json += '"vacationMap":[';
    this.vacationMap.forEach(function (value, key) {
      json += '{"key":"' + key + '", "val":' + value + '},';
    });
    json = json.slice(0, -1);
    json += ']}' ;
    return json;
  }
}
