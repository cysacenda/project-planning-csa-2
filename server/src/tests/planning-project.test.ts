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
import {PlanningProjectInterface} from '../interfaces/planning-project.interface';
import {PlanningProjectModelInterface, PlanningProjectModelInterfaceStatic} from '../models/planning-project.model';
import {PlanningProjectSchema} from '../schemas/planning-project.schema';

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
class PlanningProjectTest {

  // constants
  public static BASE_URI: string = '/api/planning-projects';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // planningProject model
  public static planningProjectModel: PlanningProjectModelInterfaceStatic;

  // planningProjectDocument document
  public static planningProjectDocument: PlanningProjectModelInterface;

  // the http server
  public static server: any;

  /**
   * Before all hook
   */
  public static before() {

    // create http server
    const port = 8004;
    const serv = Server.bootstrap();
    const app = serv.app;
    app.set('port', port);
    PlanningProjectTest.server = http.createServer(app);
    PlanningProjectTest.server.listen(port);
    serv.openConnection('mongodb://localhost:27017/planning-csa-tests');

    PlanningProjectTest.planningProjectModel = mongoose.model<PlanningProjectModelInterface, PlanningProjectModelInterfaceStatic>('planningprojects', PlanningProjectSchema)
    return PlanningProjectTest.CreateplanningProject();
  }

  /**
   * After all hook
   */
  public static after() {
    return PlanningProjectTest.planningProjectDocument.remove()
      .then(() => {
        return mongoose.disconnect();
      });
  }

  /**
   * Create a test planning-params
   */
  public static CreateplanningProject(): Promise<PlanningProjectModelInterface> {
    const data: PlanningProjectInterface = {
      name: 'Mobile',
      description: 'Le projet mobile'
    };
    return new PlanningProjectTest.planningProjectModel(data).save().then(planningProject => {
      PlanningProjectTest.planningProjectDocument = planningProject;
      return planningProject;
    });
  }

  // Delete a PlanningParam
  @test
  public delete() {
    const data: PlanningProjectInterface = {
      name: 'Mobile',
      description: 'Le projet mobile'
    };
    return new PlanningProjectTest.planningProjectModel(data).save().then(planningProject => {
      return chai.request(PlanningProjectTest.server).del(`${PlanningProjectTest.BASE_URI}/${planningProject._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test
  public get () {
    return chai.request(PlanningProjectTest.server).get(`${PlanningProjectTest.BASE_URI}/${PlanningProjectTest.planningProjectDocument._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.name)));
      response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.description)));

    });
  }

  @test
  public list() {
    return chai.request(PlanningProjectTest.server).get(PlanningProjectTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.should.have.lengthOf(1);
    });
  }

  @test
  // @@@planningProject : OK
  public post() {
    const data: PlanningProjectInterface = {
      name: 'Mobile',
      description: 'Le projet mobile'
    };
    return chai.request(PlanningProjectTest.server).post(PlanningProjectTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.name)));
        response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.description)));
        return PlanningProjectTest.planningProjectModel.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const data: PlanningProjectInterface = {
      name: 'Mobile',
      description: 'Le projet mobile'
    }
    return chai.request(PlanningProjectTest.server).put(`${PlanningProjectTest.BASE_URI}/${PlanningProjectTest.planningProjectDocument._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.name)));
        response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningProjectTest.planningProjectDocument.description)));
      });
  }

}
