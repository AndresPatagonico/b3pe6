import mongoose from 'mongoose';

export class OrderController {
    static async getOrders(req, res, next) {
        try {
        return res.status(200).json({ status: 'success', payload: [] });
        } catch (error) {
        next(error);
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { products, shippingAddress, totalAmount } = req.body;

            if (!products || !Array.isArray(products) || products.length === 0 || !shippingAddress || !totalAmount) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ORDER_DATA',
                    message: 'Datos de pedido incompletos o inválidos'
                });
            }

            const newOrder = {
                _id: new mongoose.Types.ObjectId(),
                products,
                shippingAddress,
                totalAmount,
                status: 'pending'
            };

            res.status(201).json({ status: 'success', payload: newOrder });
        } catch (error) {
            next(error);
        }
    }

    static async getOrderById(req, res, next) {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID provisto no es un ObjectId válido'
                });
            }

            // Simulación de búsqueda / o consulta al model
            const fakeIdExist = '60c72b2f9b1d8b2b8c8e4567';
            if (id !== fakeIdExist) {
                return res.status(404).json({
                    status: 'error',
                    error: 'ORDER_NOT_FOUND',
                    message: 'El pedido solicitado no existe'
                });
            }

            res.status(200).json({ status: 'success', payload: { _id: id, status: 'pending' } });
        } catch (error) {
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];

            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_STATUS',
                    message: `El estado '${status}' no es válido`
                });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'INVALID_ID',
                    message: 'El ID provisto no es válido'
                });
            }

            res.status(200).json({ status: 'success', payload: { _id: id, status } });
        } catch (error) {
            next(error);
        }
    }
}