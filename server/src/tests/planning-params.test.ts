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
import {PlanningParamsInterface} from '../interfaces/planning-params.interface';
import {PlanningParamsModelInterface, PlanningParamsModelInterfaceStatic} from '../models/planning-params.model';
import {PlanningParamsSchema} from '../schemas/planning-params.schema';

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
class PlanningParamsTest {

  // constants
  public static BASE_URI: string = '/api/planning-params';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // planningParams model
  public static planningParamsModel: PlanningParamsModelInterfaceStatic;

  // planningParamsDocument document
  public static planningParamsDocument: PlanningParamsModelInterface;

  // the http server
  public static server: any;

  /**
   * Before all hook
   */
  public static before() {
    // create http server
    const port = 8001;
    const serv = Server.bootstrap();
    const app = serv.app;
    app.set('port', port);
    PlanningParamsTest.server = http.createServer(app);
    PlanningParamsTest.server.listen(port);
    serv.openConnection('mongodb://localhost:27017/planning-csa-tests');

    PlanningParamsTest.planningParamsModel = mongoose.model<PlanningParamsModelInterface, PlanningParamsModelInterfaceStatic>('planningparams', PlanningParamsSchema);
    return PlanningParamsTest.CreatePlanningParams();
  }

  /**
   * After all hook
   */
  public static after() {
    return PlanningParamsTest.planningParamsDocument.remove()
    .then(() => {
      return mongoose.disconnect();
    });
  }

  /**
   * Create a test planning-params
   */
  public static CreatePlanningParams(): Promise<PlanningParamsModelInterface> {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningParamsInterface = {
      currentDate: tmpDate
    };
    return new PlanningParamsTest.planningParamsModel(data).save().then(planningParams => {
      PlanningParamsTest.planningParamsDocument = planningParams;
      return planningParams;
    });
  }

  // Delete a PlanningParam
  @test
  public delete() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningParamsInterface = {
      currentDate: tmpDate
    };
    return new PlanningParamsTest.planningParamsModel(data).save().then(planningParams => {
      return chai.request(PlanningParamsTest.server).del(`${PlanningParamsTest.BASE_URI}/${planningParams._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test
  public get () {
    return chai.request(PlanningParamsTest.server).get(`${PlanningParamsTest.BASE_URI}/${PlanningParamsTest.planningParamsDocument._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('currentDate').eql(JSON.parse(JSON.stringify(PlanningParamsTest.planningParamsDocument.currentDate)));
    });
  }

  @test
  public list() {
    return chai.request(PlanningParamsTest.server).get(PlanningParamsTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.should.have.lengthOf(1);
    });
  }

  @test
  // @@@Planningparams : OK
  public post() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningParamsInterface = {
      currentDate: tmpDate
    };
    return chai.request(PlanningParamsTest.server).post(PlanningParamsTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('currentDate').eql(JSON.parse(JSON.stringify(data.currentDate)));
        return PlanningParamsTest.planningParamsModel.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningParamsInterface = {
      currentDate: tmpDate
    }
    return chai.request(PlanningParamsTest.server).put(`${PlanningParamsTest.BASE_URI}/${PlanningParamsTest.planningParamsDocument._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('currentDate').eql(JSON.parse(JSON.stringify(data.currentDate)));
      });
  }

}
