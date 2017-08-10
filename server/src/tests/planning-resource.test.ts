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
import {PlanningResourceInterface} from '../interfaces/planning-resource.interface';
import {PlanningResourceModelInterface, PlanningResourceModelInterfaceStatic} from '../models/planning-resource.model';
import {PlanningResourceSchema} from '../schemas/planning-resource.schema';

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
class PlanningResourceTest {

  // constants
  public static BASE_URI: string = '/api/planning-resources';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // planningResource model
  public static planningResourceModel: PlanningResourceModelInterfaceStatic;

  // planningResourceDocument document
  public static planningResourceDocument: PlanningResourceModelInterface;

  // the http server
  public static server: any;

  /**
   * Before all hook
   */
  public static before() {

    // create http server
    const port = 8003;
    const serv = Server.bootstrap();
    const app = serv.app;
    app.set('port', port);
    PlanningResourceTest.server = http.createServer(app);
    PlanningResourceTest.server.listen(port);
    serv.openConnection('mongodb://localhost:27017/planning-csa-tests');

    PlanningResourceTest.planningResourceModel = mongoose.model<PlanningResourceModelInterface, PlanningResourceModelInterfaceStatic>('planningresources', PlanningResourceSchema)
    return PlanningResourceTest.CreateplanningResource();
  }

  /**
   * After all hook
   */
  public static after() {
    return PlanningResourceTest.planningResourceDocument.remove()
      .then(() => {
        return mongoose.disconnect();
      });
  }

  /**
   * Create a test planning-params
   */
  public static CreateplanningResource(): Promise<PlanningResourceModelInterface> {
    const data: PlanningResourceInterface = {
      trigram: 'CSA',
      name: 'Cyril SACENDA',
      role: 'CP',
      description: 'le relou de service'
    };
    return new PlanningResourceTest.planningResourceModel(data).save().then(planningResource => {
      PlanningResourceTest.planningResourceDocument = planningResource;
      return planningResource;
    });
  }

  // Delete a PlanningParam
  @test
  public delete() {
    const data: PlanningResourceInterface = {
      trigram: 'CSA',
      name: 'Cyril SACENDA',
      role: 'CP',
      description: 'le relou de service'
    };
    return new PlanningResourceTest.planningResourceModel(data).save().then(planningResource => {
      return chai.request(PlanningResourceTest.server).del(`${PlanningResourceTest.BASE_URI}/${planningResource._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test
  public get () {
    return chai.request(PlanningResourceTest.server).get(`${PlanningResourceTest.BASE_URI}/${PlanningResourceTest.planningResourceDocument._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('trigram').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.trigram)));
      response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.name)));
      response.body.should.have.property('role').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.role)));
      response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.description)));
    });
  }

  @test
  public list() {
    return chai.request(PlanningResourceTest.server).get(PlanningResourceTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.should.have.lengthOf(1);
    });
  }

  @test
  // @@@planningResource : OK
  public post() {
    const data: PlanningResourceInterface = {
      trigram: 'CSA',
      name: 'Cyril SACENDA',
      role: 'CP',
      description: 'le relou de service'
    };
    return chai.request(PlanningResourceTest.server).post(PlanningResourceTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('trigram').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.trigram)));
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.name)));
        response.body.should.have.property('role').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.role)));
        response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.description)));
        return PlanningResourceTest.planningResourceModel.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const data: PlanningResourceInterface = {
      trigram: 'CSA',
      name: 'Cyril SACENDA',
      role: 'CP',
      description: 'le relou de service'
    }
    return chai.request(PlanningResourceTest.server).put(`${PlanningResourceTest.BASE_URI}/${PlanningResourceTest.planningResourceDocument._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('trigram').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.trigram)));
        response.body.should.have.property('name').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.name)));
        response.body.should.have.property('role').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.role)));
        response.body.should.have.property('description').eql(JSON.parse(JSON.stringify(PlanningResourceTest.planningResourceDocument.description)));
      });
  }

}
