import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Módulo de Pedidos (Orders)', () => {

    it('GET /api/orders - Debe obtener la lista de todos los pedidos', async () => {
        const response = await requester.get('/api/orders');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('payload');
        expect(response.body.payload).to.be.an('array');
    });

    it('GET /api/orders/inexistent - Debe devolver 404 al consultar una subruta inexistente de pedidos', async () => {
        const response = await requester.get('/api/orders/inexistent');

        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    });

});