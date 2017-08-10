process.env.NODE_ENV = 'test';

// mocha
import 'mocha';
import 'chai';
import {suite, test} from 'mocha-typescript';

// mongodb
import {ObjectID} from 'mongodb';

// server
import {Server} from '../server';

// model
import {PlanningTaskInterface} from '../interfaces/planning-task.interface';
import {PlanningTaskModelInterface, PlanningTaskModelInterfaceStatic} from '../models/planning-task.model';
import {PlanningTaskSchema} from '../schemas/planning-task.schema';

// mongoose
import mongoose = require('mongoose');

// require http server
const http = require('http');

// require chai and use should assertions
const chai = require('chai');
chai.should();

// configure chai-http
chai.use(require('chai-http'));

@suite
class PlanningTaskTest {

  // constants
  public static BASE_URI: string = '/api/planning-tasks';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // planningTask model
  public static planningTaskModel: PlanningTaskModelInterfaceStatic;

  // planningTaskDocument document
  public static planningTaskDocument: PlanningTaskModelInterface;

  // the http server
  public static server: any;

  /**
   * Before all hook
   */
  public static before() {

    // create http server
    const port = 8002;
    const serv = Server.bootstrap();
    const app = serv.app;
    app.set('port', port);
    PlanningTaskTest.server = http.createServer(app);
    PlanningTaskTest.server.listen(port);
    serv.openConnection('mongodb://localhost:27017/planning-csa-tests');

    PlanningTaskTest.planningTaskModel = mongoose.model<PlanningTaskModelInterface, PlanningTaskModelInterfaceStatic>('planningtasks', PlanningTaskSchema)
    return PlanningTaskTest.CreateplanningTask();
  }

  /**
   * After all hook
   */
  public static after() {
    return PlanningTaskTest.planningTaskDocument.remove()
      .then(() => {
        return mongoose.disconnect();
      });
  }

  /**
   * Create a test planning-params
   */
  public static CreateplanningTask(): Promise<PlanningTaskModelInterface> {
    const data: PlanningTaskInterface = {
      name: 'Install API GW',
      workload: 5,
      etc: 2,
      position: 1,
      resource_id: 'XXr',
      resourceTrigram: 'CSA',
      project_id: 'idp',
      projectName: 'App Mobile'
    };
    return new PlanningTaskTest.planningTaskModel(data).save().then(planningTask => {
      PlanningTaskTest.planningTaskDocument = planningTask;
      return planningTask;
    });
  }

  // Delete a PlanningParam
  @test
  public delete() {
    const data: PlanningTaskInterface = {
      name: 'Install API GW',
      workload: 5,
      etc: 2,
      position: 1,
      resource_id: 'XXr',
      resourceTrigram: 'CSA',
      project_id: 'idp',
      projectName: 'App Mobile'
    };
    return new PlanningTaskTest.planningTaskModel(data).save().then(planningTask => {
      return chai.request(PlanningTaskTest.server).del(`${PlanningTaskTest.BASE_URI}/${planningTask._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test
  public get () {
    return chai.request(PlanningTaskTest.server).get(`${PlanningTaskTest.BASE_URI}/${PlanningTaskTest.planningTaskDocument._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('etc').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.etc)));
      response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.name)));
      response.body.should.have.property('position').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.position)));
      response.body.should.have.property('project_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.project_id)));
      response.body.should.have.property('resource_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.resource_id)));
      response.body.should.have.property('projectName').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.projectName)));
    });
  }

  @test
  public list() {
    return chai.request(PlanningTaskTest.server).get(PlanningTaskTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.should.have.lengthOf(1);
    });
  }

  @test
  // @@@planningTask : OK
  public post() {
    const data: PlanningTaskInterface = {
      name: 'Install API GW',
      workload: 5,
      etc: 2,
      position: 1,
      resource_id: 'XXr',
      resourceTrigram: 'CSA',
      project_id: 'idp',
      projectName: 'App Mobile',
    };
    return chai.request(PlanningTaskTest.server).post(PlanningTaskTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('etc').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.etc)));
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.name)));
        response.body.should.have.property('position').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.position)));
        response.body.should.have.property('project_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.project_id)));
        response.body.should.have.property('resource_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.resource_id)));
        response.body.should.have.property('projectName').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.projectName)));
        return PlanningTaskTest.planningTaskModel.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const data: PlanningTaskInterface = {
      name: 'Install API GW',
      workload: 5,
      etc: 2,
      position: 1,
      resource_id: 'XXr',
      resourceTrigram: 'CSA',
      project_id: 'idp',
      projectName: 'App Mobile'
    }
    return chai.request(PlanningTaskTest.server).put(`${PlanningTaskTest.BASE_URI}/${PlanningTaskTest.planningTaskDocument._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('etc').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.etc)));
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.name)));
        response.body.should.have.property('position').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.position)));
        response.body.should.have.property('project_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.project_id)));
        response.body.should.have.property('resource_id').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.resource_id)));
        response.body.should.have.property('projectName').eql(JSON.parse(JSON.stringify(PlanningTaskTest.planningTaskDocument.projectName)));
      });
  }

}
