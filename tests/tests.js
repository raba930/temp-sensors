import http from 'http';
import app from '../app';
import should from 'should';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Entry from '../models/Entry';

let db, request, testData = [];
const port = process.env.TD_TEST_PORT || 3001;
const server = http.createServer(app);
const randMax = 40;
const lastEntry = {inside: 41, outside: -20};
const randomTemp = () => {
    let random = Math.random() * randMax;
    return random.toFixed(2);
};

for (let i = 0; i < 200; i++) {
    testData.push({inside: randomTemp(), outside: randomTemp()});
}

describe('Account', () => {
    before(done => {
        /*eslint no-console: 0*/
        console.log('Database name -> ', mongoose.connection.name, ' \n  Env mode -> ', process.env.TD_ENV, '\n');
        // set port
        app.set('port', port);
        // start app server
        server.listen(port);
        request = supertest('http://localhost:' + port);
        db = mongoose.connection;
        db.once('open', () => {
            Entry.create(testData, () => {
                Entry.create(lastEntry, done);
            });

        });
    });

    after(done => {
        Entry.remove(() => {
            mongoose.connection.close();
            server.close();
            done();
        });
        done();
    });

    beforeEach(function (done) {
        console.log('\x1b[36m', this.currentTest.title);
        done();
    });

    describe('api', () => {
        it('should return last 100 entries with properly sorted', done => {
            request
                .get('/current')
                .expect(200)
                .end((err, res) => {
                    should.not.exist(err);
                    res.body.entries.length.should.be.equal(100);
                    res.body.entries[0].inside.should.be.equal(lastEntry.inside);
                    res.body.entries[0].outside.should.be.equal(lastEntry.outside);
                    done();
                });
        });
    });
});