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
import {PlanningVacationInterface} from '../interfaces/planning-vacation.interface';
import {PlanningVacationModelInterface, PlanningVacationModelInterfaceStatic} from '../models/planning-vacation.model';
import {PlanningVacationSchema} from '../schemas/planning-vacation.schema';

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
class PlanningVacationTest {

  // constants
  public static BASE_URI: string = '/api/planning-vacation';

  // the mongooose connection
  public static connection: mongoose.Connection;

  // planningVacation model
  public static planningVacationModel: PlanningVacationModelInterfaceStatic;

  // planningVacationDocument document
  public static planningVacationDocument: PlanningVacationModelInterface;

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
    PlanningVacationTest.server = http.createServer(app);
    PlanningVacationTest.server.listen(port);
    serv.openConnection('mongodb://localhost:27017/planning-csa-tests');

    PlanningVacationTest.planningVacationModel = mongoose.model<PlanningVacationModelInterface, PlanningVacationModelInterfaceStatic>('planningvacation', PlanningVacationSchema);
    return PlanningVacationTest.CreatePlanningVacation();
  }

  /**
   * After all hook
   */
  public static after() {
    return PlanningVacationTest.planningVacationDocument.remove()
    .then(() => {
      return mongoose.disconnect();
    });
  }

  /**
   * Create a test planning-vacation
   */
  public static CreatePlanningVacation(): Promise<PlanningVacationModelInterface> {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningVacationInterface = {
      val: tmpDate
    };
    return new PlanningVacationTest.planningVacationModel(data).save().then(planningVacation => {
      PlanningVacationTest.planningVacationDocument = planningVacation;
      return planningVacation;
    });
  }

  // Delete a PlanningParam
  @test
  public delete() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningVacationInterface = {
      val: tmpDate
    };
    return new PlanningVacationTest.planningVacationModel(data).save().then(planningVacation => {
      return chai.request(PlanningVacationTest.server).del(`${PlanningVacationTest.BASE_URI}/${planningVacation._id}`).then(response => {
        response.should.have.status(200);
      });
    });
  }

  @test
  public get () {
    return chai.request(PlanningVacationTest.server).get(`${PlanningVacationTest.BASE_URI}/${PlanningVacationTest.planningVacationDocument._id}`).then(response => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('val').eql(JSON.parse(JSON.stringify(PlanningVacationTest.planningVacationDocument.val)));
    });
  }

  @test
  public list() {
    return chai.request(PlanningVacationTest.server).get(PlanningVacationTest.BASE_URI).then(response => {
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.should.have.lengthOf(1);
    });
  }

  @test
  // @@@Planningvacation : OK
  public post() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningVacationInterface = {
      val: tmpDate
    };
    return chai.request(PlanningVacationTest.server).post(PlanningVacationTest.BASE_URI)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('val').eql(JSON.parse(JSON.stringify(data.val)));
        return PlanningVacationTest.planningVacationModel.findByIdAndRemove(response.body._id).exec();
      });
  }

  @test
  public put() {
    const tmpDate: Date = new Date('11/20/2014 04:11');
    const data: PlanningVacationInterface = {
      val: tmpDate
    }
    return chai.request(PlanningVacationTest.server).put(`${PlanningVacationTest.BASE_URI}/${PlanningVacationTest.planningVacationDocument._id}`)
      .send(data)
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('_id');
        response.body.should.have.property('currentDate').eql(JSON.parse(JSON.stringify(data.val)));
      });
  }

}
