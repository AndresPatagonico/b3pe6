import './setup.js';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Suite de Tests Funcionales - Módulo de Pedidos (Orders)', () => {

    it('POST /api/orders - Debe crear un nuevo pedido exitosamente (201)', async () => {
        const orderData = {
            products: [{ productId: '60c72b2f9b1d8b2b8c8e4567', quantity: 2 }],
            shippingAddress: 'Av. Corrientes 1234',
            totalAmount: 4500
        };

        const response = await requester.post('/api/orders').send(orderData);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('status').that.equals('success');
        expect(response.body).to.have.property('payload');
        expect(response.body.payload).to.have.property('_id');
    });

    it('POST /api/orders - Debe rechazar la creación por datos incompletos con error estandarizado (400)', async () => {
        const invalidOrderData = { shippingAddress: '' };

        const response = await requester.post('/api/orders').send(invalidOrderData);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('INVALID_ORDER_DATA');
        expect(response.body).to.have.property('message');
    });

    it('GET /api/orders - Debe obtener la lista de todos los pedidos (200)', async () => {
        const response = await requester.get('/api/orders');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').that.equals('success');
        expect(response.body.payload).to.be.an('array');
    });

    it('GET /api/orders/:id - Debe devolver error 404 estandarizado al consultar un pedido inexistente', async () => {
        const fakeId = '60c72b2f9b1d8b2b8c8e9999';
        const response = await requester.get(`/api/orders/${fakeId}`);

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('ORDER_NOT_FOUND');
        expect(response.body).to.have.property('message');
    });

    it('PUT /api/orders/:id/status - Debe fallar con 400 al intentar enviar un estado no permitido', async () => {
        const validId = '60c72b2f9b1d8b2b8c8e4567';
        const response = await requester
            .put(`/api/orders/${validId}/status`)
            .send({ status: 'ESTADO_INVALIDO' });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('status').that.equals('error');
        expect(response.body).to.have.property('error').that.equals('INVALID_STATUS');
        expect(response.body).to.have.property('message');
    });

    it('PUT /api/orders/:id/status - Debe actualizar el estado correctamente (200)', async () => {
        const validId = '60c72b2f9b1d8b2b8c8e4567';
        const response = await requester
            .put(`/api/orders/${validId}/status`)
            .send({ status: 'shipped' });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('status').that.equals('success');
        expect(response.body.payload.status).to.equal('shipped');
    });

});